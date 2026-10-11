
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

const IMAGE_DIR = path.join(
  ROOT,
  'public',
  'images',
  'products',
);

const OUTPUT_FILE = path.join(
  ROOT,
  'data',
  'products',
  'local-images.generated.ts',
);

const CATEGORIES = new Set([
  'sweets',
  'restaurant',
  'bakery',
  'namkeen',
]);

// Lower numbers have higher priority when multiple formats
// exist for the same product.
const EXTENSION_PRIORITY = new Map([
  ['.webp', 0],
  ['.avif', 1],
  ['.jpg', 2],
  ['.jpeg', 2],
  ['.png', 3],
]);

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readableName(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getImageFiles(directory) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];

  // Sort for deterministic builds.
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (
      entry.isFile() &&
      EXTENSION_PRIORITY.has(extension)
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function createImageKey(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const parts = normalizedPath.split('/');
  const filename = parts.at(-1) ?? '';
  const stem = path.parse(filename).name;
  const slug = slugify(stem);

  if (!slug) {
    throw new Error(`Invalid product image filename: ${relativePath}`);
  }

  // Convention 1:
  // public/images/products/restaurant/masala-dosa.jpeg
  // Produces: restaurant/masala-dosa
  const directoryCategory = parts[0]?.toLowerCase();

  if (parts.length > 1 && CATEGORIES.has(directoryCategory)) {
    return `${directoryCategory}/${slug}`;
  }

  // Convention 2:
  // public/images/products/restaurant--masala-dosa.jpeg
  // Also supports restaurant-masala-dosa.jpeg.
  const categoryPrefix = stem.match(
    /^(sweets|restaurant|bakery|namkeen)(?:--|-)(.+)$/i,
  );

  if (categoryPrefix) {
    const category = categoryPrefix[1].toLowerCase();
    const productSlug = slugify(categoryPrefix[2]);

    if (CATEGORIES.has(category) && productSlug) {
      return `${category}/${productSlug}`;
    }
  }

  // Convention 3:
  // public/images/products/masala-dosa.jpeg
  // Produces: masala-dosa
  return slug;
}

function toPublicUrl(relativePath) {
  return (
    '/images/products/' +
    relativePath
      .split(path.sep)
      .map((segment) => encodeURIComponent(segment))
      .join('/')
  );
}

async function main() {
  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });

  const files = await getImageFiles(IMAGE_DIR);
  const selected = new Map();

  for (const file of files) {
    const relativePath = path.relative(IMAGE_DIR, file);
    const key = createImageKey(relativePath);
    const extension = path.extname(file).toLowerCase();
    const priority = EXTENSION_PRIORITY.get(extension);

    const candidate = {
      relativePath,
      src: toPublicUrl(relativePath),
      priority,
    };

    const existing = selected.get(key);

    if (!existing) {
      selected.set(key, candidate);
      continue;
    }

    // Multiple formats are okay: prefer the better-supported
    // format according to EXTENSION_PRIORITY.
    if (candidate.priority < existing.priority) {
      console.log(
        `Using ${relativePath} instead of ${existing.relativePath}`,
      );

      selected.set(key, candidate);
      continue;
    }

    if (candidate.priority > existing.priority) {
      console.log(`Using ${existing.relativePath}; skipping ${relativePath}`);
      continue;
    }

    // Two distinct files with the same key and same priority
    // are ambiguous, so fail instead of silently choosing one.
    throw new Error(
      `Duplicate product image key "${key}":\n` +
        `- ${existing.relativePath}\n` +
        `- ${relativePath}\n` +
        'Keep one file per format, or use a category-specific filename.',
    );
  }

  const imageMap = Object.fromEntries(
    [...selected.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => {
        const slug = key.split('/').at(-1) ?? key;

        return [
          key,
          {
            src: value.src,
            alt: `${readableName(slug)} product photo`,
          },
        ];
      }),
  );

  const generatedContent = [
    '// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.',
    '// Generated by scripts/generate-product-image-map.mjs.',
    '',
    'export type LocalProductImage = {',
    '  src: string;',
    '  alt: string;',
    '};',
    '',
    'export const localProductImages: Record<string, LocalProductImage> =',
    `${JSON.stringify(imageMap, null, 2)};`,
    '',
  ].join('\n');

  await writeFile(OUTPUT_FILE, generatedContent, 'utf8');

  console.log(`Product image map generated: ${selected.size} mapping(s).`);
  console.log(`Image files scanned: ${files.length}.`);
  console.log(`Output: ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main().catch((error) => {
  console.error('Failed to generate product image map:', error);
  process.exitCode = 1;
});

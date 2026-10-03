import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { VegMark } from '@/components/ui/VegMark';
import { Cartouche } from '@/components/brand/Cartouche';
import { ImageArch } from '@/components/brand/ImageArch';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder';
import { Logo } from '@/components/brand/Logo';
import { Ornament } from '@/components/brand/Ornament';
import { Sunburst } from '@/components/brand/Sunburst';
import { formatINR } from '@/lib/money';
import { Demo } from './Demo';

// TEMPORARY dev-only page (not in the spec). Delete in build step 10.
export const metadata: Metadata = { title: 'Style guide', robots: { index: false, follow: false } };

const swatches = [
  ['cream', '#FEFADB', 'bg-cream'],
  ['ivory', '#FFFDF0', 'bg-ivory'],
  ['parchment', '#F6E9C0', 'bg-parchment'],
  ['ray', '#FDF6B8', 'bg-ray'],
  ['primary', '#8F0017', 'bg-primary'],
  ['crimson', '#B3202A', 'bg-crimson'],
  ['crimson-deep', '#8F1721', 'bg-crimson-deep'],
  ['maroon', '#5A1420', 'bg-maroon'],
  ['saffron', '#E8841C', 'bg-saffron'],
  ['gold', '#C49A5E', 'bg-gold'],
  ['gold-light', '#E3C48A', 'bg-gold-light'],
  ['ink', '#2B1712', 'bg-ink'],
  ['ink-soft', '#6A4B40', 'bg-ink-soft'],
  ['leaf', '#1F7A4D', 'bg-leaf'],
  ['egg', '#9A5B1E', 'bg-egg'],
  ['error', '#A3261F', 'bg-error'],
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-gold/35 pt-10">
      <h2 className="font-display text-h2 text-primary">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-14 px-5 py-16 lg:px-12">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-hero text-primary">Style guide</h1>
        <p className="max-w-[52ch] text-ink-variant">
          Temporary page to check the brand tokens, type, controls and shapes before building real
          pages. Delete it in the final QA step.
        </p>
      </header>

      <Section title="Colour">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
          {swatches.map(([name, hex, cls]) => (
            <li key={name} className="flex flex-col gap-1.5">
              <span className={`${cls} h-16 w-full border border-gold/35`} />
              <span className="text-small font-medium text-ink">{name}</span>
              <span className="text-small text-ink-soft">{hex}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Type">
        <div className="flex flex-col gap-4">
          <p className="font-display text-hero text-primary">
            Sweets, the way they have always been made.
          </p>
          <p className="font-display text-h2 text-ink">Section heading in Marcellus</p>
          <p className="font-display text-h3 text-ink">Smaller heading in Marcellus</p>
          <p className="font-display text-product text-ink">Product name, Kaju Katli</p>
          <p className="max-w-[62ch] text-body text-ink">
            Body text in Hind at seventeen pixels. A line should stay under sixty-two characters for
            easy reading, with a calm line height that suits long product descriptions.
          </p>
          <p className="text-small text-ink-variant">
            Caption and helper text, 14 px, ₹ and numerals: 0123456789
          </p>
          <p className="font-semibold tabular-nums text-primary">
            {formatINR(650)} <span className="font-normal text-ink-soft">/ 500 g</span>
          </p>
          <p className="font-script text-h2 text-primary">Happiness is also Sweet</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Add to cart</Button>
          <Button variant="secondary">Add to cart</Button>
          <Button variant="text">Browse sweets</Button>
          <Button variant="whatsapp">Send order on WhatsApp</Button>
          <Button disabled>Currently unavailable</Button>
          <Button loading>Sending</Button>
        </div>
      </Section>

      <Section title="Fields, chips, badges, marks">
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Input label="Name" required placeholder="Your name" />
          <Input label="Phone" hint="10-digit mobile number" />
          <Input label="Email" error="That email does not look right." defaultValue="aman@" />
          <Select label="Enquiry type" defaultValue="general">
            <option value="general">General enquiry</option>
            <option value="bulk">Bulk or festive order</option>
            <option value="feedback">Feedback</option>
          </Select>
          <Textarea label="Message" className="md:col-span-2" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>250 g</Chip>
          <Chip selected>500 g</Chip>
          <Chip>1 kg</Chip>
          <Badge>Bestseller</Badge>
          <Badge tone="maroon">Festive</Badge>
          <VegMark diet="veg" />
          <VegMark diet="egg" />
        </div>
      </Section>

      <Section title="Brand shapes">
        <div className="grid gap-8 md:grid-cols-4">
          <Cartouche className="aspect-[4/5] w-full">
            <ImagePlaceholder name="Cartouche frame" />
          </Cartouche>
          <ImageArch>
            <ImagePlaceholder name="Arch frame" />
          </ImageArch>
          <div className="relative aspect-square w-full overflow-hidden bg-cream">
            <Sunburst className="absolute inset-0" />
          </div>
          <div className="flex flex-col items-start gap-6">
            <Logo />
            <Logo variant="badge" size={64} />
            <Ornament />
          </div>
        </div>
      </Section>

      <Section title="Sheets and toast">
        <Demo />
      </Section>
    </main>
  );
}
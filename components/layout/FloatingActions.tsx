import { Phone } from 'lucide-react';
import { telUrl, whatsappChatUrl } from '@/config/site';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';

const circle =
  'group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-[160ms] ease-brand hover:scale-105';
const tooltip =
  'pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-ctl bg-ink px-3 py-1.5 text-small text-ivory opacity-0 transition-opacity duration-[160ms] md:block group-hover:opacity-100 group-focus-visible:opacity-100';

/** Always-visible WhatsApp and Call buttons, bottom-right on every page. */
export function FloatingActions() {
  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-4 z-[45] flex flex-col gap-3 md:right-6">
      <a
        href={whatsappChatUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${circle} bg-leaf text-ivory`}
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className={tooltip}>Chat on WhatsApp</span>
      </a>
      <a href={telUrl()} aria-label="Call the shop" className={`${circle} bg-primary text-ivory`}>
        <Phone aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
        <span className={tooltip}>Call the shop</span>
      </a>
    </div>
  );
}
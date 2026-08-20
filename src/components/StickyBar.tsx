import { Phone, Wrench } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { telHref, waHref, waMessages } from "@/lib/utils";
import { WhatsAppGlyph } from "@/components/Header";

/**
 * Mobile-only sticky action bar (hidden ≥lg where header CTAs take over).
 * Sits above the iOS home indicator via safe-area padding.
 */
export default function StickyBar({ onBookRepair }: { onBookRepair: () => void }) {
  const { contact } = shopConfig;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-2 px-3 py-2.5">
        <a
          href={telHref()}
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl border border-mist-200 text-ink-800 transition active:bg-mist-100"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="spec-label">Call now</span>
        </a>
        <a
          href={waHref(waMessages.generic())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl bg-[#1fa855] text-white transition active:brightness-95"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          <span className="spec-label">WhatsApp</span>
        </a>
        <button
          onClick={onBookRepair}
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl bg-accent text-white transition active:brightness-95"
        >
          <Wrench className="h-4 w-4" aria-hidden="true" />
          <span className="spec-label">Book repair</span>
        </button>
      </div>
      <p className="pb-1 text-center text-[0.65rem] text-mist-500">
        Repairs accepted till 8:15 PM · {contact.phoneDisplay}
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Menu, Phone, Wrench, X } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn, telHref, waMessages, waHref } from "@/lib/utils";
import { Button, Container } from "@/components/ui";
import { Logo } from "@/components/Logo";

/**
 * Sticky header: collapses to a compact bar on scroll, collapses to a
 * hamburger panel under `lg`. Keyboard + screen-reader friendly (aria-expanded,
 * aria-controls, Escape to close, body-scroll lock while the panel is open).
 */
export default function Header({ onBookRepair }: { onBookRepair: () => void }) {
  const { nav, contact } = shopConfig;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  // Compact-bar state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [nav]);

  // Escape closes the mobile panel + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-mist-200/80 bg-white/85 shadow-[0_1px_20px_-8px_rgba(8,13,24,0.25)] backdrop-blur-xl"
          : "border-transparent bg-white",
      )}
    >
      {/* Thin accent micro-bar — carries the shop's contact promise on desktop */}
      <div className="hidden bg-ink-900 text-white lg:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="spec-label text-mist-400">
            {shopConfig.location.address[1]} · Mon–Sat 10:30–21:00
          </p>
          <div className="flex items-center gap-5">
            <a
              href={telHref()}
              className="spec-label flex items-center gap-1.5 text-mist-300 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <span className="spec-label flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
              Genuine parts · GST invoice
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <nav aria-label="Main" className="flex h-16 items-center justify-between gap-4 lg:h-18">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 rounded-lg py-1 pr-2"
            aria-label={`${shopConfig.shopName} — home`}
          >
            <Logo />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                    active === item.id ? "text-accent" : "text-ink-700 hover:text-ink-900",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              as="a"
              href={waHref(waMessages.generic())}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              className="px-4"
            >
              <WhatsAppGlyph />
              WhatsApp Us
            </Button>
            <Button onClick={onBookRepair}>
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Book a Repair
            </Button>
          </div>

          {/* Mobile: call + hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={telHref()}
              aria-label={`Call ${shopConfig.shopName}`}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-mist-200 text-ink-800 transition hover:bg-mist-100"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-white transition hover:bg-ink-800"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden"
      >
        <div className="fixed inset-x-0 bottom-0 top-[64px] z-40 overflow-y-auto border-t border-mist-200 bg-white">
          <Container className="flex min-h-full flex-col justify-between py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-semibold text-ink-900 transition hover:bg-mist-100"
                  >
                    {item.label}
                    <span className="spec-label text-mist-400">
                      {String(nav.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <Button onClick={() => { setOpen(false); onBookRepair(); }} className="w-full">
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Book a Repair
              </Button>
              <Button
                as="a"
                href={waHref(waMessages.generic())}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full"
              >
                <WhatsAppGlyph />
                WhatsApp Us
              </Button>
              <Button as="a" href={telHref()} variant="outline" className="w-full">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phoneDisplay}
              </Button>
              <p className="pt-2 text-center text-xs text-mist-500">{shopConfig.location.landmark}</p>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

/** Inline WhatsApp mark so we don't ship an icon dependency for one glyph. */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className ?? "h-4 w-4"}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.85 9.85 0 0 0 4.68 1.19h.01c5.44 0 9.86-4.42 9.86-9.86C21.91 6.42 17.49 2 12.04 2Zm0 18.03c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.23.85.86-3.15-.2-.32a8.07 8.07 0 0 1-1.24-4.28c0-4.47 3.64-8.11 8.11-8.11 4.47 0 8.11 3.64 8.11 8.11s-3.64 8.27-8.11 8.27Z" />
    </svg>
  );
}

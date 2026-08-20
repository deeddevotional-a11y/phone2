import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { dayNameNow, isOpenNow, telHref, to12h, waHref, waMessages } from "@/lib/utils";
import { Container } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { WhatsAppGlyph } from "@/components/Header";

export default function Footer({ onBookRepair }: { onBookRepair: () => void }) {
  const { shopName, nav, contact, location, hours, categories, repairs, brands, footerNote, established } = shopConfig;
  const today = hours.find((h) => h.day === dayNameNow());
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-white/10 bg-ink-900 pb-28 pt-14 text-white lg:pb-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-400">
              {shopConfig.tagline} Authorized sales and service for eight brands, on 12th Main since{" "}
              {established}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href={contact.instagramUrl} label={`Instagram ${contact.instagram}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </SocialLink>
              {contact.facebookUrl && (
                <SocialLink href={contact.facebookUrl} label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.1-2.4-.1-2.38 0-4 1.45-4 4.12v2.28H7.6V13h2.7v8h3.2Z" />
                  </svg>
                </SocialLink>
              )}
              <SocialLink href={waHref(waMessages.generic())} label="WhatsApp">
                <WhatsAppGlyph className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h2 className="spec-label text-mist-400">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-sm text-mist-300 transition hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={onBookRepair} className="text-sm text-mist-300 transition hover:text-white">
                  Book a repair
                </button>
              </li>
            </ul>
          </nav>

          {/* Categories + top repairs */}
          <div>
            <h2 className="spec-label text-mist-400">Shop &amp; service</h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href="#shop" className="text-sm text-mist-300 transition hover:text-white">
                    {c.name}
                  </a>
                </li>
              ))}
              {repairs.services.slice(0, 2).map((s) => (
                <li key={s.id} className="text-sm text-mist-300">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="spec-label text-mist-400">Visit</h2>
            <address className="mt-4 space-y-3 not-italic text-sm text-mist-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent-light)]" aria-hidden="true" />
                {location.address.join(", ")}
              </p>
              <p>
                <a href={telHref()} className="flex items-center gap-2.5 transition hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-[color:var(--accent-light)]" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[color:var(--accent-light)]" aria-hidden="true" />
                  {contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[color:var(--accent-light)]" aria-hidden="true" />
                {isOpenNow(hours) ? "Open now" : "Closed now"} · Today{" "}
                {today?.closed ? "Closed" : `${to12h(today?.open)}–${to12h(today?.close)}`}
              </p>
            </address>
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[color:var(--accent-light)] underline underline-offset-4"
            >
              Get directions
            </a>
          </div>
        </div>

        {/* Authorization strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          <span className="spec-label text-mist-400">Authorized partner</span>
          {brands
            .filter((b) => b.authorized)
            .map((b) => (
              <span key={b.id} className="text-sm font-semibold text-white/60">
                {b.mark}
              </span>
            ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-mist-500">
            © {year} {shopName}. All rights reserved. {footerNote}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 text-sm font-semibold text-mist-300 transition hover:text-white sm:self-auto"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-mist-300 transition hover:border-white/40 hover:text-white"
    >
      {children}
    </a>
  );
}

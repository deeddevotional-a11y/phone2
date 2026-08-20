import { ArrowRight, BadgeCheck, Clock, MapPin, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { isOpenNow, nextOpening, telHref, waMessages, waHref } from "@/lib/utils";
import { Button, Container, Pill } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/Header";

export default function Hero({ onBookRepair }: { onBookRepair: (service?: string) => void }) {
  const { hero, brands, hours, location, contact, established } = shopConfig;
  const open = isOpenNow(hours);
  const years = new Date().getFullYear() - established;

  return (
    <section id="top" className="on-dark relative overflow-hidden bg-ink-900 text-white">
      {/* backdrop: grid lines + accent glow */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------- Copy ---------------- */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="dark">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {hero.eyebrow}
              </Pill>
              <span
                className={
                  open
                    ? "spec-label inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30"
                    : "spec-label inline-flex items-center gap-1.5 rounded-full bg-mist-100 px-2.5 py-1 font-semibold text-ink-700 ring-1 ring-inset ring-mist-200"
                }
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${open ? "animate-pulse bg-emerald-400" : "bg-mist-400"}`}
                  aria-hidden="true"
                />
                {open ? "Open now" : nextOpening(hours)}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
              {hero.headline}{" "}
              <span className="text-[color:var(--accent-light)]">{hero.headlineAccent}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist-300 sm:text-lg">{hero.sub}</p>

            {/* Dual CTA — both ≥44px, full width on mobile */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                as="a"
                href="#shop"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="primary"
                className="min-h-12 px-6 text-base"
              >
                Browse Phones
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                onClick={() => onBookRepair()}
                variant="ghost"
                className="min-h-12 px-6 text-base"
              >
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Book a Repair
              </Button>
              <Button
                as="a"
                href={telHref()}
                variant="ghost"
                className="min-h-12 px-5 text-base sm:hidden"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Call
              </Button>
            </div>

            {/* Trust signals */}
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="spec-label text-mist-400">{s.label}</dt>
                  <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist-300">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--accent-light)]" aria-hidden="true" />
                Authorized {brands.filter((b) => b.authorized).map((b) => b.name).join(" · ")} dealer
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[color:var(--accent-light)]" aria-hidden="true" />
                Screen replacement in 45 min
              </span>
            </div>
          </div>

          {/* ---------------- Device visual ---------------- */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850 shadow-2xl">
              <img
                src={hero.image}
                alt={hero.imageAlt}
                className="aspect-[4/5] w-full object-cover object-center"
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent"
                aria-hidden="true"
              />
              <span className="spec-label absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur">
                {years} years · {location.address[1]}
              </span>
            </div>

            {/* Floating chips — spec-sheet micro labels */}
            <div className="absolute -left-3 top-8 hidden rounded-2xl border border-white/10 bg-ink-800/95 p-3 shadow-xl backdrop-blur sm:block">
              <p className="spec-label text-mist-400">This week</p>
              <p className="mt-0.5 text-sm font-bold text-white">217 repairs done</p>
            </div>
            <div className="absolute -right-3 bottom-16 hidden rounded-2xl border border-white/10 bg-ink-800/95 p-3 shadow-xl backdrop-blur sm:block">
              <p className="spec-label text-emerald-400">Free diagnosis</p>
              <p className="mt-0.5 text-sm font-bold text-white">No fix, no fee</p>
            </div>
          </div>
        </div>

        {/* Bottom authorization strip */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
          <span className="spec-label inline-flex items-center gap-2 text-mist-400">
            <BadgeCheck className="h-4 w-4 text-[color:var(--accent-light)]" aria-hidden="true" />
            Authorized &amp; warranty-backed
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {brands
              .filter((b) => b.authorized)
              .map((b) => (
                <span key={b.id} className="text-sm font-semibold tracking-tight text-white/70">
                  {b.mark}
                </span>
              ))}
          </div>
          <Button
            as="a"
            href={waHref(waMessages.generic())}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="ml-auto hidden min-h-10 px-4 text-sm lg:inline-flex"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            WhatsApp {contact.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}

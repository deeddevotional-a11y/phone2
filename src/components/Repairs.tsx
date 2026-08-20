import {
  BatteryCharging,
  Camera,
  Cpu,
  Droplets,
  PlugZap,
  ShieldCheck,
  Smartphone,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { shopConfig, type RepairService } from "@/config/shopConfig";
import { inr, waHref, waMessages } from "@/lib/utils";
import { Button, Container, Eyebrow, Reveal, Section } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/Header";

const iconMap: Record<RepairService["icon"], LucideIcon> = {
  screen: Smartphone,
  battery: BatteryCharging,
  droplet: Droplets,
  plug: PlugZap,
  camera: Camera,
  cpu: Cpu,
};

export default function Repairs({ onBookRepair }: { onBookRepair: (service?: string) => void }) {
  const { repairs, trust, contact } = shopConfig;

  return (
    <Section id="repairs" dark className="overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow dark>Service lab</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              {repairs.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-300">{repairs.sub}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button onClick={() => onBookRepair()} variant="primary" className="min-h-12 px-6">
                Book a Repair
              </Button>
              <Button
                as="a"
                href={waHref(waMessages.repair("a quick quote"))}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="min-h-12 px-5"
              >
                <WhatsAppGlyph />
                WhatsApp a photo of the damage
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-300">
              {trust.badges.slice(2, 4).map((b) => (
                <li key={b.title} className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--accent-light)]" aria-hidden="true" />
                  {b.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src={repairs.image}
              alt={repairs.imageAlt}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-2xl border border-white/10 object-cover"
            />
            <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-white/10 bg-ink-850/95 p-3.5 shadow-xl backdrop-blur">
              <p className="text-sm text-mist-300">{repairs.note}</p>
              <p className="spec-label mt-1 text-mist-400">Lab line · {contact.phoneDisplay}</p>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repairs.services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <li key={s.id} className="h-full">
                <Reveal delay={(i % 3) * 60} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.07]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-[color:var(--accent-light)] ring-1 ring-inset ring-white/10">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {s.popular && (
                        <span className="spec-label inline-flex items-center rounded-full bg-[color:var(--accent)]/30 px-2.5 py-1 font-semibold text-white ring-1 ring-inset ring-white/20">
                          Most requested
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-300">{s.description}</p>

                    <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                      <div>
                        <dt className="spec-label text-mist-400">Turnaround</dt>
                        <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                          <Timer className="h-3.5 w-3.5 text-[color:var(--accent-light)]" aria-hidden="true" />
                          {s.turnaround}
                        </dd>
                      </div>
                      <div>
                        <dt className="spec-label text-mist-400">Starting at</dt>
                        <dd className="mt-1 text-sm font-semibold text-white">{inr(s.priceFrom)}</dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="spec-label text-emerald-300">{s.warranty}</span>
                      <Button
                        variant="ghost"
                        className="min-h-10 px-3.5 text-sm"
                        onClick={() => onBookRepair(s.name)}
                      >
                        Book
                      </Button>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

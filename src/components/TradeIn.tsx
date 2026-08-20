import { ArrowRight, Banknote, Repeat, Sparkles } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn, waHref, waMessages } from "@/lib/utils";
import { Button, Container, Eyebrow, Pill, Reveal, Section } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/Header";

/** Section 6 — Trade-in / exchange programme. Renders only if enabled. */
export function TradeIn() {
  const { tradeIn } = shopConfig;
  if (!tradeIn.enabled) return null;

  return (
    <Section id="exchange" className="border-b border-mist-200 bg-white py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-mist-200 bg-mist-50">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-12">
            <div>
              <Eyebrow>Exchange programme</Eyebrow>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
                {tradeIn.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mist-600">{tradeIn.sub}</p>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-accent-soft px-4 py-3">
                <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-semibold text-accent">{tradeIn.bonus}</span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  as="a"
                  href={waHref(waMessages.tradeIn("my current phone"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="min-h-12 px-5"
                >
                  <WhatsAppGlyph />
                  Get a quote in 15 min
                </Button>
                <Button
                  as="a"
                  href="#visit"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="outline"
                  className="min-h-12 px-5"
                >
                  Walk in for valuation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <ol className="space-y-3">
              {tradeIn.steps.map((step, i) => (
                <li key={step.title} className="h-full">
                  <Reveal delay={i * 70}>
                    <div className="flex h-full gap-4 rounded-2xl border border-mist-200 bg-white p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-900 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold tracking-tight text-ink-900">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-mist-600">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Financing / EMI options — sits inside the same band as the exchange block. */
export function FinancingStrip() {
  const { financing } = shopConfig;
  if (!financing.enabled) return null;

  return (
    <Section className="border-b border-mist-200 bg-white py-14">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2">
              <Banknote className="h-4 w-4 text-accent" aria-hidden="true" />
              <Eyebrow>Finance</Eyebrow>
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              {financing.headline}
            </h2>
          </div>
          <Pill tone="neutral" className="w-fit">
            <Repeat className="h-3 w-3" aria-hidden="true" />
            Paperwork done in-store, 10 minutes
          </Pill>
        </div>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {financing.options.map((o, i) => (
            <li key={o.title}>
              <Reveal delay={i * 50}>
                <div className={cn("h-full rounded-2xl border border-mist-200 bg-mist-50 p-5")}>
                  <h3 className="text-sm font-bold tracking-tight text-ink-900">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">{o.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

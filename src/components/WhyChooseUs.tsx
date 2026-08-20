import { Award, Boxes, Clock, ShieldCheck, Users, Wrench, type LucideIcon } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn, telHref } from "@/lib/utils";
import { Button, Container, Eyebrow, Reveal, Section } from "@/components/ui";

const icons: Record<string, LucideIcon> = { shield: ShieldCheck, wrench: Wrench, award: Award, box: Boxes, clock: Clock, users: Users };

/** Section 7 — About + trust badges + stats. */
export default function WhyChooseUs() {
  const { about, aboutPoints, trust, established, shopName } = shopConfig;
  const years = new Date().getFullYear() - established;

  return (
    <Section id="about" className="py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>About {shopName}</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              {trust.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mist-600">{about}</p>
            <ul className="mt-6 space-y-2.5">
              {aboutPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm font-medium text-ink-800">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Button as="a" href={telHref()} variant="outline" className="mt-7">
              Talk to the owner · {shopConfig.contact.phoneDisplay}
            </Button>
          </div>

          {/* Stats — 2×2 on mobile, 2×2 on desktop */}
          <dl className="grid grid-cols-2 gap-4">
            {trust.stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "rounded-2xl border border-mist-200 p-5 sm:p-6",
                  i === 0 ? "bg-ink-900 text-white" : "bg-white",
                )}
              >
                <dt className={cn("spec-label", i === 0 ? "text-mist-400" : "text-mist-500")}>{s.label}</dt>
                <dd
                  className={cn(
                    "mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl",
                    i === 0 ? "text-white" : "text-accent",
                  )}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trust badges */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.badges.map((b, i) => {
            const Icon = icons[b.icon] ?? ShieldCheck;
            return (
              <li key={b.title}>
                <Reveal delay={i * 60}>
                  <article className="h-full rounded-2xl border border-mist-200 bg-white p-5 transition-shadow hover:shadow-card">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold tracking-tight text-ink-900">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-600">{b.text}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-xs text-mist-500">
          Serving Bengaluru since {established} · {years} years at the same counter
        </p>
      </Container>
    </Section>
  );
}

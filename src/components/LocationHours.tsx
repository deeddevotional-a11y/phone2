import { CarFront, Clock, Compass, Landmark, MapPin, Phone } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn, dayNameNow, isOpenNow, nextOpening, telHref, to12h } from "@/lib/utils";
import { Button, Container, Eyebrow, Pill, Section } from "@/components/ui";

export default function LocationHours() {
  const { location, hours, contact } = shopConfig;
  const open = isOpenNow(hours);
  const today = dayNameNow();

  return (
    <Section id="visit" className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* -------- Address + map -------- */}
          <div className="overflow-hidden rounded-3xl border border-mist-200 bg-white">
            <iframe
              title={`Map showing ${shopConfig.shopName}, ${location.address.join(", ")}`}
              src={location.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-80 lg:h-96"
            />
            <div className="p-6 sm:p-7">
              <Eyebrow>Visit us</Eyebrow>
              <address className="mt-3 not-italic">
                <p className="text-lg font-bold leading-snug tracking-tight text-ink-900">
                  {shopConfig.shopName}
                </p>
                {location.address.map((line) => (
                  <p key={line} className="text-sm text-mist-600">
                    {line}
                  </p>
                ))}
              </address>

              <ul className="mt-4 space-y-2 text-sm text-mist-600">
                <li className="flex items-start gap-2.5">
                  <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {location.landmark}
                </li>
                <li className="flex items-start gap-2.5">
                  <CarFront className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {location.parking}
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  as="a"
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-12 flex-1"
                >
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </Button>
                <Button as="a" href={telHref()} variant="outline" className="min-h-12 flex-1">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </div>

          {/* -------- Hours + storefront -------- */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-mist-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900">
                  <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
                  Opening hours
                </h2>
                <Pill tone={open ? "ok" : "neutral"}>
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", open ? "animate-pulse bg-emerald-500" : "bg-mist-400")}
                    aria-hidden="true"
                  />
                  {open ? "Open now" : "Closed now"}
                </Pill>
              </div>
              {!open && <p className="mt-2 text-xs text-mist-500">{nextOpening(hours)}</p>}

              <ul className="mt-4 divide-y divide-mist-200">
                {hours.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <li
                      key={h.day}
                      className={cn(
                        "flex items-center justify-between gap-4 py-2.5 text-sm",
                        isToday && "font-semibold text-ink-900",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && (
                          <span className="spec-label rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">
                            Today
                          </span>
                        )}
                        <span className={isToday ? "text-ink-900" : "text-mist-600"}>{h.day}</span>
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[0.8rem]",
                          h.closed ? "text-mist-400" : isToday ? "text-accent" : "text-ink-700",
                        )}
                      >
                        {h.closed ? "Closed" : `${to12h(h.open)} – ${to12h(h.close)}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs text-mist-500">
                Repairs accepted until 45 minutes before closing. Sunday: sales only, no board-level work.
              </p>
            </div>

            <figure className="overflow-hidden rounded-3xl border border-mist-200 bg-white">
              <img
                src={location.storefrontImage}
                alt={location.storefrontAlt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="flex items-center gap-2 px-6 py-4 text-sm text-mist-600">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                618, 12th Main Road, Indiranagar — look for the blue bolt sign.
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </Section>
  );
}

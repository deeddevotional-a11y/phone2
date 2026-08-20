import { ArrowUpRight } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn } from "@/lib/utils";
import { Container, Reveal, Section, SectionHeading } from "@/components/ui";

/**
 * Shop by Brand — horizontally scrollable strip on mobile, 4-col grid on
 * desktop. Tapping a tile sets the product filter and smooth-scrolls to #shop.
 */
export default function Brands({
  activeBrand,
  onSelectBrand,
}: {
  activeBrand: string | null;
  onSelectBrand: (brandId: string) => void;
}) {
  const { brands, products } = shopConfig;

  return (
    <Section id="brands" className="border-y border-mist-200 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shop by brand"
          title="Eight brands. One authorised counter."
          sub="Tap a brand to jump straight to what we have in stock today."
          action={
            <button
              onClick={() => onSelectBrand("")}
              className="spec-label rounded-lg px-2 py-1 font-semibold text-mist-500 underline decoration-mist-300 underline-offset-4 transition hover:text-ink-900"
            >
              Clear filter
            </button>
          }
        />

        {/* Mobile: swipeable rail with edge fade. Desktop: static grid. */}
        <div className="relative mt-9">
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {brands.map((brand, i) => {
              const count = products.filter((p) => p.brand === brand.id).length;
              const isActive = activeBrand === brand.id;
              return (
                <li key={brand.id} className="w-36 shrink-0 snap-start sm:w-auto">
                  <Reveal delay={i * 40}>
                    <button
                      onClick={() => onSelectBrand(brand.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border p-4 text-left transition-all duration-200",
                        isActive
                          ? "border-accent bg-accent-soft shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_20%,transparent)]"
                          : "border-mist-200 bg-white hover:-translate-y-0.5 hover:border-mist-300 hover:shadow-card",
                      )}
                    >
                      <span className="flex w-full items-start justify-between">
                        <span
                          className={cn(
                            "text-base font-bold tracking-tight transition-colors",
                            isActive ? "text-accent" : "text-ink-900",
                          )}
                        >
                          {brand.mark}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 transition-all",
                            isActive
                              ? "text-accent"
                              : "text-mist-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-700",
                          )}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="flex flex-wrap items-center gap-2">
                        {brand.authorized && (
                          <span className="spec-label rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Authorized
                          </span>
                        )}
                        <span className="spec-label text-mist-500">
                          {count} {count === 1 ? "model" : "models"}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

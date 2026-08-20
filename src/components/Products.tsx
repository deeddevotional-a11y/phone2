import { useMemo, useState } from "react";
import { Bell, Check, MessageCircle, PackageX, SlidersHorizontal, Zap } from "lucide-react";
import { shopConfig, type Product, type ProductTag } from "@/config/shopConfig";
import { cn, inr, waHref, waMessages } from "@/lib/utils";
import { Button, Container, Reveal, Section, SectionHeading, SmartImage } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/Header";

const tagStyles: Record<ProductTag, { label: string; className: string }> = {
  "new-arrival": { label: "New arrival", className: "bg-accent text-white ring-transparent" },
  "best-seller": { label: "Best seller", className: "bg-ink-900 text-white ring-transparent" },
  "on-offer": { label: "On offer", className: "bg-emerald-600 text-white ring-transparent" },
  refurbished: { label: "Certified refurbished", className: "bg-amber-500 text-ink-950 ring-transparent" },
};

const stockStyles = {
  "in-stock": { label: "In stock", tone: "ok" as const, dot: "bg-emerald-500" },
  limited: { label: "Limited stock", tone: "warn" as const, dot: "bg-amber-500" },
  "out-of-stock": { label: "Out of stock", tone: "danger" as const, dot: "bg-rose-500" },
};

export default function Products({
  brandFilter,
  setBrandFilter,
}: {
  brandFilter: string | null;
  setBrandFilter: (id: string | null) => void;
}) {
  const { products, brands, categories, financing } = shopConfig;
  const [category, setCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (brandFilter && p.brand !== brandFilter) return false;
        if (inStockOnly && p.stock === "out-of-stock") return false;
        return true;
      }),
    [products, category, brandFilter, inStockOnly],
  );

  const activeBrandName = brands.find((b) => b.id === brandFilter)?.name;
  const activeCategoryBlurb = categories.find((c) => c.id === category)?.blurb;

  return (
    <Section id="shop" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured products"
          title="In stock this week"
          sub="Prices are inclusive of GST and include a manufacturer warranty card. Stock shown is live from the store counter."
          action={
            financing.enabled ? (
              <span className="spec-label inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 font-semibold text-mist-600 ring-1 ring-inset ring-mist-200">
                <Zap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                EMI from ₹740 / month
              </span>
            ) : undefined
          }
        />

        {/* ---------------- Filters ---------------- */}
        <div className="mt-9 space-y-4">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
              All
              <Count n={products.length} />
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.name}
                <Count n={products.filter((p) => p.category === c.id).length} />
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-y border-mist-200 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-mist-500" aria-hidden="true" />
              <BrandDot active={!brandFilter} onClick={() => setBrandFilter(null)}>
                All brands
              </BrandDot>
              {brands.map((b) => (
                <BrandDot key={b.id} active={brandFilter === b.id} onClick={() => setBrandFilter(b.id)}>
                  {b.name}
                </BrandDot>
              ))}
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-5 w-5 rounded border-mist-300 text-accent accent-[color:var(--accent)]"
              />
              In stock only
            </label>
          </div>

          <p aria-live="polite" className="spec-label text-mist-500">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {activeBrandName ? ` · ${activeBrandName}` : ""}
            {activeCategoryBlurb ? ` · ${activeCategoryBlurb}` : ""}
          </p>
        </div>

        {/* ---------------- Product grid ---------------- */}
        {filtered.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-mist-300 bg-white py-16 text-center">
            <PackageX className="h-8 w-8 text-mist-400" aria-hidden="true" />
            <p className="mt-3 font-semibold text-ink-900">Nothing matches that filter</p>
            <p className="mt-1 text-sm text-mist-600">
              New stock lands every Friday — WhatsApp us and we'll check the back shelf.
            </p>
            <Button
              as="a"
              href={waHref(waMessages.generic())}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-5"
            >
              <WhatsAppGlyph />
              Ask about availability
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <li key={p.id} className="h-full">
                <Reveal delay={(i % 4) * 60} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function ProductCard({ product }: { product: Product }) {
  const brand = shopConfig.brands.find((b) => b.id === product.brand);
  const stock = stockStyles[product.stock];
  const soldOut = product.stock === "out-of-stock";
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-200 bg-white transition-all duration-300",
        soldOut ? "opacity-90" : "hover:-translate-y-1 hover:border-mist-300 hover:shadow-lift",
      )}
    >
      {/* Media — generous negative space, nothing overlaps the device */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-mist-100 to-white">
        <SmartImage
          src={product.image}
          alt={product.alt}
          fallbackLabel={product.name}
          className="absolute inset-0"
          imgClassName={cn(
            "transition-transform duration-500 group-hover:scale-[1.04]",
            soldOut && "opacity-60 grayscale",
          )}
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {product.tag && (
            <span
              className={cn(
                "spec-label inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold shadow-sm ring-1 ring-inset ring-black/5 backdrop-blur",
                tagStyles[product.tag].className,
              )}
            >
              {product.tag === "best-seller" && <Zap className="h-3 w-3" aria-hidden="true" />}
              {tagStyles[product.tag].label}
            </span>
          )}
          {discount > 0 && !soldOut && (
            <span className="spec-label inline-flex items-center rounded-full bg-white px-2.5 py-1 font-semibold text-rose-700 shadow-sm ring-1 ring-inset ring-rose-200">
              −{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-3.5 sm:p-4">
        <div>
          <p className="spec-label text-mist-500">{brand?.name}</p>
          <h3 className="mt-1 text-[0.95rem] font-bold leading-snug tracking-tight text-ink-900 sm:text-base">
            {product.name}
          </h3>
        </div>

        {/* Spec micro-labels */}
        <dl className="space-y-1 border-t border-dashed border-mist-200 pt-2.5">
          {product.specs.slice(0, 3).map((s) => (
            <div key={s.label} className="flex items-baseline gap-2 text-xs">
              <dt className="spec-label w-16 shrink-0 text-mist-400">{s.label}</dt>
              <dd className="truncate font-medium text-ink-700">{s.value}</dd>
            </div>
          ))}
        </dl>

        {product.highlight && (
          <p className="text-xs font-medium text-emerald-700">{product.highlight}</p>
        )}

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex items-end justify-between gap-2">
            <p className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-ink-900">{inr(product.price)}</span>
              {product.compareAt && (
                <span className="text-xs text-mist-400 line-through">{inr(product.compareAt)}</span>
              )}
            </p>
            <span className={cn("flex items-center gap-1.5", soldOut ? "text-rose-600" : "text-mist-600")}>
              <span className={cn("h-1.5 w-1.5 rounded-full", stock.dot)} aria-hidden="true" />
              <span className="spec-label">{stock.label}</span>
            </span>
          </div>

          {product.emiFrom && product.stock !== "out-of-stock" && (
            <p className="spec-label text-mist-500">
              EMI from {inr(product.emiFrom)}/mo
            </p>
          )}

          {/* CTA — state changes with stock */}
          {soldOut ? (
            <Button
              as="a"
              href={waHref(waMessages.notify(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="w-full"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              Notify Me
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                as="a"
                href={waHref(waMessages.product(product.name, product.price))}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full"
              >
                <WhatsAppGlyph />
                WhatsApp to Buy
              </Button>
              <Button
                as="a"
                href={waHref(waMessages.product(product.name, product.price))}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="hidden w-full sm:inline-flex"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enquire
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all",
        active
          ? "border-transparent bg-ink-900 text-white shadow-md"
          : "border-mist-200 bg-white text-ink-700 hover:border-mist-300 hover:bg-mist-100",
      )}
    >
      {children}
    </button>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span
      className={cn(
        "spec-label rounded-full px-1.5 py-0.5",
        "bg-mist-100 text-mist-600 group-aria-pressed:bg-white/15 group-aria-pressed:text-white",
      )}
    >
      {n}
    </span>
  );
}

function BrandDot({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors",
        active ? "text-accent" : "text-mist-600 hover:text-ink-900",
      )}
    >
      <span
        className={cn(
          "grid h-4 w-4 place-items-center rounded-full border transition-colors",
          active ? "border-accent bg-accent text-white" : "border-mist-300",
        )}
        aria-hidden="true"
      >
        {active && <Check className="h-3 w-3" />}
      </span>
      {children}
    </button>
  );
}

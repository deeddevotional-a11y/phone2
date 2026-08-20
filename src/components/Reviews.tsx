import { Quote, Star } from "lucide-react";
import { shopConfig, type Testimonial } from "@/config/shopConfig";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Reveal, Section } from "@/components/ui";

export default function Reviews() {
  const { reviews } = shopConfig;
  return (
    <Section id="reviews" className="border-y border-mist-200 bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Customer reviews</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {reviews.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-mist-600">{reviews.sub}</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-mist-50 px-5 py-4">
            <span className="text-4xl font-extrabold tracking-tight text-ink-900">{reviews.overall.score}</span>
            <span>
              <Stars rating={5} />
              <span className="mt-1 block text-xs text-mist-600">{reviews.overall.count}</span>
            </span>
          </div>
        </div>

        {/* Mobile: swipeable rail · Desktop: 3-col grid */}
        <ul className="no-scrollbar -mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {reviews.items.map((t, i) => (
            <li key={t.name} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={(i % 3) * 60} className="h-full">
                <ReviewCard t={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  const initial = t.name.charAt(0);
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-mist-200 bg-white p-5 sm:p-6">
      <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-800">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-mist-200 pt-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-900 text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-ink-900">{t.name}</span>
          <span className="block text-xs text-mist-500">
            {t.platform}
            {t.context ? ` · ${t.context}` : ""}
          </span>
        </span>
        <Stars rating={t.rating} />
      </figcaption>
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            n <= rating ? "fill-amber-400 text-amber-400" : "fill-mist-200 text-mist-200",
          )}
        />
      ))}
    </span>
  );
}

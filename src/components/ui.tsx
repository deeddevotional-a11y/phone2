import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------- */
/*  Section wrapper — consistent vertical rhythm + optional eyebrow/heading    */
/* -------------------------------------------------------------------------- */
export function Section({
  id,
  children,
  className,
  dark = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        dark ? "on-dark bg-ink-900 text-white" : "bg-mist-50 text-ink-900",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "spec-label inline-flex items-center gap-2 font-semibold",
        dark ? "text-[color:var(--accent-light)]" : "text-accent",
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            "mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>
        {sub && (
          <p className={cn("mt-3 text-base leading-relaxed", dark ? "text-mist-300" : "text-mist-600")}>{sub}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Buttons — 44px min tap target, visible focus, accent driven                */
/* -------------------------------------------------------------------------- */
type BtnVariant = "primary" | "outline" | "ghost" | "whatsapp" | "light";

const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55 active:scale-[0.985]";

const variants: Record<BtnVariant, string> = {
  primary: "bg-accent text-white shadow-lg shadow-blue-900/20 hover:bg-accent-strong hover:shadow-xl",
  light: "bg-white text-ink-900 hover:bg-mist-100",
  outline: "border border-mist-300 bg-white text-ink-900 hover:border-ink-600 hover:bg-mist-100",
  ghost: "border border-white/25 text-white hover:border-white/60 hover:bg-white/10",
  whatsapp: "bg-[#1fa855] text-white hover:bg-[#188a46]",
};

export function Button({
  as = "button",
  variant = "primary",
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  variant?: BtnVariant;
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<"button"> & React.ComponentPropsWithoutRef<"a">) {
  const Comp = as as ElementType;
  return (
    <Comp className={cn(btnBase, variants[variant], className)} {...rest}>
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pills / badges for stock, tags, spec chips                                 */
/* -------------------------------------------------------------------------- */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "danger" | "accent" | "dark";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-mist-100 text-ink-700 ring-mist-200",
    ok: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    warn: "bg-amber-50 text-amber-900 ring-amber-200",
    danger: "bg-rose-50 text-rose-800 ring-rose-200",
    accent: "bg-accent-soft text-accent ring-[color:var(--accent)]/25",
    dark: "bg-white/10 text-white ring-white/20",
  };
  return (
    <span
      className={cn(
        "spec-label inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  SmartImage — lazy, aspect-locked, graceful fallback if a photo 404s        */
/* -------------------------------------------------------------------------- */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-mist-100", className)}>
      {failed ? (
        <div className="absolute inset-0 grid-lines-light flex items-center justify-center bg-gradient-to-br from-mist-100 to-mist-200 p-4 text-center">
          <span className="spec-label text-mist-500">{fallbackLabel ?? "Product image"}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reveal — lightweight scroll-in animation (respects reduced motion)         */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { shopConfig } from "@/config/shopConfig";

/**
 * Logo lockup — driven by shopConfig.shortName / shopName.
 * To use a real logo file instead, replace <LogoMark/> with:
 *   <img src="/logo.svg" alt="" className="h-9 w-auto" />
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  const sub = shopConfig.shopName.replace(shopConfig.shortName, "").replace(/^[\s&]+/, "").toUpperCase();
  return (
    <span className={`flex items-center gap-2.5 ${dark ? "text-white" : "text-ink-900"}`}>
      <LogoMark />
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-tight">{shopConfig.shortName}</span>
        {sub && (
          <span
            className={`spec-label block text-[0.6rem] font-semibold ${
              dark ? "text-mist-400" : "text-mist-500"
            }`}
          >
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}

/** Abstract "charging bolt in a rounded device frame" mark, accent-coloured. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-accent text-white shadow-md shadow-blue-900/25 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.6 2 5 13.2h5.2L9.4 22 19 10.4h-5.7L13.6 2Z" />
      </svg>
    </span>
  );
}

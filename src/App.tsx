import { useState, type CSSProperties } from "react";
import { shopConfig } from "@/config/shopConfig";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Products from "@/components/Products";
import Repairs from "@/components/Repairs";
import { FinancingStrip, TradeIn } from "@/components/TradeIn";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import RepairModal from "@/components/RepairModal";

/**
 * VOLT Mobile — mobile-phone shop template.
 *
 * Every piece of content comes from `src/config/shopConfig.ts`.
 * This file only wires state: brand filtering, the repair-booking dialog,
 * and the accent colour injected as CSS custom properties from config.theme.
 */
export default function App() {
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [booking, setBooking] = useState<{ open: boolean; service?: string }>({ open: false });

  const openBooking = (service?: string) => setBooking({ open: true, service });
  const closeBooking = () => setBooking((b) => ({ ...b, open: false }));

  /** Brand tiles filter the catalogue AND scroll the shop into view. */
  const selectBrand = (brandId: string) => {
    setBrandFilter(brandId || null);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Accent palette injected from config — one object re-skins the whole site.
  const themeVars = {
    "--accent": shopConfig.theme.accent,
    "--accent-ink": shopConfig.theme.accentInk,
    "--accent-light": shopConfig.theme.accentLight,
    "--focus-ring": shopConfig.theme.accentInk,
  } as CSSProperties;

  return (
    <div style={themeVars} className="min-h-screen bg-mist-50">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-900 focus:shadow-xl"
      >
        Skip to products
      </a>

      <Header onBookRepair={() => openBooking()} />

      <main id="main">
        <Hero onBookRepair={openBooking} />
        <Brands activeBrand={brandFilter} onSelectBrand={selectBrand} />
        <Products brandFilter={brandFilter} setBrandFilter={setBrandFilter} />
        <Repairs onBookRepair={openBooking} />
        <TradeIn />
        <FinancingStrip />
        <WhyChooseUs />
        <Reviews />
        <LocationHours />
      </main>

      <Footer onBookRepair={() => openBooking()} />

      {/* Mobile conversion bar — hidden on desktop */}
      <StickyBar onBookRepair={() => openBooking()} />

      <RepairModal open={booking.open} onClose={closeBooking} service={booking.service} />
    </div>
  );
}

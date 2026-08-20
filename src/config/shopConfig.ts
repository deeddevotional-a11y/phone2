/* ============================================================================
 *  shopConfig.ts — THE ONLY FILE YOU EDIT TO RE-BRAND THIS SITE
 *  ==========================================================================
 *  Every section of the page reads from this object. Swap the values below for
 *  a different shop (new name, brand mix, inventory, repair menu, address,
 *  hours, palette) and the whole template re-skins itself — no component edits.
 * ==========================================================================*/

/** Helper: builds a sized remote photo URL. Replace with your own CDN. */
const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export type StockStatus = "in-stock" | "limited" | "out-of-stock";
export type ProductTag = "new-arrival" | "best-seller" | "on-offer" | "refurbished";
export type CategoryId = "new-phones" | "refurbished" | "accessories" | "wearables";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string; // must match a Brand.id
  category: CategoryId; // must match a Category.id
  price: number;
  compareAt?: number; // strikethrough MRP
  emiFrom?: number; // monthly EMI starting price
  image: string;
  alt: string;
  specs: Spec[]; // first 3 render on the card
  tag?: ProductTag;
  stock: StockStatus;
  highlight?: string; // e.g. "Exchange bonus ₹6,000"
}

export interface Brand {
  id: string;
  name: string;
  /** Short wordmark shown in the logo grid (2–12 chars reads best). */
  mark: string;
  /** Optional logo image URL — if omitted a styled wordmark tile is rendered. */
  logoUrl?: string;
  authorized?: boolean; // renders an "Authorized" pill
}

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  icon: "phone" | "recycle" | "plug" | "watch";
}

export interface RepairService {
  id: string;
  name: string;
  description: string;
  turnaround: string; // "45 min" | "Same day" | "24–48 hrs"
  priceFrom: number;
  warranty: string; // "6-month parts warranty"
  icon: "screen" | "battery" | "droplet" | "plug" | "camera" | "cpu";
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  quote: string;
  rating: number; // 1–5
  platform: string;
  context?: string; // "Screen replacement" / "Bought iPhone 15"
}

export interface DayHours {
  day: string;
  open?: string; // "10:30" 24h
  close?: string; // "21:00" 24h
  closed?: boolean;
}

export interface Badge {
  icon: "shield" | "wrench" | "award" | "box" | "clock" | "users";
  title: string;
  text: string;
}

export interface ShopConfig {
  shopName: string;
  shortName: string; // used in the logo lockup
  tagline: string;
  established: number;
  about: string;
  aboutPoints: string[];
  theme: {
    accent: string; // primary brand colour (buttons, links)
    accentInk: string; // darker accent for text-on-white (contrast safe)
    accentLight: string; // gradient partner / glow
  };
  nav: { id: string; label: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    image: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  brands: Brand[];
  categories: Category[];
  products: Product[];
  repairs: {
    headline: string;
    sub: string;
    image: string;
    imageAlt: string;
    services: RepairService[];
    note: string;
  };
  tradeIn: {
    enabled: boolean;
    headline: string;
    sub: string;
    bonus: string;
    steps: { title: string; text: string }[];
  };
  trust: {
    headline: string;
    sub: string;
    badges: Badge[];
    stats: { value: string; label: string }[];
  };
  reviews: {
    headline: string;
    sub: string;
    overall: { score: string; count: string };
    items: Testimonial[];
  };
  location: {
    address: string[];
    landmark: string;
    parking: string;
    mapEmbedUrl: string;
    directionsUrl: string;
    storefrontImage: string;
    storefrontAlt: string;
  };
  hours: DayHours[];
  contact: {
    phoneDisplay: string;
    phoneRaw: string; // digits only, E.164 — used for tel: and wa.me
    whatsapp: string;
    email: string;
    instagram: string;
    instagramUrl: string;
    facebook?: string;
    facebookUrl?: string;
  };
  financing: {
    enabled: boolean;
    headline: string;
    options: { title: string; text: string }[];
  };
  footerNote: string;
}

export const shopConfig: ShopConfig = {
  /* ---------- 1. IDENTITY ------------------------------------------------ */
  shopName: "VOLT Mobile & Care",
  shortName: "VOLT",
  tagline: "Authorized phones, genuine parts, honest repairs — since 2010.",
  established: 2010,

  /* ---------- 2. THEME (single accent colour drives the whole UI) -------- */
  theme: {
    accent: "#1557e0", // electric blue
    accentInk: "#0f47bd",
    accentLight: "#5b93ff",
  },

  about:
    "VOLT Mobile & Care started as a 200 sq ft service counter in Indiranagar in 2010. Fifteen years later we are an authorized reseller for Apple, Samsung and Xiaomi, with a 6-seat service lab staffed by brand-certified technicians. Every handset we sell carries a full manufacturer warranty, and every repair uses genuine or OEM-grade parts backed by our own written guarantee. No grey-market imports, no surprise pricing — a printed estimate before we touch your device.",
  aboutPoints: [
    "Authorized Apple, Samsung & Xiaomi reseller",
    "Brand-certified technicians, ESD-safe service lab",
    "Printed estimate before any work begins",
    "15 years at the same Indiranagar address",
  ],

  /* ---------- 3. NAVIGATION --------------------------------------------- */
  nav: [
    { id: "shop", label: "Shop" },
    { id: "brands", label: "Brands" },
    { id: "repairs", label: "Repairs" },
    { id: "about", label: "About" },
    { id: "visit", label: "Location" },
  ],

  /* ---------- 4. HERO ---------------------------------------------------- */
  hero: {
    eyebrow: "Indiranagar · Bengaluru",
    headline: "New phones.",
    headlineAccent: "Expert repairs.",
    sub: "Walk in for the latest from Apple, Samsung, Xiaomi, OnePlus and Nothing — or drop off a cracked screen and get it back the same afternoon.",
    image: img(12882909, 900, 1100),
    imageAlt:
      "Latest-generation smartphone shown at an angle against a clean neutral studio background",
    stats: [
      { value: "15", label: "Years in business" },
      { value: "62,400+", label: "Devices repaired" },
      { value: "4.8★", label: "Google rating" },
    ],
  },

  /* ---------- 5. BRANDS -------------------------------------------------- */
  brands: [
    { id: "apple", name: "Apple", mark: "Apple", authorized: true },
    { id: "samsung", name: "Samsung", mark: "SAMSUNG", authorized: true },
    { id: "xiaomi", name: "Xiaomi", mark: "Xiaomi", authorized: true },
    { id: "oneplus", name: "OnePlus", mark: "OnePlus" },
    { id: "nothing", name: "Nothing", mark: "Nothing" },
    { id: "realme", name: "realme", mark: "realme" },
    { id: "vivo", name: "Vivo", mark: "vivo" },
    { id: "motorola", name: "Motorola", mark: "motorola" },
  ],

  /* ---------- 6. CATEGORIES --------------------------------------------- */
  categories: [
    { id: "new-phones", name: "New Phones", blurb: "Sealed box, full brand warranty", icon: "phone" },
    { id: "refurbished", name: "Refurbished", blurb: "Certified, 12-month store warranty", icon: "recycle" },
    { id: "accessories", name: "Accessories", blurb: "Cases, chargers, audio, power", icon: "plug" },
    { id: "wearables", name: "Wearables", blurb: "Smartwatches, bands, TWS", icon: "watch" },
  ],

  /* ---------- 7. FEATURED PRODUCTS -------------------------------------- */
  products: [
    {
      id: "ip15pm",
      name: "iPhone 15 Pro Max 256GB",
      brand: "apple",
      category: "new-phones",
      price: 134900,
      compareAt: 149900,
      emiFrom: 5640,
      image: img(7742500, 700, 880),
      alt: "iPhone 15 Pro Max in natural titanium, rear camera detail",
      specs: [
        { label: "Display", value: "6.7″ Super Retina XDR" },
        { label: "Chip", value: "A17 Pro" },
        { label: "Camera", value: "48MP + 12MP + 12MP" },
      ],
      tag: "best-seller",
      stock: "in-stock",
      highlight: "Natural Titanium · Blue · White in stock today",
    },
    {
      id: "s24u",
      name: "Galaxy S24 Ultra 512GB",
      brand: "samsung",
      category: "new-phones",
      price: 139999,
      emiFrom: 5850,
      image: img(12876448, 700, 880),
      alt: "Samsung Galaxy S24 Ultra shown from the side on a light background",
      specs: [
        { label: "Display", value: "6.8″ QHD+ 120Hz" },
        { label: "Chip", value: "Snapdragon 8 Gen 3" },
        { label: "Camera", value: "200MP quad + 10× zoom" },
      ],
      tag: "new-arrival",
      stock: "limited",
      highlight: "Titanium Violet — 2 units left",
    },
    {
      id: "x14",
      name: "Xiaomi 14 512GB",
      brand: "xiaomi",
      category: "new-phones",
      price: 69999,
      compareAt: 79999,
      emiFrom: 3200,
      image: img(6373086, 700, 880),
      alt: "Xiaomi 14 flagship smartphone photographed on a soft pastel backdrop",
      specs: [
        { label: "Display", value: "6.36″ 1.5K LTPO" },
        { label: "Chip", value: "Snapdragon 8 Gen 3" },
        { label: "Camera", value: "Leica 50MP triple" },
      ],
      tag: "on-offer",
      stock: "in-stock",
      highlight: "₹10,000 instant bank discount",
    },
    {
      id: "op12",
      name: "OnePlus 12 256GB",
      brand: "oneplus",
      category: "new-phones",
      price: 64999,
      emiFrom: 2999,
      image: img(12935121, 700, 880),
      alt: "OnePlus 12 in black finish shown against a textured stone surface",
      specs: [
        { label: "Display", value: "6.82″ 2K 120Hz" },
        { label: "Charging", value: "100W SUPERVOOC" },
        { label: "Camera", value: "50MP Sony LYT-808" },
      ],
      stock: "in-stock",
    },
    {
      id: "nt2a",
      name: "Nothing Phone (2a) 128GB",
      brand: "nothing",
      category: "new-phones",
      price: 23999,
      compareAt: 25999,
      emiFrom: 1199,
      image: img(12794497, 700, 880),
      alt: "Nothing Phone 2a displaying its signature glyph lighting on the back",
      specs: [
        { label: "Display", value: "6.7″ AMOLED 120Hz" },
        { label: "Chip", value: "Dimensity 7200 Pro" },
        { label: "Battery", value: "5000mAh · 45W" },
      ],
      tag: "new-arrival",
      stock: "in-stock",
    },
    {
      id: "ip13-ref",
      name: "iPhone 13 128GB (Certified Refurbished)",
      brand: "apple",
      category: "refurbished",
      price: 39900,
      compareAt: 59900,
      emiFrom: 1890,
      image: img(9558782, 700, 880),
      alt: "Certified refurbished iPhone 13 held in hand, front view",
      specs: [
        { label: "Battery health", value: "≥ 88%" },
        { label: "Grade", value: "A · no visible marks" },
        { label: "Warranty", value: "12 months (store)" },
      ],
      tag: "refurbished",
      stock: "limited",
      highlight: "Includes new battery + 20W adapter",
    },
    {
      id: "a55",
      name: "Galaxy A55 5G 256GB",
      brand: "samsung",
      category: "new-phones",
      price: 39999,
      emiFrom: 1850,
      image: img(6373126, 700, 880),
      alt: "Samsung Galaxy A55 5G standing on a white surface, front and back view",
      specs: [
        { label: "Display", value: "6.6″ sAMOLED 120Hz" },
        { label: "Camera", value: "50MP OIS" },
        { label: "Updates", value: "4 OS upgrades" },
      ],
      stock: "out-of-stock",
      highlight: "Next restock: Friday evening",
    },
    {
      id: "aw-s9",
      name: "Apple Watch Series 9 GPS 41mm",
      brand: "apple",
      category: "wearables",
      price: 41900,
      compareAt: 45900,
      emiFrom: 1990,
      image: img(12564670, 700, 880),
      alt: "Apple Watch Series 9 on a clean white surface showing its digital display",
      specs: [
        { label: "Display", value: "Always-On Retina" },
        { label: "Chip", value: "S9 SiP" },
        { label: "Health", value: "ECG + Blood Oxygen" },
      ],
      tag: "on-offer",
      stock: "in-stock",
    },
    {
      id: "xm5",
      name: "Sony WF-1000XM5 Earbuds",
      brand: "samsung",
      category: "accessories",
      price: 24990,
      compareAt: 29990,
      emiFrom: 1190,
      image: img(3568521, 700, 880),
      alt: "Premium noise-cancelling true wireless earbuds with charging case",
      specs: [
        { label: "ANC", value: "Dual processor" },
        { label: "Battery", value: "8h + 16h case" },
        { label: "Audio", value: "LDAC · Hi-Res" },
      ],
      tag: "best-seller",
      stock: "in-stock",
    },
    {
      id: "magsafe-kit",
      name: "MagSafe Travel Kit (35W + Power Bank)",
      brand: "apple",
      category: "accessories",
      price: 8900,
      emiFrom: 740,
      image: img(2657667, 700, 880),
      alt: "Flat lay of mobile accessories including a magnetic power bank and charging adapter",
      specs: [
        { label: "Output", value: "35W USB-C" },
        { label: "Power bank", value: "10,000mAh · 15W" },
        { label: "In box", value: "2× cable, travel pouch" },
      ],
      stock: "limited",
    },
  ],

  /* ---------- 8. REPAIRS ------------------------------------------------- */
  repairs: {
    headline: "Repairs, same day — most in under an hour",
    sub: "Walk in without an appointment. Diagnostics are free, and we only start work after you approve a written estimate.",
    image: img(6755056, 1100, 800),
    imageAlt: "Technician repairing a smartphone logic board under a microscope in the service lab",
    note: "Free pickup & drop anywhere inside Bengaluru on repairs above ₹2,500.",
    services: [
      {
        id: "screen",
        name: "Screen Replacement",
        description:
          "Cracked, bleeding or unresponsive displays replaced with OEM-grade panels, colour-calibrated and pressure-tested before handover.",
        turnaround: "45–60 min",
        priceFrom: 2499,
        warranty: "6-month display warranty",
        icon: "screen",
        popular: true,
      },
      {
        id: "battery",
        name: "Battery Replacement",
        description:
          "Genuine cells with a full health report before and after. Fixes swelling, fast drain and unexpected shutdowns.",
        turnaround: "30–45 min",
        priceFrom: 1299,
        warranty: "6-month battery warranty",
        icon: "battery",
        popular: true,
      },
      {
        id: "water",
        name: "Water Damage Treatment",
        description:
          "Ultrasonic board cleaning, corrosion treatment and component-level repair. Free diagnosis; you pay only if we succeed.",
        turnaround: "24–48 hrs",
        priceFrom: 999,
        warranty: "30-day service warranty",
        icon: "droplet",
      },
      {
        id: "port",
        name: "Charging Port Repair",
        description: "Loose, bent or burnt USB-C and Lightning ports re-soldered or swapped at board level.",
        turnaround: "60 min",
        priceFrom: 899,
        warranty: "3-month parts warranty",
        icon: "plug",
      },
      {
        id: "camera",
        name: "Camera & Back Glass",
        description: "Blurry lenses, dead focus motors and shattered back panels replaced with factory-fit parts.",
        turnaround: "90 min",
        priceFrom: 1499,
        warranty: "3-month parts warranty",
        icon: "camera",
      },
      {
        id: "board",
        name: "Motherboard & Software",
        description:
          "Dead phones, boot loops, network faults and data recovery handled by our micro-soldering specialist. Data stays on the device wherever possible.",
        turnaround: "Same day – 72 hrs",
        priceFrom: 499,
        warranty: "30-day service warranty",
        icon: "cpu",
      },
    ],
  },

  /* ---------- 9. TRADE-IN ------------------------------------------------ */
  tradeIn: {
    enabled: true,
    headline: "Trade in your old phone, pay less today",
    sub: "Bring any working handset — we evaluate it in front of you in about five minutes and adjust the value against your new purchase the same minute.",
    bonus: "₹3,000 exchange bonus on flagship trade-ins this month",
    steps: [
      { title: "Get a quote", text: "WhatsApp us the model, storage and 3 photos — we reply with a firm price in 15 minutes." },
      { title: "Device check in store", text: "25-point inspection: display, battery cycle count, body, IMEI and account lock status." },
      { title: "Instant adjustment", text: "Value is deducted from the bill on the spot. Same value if you'd rather take cash." },
    ],
  },

  /* ---------- 10. WHY CHOOSE US ------------------------------------------ */
  trust: {
    headline: "Why people drive across town for us",
    sub: "Anyone can sell a sealed box. What matters is what happens when something goes wrong six months later.",
    badges: [
      { icon: "shield", title: "Authorized dealer", text: "Direct channel partner for Apple, Samsung and Xiaomi — every handset is India-warranty stock with a valid GST invoice." },
      { icon: "box", title: "Genuine parts only", text: "OEM or OEM-grade components, batch traceable. We show you the sealed part before it goes in." },
      { icon: "award", title: "6-month repair warranty", text: "Written warranty on parts and labour. If the same fault returns, the re-work is free." },
      { icon: "wrench", title: "Certified technicians", text: "Brand-trained staff, ESD-safe benches, microscope-level board work done in-house, not outsourced." },
    ],
    stats: [
      { value: "15 yrs", label: "Same location since 2010" },
      { value: "62,400+", label: "Devices repaired" },
      { value: "31,000+", label: "Customers served" },
      { value: "4.8 / 5", label: "2,140 verified reviews" },
    ],
  },

  /* ---------- 11. REVIEWS ------------------------------------------------ */
  reviews: {
    headline: "2,140 reviews. 4.8 stars.",
    sub: "Collected from Google, Justdial and Instagram — we publish them unedited, including the awkward ones.",
    overall: { score: "4.8", count: "2,140 verified reviews" },
    items: [
      {
        name: "Ananya Rao",
        quote:
          "Dropped my S23 Ultra face-down on granite and panicked. Dropped it at VOLT at 11am, picked it up at 12:15 with a new display — they even transferred the old screen protector. Bill and warranty both in writing.",
        rating: 5,
        platform: "Google",
        context: "Screen replacement",
      },
      {
        name: "Imran Qureshi",
        quote:
          "Bought an iPhone 15 Pro Max here after two other shops quoted a 'cash discount' with no GST bill. Same price, proper invoice, and they activated the Apple warranty in front of me.",
        rating: 5,
        platform: "Justdial",
        context: "New phone purchase",
      },
      {
        name: "Divya Menon",
        quote:
          "My Pixel's charging port was dead and a service centre wanted to replace the whole board. VOLT re-soldered it for a fraction of the cost and it's been seven months without a hiccup.",
        rating: 5,
        platform: "Google",
        context: "Charging port repair",
      },
      {
        name: "Sanjay Bhosale",
        quote:
          "Traded in a 3-year-old OnePlus for the Nothing Phone 2a. They showed me the inspection checklist, explained why the value was what it was, and matched the online quote.",
        rating: 4,
        platform: "Instagram",
        context: "Exchange",
      },
      {
        name: "Lakshmi Narayan",
        quote:
          "Phone went into the washing machine. They didn't charge me for the failed first attempt, called me twice with updates, and recovered all my photos. Rare honesty.",
        rating: 5,
        platform: "Google",
        context: "Water damage recovery",
      },
      {
        name: "Farah Sheikh",
        quote: "Third purchase from this store in five years. No upselling, no pressure, and they remembered my name. That's the whole review.",
        rating: 5,
        platform: "Justdial",
        context: "Repeat customer",
      },
    ],
  },

  /* ---------- 12. LOCATION + HOURS --------------------------------------- */
  location: {
    address: ["618, 12th Main Road, HAL 2nd Stage", "Indiranagar, Bengaluru 560038", "Karnataka, India"],
    landmark: "Opposite Sree Raghavendra bakery, above HDFC Bank ATM",
    parking: "Free 2-wheiler parking at the storefront; 4-wheeler at the BMTC lot, 60 m away.",
    // OpenStreetMap embed — no API key required. Swap for a Google Maps embed if you prefer.
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.6320%2C12.9660%2C77.6460%2C12.9760&layer=mapnik&marker=12.9710%2C77.6390",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=12.9710,77.6390",
    storefrontImage: img(11297769, 900, 620),
    storefrontAlt: "Interior of the VOLT Mobile showroom with phones and accessories on display shelves",
  },
  hours: [
    { day: "Monday", open: "10:30", close: "21:00" },
    { day: "Tuesday", open: "10:30", close: "21:00" },
    { day: "Wednesday", open: "10:30", close: "21:00" },
    { day: "Thursday", open: "10:30", close: "21:00" },
    { day: "Friday", open: "10:30", close: "21:00" },
    { day: "Saturday", open: "10:00", close: "21:30" },
    { day: "Sunday", open: "11:00", close: "20:00" },
  ],

  /* ---------- 13. CONTACT ------------------------------------------------ */
  contact: {
    phoneDisplay: "+91 80412 90090",
    phoneRaw: "918041290090",
    whatsapp: "918041290090",
    email: "hello@voltmobile.in",
    instagram: "@voltmobile.blr",
    instagramUrl: "https://instagram.com/",
    facebook: "VOLT Mobile & Care",
    facebookUrl: "https://facebook.com/",
  },

  /* ---------- 14. FINANCING ---------------------------------------------- */
  financing: {
    enabled: true,
    headline: "Easy EMIs & instant credit",
    options: [
      { title: "No-cost EMI", text: "3 / 6 / 9 months on HDFC, ICICI, Axis and SBI cards. Zero processing fee in store." },
      { title: "Consumer durable loan", text: "Bajaj Finserv & TVS Credit — approval in 8 minutes with Aadhaar + PAN." },
      { title: "Exchange + EMI", text: "Use your old phone as the down payment and finance only the balance." },
      { title: "GST invoice for business", text: "Company purchase orders accepted, GST input credit on every handset." },
    ],
  },

  footerNote:
    "Authorized reseller. All brand names and logos are trademarks of their respective owners and are used for identification of products carried in store.",
};

export default shopConfig;

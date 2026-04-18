// ─── SHARED CONSTANTS ───

export const BARCODE_FIELD = { name: "barcode", label: "Barcode", type: "text" };

// ─── PIXELBIN PATTERNS API ───
export const PIXELBIN_SIGNING_KEY = "";  // paste your PixelBin API signing key here

export async function generateEbgHeaders(path) {
  const now = new Date();
  const ts = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const param = btoa(ts);
  if (!PIXELBIN_SIGNING_KEY) return { "x-ebg-param": param };
  const message = `GET\n${path}\n${ts}`;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(PIXELBIN_SIGNING_KEY),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return { "x-ebg-param": param, "x-ebg-signature": `v1:${hex}` };
}

export async function fetchPatterns(subcategory) {
  const sub = subcategory.toLowerCase().replace(/\s+/g, "");
  const path = `/service/panel/misc/v2.0/patterns/category/makeup/subcategory/${sub}`;
  try {
    const ebgHeaders = await generateEbgHeaders(path);
    const res = await fetch(`https://api.pixelbin.io${path}`, {
      headers: { "accept": "application/json", ...ebgHeaders },
      credentials: "include",
    });
    const data = await res.json();
    if (data.items) return data.items;
  } catch (_) {}
  return null;
}

// ─── SDK CONFIG MAPPINGS ───
export const DEFAULT_SDK_MAPPINGS = {
  Eyewear: ["Glasses", "Sunglasses", "Spectacles"],
  Watches: ["Watch", "Smartwatch", "Timepiece"],
  Shoes: ["Shoes", "Footwear", "Sneakers"],
  Hats: ["Hats", "Headwear"],
  Caps: ["Caps", "Baseball Cap"],
  Earring: ["Earrings", "Ear Accessories"],
  Necklace: ["Necklace", "Chain", "Pendant"],
  Bracelets: ["Bracelet", "Bangle"],
  Rings: ["Ring", "Band"],
  Lipstick: ["Lip Color", "Lipstick", "Lip Shade"],
  Eyeshadow: ["Eye Shadow", "Eye Palette"],
  Foundation: ["Foundation", "Base Makeup"],
};

export const DIMENSION_UNITS = ["mm", "cm", "m", "in", "ft"];

// ─── BEAUTY DATA ───
export const BEAUTY_CATEGORIES = {
  Makeup: {
    subcategories: ["Lipstick", "Lipliner", "Eyeliner", "Mascara", "Eyelashes", "Eyebrows", "Eyeshadow", "Highlighter", "Foundation", "Blush", "Bronzer"],
    additionalFields: [BARCODE_FIELD],
    ar: { Lipstick: true, Lipliner: true, Eyeliner: true, Mascara: true, Eyelashes: true, Eyebrows: true, Eyeshadow: true, Highlighter: true, Foundation: true, Blush: true, Bronzer: true },
  },
  Hair: {
    subcategories: ["Hair Wigs", "Hair Color"],
    additionalFields: [BARCODE_FIELD],
    ar: { "Hair Wigs": false, "Hair Color": false },
  },
  Nails: {
    subcategories: ["Nail Polish", "Nail Art"],
    additionalFields: [BARCODE_FIELD],
    ar: { "Nail Polish": true, "Nail Art": false },
  },
};

export const AR_SETTINGS_CONFIG = {
  lipstick: { colorOnlyMode: true, finishTypes: ["Matte", "Gloss", "Shimmer"], hasColor: true },
  eyebrows: { colorAndPatternMode: true, finishTypes: ["Matte"], hasColor: true, patternTypes: ["Natural", "Wing"], patternThumbs: { Natural: "/pattern-eyeliner-natural.png", Wing: "/pattern-eyeliner-wing.png" }, patternLabel: "Eyebrow" },
  mascara: { colorAndPatternMode: true, finishTypes: ["Matte"], hasColor: true, patternTypes: ["Natural", "Dramatic"], patternThumbs: { Natural: "/pattern-mascara.png", Dramatic: "/pattern-mascara.png" }, patternLabel: "Mascara" },
  bronzer: { colorAndPatternMode: true, finishTypes: ["Matte", "Shimmer"], hasColor: true, patternTypes: ["Natural", "Contour", "Sun-Kissed"], patternThumbs: { Natural: "/pattern-matte.png", Contour: "/pattern-matte.png", "Sun-Kissed": "/pattern-matte.png" }, patternLabel: "Bronzer" },
  eyeliner: { colorAndPatternMode: true, finishTypes: ["Matte"], hasColor: true, patternTypes: ["Natural", "Wing"], patternThumbs: { Natural: "/pattern-eyeliner-natural.png", Wing: "/pattern-eyeliner-wing.png" }, patternLabel: "Eyeliner" },
  eyelashes: { colorAndPatternMode: true, finishTypes: ["Matte"], hasColor: true, patternTypes: ["Natural", "Dramatic"], patternThumbs: { Natural: "/pattern-eyeliner-natural.png", Dramatic: "/pattern-eyeliner-wing.png" }, patternLabel: "Eyelashes" },
  blush: { colorAndPatternMode: true, finishTypes: ["Matte", "Shimmer"], hasColor: true, patternTypes: ["Oval", "Round", "Draping"], patternThumbs: { Oval: "/pattern-matte.png", Round: "/pattern-matte.png", Draping: "/pattern-matte.png" }, patternLabel: "Blush" },
  eyeshadow: { eyeshadowMode: true, finishTypes: ["Shimmer"], hasColor: true, patternTypes: ["Natural", "Smoky", "Cut Crease", "Halo", "Sunset"], patternThumbs: { Natural: "/pattern-shimmer.png", Smoky: "/pattern-shimmer.png", "Cut Crease": "/pattern-shimmer.png", Halo: "/pattern-shimmer.png", Sunset: "/pattern-shimmer.png" }, patternLabel: "Eyeshadow" },
  lipliner: { colorAndPatternMode: true, finishTypes: ["Matte"], hasColor: true, patternTypes: ["Natural", "Overdraw", "Ombre"], patternThumbs: { Natural: "/pattern-eyeliner-natural.png", Overdraw: "/pattern-eyeliner-natural.png", Ombre: "/pattern-eyeliner-natural.png" }, patternLabel: "Lipliner", patternSliders: ["Thickness", "Smoothness"] },
  highlighter: { colorAndPatternMode: true, finishTypes: ["Matte", "Shimmer"], hasColor: true, patternTypes: ["Heartface", "Cheekbone", "Nose"], patternThumbs: { Heartface: "/pattern-shimmer.png", Cheekbone: "/pattern-shimmer.png", Nose: "/pattern-shimmer.png" }, patternLabel: "Highlighter" },
  foundation: { colorOnlyMode: true, finishTypes: ["Matte", "Gloss", "Shimmer"], hasColor: true },
  nailpolish: { colorOnlyMode: true, finishTypes: ["Matte", "Gloss", "Shimmer"], hasColor: true },
};

export const PATTERN_NAMES = {
  lipstick: ["glossy", "matte", "satin"],
  eyebrows: ["natural", "defined", "feathered"],
  mascara: ["natural", "dramatic", "curled"],
  bronzer: ["sun-kissed", "sculpted", "natural"],
  eyeliner: ["eyeliner1", "winged", "smudged"],
  eyelashes: ["natural", "dramatic", "wispy"],
  blush: ["oval", "round", "draping"],
  eyeshadow: ["eyeshadow2", "smoky", "cut-crease"],
  lipliner: ["natural", "overdraw", "ombre"],
  highlighter: ["heartface1", "cheekbone", "nose"],
  foundation: ["full-coverage", "natural", "sheer"],
};

// ─── LIFESTYLE + HOME DATA ───
export const CATEGORY_TREE = {
  Lifestyle: {
    Eyewear: {
      subcategories: [],
      additionalFields: [
        { name: "frameSize", label: "Frame Size", type: "text" },
        { name: "frameShape", label: "Frame Shape", type: "text" },
      ],
      sides2D: 4,
      ar: { Eyewear: true },
      modelling3D: { Eyewear: true },
    },
    Accessories: {
      subcategories: ["Hats", "Caps"],
      additionalFields: [BARCODE_FIELD],
      sides2D: 1,
      ar: { Hats: true, Caps: true },
      modelling3D: { Hats: true, Caps: true },
    },
    Watches: {
      subcategories: [],
      additionalFields: [BARCODE_FIELD],
      sides2D: 1,
      ar: { Watches: true },
      modelling3D: { Watches: true },
    },
    Shoes: {
      subcategories: [],
      additionalFields: [BARCODE_FIELD],
      sides2D: 1,
      ar: { Shoes: false },
      modelling3D: { Shoes: true },
    },
    Jewellery: {
      subcategories: ["Earring", "Necklace", "Bracelets", "Mangtika", "Rings", "Nose Piercing"],
      additionalFields: [BARCODE_FIELD],
      sides2D: 1,
      ar: { Earring: true, Necklace: true, Bracelets: true, Mangtika: true, Rings: true, "Nose Piercing": false },
      modelling3D: { Earring: true, Necklace: true, Bracelets: true, Mangtika: true, Rings: true, "Nose Piercing": true },
    },
    Luggage: {
      subcategories: ["Luggage", "Backpacks", "Totes", "Handbags", "Slingbags"],
      additionalFields: [BARCODE_FIELD],
      sides2D: null,
      ar: { Luggage: true, Backpacks: true, Totes: true, Handbags: true, Slingbags: true },
      modelling3D: { Luggage: true, Backpacks: true, Totes: true, Handbags: true, Slingbags: true },
    },
    Apparel: {
      subcategories: ["Topwear", "Bottomwear", "Full Outfit"],
      additionalFields: [BARCODE_FIELD],
      sides2D: 1,
      ar: { Topwear: false, Bottomwear: false, "Full Outfit": false },
      modelling3D: { Topwear: true, Bottomwear: true, "Full Outfit": true },
    },
  },
  Home: {
    Furniture: { subcategories: ["Furniture"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { Furniture: true }, modelling3D: { Furniture: true } },
    "Floor Decor": { subcategories: ["Floor Decor"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { "Floor Decor": true }, modelling3D: { "Floor Decor": true } },
    "Wall Decor": { subcategories: ["Wall Decor"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { "Wall Decor": true }, modelling3D: { "Wall Decor": true } },
    Lighting: { subcategories: ["Lighting"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { Lighting: true }, modelling3D: { Lighting: true } },
    Kitchen: { subcategories: ["Kitchen"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { Kitchen: true }, modelling3D: { Kitchen: true } },
    Appliances: { subcategories: ["Appliances"], additionalFields: [BARCODE_FIELD], sides2D: null, ar: { Appliances: true }, modelling3D: { Appliances: true } },
  },
};

// ─── SAMPLE PRODUCTS ───
export const INITIAL_PRODUCTS = [
  // Lifestyle
  { id: "p1", name: "Classic Aviator", skuId: "SKU-001", category: "Eyewear", subcategory: "", headCategory: "Lifestyle", status: "active", date: "2026-03-10", variants: [{ id: "v1", name: "Gold", color: "#D4A574", dimension: "140 x 50 x 45 mm", price: "2499" }, { id: "v2", name: "Silver", color: "#C0C0C0", dimension: "140 x 50 x 45 mm", price: "2299" }] },
  { id: "p2", name: "Leather Tote", skuId: "SKU-003", category: "Luggage", subcategory: "Totes", headCategory: "Lifestyle", status: "inactive", date: "2026-03-08", variants: [{ id: "v4", name: "Brown", color: "#8B4513", dimension: "40 x 30 x 15 cm", price: "4999" }] },
  { id: "p3", name: "Pearl Necklace", skuId: "SKU-005", category: "Jewellery", subcategory: "Necklace", headCategory: "Lifestyle", status: "active", date: "2026-03-06", variants: [{ id: "v6", name: "White Pearl", color: "#FFF8F0", dimension: "18 in", price: "12999" }] },
  // Beauty
  { id: "b1", name: "Velvet Matte Lipstick", skuId: "BT-001", category: "Makeup", subcategory: "Lipstick", headCategory: "Beauty", status: "active", date: "2026-03-10", variants: [{ id: "bv1", name: "Ruby Red", color: "#DC2626", price: "599" }, { id: "bv2", name: "Nude Pink", color: "#E8A0BF", price: "599" }] },
  { id: "b2", name: "Precision Eyeliner", skuId: "BT-002", category: "Makeup", subcategory: "Eyeliner", headCategory: "Beauty", status: "active", date: "2026-03-09", variants: [{ id: "bv3", name: "Jet Black", color: "#1a1a1a", price: "449" }] },
  { id: "b3", name: "Glow Highlighter", skuId: "BT-003", category: "Makeup", subcategory: "Highlighter", headCategory: "Beauty", status: "active", date: "2026-03-08", variants: [{ id: "bv4", name: "Champagne", color: "#F5E6CA", price: "799" }] },
  { id: "b4", name: "Silk Foundation", skuId: "BT-004", category: "Makeup", subcategory: "Foundation", headCategory: "Beauty", status: "active", date: "2026-03-07", variants: [{ id: "bv5", name: "Porcelain", color: "#FAEBD7", price: "1299" }] },
  { id: "b5", name: "Rose Blush", skuId: "BT-005", category: "Makeup", subcategory: "Blush", headCategory: "Beauty", status: "inactive", date: "2026-03-06", variants: [{ id: "bv6", name: "Peach", color: "#FFCBA4", price: "699" }] },
  { id: "b6", name: "Volume Mascara", skuId: "BT-006", category: "Makeup", subcategory: "Mascara", headCategory: "Beauty", status: "active", date: "2026-03-05", variants: [{ id: "bv7", name: "Black", color: "#1a1a1a", price: "549" }] },
  // Home
  { id: "h1", name: "Modern Floor Lamp", skuId: "SKU-004", category: "Lighting", subcategory: "Lighting", headCategory: "Home", status: "active", date: "2026-03-07", variants: [{ id: "hv1", name: "Black", color: "#1a1a1a", dimension: "30 x 30 x 160 cm", price: "8999" }] },
  { id: "h2", name: "Wooden Coffee Table", skuId: "SKU-006", category: "Furniture", subcategory: "Furniture", headCategory: "Home", status: "active", date: "2026-03-05", variants: [{ id: "hv2", name: "Walnut", color: "#5C4033", dimension: "120 x 60 x 45 cm", price: "15999" }] },
];

// ─── STYLES ───
export const S = {
  app: { display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: "#f7f7f8", color: "#1a1a1a", fontSize: 13 },
  sidebar: { width: 230, background: "#141414", color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 },
  sidebarLogo: { padding: "18px 22px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #2a2a2a", fontSize: 17, fontWeight: 700, letterSpacing: -0.5 },
  sidebarSection: { padding: "16px 22px 6px", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#555" },
  sidebarItem: (a) => ({ padding: "9px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: a ? "#fff" : "#888", background: a ? "rgba(255,255,255,0.06)" : "transparent", borderLeft: a ? "3px solid #f43f5e" : "3px solid transparent" }),
  sidebarSub: (a) => ({ padding: "7px 22px 7px 52px", cursor: "pointer", fontSize: 12.5, color: a ? "#f43f5e" : "#777", fontWeight: a ? 600 : 400 }),
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { height: 54, background: "#fff", borderBottom: "1px solid #eaeaea", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 },
  content: { flex: 1, overflow: "auto", padding: "16px 16px" },
  card: { background: "#fff", borderRadius: 12, border: "1px solid #eaeaea" },
  btnP: { background: "#141414", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 },
  btnO: { background: "#fff", color: "#1a1a1a", border: "1px solid #d9d9d9", borderRadius: 10, padding: "11px 22px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 },
  btnG: { background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 },
  btnDisabled: { background: "#e5e5e5", color: "#999", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13.5, fontWeight: 600, cursor: "not-allowed", display: "inline-flex", alignItems: "center", gap: 7 },
  btnPink: { background: "#f43f5e", color: "#fff", border: "none", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20, flexShrink: 0 },
  arSectionCard: { background: "#fff", border: "1px solid #f1e7ea", borderRadius: 16, boxShadow: "0 8px 24px rgba(20,20,20,0.04)" },
  arMiniPanel: { display: "flex", alignItems: "center", gap: 10, border: "1px solid #ece3e6", borderRadius: 12, padding: "0 14px", background: "#fff" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #d9d9d9", borderRadius: 10, fontSize: 13.5, outline: "none", background: "#fff", boxSizing: "border-box" },
  select: { width: "100%", padding: "11px 14px", border: "1px solid #d9d9d9", borderRadius: 10, fontSize: 13.5, outline: "none", background: "#fff", boxSizing: "border-box", appearance: "none", cursor: "pointer" },
  label: { fontSize: 12.5, fontWeight: 600, color: "#444", marginBottom: 6, display: "block" },
  labelReq: { fontSize: 12.5, fontWeight: 600, color: "#f43f5e", marginBottom: 6, display: "block" },
  th: { padding: "12px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #eaeaea", background: "#fafafa" },
  td: { padding: "16px 18px", borderBottom: "1px solid #f2f2f2", fontSize: 13.5, verticalAlign: "middle" },
  tab: (a) => ({ padding: "10px 2px", fontSize: 14, fontWeight: a ? 600 : 400, color: a ? "#1a1a1a" : "#999", borderBottom: a ? "2.5px solid #f43f5e" : "2.5px solid transparent", cursor: "pointer", marginRight: 28 }),
  badge: (v) => {
    const c = {
      draft: { bg: "#fff0e6", cl: "#793f15" },
      inactive: { bg: "#ffe5e5", cl: "#6a1e1b" },
      active: { bg: "#e5fbe6", cl: "#255626" },
      yes: { bg: "#e5fbe6", cl: "#255626" },
      no: { bg: "#ffe5e5", cl: "#6a1e1b" },
    };
    const s = c[v] || c.inactive;
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4px 8px",
      borderRadius: 4,
      fontFamily: "\"Inter\", sans-serif",
      fontSize: 12,
      lineHeight: "16px",
      fontWeight: 400,
      background: s.bg,
      color: s.cl,
      border: "none",
      whiteSpace: "nowrap",
    };
  },
  upZone: { border: "2px dashed #d4d4d4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", background: "#fafafa", minHeight: 100, transition: "all 0.2s" },
};

// ─── SIDEBAR CONSTANTS ───
// IcChevronDown20 is here per spec (line 919 location)
export const IcChevronDown20 = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15.017 6.66663C14.792 6.66663 14.6003 6.74163 14.4337 6.90829L10.0087 11.3333L5.58366 6.90829C5.43366 6.75829 5.24199 6.68329 5.00866 6.68329C4.77533 6.68329 4.58366 6.75829 4.41699 6.90829C4.25033 7.07496 4.16699 7.27496 4.16699 7.49996C4.16699 7.72496 4.25033 7.92496 4.41699 8.09163L9.42533 13.1C9.50866 13.1833 9.60033 13.2416 9.69199 13.275C9.78366 13.3083 9.89199 13.325 10.0087 13.325C10.117 13.325 10.2253 13.3083 10.3253 13.275C10.4253 13.2416 10.5087 13.1833 10.592 13.1L15.6253 8.07496C15.792 7.90829 15.8753 7.71663 15.867 7.49163C15.867 7.26663 15.7753 7.07496 15.6087 6.90829C15.442 6.75829 15.2503 6.67496 15.0253 6.66663H15.017Z" fill="#5a5a5a"/></svg>);

export const IcChevronUp20 = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15.017 13.3334C14.792 13.3334 14.6003 13.2584 14.4337 13.0917L10.0087 8.66671L5.58366 13.0917C5.43366 13.2417 5.24199 13.3167 5.00866 13.3167C4.77533 13.3167 4.58366 13.2417 4.41699 13.0917C4.25033 12.925 4.16699 12.725 4.16699 12.5C4.16699 12.275 4.25033 12.075 4.41699 11.9084L9.42533 6.90004C9.50866 6.81671 9.60033 6.75838 9.69199 6.72504C9.78366 6.69171 9.89199 6.67504 10.0087 6.67504C10.117 6.67504 10.2253 6.69171 10.3253 6.72504C10.4253 6.75838 10.5087 6.81671 10.592 6.90004L15.6253 11.925C15.792 12.0917 15.8753 12.2834 15.867 12.5084C15.867 12.7334 15.7753 12.925 15.6087 13.0917C15.442 13.2417 15.2503 13.325 15.0253 13.3334H15.017Z" fill="#5a5a5a"/></svg>);

export const SIDEBAR_NAV = [
  { id: "dashboard", label: "Dashboard", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 11C4.45 11 3.97917 10.8042 3.5875 10.4125C3.19583 10.0208 3 9.55 3 9V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9C9.55 3 10.0208 3.19583 10.4125 3.5875C10.8042 3.97917 11 4.45 11 5V9C11 9.55 10.8042 10.0208 10.4125 10.4125C10.0208 10.8042 9.55 11 9 11H5ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V15C3 14.45 3.19583 13.9792 3.5875 13.5875C3.97917 13.1958 4.45 13 5 13H9C9.55 13 10.0208 13.1958 10.4125 13.5875C10.8042 13.9792 11 14.45 11 15V19C11 19.55 10.8042 20.0208 10.4125 20.4125C10.0208 20.8042 9.55 21 9 21H5ZM15 11C14.45 11 13.9792 10.8042 13.5875 10.4125C13.1958 10.0208 13 9.55 13 9V5C13 4.45 13.1958 3.97917 13.5875 3.5875C13.9792 3.19583 14.45 3 15 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V9C21 9.55 20.8042 10.0208 20.4125 10.4125C20.0208 10.8042 19.55 11 19 11H15ZM15 21C14.45 21 13.9792 20.8042 13.5875 20.4125C13.1958 20.0208 13 19.55 13 19V15C13 14.45 13.1958 13.9792 13.5875 13.5875C13.9792 13.1958 14.45 13 15 13H19C19.55 13 20.0208 13.1958 20.4125 13.5875C20.8042 13.9792 21 14.45 21 15V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H15Z" fill="white"/></svg>) },
  { id: "analytics", label: "Analytics", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.0254 7.10005V2.05005C5.97539 2.55005 2.02539 6.82005 2.02539 12C2.02539 17.18 5.97539 21.45 11.0254 21.95V16.9C8.74539 16.44 7.02539 14.42 7.02539 12C7.02539 9.58005 8.74539 7.56005 11.0254 7.10005ZM16.9254 11H21.9754C21.5054 6.28005 17.7554 2.52005 13.0254 2.05005V7.10005C14.9854 7.50005 16.5354 9.04005 16.9254 11ZM13.0254 16.9V21.95C17.7554 21.48 21.5054 17.72 21.9754 13H16.9254C16.5354 14.96 14.9854 16.5 13.0254 16.9Z" fill="white"/></svg>) },
  { id: "assets", label: "3D Assets", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip3d)"><path d="M11.4076 0.405869C9.52254 0.948099 9.63391 3.70398 11.4998 4.19144V7.69129C11.5837 8.27551 12.4126 8.27368 12.4957 7.69129L12.5057 4.16862C15.0261 3.4429 13.9854 -0.335361 11.4085 0.404956L11.4076 0.405869ZM11.9827 3.23478C10.8261 3.21652 10.7348 1.53141 11.8037 1.34884C13.2177 1.10785 13.3401 3.25577 11.9827 3.23478ZM3.23121 20.0183C1.63373 19.1301 -0.177354 20.682 0.429688 22.4082C0.60678 22.913 1.03125 23.3484 1.52784 23.5438C3.2659 24.2275 4.88255 22.3917 3.98157 20.7696L3.99526 20.7112L6.14227 18.5249C6.26551 18.0639 5.98892 17.739 5.5115 17.8485C5.15549 18.0101 3.38913 20.033 3.23121 20.0183ZM2.44434 22.6647C1.03125 22.8573 0.971005 20.8134 2.23256 20.7669C3.4156 20.7231 3.57444 22.5104 2.44434 22.6647ZM17.8833 18.5834C18.0978 18.9165 19.9774 20.5551 20.013 20.7377C20.0193 20.7705 19.8404 21.1466 19.814 21.2534C19.2717 23.4424 22.2887 24.631 23.4014 22.7441C24.4275 21.0033 22.5215 19.0407 20.7642 20.0174L20.7058 20.0037L18.6309 17.9279C18.5086 17.8175 18.2932 17.8111 18.1389 17.8467C17.834 17.9161 17.7528 18.3323 17.8833 18.5834ZM21.9071 22.6647C20.4876 22.8573 20.4018 20.8171 21.6953 20.7669C22.872 20.7212 23.0089 22.515 21.9071 22.6647Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M10.356 7.45923C10.3561 8.36675 11.092 9.10265 11.9995 9.10278C12.9071 9.10278 13.643 8.36684 13.6431 7.45923V7.22974L18.2153 9.85864C18.4613 10.0011 18.6526 10.189 18.7886 10.4221C18.9245 10.6552 18.9917 10.9146 18.9917 11.1995V16.9055C18.3762 16.5229 17.5575 16.5986 17.023 17.1331C16.3999 17.7562 16.3999 18.7658 17.023 19.3889L17.0308 19.3967L12.7759 21.845C12.5298 21.9874 12.2705 22.0588 11.9985 22.0588C11.7266 22.0588 11.4672 21.9874 11.2212 21.845L6.91748 19.3694C7.50095 18.7556 7.50648 17.7872 6.91455 17.1692C6.40658 16.639 5.62147 16.5374 5.00537 16.8704V11.1995C5.00537 10.9145 5.07349 10.6552 5.20947 10.4221C5.3454 10.1892 5.53588 10.001 5.78174 9.85864L10.356 7.22876V7.45923ZM11.9985 13.3948L7.39502 10.7327L6.55908 11.219V12.0344L11.2212 14.7346V20.0579L11.9985 20.5042L12.7759 20.0579V14.7346L17.438 12.0344V11.219L16.603 10.7327L11.9985 13.3948Z" fill="white"/></g><defs><clipPath id="clip3d"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>) },
  {
    id: "tryons", label: "Try-Ons", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 22C3.45 22 2.98 21.8 2.59 21.41C2.2 21.02 2 20.55 2 20V17C2 16.72 2.1 16.48 2.29 16.29C2.48 16.1 2.72 16 3 16C3.28 16 3.52 16.1 3.71 16.29C3.9 16.48 4 16.72 4 17V20H7C7.28 20 7.52 20.1 7.71 20.29C7.9 20.48 8 20.72 8 21C8 21.28 7.9 21.52 7.71 21.71C7.52 21.9 7.28 22 7 22H4ZM2 7V4C2 3.45 2.2 2.98 2.59 2.59C2.98 2.2 3.45 2 4 2H7C7.28 2 7.52 2.1 7.71 2.29C7.9 2.48 8 2.72 8 3C8 3.28 7.9 3.52 7.71 3.71C7.52 3.9 7.28 4 7 4H4V7C4 7.28 3.9 7.52 3.71 7.71C3.52 7.9 3.28 8 3 8C2.72 8 2.48 7.9 2.29 7.71C2.1 7.52 2 7.28 2 7ZM20 22H17C16.72 22 16.48 21.9 16.29 21.71C16.1 21.52 16 21.28 16 21C16 20.72 16.1 20.48 16.29 20.29C16.48 20.1 16.72 20 17 20H20V17C20 16.72 20.1 16.48 20.29 16.29C20.48 16.1 20.72 16 21 16C21.28 16 21.52 16.1 21.71 16.29C21.9 16.48 22 16.72 22 17V20C22 20.55 21.8 21.02 21.41 21.41C21.02 21.8 20.55 22 20 22ZM20 7V4H17C16.72 4 16.48 3.9 16.29 3.71C16.1 3.52 16 3.28 16 3C16 2.72 16.1 2.48 16.29 2.29C16.48 2.1 16.72 2 17 2H20C20.55 2 21.02 2.2 21.41 2.59C21.8 2.98 22 3.45 22 4V7C22 7.28 21.9 7.52 21.71 7.71C21.52 7.9 21.28 8 21 8C20.72 8 20.48 7.9 20.29 7.71C20.1 7.52 20 7.28 20 7Z" fill="white"/><path d="M11.3689 17.8337L6.94968 15.4192C6.74976 15.3093 6.59456 15.1643 6.48408 14.9843C6.3736 14.8044 6.31836 14.6044 6.31836 14.3844V9.61546C6.31836 9.3955 6.3736 9.19554 6.48408 9.01558C6.59456 8.83562 6.74976 8.69065 6.94968 8.58067L11.3689 6.16619C11.5688 6.05621 11.7793 6.00122 12.0002 6.00122C12.2212 6.00122 12.4316 6.05621 12.6316 6.16619L17.0508 8.58067C17.2507 8.69065 17.4059 8.83562 17.5164 9.01558C17.6269 9.19554 17.6821 9.3955 17.6821 9.61546V14.3844C17.6821 14.6044 17.6269 14.8044 17.5164 14.9843C17.4059 15.1643 17.2507 15.3093 17.0508 15.4192L12.6316 17.8337C12.4316 17.9437 12.2212 17.9987 12.0002 17.9987C11.7793 17.9987 11.5688 17.9437 11.3689 17.8337ZM11.3689 12.3449V16.454L12.0002 16.7989L12.6316 16.454V12.3449L16.4195 10.2603V9.63045L15.7408 9.25553L12.0002 11.3101L8.25967 9.25553L7.581 9.63045V10.2603L11.3689 12.3449Z" fill="white"/></svg>), page: "products",
    l2Title: "AR Tools",
    l2Items: [
      {
        id: "lifestyle", label: "Lifestyle", L2Icon: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5003 15C17.5003 15.4583 17.1253 15.8333 16.667 15.8333H15.6837C15.342 16.8 14.4253 17.5 13.3337 17.5C12.242 17.5 11.3337 16.8 10.9837 15.8333H9.00866C8.66699 16.8 7.75033 17.5 6.65866 17.5C5.56699 17.5 4.65866 16.8 4.30866 15.8333H3.32533C2.86699 15.8333 2.49199 15.4583 2.49199 15C2.49199 14.5417 2.86699 14.1667 3.32533 14.1667H4.30866C4.65033 13.2 5.56699 12.5 6.65866 12.5C7.75033 12.5 8.65866 13.2 9.00866 14.1667H10.9837C11.3253 13.2 12.242 12.5 13.3337 12.5C14.4253 12.5 15.3337 13.2 15.6837 14.1667H16.667C17.1253 14.1667 17.5003 14.5417 17.5003 15ZM17.5003 9.16667H15.8337L14.542 4.01667C14.317 3.125 13.517 2.5 12.6003 2.5C12.167 2.5 11.7587 2.65833 11.4087 2.9C11.0087 3.175 10.5253 3.33333 10.0003 3.33333C9.47533 3.33333 8.99199 3.175 8.59199 2.9C8.23366 2.65833 7.83366 2.5 7.40033 2.5C6.48366 2.5 5.68366 3.125 5.45866 4.01667L4.16699 9.16667H2.50033C2.04199 9.16667 1.66699 9.54167 1.66699 10C1.66699 10.4583 2.04199 10.8333 2.50033 10.8333H17.5003C17.9587 10.8333 18.3337 10.4583 18.3337 10C18.3337 9.54167 17.9587 9.16667 17.5003 9.16667Z" fill="#5a5a5a"/></svg>), chevron: true, category: "Lifestyle",
        l3: [
          { id: "lifestyle-products", label: "Products", page: "products" },
          { id: "lifestyle-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "lifestyle-integration", label: "Integration", page: "integration" },
        ],
      },
      {
        id: "beauty", label: "Beauty", L2Icon: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3.33301 10H8.33301V15.8333C8.33301 16.75 7.58301 17.5 6.66634 17.5H4.99967C4.08301 17.5 3.33301 16.75 3.33301 15.8333V10ZM7.49967 3.68333C7.49967 2.94167 6.59967 2.56667 6.07467 3.09167L4.40801 4.75833C4.24967 4.91667 4.16634 5.125 4.16634 5.35V8.34167H7.49967V3.68333ZM11.6663 15.8417C11.6663 16.7583 12.4163 17.5083 13.333 17.5083C14.2497 17.5083 14.9997 16.7583 14.9997 15.8417V10.0083H11.6663V15.8417ZM17.208 3.69167C16.408 2.95 14.508 2.5 13.3247 2.5C12.1413 2.5 10.2413 2.95833 9.44134 3.7C9.18301 3.94167 9.09967 4.325 9.24134 4.65L11.658 8.33333H14.9913L17.408 4.64167C17.5497 4.31667 17.4663 3.93333 17.208 3.69167Z" fill="#5a5a5a"/></svg>), chevron: true, category: "Beauty",
        l3: [
          { id: "beauty-products", label: "Products", page: "products" },
          { id: "beauty-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "beauty-integration", label: "Integration", page: "integration" },
        ],
      },
      {
        id: "home", label: "Home & Decor", L2Icon: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5272 10.412V15.9732C12.5272 16.9001 11.7689 17.6584 10.842 17.6584H9.67082C9.20739 17.6584 8.82822 17.2792 8.82822 16.8158V13.4454C8.82822 12.982 8.44905 12.6028 7.98562 12.6028H6.30041C5.83698 12.6028 5.45781 12.982 5.45781 13.4454V16.8158C5.45781 17.2792 5.07864 17.6584 4.61521 17.6584H3.44399C2.51713 17.6584 1.75879 16.9001 1.75879 15.9732V10.412C1.75879 9.88962 2.01157 9.38406 2.43287 9.07229L6.13189 6.29171C6.73014 5.8367 7.55589 5.8367 8.15414 6.29171L11.8532 9.07229C12.2829 9.38406 12.5272 9.88962 12.5272 10.412ZM18.4255 3.73862V15.9816C18.4255 16.9085 17.6671 17.6668 16.7403 17.6668H15.055C14.5916 17.6668 14.2124 17.2877 14.2124 16.8242V10.4205C14.2124 9.35035 13.6985 8.33923 12.8643 7.73256L8.87035 4.7329C8.55859 4.49697 8.37321 4.13465 8.37321 3.73862C8.37321 3.05612 8.92933 2.5 9.61184 2.5H17.1784C17.8609 2.5 18.417 3.05612 18.417 3.73862H18.4255Z" fill="#5a5a5a"/></svg>), chevron: true, category: "Home",
        l3: [
          { id: "home-products", label: "Products", page: "products" },
          { id: "home-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "home-integration", label: "Integration", page: "integration" },
        ],
      },
      { id: "looks", label: "Looks builder", L2Icon: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.43948 12.8311C6.19705 12.8311 6.00008 12.7444 5.83341 12.571C5.66675 12.3976 5.58342 12.1926 5.58342 11.9404C5.58342 11.6881 5.66675 11.4831 5.83341 11.3097C6.00008 11.1363 6.19705 11.0496 6.43948 11.0496C6.6819 11.0496 6.87887 11.1363 7.04553 11.3097C7.2122 11.4831 7.29554 11.6881 7.29554 11.9404C7.29554 12.1926 7.2122 12.3976 7.04553 12.571C6.87887 12.7444 6.6819 12.8311 6.43948 12.8311ZM10.5304 12.8311C10.288 12.8311 10.091 12.7444 9.92432 12.571C9.75766 12.3976 9.67432 12.1926 9.67432 11.9404C9.67432 11.6881 9.75766 11.4831 9.92432 11.3097C10.091 11.1363 10.288 11.0496 10.5304 11.0496C10.7728 11.0496 10.9698 11.1363 11.1364 11.3097C11.3031 11.4831 11.3864 11.6881 11.3864 11.9404C11.3864 12.1926 11.3031 12.3976 11.1364 12.571C10.9698 12.7444 10.7728 12.8311 10.5304 12.8311ZM8.48493 16.9145C10.0077 16.9145 11.2955 16.3627 12.3561 15.267C13.4167 14.1712 13.9395 12.8232 13.9395 11.2388C13.9395 10.955 13.9243 10.6791 13.8864 10.4111C13.8486 10.143 13.788 9.89077 13.6971 9.63852C13.4546 9.6937 13.2198 9.741 12.9774 9.77253C12.7349 9.80406 12.4849 9.81983 12.2274 9.81983C11.1895 9.81983 10.2122 9.59122 9.29554 9.12612C8.37887 8.66103 7.59099 8.02251 6.93947 7.19479C6.57584 8.1171 6.05311 8.92117 5.37887 9.5991C4.70463 10.277 3.91675 10.7894 3.01523 11.1363V11.2466C3.01523 12.8311 3.54554 14.1712 4.59857 15.2749C5.6516 16.3785 6.94705 16.9224 8.46978 16.9224L8.48493 16.9145ZM8.48493 18.3335C7.53796 18.3335 6.6516 18.1443 5.82584 17.7738C5.00009 17.4033 4.27281 16.8987 3.65918 16.2602C3.04554 15.6217 2.56069 14.8728 2.20463 14.0057C1.84857 13.1386 1.66675 12.2241 1.66675 11.2388C1.66675 10.2534 1.84857 9.33896 2.20463 8.47184C2.56069 7.60471 3.04554 6.85582 3.65918 6.2173C4.27281 5.57878 4.99251 5.07427 5.82584 4.70377C6.65918 4.33327 7.53796 4.14408 8.48493 4.14408C9.4319 4.14408 10.3107 4.33327 11.144 4.70377C11.9774 5.07427 12.6971 5.57878 13.3107 6.2173C13.9243 6.85582 14.4092 7.60471 14.7652 8.47184C15.1213 9.33896 15.3031 10.2613 15.3031 11.2388C15.3031 12.2163 15.1213 13.1464 14.7652 14.0057C14.4092 14.8649 13.9243 15.6217 13.3107 16.2602C12.6971 16.8987 11.9774 17.4033 11.144 17.7738C10.3107 18.1443 9.42432 18.3335 8.48493 18.3335Z" fill="#5A5A5A"/></svg>) },
      { id: "arads", label: "AR ads", L2Icon: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.28418 12.5574H4.07975C3.42057 12.5574 2.85091 12.3214 2.37891 11.8494C1.9069 11.3774 1.6709 10.8077 1.6709 10.1485V7.73967C1.6709 7.08049 1.9069 6.51082 2.37891 6.03882C2.85091 5.56681 3.42057 5.33081 4.07975 5.33081H8.9056L13.0967 2.79175C13.4954 2.54761 13.9023 2.54761 14.3174 2.79175C14.7324 3.03589 14.9359 3.38582 14.9359 3.84969V14.0385C14.9359 14.5024 14.7324 14.8523 14.3174 15.0964C13.9023 15.3406 13.4954 15.3406 13.0967 15.0964L8.9056 12.5655H7.70117V16.1788C7.70117 16.5206 7.58724 16.8054 7.35124 17.0414C7.11523 17.2774 6.8304 17.3914 6.48861 17.3914C6.14681 17.3914 5.86198 17.2774 5.62598 17.0414C5.38997 16.8054 5.27604 16.5206 5.27604 16.1788V12.5655L5.28418 12.5574ZM16.5228 12.9806V4.8995C17.068 5.37964 17.4994 5.96558 17.833 6.66545C18.1667 7.36532 18.3294 8.11401 18.3294 8.94409C18.3294 9.77417 18.1667 10.5229 17.833 11.2227C17.4994 11.9226 17.068 12.5004 16.5228 12.9887V12.9806Z" fill="#5a5a5a"/></svg>) },
    ],
  },
  { id: "skin", label: "Skin Analysis", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 19.2727C9.97273 19.2727 8.24545 18.5636 6.83636 17.1545C5.42727 15.7455 4.71818 14.0273 4.71818 11.9909C4.71818 9.95455 5.42727 8.23636 6.83636 6.82727C8.24545 5.41818 9.96364 4.70909 12 4.70909C14.0364 4.70909 15.7545 5.41818 17.1636 6.82727C18.5727 8.23636 19.2818 9.95455 19.2818 11.9909C19.2818 14.0273 18.5727 15.7455 17.1636 17.1545C15.7545 18.5636 14.0364 19.2727 12 19.2727ZM12 17.4545C13.5182 17.4545 14.8 16.9273 15.8636 15.8636C16.9273 14.8 17.4545 13.5182 17.4545 12C17.4545 11.7455 17.4364 11.4909 17.4 11.2364C17.3636 10.9818 17.3091 10.7364 17.2273 10.5C17 10.5455 16.7727 10.5818 16.5455 10.6C16.3182 10.6182 16.0909 10.6364 15.8636 10.6364C14.9091 10.6364 14 10.4545 13.1364 10.0909C12.2727 9.72727 11.5 9.2 10.8182 8.5C10.3909 9.36364 9.80909 10.1182 9.06364 10.7545C8.31818 11.3909 7.48182 11.8545 6.53636 12.1455C6.58182 13.6273 7.12727 14.8909 8.18182 15.9182C9.23636 16.9455 10.5 17.4636 11.9909 17.4636L12 17.4545ZM9.72727 13.8182C9.47273 13.8182 9.25455 13.7273 9.08182 13.5545C8.90909 13.3818 8.81818 13.1636 8.81818 12.9091C8.81818 12.6545 8.90909 12.4364 9.08182 12.2636C9.25455 12.0909 9.47273 12 9.72727 12C9.98182 12 10.2 12.0909 10.3727 12.2636C10.5455 12.4364 10.6364 12.6545 10.6364 12.9091C10.6364 13.1636 10.5455 13.3818 10.3727 13.5545C10.2 13.7273 9.98182 13.8182 9.72727 13.8182ZM14.2727 13.8182C14.0182 13.8182 13.8 13.7273 13.6273 13.5545C13.4545 13.3818 13.3636 13.1636 13.3636 12.9091C13.3636 12.6545 13.4545 12.4364 13.6273 12.2636C13.8 12.0909 14.0182 12 14.2727 12C14.5273 12 14.7455 12.0909 14.9182 12.2636C15.0909 12.4364 15.1818 12.6545 15.1818 12.9091C15.1818 13.1636 15.0909 13.3818 14.9182 13.5545C14.7455 13.7273 14.5273 13.8182 14.2727 13.8182ZM2 5.63636V3.81818C2 3.31818 2.18182 2.89091 2.53636 2.53636C2.89091 2.18182 3.31818 2 3.81818 2H5.63636C5.89091 2 6.10909 2.09091 6.28182 2.26364C6.45455 2.43636 6.54545 2.65455 6.54545 2.90909C6.54545 3.16364 6.45455 3.38182 6.28182 3.55455C6.10909 3.72727 5.89091 3.81818 5.63636 3.81818H3.81818V5.63636C3.81818 5.89091 3.72727 6.10909 3.55455 6.28182C3.38182 6.45455 3.16364 6.54545 2.90909 6.54545C2.65455 6.54545 2.43636 6.45455 2.26364 6.28182C2.09091 6.10909 2 5.89091 2 5.63636ZM5.63636 22H3.81818C3.31818 22 2.89091 21.8182 2.53636 21.4636C2.18182 21.1091 2 20.6818 2 20.1818V18.3636C2 18.1091 2.09091 17.8909 2.26364 17.7182C2.43636 17.5455 2.65455 17.4545 2.90909 17.4545C3.16364 17.4545 3.38182 17.5455 3.55455 17.7182C3.72727 17.8909 3.81818 18.1091 3.81818 18.3636V20.1818H5.63636C5.89091 20.1818 6.10909 20.2727 6.28182 20.4455C6.45455 20.6182 6.54545 20.8364 6.54545 21.0909C6.54545 21.3455 6.45455 21.5636 6.28182 21.7364C6.10909 21.9091 5.89091 22 5.63636 22ZM20.1818 22H18.3636C18.1091 22 17.8909 21.9091 17.7182 21.7364C17.5455 21.5636 17.4545 21.3455 17.4545 21.0909C17.4545 20.8364 17.5455 20.6182 17.7182 20.4455C17.8909 20.2727 18.1091 20.1818 18.3636 20.1818H20.1818V17.4545H22V20.1818C22 20.6818 21.8182 21.1091 21.4636 21.4636C21.1091 21.8182 20.6818 22 20.1818 22ZM20.1818 5.63636V3.81818H18.3636C18.1091 3.81818 17.8909 3.72727 17.7182 3.55455C17.5455 3.38182 17.4545 3.16364 17.4545 2.90909C17.4545 2.65455 17.5455 2.43636 17.7182 2.26364C17.8909 2.09091 18.1091 2 18.3636 2H20.1818C20.6818 2 21.1091 2.18182 21.4636 2.53636C21.8182 2.89091 22 3.31818 22 3.81818V5.63636C22 5.89091 21.9091 6.10909 21.7364 6.28182C21.5636 6.45455 21.3455 6.54545 21.0909 6.54545C20.8364 6.54545 20.6182 6.45455 20.4455 6.28182C20.2727 6.10909 20.1818 5.89091 20.1818 5.63636Z" fill="white"/></svg>) },
  { id: "aistylist", label: "AI Stylist", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.63108 2.56421H10.4056C10.4056 3.36727 10.6799 3.96956 11.1423 4.37109C12.0668 4.97338 14.9022 5.73811 14.7989 6.17797C14.6102 6.98102 12.2365 9.94669 12.7604 11.1971C14.1904 14.6101 14.7989 16.2162 13.6853 17.0192C9.29227 19.4284 4.20855 17.8223 3.47222 16.2162C3.00684 15.201 4.62533 13.0039 5.08775 11.3978C5.55017 9.79171 3.00684 6.37873 3.00684 5.9772C3.00684 5.57567 6.28651 4.97338 6.93745 4.57185C7.4143 4.27771 7.63108 3.1665 7.63108 2.56421Z" fill="white"/><path d="M21.0562 10.6527C20.2643 10.9508 19.6474 11.5615 19.3681 12.3228L19.098 13.0665C19.0428 13.217 18.8156 13.217 18.7604 13.0665L18.4903 12.3228C18.211 11.5585 17.5941 10.9478 16.8022 10.6527L16.0933 10.3871C15.9429 10.3311 15.9429 10.1303 16.0933 10.0743L16.8022 9.80866C17.5941 9.51066 18.211 8.89982 18.4903 8.13848L18.7604 7.39486C18.8156 7.24436 19.0428 7.24436 19.098 7.39486L19.3681 8.13848C19.6474 8.90278 20.2643 9.51361 21.0562 9.80866L21.7651 10.0743C21.9155 10.1303 21.9155 10.3311 21.7651 10.3871L21.0562 10.6527Z" fill="white"/></svg>), page: "aiStylist" },
  {
    id: "settings", label: "Settings", Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.9738 21.2466C10.6328 21.2466 10.3383 21.1334 10.0903 20.9071C9.84212 20.6809 9.69112 20.4024 9.63729 20.0716L9.39304 18.2003C9.1252 18.1107 8.85054 17.9851 8.56904 17.8236C8.2877 17.6619 8.03612 17.4888 7.81429 17.3043L6.08154 18.0408C5.76737 18.1793 5.4517 18.1927 5.13454 18.0811C4.8172 17.9696 4.5707 17.7671 4.39504 17.4736L3.26804 15.5196C3.09237 15.2261 3.04179 14.9155 3.11629 14.5878C3.19062 14.2603 3.36112 13.9902 3.62779 13.7773L5.12579 12.6523C5.10279 12.5037 5.08645 12.3543 5.07679 12.2043C5.06712 12.0543 5.06229 11.9049 5.06229 11.7561C5.06229 11.6139 5.06712 11.4694 5.07679 11.3226C5.08645 11.1757 5.10279 11.0152 5.12579 10.8408L3.62779 9.71583C3.36112 9.503 3.1922 9.23117 3.12104 8.90033C3.04987 8.56967 3.10212 8.2575 3.27779 7.96383L4.39504 6.03883C4.5707 5.75167 4.8172 5.55075 5.13454 5.43608C5.4517 5.32125 5.76737 5.33308 6.08154 5.47158L7.80454 6.19858C8.0457 6.00758 8.30312 5.83292 8.57679 5.67458C8.85045 5.51625 9.11937 5.389 9.38354 5.29283L9.63729 3.42158C9.69112 3.09075 9.84212 2.81225 10.0903 2.58608C10.3383 2.35975 10.6328 2.24658 10.9738 2.24658H13.1893C13.5303 2.24658 13.8248 2.35975 14.0728 2.58608C14.321 2.81225 14.472 3.09075 14.5258 3.42158L14.77 5.30233C15.07 5.41133 15.3415 5.53858 15.5843 5.68408C15.8273 5.82958 16.0725 6.00108 16.32 6.19858L18.0913 5.47158C18.4053 5.33308 18.721 5.32125 19.0383 5.43608C19.3556 5.55075 19.602 5.75167 19.7775 6.03883L20.895 7.97358C21.0707 8.26708 21.1213 8.57766 21.0468 8.90533C20.9725 9.23283 20.802 9.503 20.5353 9.71583L18.9988 10.8696C19.0346 11.0311 19.0542 11.1821 19.0575 11.3226C19.0607 11.4629 19.0623 11.6042 19.0623 11.7466C19.0623 11.8824 19.059 12.0206 19.0525 12.1611C19.0462 12.3014 19.0232 12.462 18.9835 12.6428L20.491 13.7773C20.7577 13.9902 20.9299 14.2603 21.0075 14.5878C21.085 14.9155 21.036 15.2261 20.8603 15.5196L19.7275 17.4638C19.552 17.7575 19.304 17.9601 18.9835 18.0716C18.663 18.1831 18.3457 18.1696 18.0315 18.0311L16.32 17.2946C16.0725 17.4921 15.82 17.6667 15.5623 17.8186C15.3046 17.9706 15.0405 18.0947 14.77 18.1908L14.5258 20.0716C14.472 20.4024 14.321 20.6809 14.0728 20.9071C13.8248 21.1334 13.5303 21.2466 13.1893 21.2466H10.9738ZM12.093 14.7466C12.925 14.7466 13.633 14.4546 14.217 13.8706C14.801 13.2866 15.093 12.5786 15.093 11.7466C15.093 10.9146 14.801 10.2066 14.217 9.62258C13.633 9.03858 12.925 8.74658 12.093 8.74658C11.2507 8.74658 10.5401 9.03858 9.96129 9.62258C9.38245 10.2066 9.09304 10.9146 9.09304 11.7466C9.09304 12.5786 9.38245 13.2866 9.96129 13.8706C10.5401 14.4546 11.2507 14.7466 12.093 14.7466Z" fill="white"/></svg>),
    l2Title: "Settings",
    l2Items: [
      { id: "overview", label: "Overview", L2Icon: () => null },
      { id: "team", label: "Team", L2Icon: () => null },
      { id: "tokens", label: "Tokens", L2Icon: () => null },
      { id: "webhooks", label: "Webhooks", L2Icon: () => null },
      { id: "billing", label: "Billing & payments", L2Icon: () => null },
    ],
  },
];

import { useEffect, useState } from "react";
import { Search, Filter, LayoutGrid, Plus, ChevronLeft, ChevronRight, MoreVertical, X, Upload, Link, Trash2, Edit3, Eye, Copy, ChevronDown, ChevronUp, Image, Box, Info, ArrowLeft, Package, GripVertical, ToggleLeft, ToggleRight, Palette } from "lucide-react";

// ─── BEAUTY DATA ───
const BEAUTY_CATEGORIES = {
  Makeup: {
    subcategories: ["Lipstick", "Lipliner", "Eyeliner", "Mascara", "Eyelashes", "Eyebrows", "Eyeshadow", "Highlighter", "Foundation", "Blush", "Compact", "Concealer", "Contour", "Bronzer"],
    additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
    ar: { Lipstick: true, Lipliner: true, Eyeliner: true, Mascara: true, Eyelashes: true, Eyebrows: true, Eyeshadow: true, Highlighter: true, Foundation: true, Blush: true, Compact: false, Concealer: false, Contour: false, Bronzer: false },
  },
  Hair: {
    subcategories: ["Hair Wigs", "Hair Color"],
    additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
    ar: { "Hair Wigs": false, "Hair Color": false },
  },
  Nails: {
    subcategories: ["Nail Polish", "Nail Art"],
    additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
    ar: { "Nail Polish": false, "Nail Art": false },
  },
};

const AR_SETTINGS_CONFIG = {
  lipstick: { hasStyle: true, styleOptions: ["Single", "Dual", "Ombre"], hasColor: true, hasFinishAdjust: true, finishLabel: "Finish Adjustments", addLabel: "Choose Finish", patternFields: ["colorIntensity", "gloss"] },
  eyebrows: { hasStyle: true, styleOptions: ["Natural", "Arched", "Straight"], hasColor: true, hasFinishAdjust: true, finishLabel: "Finish Adjustments", addLabel: "Choose Finish", patternFields: ["colorIntensity", "gloss"] },
  mascara: { hasStyle: true, styleOptions: ["Natural", "Volume", "Lengthening"], hasColor: true, hasFinishAdjust: true, finishLabel: "Finish Adjustments", addLabel: "Choose Finish", patternFields: ["colorIntensity", "gloss"] },
  bronzer: { hasStyle: true, styleOptions: ["Natural", "Contour", "Sun-Kissed"], hasColor: true, hasFinishAdjust: true, finishLabel: "Finish Adjustments", addLabel: "Choose Finish", patternFields: ["colorIntensity", "gloss"] },
  eyeliner: { hasStyle: false, hasColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["colorIntensity"] },
  eyelashes: { hasStyle: false, hasColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["colorIntensity"] },
  blush: { hasStyle: false, hasColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["finish", "colorIntensity"] },
  eyeshadow: { hasStyle: false, hasColor: true, hasShimmer: true, hasAddColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["color", "colorIntensity"] },
  lipliner: { hasStyle: false, hasColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["color", "colorIntensity", "thickness", "smoothness"] },
  highlighter: { hasStyle: false, hasColor: true, hasShimmer: true, hasAddColor: true, hasFinishAdjust: true, finishLabel: "Pattern Adjustments", addLabel: "Add Pattern", patternFields: ["color", "colorIntensity"] },
  foundation: { hasStyle: false, hasColor: true, hasFinish: true, finishOptions: ["Matte", "Dewy", "Satin"], hasFinishAdjust: false, patternFields: ["colorIntensity"] },
};

function getARConfig(subcategory) {
  return AR_SETTINGS_CONFIG[subcategory?.toLowerCase().replace(/\s+/g, "")] || null;
}

const PATTERN_NAMES = {
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
const CATEGORY_TREE = {
  Lifestyle: {
    Eyewear: {
      subcategories: ["Sunglasses", "Eyeglasses", "Smart Glasses", "Lenses"],
      additionalFields: [
        { name: "frameSize", label: "Frame Size", type: "text" },
        { name: "frameShape", label: "Frame Shape", type: "dropdown", options: ["Round", "Square", "Aviator", "Cat Eye", "Rectangle", "Oval", "Wayfarer"] },
        { name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] },
      ],
      sides2D: 4,
      ar: { Sunglasses: true, Eyeglasses: true, "Smart Glasses": false, Lenses: false },
      modelling3D: { Sunglasses: true, Eyeglasses: true, "Smart Glasses": true, Lenses: false },
    },
    Accessories: {
      subcategories: ["Shoes", "Hats", "Caps", "Watches"],
      additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
      sides2D: 1,
      ar: { Shoes: false, Hats: true, Caps: true, Watches: true },
      modelling3D: { Shoes: true, Hats: true, Caps: true, Watches: true },
    },
    Jewellery: {
      subcategories: ["Earring", "Necklace", "Bracelets", "Mangtika", "Rings", "Nose Piercing"],
      additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
      sides2D: 1,
      ar: { Earring: true, Necklace: true, Bracelets: true, Mangtika: true, Rings: true, "Nose Piercing": false },
      modelling3D: { Earring: true, Necklace: true, Bracelets: true, Mangtika: true, Rings: true, "Nose Piercing": true },
    },
    Luggage: {
      subcategories: ["Luggage", "Backpacks", "Totes", "Handbags", "Slingbags"],
      additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
      sides2D: null,
      ar: { Luggage: true, Backpacks: true, Totes: true, Handbags: true, Slingbags: true },
      modelling3D: { Luggage: true, Backpacks: true, Totes: true, Handbags: true, Slingbags: true },
    },
    Apparel: {
      subcategories: ["Topwear", "Bottomwear", "Full Outfit"],
      additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }],
      sides2D: 1,
      ar: { Topwear: false, Bottomwear: false, "Full Outfit": false },
      modelling3D: { Topwear: true, Bottomwear: true, "Full Outfit": true },
    },
  },
  Home: {
    Furniture: { subcategories: ["Furniture"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { Furniture: true }, modelling3D: { Furniture: true } },
    "Floor Decor": { subcategories: ["Floor Decor"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { "Floor Decor": true }, modelling3D: { "Floor Decor": true } },
    "Wall Decor": { subcategories: ["Wall Decor"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { "Wall Decor": true }, modelling3D: { "Wall Decor": true } },
    Lighting: { subcategories: ["Lighting"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { Lighting: true }, modelling3D: { Lighting: true } },
    Kitchen: { subcategories: ["Kitchen"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { Kitchen: true }, modelling3D: { Kitchen: true } },
    Appliances: { subcategories: ["Appliances"], additionalFields: [{ name: "barcode", label: "Barcode", type: "dropdown", options: ["EAN-13", "UPC-A", "Code 128", "QR Code"] }], sides2D: null, ar: { Appliances: true }, modelling3D: { Appliances: true } },
  },
};

function getCategoryData(headCategory, cat) {
  return CATEGORY_TREE[headCategory]?.[cat] || null;
}

// ─── SAMPLE PRODUCTS ───
const INITIAL_PRODUCTS = [
  // Lifestyle
  { id: "p1", name: "Classic Aviator", skuId: "SKU-001", category: "Eyewear", subcategory: "Sunglasses", headCategory: "Lifestyle", status: "active", date: "2026-03-10", variants: [{ id: "v1", name: "Gold", color: "#D4A574", dimension: "140 x 50 x 45 mm", price: "2499" }, { id: "v2", name: "Silver", color: "#C0C0C0", dimension: "140 x 50 x 45 mm", price: "2299" }] },
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

function createProductId(headCategory) {
  const prefix = headCategory === "Beauty" ? "b" : headCategory === "Home" ? "h" : "p";
  return `${prefix}-${Date.now()}`;
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function slugToName(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function buildSkuFromName(name, fallbackPrefix = "SKU") {
  const letters = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6) || fallbackPrefix;
  return `${fallbackPrefix}-${letters}`;
}

function getGeneralInitialForm(editProduct) {
  return {
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    productName: editProduct?.name || "",
    skuId: editProduct?.skuId || "",
    additionalFields: editProduct?.additionalFields || {},
    imageTab: editProduct?.media?.imageTab || "productImages",
    is2D: editProduct?.media?.is2D || false,
    hasImages: editProduct?.media?.hasImages || false,
    hasModel: editProduct?.media?.hasModel || false,
    productUrl: editProduct?.productUrl || "",
    costPrice: editProduct?.costPrice || "",
    sellingPrice: editProduct?.sellingPrice || editProduct?.variants?.[0]?.price || "",
    dimension: editProduct?.dimension || editProduct?.variants?.[0]?.dimension || "",
    hasThumbnail: editProduct?.media?.hasThumbnail || false,
  };
}

function getBeautyInitialForm(editProduct) {
  return {
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    productName: editProduct?.name || "",
    skuId: editProduct?.skuId || "",
    additionalFields: editProduct?.additionalFields || {},
    costPrice: editProduct?.costPrice || "",
    sellingPrice: editProduct?.sellingPrice || editProduct?.variants?.[0]?.price || "",
    hasThumbnail: editProduct?.media?.hasThumbnail || false,
  };
}

function mapGeneralVariantsForEditor(product) {
  return (product?.variants || []).map((variant, index) => ({
    id: variant.id || `var-${Date.now()}-${index}`,
    name: variant.name || `Variant ${index + 1}`,
    attributes: variant.attributes || [{ attr: "Variant", val: variant.name || `Variant ${index + 1}` }],
    variantId: variant.variantId || "",
    dimension: variant.dimension || "",
    price: variant.price || "",
    color: variant.color || "",
  }));
}

function mapBeautyVariantsForEditor(product) {
  return (product?.variants || []).map((variant, index) => ({
    id: variant.id || `var-${Date.now()}-${index}`,
    name: variant.name || `Variant ${index + 1}`,
    attributes: variant.attributes || [{ attr: "Variant", val: variant.name || `Variant ${index + 1}` }],
    variantId: variant.variantId || "",
    price: variant.price || "",
    color: variant.color || "",
  }));
}

// ─── STYLES ───
const S = {
  app: { display: "flex", height: "100vh", fontFamily: "'DM Sans', -apple-system, sans-serif", background: "#f7f7f8", color: "#1a1a1a", fontSize: 13 },
  sidebar: { width: 230, background: "#141414", color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 },
  sidebarLogo: { padding: "18px 22px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #2a2a2a", fontSize: 17, fontWeight: 700, letterSpacing: -0.5 },
  sidebarSection: { padding: "16px 22px 6px", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#555" },
  sidebarItem: (a) => ({ padding: "9px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: a ? "#fff" : "#888", background: a ? "rgba(255,255,255,0.06)" : "transparent", borderLeft: a ? "3px solid #f43f5e" : "3px solid transparent" }),
  sidebarSub: (a) => ({ padding: "7px 22px 7px 52px", cursor: "pointer", fontSize: 12.5, color: a ? "#f43f5e" : "#777", fontWeight: a ? 600 : 400 }),
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { height: 54, background: "#fff", borderBottom: "1px solid #eaeaea", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 },
  content: { flex: 1, overflow: "auto", padding: "28px 32px" },
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
    const c = { active: { bg: "#ecfdf5", cl: "#166534", bd: "#bbf7d0" }, inactive: { bg: "#f5f5f5", cl: "#737373", bd: "#e5e5e5" }, yes: { bg: "#ecfdf5", cl: "#166534", bd: "#bbf7d0" }, no: { bg: "#fef2f2", cl: "#991b1b", bd: "#fecaca" } };
    const s = c[v] || c.inactive;
    return { display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: s.bg, color: s.cl, border: `1px solid ${s.bd}` };
  },
  upZone: { border: "2px dashed #d4d4d4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", background: "#fafafa", minHeight: 100, transition: "all 0.2s" },
};

// ─── SHARED SMALL COMPONENTS ───
function DD({ label, value, onChange, options, placeholder, required }) {
  return (
    <div>
      {label && <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>}
      <div style={{ position: "relative" }}>
        <select style={S.select} value={value} onChange={e => onChange(e.target.value)}>
          <option value="">{placeholder || "Select..."}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#aaa" }} />
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      {label && <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>}
      <input style={S.input} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
    </div>
  );
}

function UBox({ label, small }) {
  return (
    <div style={{ ...S.upZone, padding: small ? 16 : 24, minHeight: small ? 80 : 100 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#f43f5e"; e.currentTarget.style.background = "#fff5f6"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4d4d4"; e.currentTarget.style.background = "#fafafa"; }}>
      <Upload size={small ? 16 : 20} color="#bbb" />
      <span style={{ fontSize: small ? 11.5 : 12.5, color: "#aaa", fontWeight: 500 }}>{label || "Upload"}</span>
    </div>
  );
}

function Tog({ on, onToggle, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {label && <span style={{ fontSize: 12.5, color: "#666", fontWeight: 500 }}>{label}</span>}
      <div onClick={onToggle} style={{ width: 42, height: 24, borderRadius: 12, cursor: "pointer", background: on ? "#141414" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: on ? "translateX(18px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

// ─── BEAUTY-ONLY COMPONENTS ───
function ColorPicker({ color, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input style={{ ...S.input, width: 160 }} value={color} onChange={e => onChange(e.target.value)} placeholder="#ff0000" />
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color || "#ff0000", border: "1px solid #e5e5e5", flexShrink: 0, cursor: "pointer" }}>
        <input type="color" value={color || "#ff0000"} onChange={e => onChange(e.target.value)} style={{ opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} />
      </div>
    </div>
  );
}

function SliderField({ label, value, onChange, required }) {
  return (
    <div>
      <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fafafa", border: "1px solid #eaeaea", borderRadius: 10, padding: "12px 16px" }}>
        <input type="range" min="0" max="100" value={value} onChange={e => onChange(parseInt(e.target.value))}
          style={{ flex: 1, height: 6, borderRadius: 3, appearance: "none", background: `linear-gradient(to right, #141414 ${value}%, #e5e5e5 ${value}%)`, outline: "none", cursor: "pointer" }} />
        <span style={{ fontSize: 14, fontWeight: 600, minWidth: 32, textAlign: "right" }}>{value}</span>
      </div>
    </div>
  );
}

// ─── SIDEBAR ───
function Sidebar({ activePage, onNavigate }) {
  return (
    <div style={S.sidebar}>
      <div style={S.sidebarLogo}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #f43f5e, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff" }}>O</div>
        Pixelbin
      </div>
      <div style={{ flex: 1, paddingTop: 4, overflowY: "auto" }}>
        <div style={S.sidebarSection}>GlamAR</div>
        {["Overview", "Analytics", "3D Assets"].map(i => <div key={i} style={S.sidebarItem(false)}>{i}</div>)}
        <div style={S.sidebarSection}>AR Solutions</div>
        <div style={S.sidebarItem(activePage === "products")} onClick={() => onNavigate("products")}>Try-ons</div>
        {["Products", "SDK Configuration", "Looks Builder", "Integration"].map((i, idx) => <div key={i} style={S.sidebarSub(activePage === "products" && idx === 0)}>{i}</div>)}
        <div style={S.sidebarItem(false)}>AR Ads</div>
        <div style={S.sidebarSection}>AI Solutions</div>
        <div style={S.sidebarItem(false)}>AI Facial Skin Analysis</div>
        <div style={S.sidebarItem(activePage === "aiStylist")} onClick={() => onNavigate("aiStylist")}>AI Stylist</div>
      </div>
      <div style={{ padding: "14px 22px", borderTop: "1px solid #2a2a2a", fontSize: 12.5, color: "#666" }}>Docs</div>
    </div>
  );
}

function Topbar() {
  return (
    <div style={S.topbar}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>Mumbai</span>
        <ChevronDown size={12} color="#aaa" />
        <span style={{ fontSize: 13, color: "#888", fontWeight: 500, marginLeft: 12 }}>Hub Name</span>
        <ChevronDown size={12} color="#aaa" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{ ...S.btnO, padding: "7px 16px", fontSize: 12.5, borderRadius: 8 }}>Book a demo</button>
        <button style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Upgrade</button>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#f5e6d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#8B4513", marginLeft: 6 }}>FV</div>
      </div>
    </div>
  );
}

// ─── SHARED LISTING TABS + HEADER ───
function ListingHeader({ activeTab, setActiveTab, onAddProduct }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Product Inventory</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={S.btnO}><Link size={15} /> Import</button>
          <button style={S.btnP} onClick={onAddProduct}><Plus size={15} /> Add Product</button>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #eaeaea", marginBottom: 24 }}>
        {["Lifestyle", "Beauty", "Home"].map(t => (
          <div key={t} style={S.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── ACTIONS MENU (shared) ───
function ActionMenu({ product, openMenu, setOpenMenu, onToggleStatus, onEditProduct }) {
  return (
    <td style={{ ...S.td, textAlign: "right", position: "relative" }}>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
        onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === product.id ? null : product.id); }}>
        <MoreVertical size={16} color="#aaa" />
      </button>
      {openMenu === product.id && (
        <div style={{ position: "absolute", right: 18, top: "100%", background: "#fff", border: "1px solid #eaeaea", borderRadius: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.08)", zIndex: 50, minWidth: 180, overflow: "hidden", marginTop: -4 }}>
          {[
            { icon: product.status === "active" ? <ToggleRight size={15} /> : <ToggleLeft size={15} />, label: product.status === "active" ? "Set Inactive" : "Set Active", action: () => onToggleStatus(product.id) },
            { icon: <Eye size={15} />, label: "Preview" },
            { icon: <Edit3 size={15} />, label: "Edit Product", action: () => onEditProduct(product) },
            { icon: <Copy size={15} />, label: "Duplicate" },
            { divider: true },
            { icon: <Trash2 size={15} color="#dc2626" />, label: "Delete Product", danger: true },
          ].map((item, i) => item.divider ? (
            <div key={i} style={{ height: 1, background: "#f0f0f0", margin: "4px 0" }} />
          ) : (
            <div key={i} style={{ padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, cursor: "pointer", color: item.danger ? "#dc2626" : "#333" }}
              onClick={e => { e.stopPropagation(); setOpenMenu(null); item.action?.(); }}
              onMouseEnter={e => e.currentTarget.style.background = "#f7f7f8"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      )}
    </td>
  );
}

// ─── LIFESTYLE / HOME LISTING ───
function GeneralListing({ products, activeTab, setActiveTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const filtered = products.filter(p =>
    p.headCategory === activeTab &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skuId.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );
  const cols = ["Thumbnail", "SKU ID", "Product Name", "Category", "Variants", "3D Preview", "Date", "Status", "Actions"];

  return (
    <div>
      <ListingHeader activeTab={activeTab} setActiveTab={setActiveTab} onAddProduct={onAddProduct} />
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
          <input style={{ ...S.input, paddingLeft: 40 }} placeholder="Search by product name, SKU ID, category..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button style={{ ...S.btnO, padding: "10px 14px" }}><Filter size={16} /></button>
        <button style={{ ...S.btnO, padding: "10px 14px" }}><LayoutGrid size={16} /></button>
      </div>
      <div style={S.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{cols.map((h, i) => <th key={h} style={{ ...S.th, textAlign: i === cols.length - 1 ? "right" : "left" }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={cols.length} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb", fontSize: 14 }}>No products in {activeTab}</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => onViewProduct(p)}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={S.td}><div style={{ width: 52, height: 52, borderRadius: 10, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={20} color="#ccc" /></div></td>
                <td style={{ ...S.td, fontWeight: 700, fontFamily: "monospace", fontSize: 12.5 }}>{p.skuId}</td>
                <td style={{ ...S.td, fontWeight: 500 }}>{p.name}</td>
                <td style={S.td}><span style={{ color: "#999", fontSize: 12.5 }}>{p.category}</span><span style={{ margin: "0 5px", color: "#ddd" }}>&rsaquo;</span><span style={{ fontSize: 12.5 }}>{p.subcategory}</span></td>
                <td style={{ ...S.td, fontWeight: 600 }}>{p.variants.length}</td>
                <td style={S.td}><div style={{ width: 48, height: 48, borderRadius: 8, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><Box size={18} color="#ccc" /></div></td>
                <td style={{ ...S.td, fontSize: 12.5, color: "#999" }}>{p.date}</td>
                <td style={S.td}><span style={S.badge(p.status)}>{p.status}</span></td>
                <ActionMenu product={p} openMenu={openMenu} setOpenMenu={setOpenMenu} onToggleStatus={onToggleStatus} onEditProduct={onEditProduct} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BEAUTY LISTING ───
function BeautyListing({ products, activeTab, setActiveTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const filtered = products.filter(p =>
    p.headCategory === "Beauty" &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skuId.toLowerCase().includes(search.toLowerCase()) || p.subcategory.toLowerCase().includes(search.toLowerCase()))
  );
  const cols = ["Thumbnail", "SKU ID", "Product Name", "Category", "Variants", "AR", "Date", "Status", "Actions"];

  return (
    <div>
      <ListingHeader activeTab={activeTab} setActiveTab={setActiveTab} onAddProduct={onAddProduct} />
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
          <input style={{ ...S.input, paddingLeft: 40 }} placeholder="Search by product name, SKU ID, category..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button style={{ ...S.btnO, padding: "10px 14px" }}><Filter size={16} /></button>
        <button style={{ ...S.btnO, padding: "10px 14px" }}><LayoutGrid size={16} /></button>
      </div>
      <div style={S.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{cols.map((h, i) => <th key={h} style={{ ...S.th, textAlign: i === cols.length - 1 ? "right" : "left" }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={cols.length} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb" }}>No beauty products found</td></tr>
            ) : filtered.map(p => {
              const hasAR = BEAUTY_CATEGORIES[p.category]?.ar?.[p.subcategory];
              return (
                <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => onViewProduct(p)}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={S.td}><div style={{ width: 52, height: 52, borderRadius: 10, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={20} color="#ccc" /></div></td>
                  <td style={{ ...S.td, fontWeight: 700, fontFamily: "monospace", fontSize: 12.5 }}>{p.skuId}</td>
                  <td style={{ ...S.td, fontWeight: 500 }}>{p.name}</td>
                  <td style={S.td}><span style={{ color: "#999", fontSize: 12.5 }}>{p.category}</span><span style={{ margin: "0 5px", color: "#ddd" }}>&rsaquo;</span><span style={{ fontSize: 12.5 }}>{p.subcategory}</span></td>
                  <td style={{ ...S.td, fontWeight: 600 }}>{p.variants.length}</td>
                  <td style={S.td}><span style={S.badge(hasAR ? "yes" : "no")}>{hasAR ? "Yes" : "No"}</span></td>
                  <td style={{ ...S.td, fontSize: 12.5, color: "#999" }}>{p.date}</td>
                  <td style={S.td}><span style={S.badge(p.status)}>{p.status}</span></td>
                  <ActionMenu product={p} openMenu={openMenu} setOpenMenu={setOpenMenu} onToggleStatus={onToggleStatus} onEditProduct={onEditProduct} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── VARIANT EDITOR (Lifestyle / Home) ───
function VariantEditor({ variantOptions, setVariantOptions, variants, setVariants, has3D }) {
  const [editingOption, setEditingOption] = useState(null);
  const [newValue, setNewValue] = useState("");

  const generateVariants = (opts) => {
    if (opts.length === 0) { setVariants([]); return; }
    const combos = opts.reduce((acc, opt) => {
      if (acc.length === 0) return opt.values.map(v => [{ attr: opt.name, val: v }]);
      const next = [];
      acc.forEach(c => opt.values.forEach(v => next.push([...c, { attr: opt.name, val: v }])));
      return next;
    }, []);
    setVariants(combos.map((combo, i) => ({ id: `var-${Date.now()}-${i}`, name: combo.map(c => c.val).join(" / "), attributes: combo, variantId: "", dimension: "", price: "" })));
  };

  const doneEditing = () => {
    if (!editingOption.name.trim() || editingOption.values.length === 0) return;
    const newOpts = [...variantOptions, { name: editingOption.name, values: editingOption.values }];
    setVariantOptions(newOpts);
    generateVariants(newOpts);
    setEditingOption(null);
  };

  const removeOption = (idx) => {
    const newOpts = variantOptions.filter((_, i) => i !== idx);
    setVariantOptions(newOpts);
    generateVariants(newOpts);
  };

  const updateVariant = (id, key, val) => setVariants(variants.map(v => v.id === id ? { ...v, [key]: val } : v));

  return (
    <div style={{ ...S.card, padding: 28, marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Variants</div>
        {(variantOptions.length > 0 || variants.length > 0) && (
          <button onClick={() => { setVariantOptions([]); setVariants([]); setEditingOption(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            <Trash2 size={13} /> Remove all variants
          </button>
        )}
      </div>

      {variantOptions.map((opt, oi) => (
        <div key={oi} style={{ background: "#fafafa", borderRadius: 10, padding: 16, border: "1px solid #f0f0f0", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><span style={{ fontSize: 13, fontWeight: 600 }}>{opt.name}</span><span style={{ fontSize: 12.5, color: "#999", marginLeft: 10 }}>{opt.values.join(", ")}</span></div>
          <button onClick={() => removeOption(oi)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={14} color="#999" /></button>
        </div>
      ))}

      {editingOption && (
        <div style={{ background: "#fafafa", borderRadius: 12, padding: 22, border: "1px solid #eaeaea", marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Option name</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GripVertical size={16} color="#ccc" />
              <input style={{ ...S.input, background: "#fff" }} value={editingOption.name} onChange={e => setEditingOption({ ...editingOption, name: e.target.value })} placeholder="e.g. Color, Size, Material"
                onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Option values</label>
            {editingOption.values.map((v, vi) => (
              <div key={vi} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <GripVertical size={16} color="#ccc" />
                <input style={{ ...S.input, background: "#fff" }} value={v} readOnly />
                <button onClick={() => setEditingOption({ ...editingOption, values: editingOption.values.filter((_, i) => i !== vi) })} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={14} color="#999" /></button>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16 }} />
              <input style={{ ...S.input, background: "#fff" }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Add another value"
                onKeyDown={e => { if (e.key === "Enter" && newValue.trim()) { setEditingOption({ ...editingOption, values: [...editingOption.values, newValue.trim()] }); setNewValue(""); } }}
                onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setEditingOption(null)} style={{ background: "#f5f5f5", color: "#dc2626", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Delete</button>
            <button onClick={doneEditing} style={{ ...S.btnP, padding: "8px 22px", fontSize: 13 }}>Done</button>
          </div>
        </div>
      )}

      {variants.length > 0 && !editingOption && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12.5, color: "#999", marginBottom: 12 }}>{variants.length} variant{variants.length !== 1 ? "s" : ""} generated</div>
          {variants.map(v => (
            <div key={v.id} style={{ border: "1px solid #eaeaea", borderRadius: 12, padding: 20, marginBottom: 12, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={18} color="#ccc" /></div>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</div><div style={{ fontSize: 11.5, color: "#999" }}>{v.attributes.map(a => a.attr).join(", ")}</div></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                <Inp label="Variant ID" value={v.variantId} onChange={val => updateVariant(v.id, "variantId", val)} placeholder="e.g. VAR-001" />
                <Inp label="Dimension" value={v.dimension} onChange={val => updateVariant(v.id, "dimension", val)} placeholder="e.g. 140 x 50 x 45 mm" />
                <Inp label="Price" value={v.price} onChange={val => updateVariant(v.id, "price", val)} placeholder="Rs. 0.00" />
              </div>
              {has3D && <div style={{ marginTop: 14 }}><UBox small label="Upload 3D model" /></div>}
            </div>
          ))}
        </div>
      )}

      {!editingOption && (
        <button style={{ ...S.btnP, width: "100%", justifyContent: "center", padding: 16, borderRadius: 12, fontSize: 14 }} onClick={() => setEditingOption({ name: "", values: [] })}>
          <Plus size={16} /> Add Variant
        </button>
      )}
    </div>
  );
}

// ─── LIFESTYLE / HOME ADD PRODUCT FORM ───
function GeneralAddForm({ headCategory, onBack, onSaveProduct, editProduct }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getGeneralInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState([]);
  const [variants, setVariants] = useState(() => mapGeneralVariantsForEditor(editProduct));
  const [error, setError] = useState("");
  const isEditing = Boolean(editProduct);

  const categories = Object.keys(CATEGORY_TREE[headCategory] || {});
  const catData = form.category ? CATEGORY_TREE[headCategory]?.[form.category] : null;
  const subcategories = catData ? catData.subcategories : [];
  const additionalFields = catData ? catData.additionalFields : [];
  const sides2D = catData ? catData.sides2D : null;
  const has3D = catData && form.subcategory ? catData.modelling3D?.[form.subcategory] : false;
  const show2DToggle = sides2D !== null;
  const hasMedia = form.hasImages || form.hasModel;
  const ctaLabel = form.hasModel ? "Continue" : (form.hasImages ? "Generate 3D" : "Continue");
  const sideLabels = { 4: ["Front", "Left", "Right", "Back"], 1: ["Front"] };

  const updateForm = (key, val) => {
    const next = { ...form, [key]: val };
    if (key === "category") { next.subcategory = ""; next.additionalFields = {}; next.is2D = false; next.hasImages = false; next.hasModel = false; }
    setForm(next);
  };

  useEffect(() => {
    setImportLink(editProduct?.productUrl || "");
    setForm(getGeneralInitialForm(editProduct));
    setVariantOptions([]);
    setVariants(mapGeneralVariantsForEditor(editProduct));
    setError("");
  }, [editProduct, headCategory]);

  const handleImportProduct = () => {
    if (!importLink.trim()) {
      setError("Paste a product URL first to import details.");
      return;
    }
    try {
      const url = new URL(importLink.trim());
      const slug = url.pathname.split("/").filter(Boolean).pop() || "Imported Product";
      const productName = slugToName(slug);
      setForm(prev => ({
        ...prev,
        productName: prev.productName || productName,
        skuId: prev.skuId || buildSkuFromName(productName, headCategory === "Home" ? "HM" : "SKU"),
        productUrl: importLink.trim(),
      }));
      setError("");
    } catch {
      setError("Enter a valid product URL to import.");
    }
  };

  const handleSave = (nextView = "listing") => {
    if (!form.category || !form.subcategory || !form.productName.trim() || !form.skuId.trim()) {
      setError("Category, subcategory, product name, and product ID are required.");
      return;
    }

    const nextVariants = variants.length > 0 ? variants.map((variant, index) => ({
      id: variant.id || `var-${Date.now()}-${index}`,
      name: variant.name || `Variant ${index + 1}`,
      attributes: variant.attributes?.length ? variant.attributes : [{ attr: "Variant", val: variant.name || `Variant ${index + 1}` }],
      variantId: variant.variantId || "",
      dimension: variant.dimension || form.dimension || "",
      price: variant.price || form.sellingPrice || "",
      color: variant.color || "",
    })) : [{
      id: `var-${Date.now()}-0`,
      name: "Default",
      attributes: [{ attr: "Variant", val: "Default" }],
      variantId: form.skuId.trim(),
      dimension: form.dimension || "",
      price: form.sellingPrice || "",
      color: "",
    }];

    onSaveProduct({
      id: editProduct?.id || createProductId(headCategory),
      name: form.productName.trim(),
      skuId: form.skuId.trim(),
      category: form.category,
      subcategory: form.subcategory,
      headCategory,
      status: editProduct?.status || "active",
      date: editProduct?.date || getTodayDate(),
      variants: nextVariants,
      additionalFields: form.additionalFields,
      productUrl: form.productUrl.trim(),
      costPrice: form.costPrice,
      sellingPrice: form.sellingPrice,
      dimension: form.dimension,
      media: {
        hasImages: form.hasImages,
        hasModel: form.hasModel,
        is2D: form.is2D,
        imageTab: form.imageTab,
        hasThumbnail: form.hasThumbnail,
      },
    }, nextView);
    setError("");
  };

  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={onBack}>
          <ArrowLeft size={20} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{isEditing ? "Edit Product" : "Add Product"}</h1>
          <span style={{ fontSize: 12.5, color: "#999", background: "#f2f2f2", padding: "3px 12px", borderRadius: 20, fontWeight: 500 }}>{headCategory}</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={S.btnO} onClick={onBack}>Cancel</button>
          <button style={S.btnP} onClick={() => handleSave("listing")}>Save Product</button>
          {has3D && (
            <button style={hasMedia ? S.btnG : S.btnDisabled} onClick={() => hasMedia && handleSave("productDetail")} disabled={!hasMedia}>
              <Box size={15} /> {ctaLabel}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 13.5 }}>
          {error}
        </div>
      )}

      <div style={{ ...S.card, padding: 22, marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Link size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
            <input style={{ ...S.input, paddingLeft: 40 }} placeholder="Paste product URL to auto-import..." value={importLink} onChange={e => setImportLink(e.target.value)} />
          </div>
          <button style={S.btnG} onClick={handleImportProduct}>Import Product</button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
        <span style={{ fontSize: 11, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>or fill manually</span>
        <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
      </div>

      <div style={{ ...S.card, padding: 28, marginBottom: 22 }}>
        <div style={{ marginBottom: 24 }}>
          <label style={S.label}>Product Thumbnail</label>
          <div onClick={() => updateForm("hasThumbnail", true)}>
            <UBox label="Upload product thumbnail" />
          </div>
          {form.hasThumbnail && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 10, fontWeight: 500 }}>Thumbnail selected</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          <DD label="Category" value={form.category} onChange={v => updateForm("category", v)} options={categories} placeholder="Select category" />
          <DD label="Subcategory" value={form.subcategory} onChange={v => updateForm("subcategory", v)} options={subcategories} placeholder="Select subcategory" />
        </div>
        {variants.length === 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
            <Inp label="Product ID" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. SKU-001" />
            <Inp label="Product Name" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Classic Aviator" />
          </div>
        ) : (
          <div style={{ marginBottom: 24 }}><Inp label="Product Name" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Classic Aviator" /></div>
        )}
        {additionalFields.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Additional Details</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(additionalFields.length, 3)}, 1fr)`, gap: 18 }}>
              {additionalFields.map(f =>
                f.type === "text" ? (
                  <Inp key={f.name} label={f.label} value={form.additionalFields[f.name] || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, [f.name]: v })} placeholder={`Enter ${f.label.toLowerCase()}`} />
                ) : (
                  <DD key={f.name} label={f.label} value={form.additionalFields[f.name] || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, [f.name]: v })} options={f.options} placeholder={`Select ${f.label.toLowerCase()}`} />
                )
              )}
            </div>
          </div>
        )}
        {variants.length === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 24 }}>
            <Inp label="Cost Price" value={form.costPrice} onChange={v => updateForm("costPrice", v)} placeholder="Rs. 0.00" />
            <Inp label="Selling Price" value={form.sellingPrice} onChange={v => updateForm("sellingPrice", v)} placeholder="Rs. 0.00" />
            <Inp label="Dimension" value={form.dimension} onChange={v => updateForm("dimension", v)} placeholder="e.g. 140 x 50 x 45 mm" />
          </div>
        )}

        {form.category && (
          <div style={{ padding: 24, background: "#fafafa", borderRadius: 12, border: "1px solid #f0f0f0", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Media</span>
              {show2DToggle && <Tog on={form.is2D} onToggle={() => updateForm("is2D", !form.is2D)} label="2D" />}
            </div>
            {!form.is2D && (
              <>
                <div style={{ display: "flex", marginBottom: 18, background: "#e5e5e5", borderRadius: 10, padding: 3 }}>
                  {["productImages", "model"].map(tab => (
                    <div key={tab} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", background: form.imageTab === tab ? "#141414" : "transparent", color: form.imageTab === tab ? "#fff" : "#888" }}
                      onClick={() => updateForm("imageTab", tab)}>
                      {tab === "productImages" ? "Product Images" : "Model"}
                    </div>
                  ))}
                </div>
                {form.imageTab === "productImages" && (
                  <div>
                    <p style={{ fontSize: 12.5, color: "#999", marginBottom: 14 }}>Upload product images (up to 7)</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                      {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} onClick={() => updateForm("hasImages", true)}><UBox small label={`Image ${i}`} /></div>)}
                    </div>
                    {form.hasImages && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 10, fontWeight: 500 }}>Images uploaded</p>}
                  </div>
                )}
                {form.imageTab === "model" && (
                  <div onClick={() => updateForm("hasModel", true)}>
                    <UBox label="Upload 3D model or add from library" />
                    {form.hasModel && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 10, fontWeight: 500 }}>Model uploaded</p>}
                  </div>
                )}
              </>
            )}
            {form.is2D && (
              <div>
                <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "#854d0e", display: "flex", alignItems: "center", gap: 10 }}>
                  <Info size={16} /> Upload high-quality images from different angles for better 3D generation
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${sides2D}, 1fr)`, gap: 14 }}>
                  {(sideLabels[sides2D] || ["Front"]).map((side, i) => (
                    <div key={i} onClick={() => updateForm("hasImages", true)}>
                      <span style={{ fontSize: 12, color: "#777", marginBottom: 6, display: "block", fontWeight: 500 }}>{side}</span>
                      <UBox small label={side} />
                    </div>
                  ))}
                </div>
                {form.hasImages && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 10, fontWeight: 500 }}>Images uploaded</p>}
              </div>
            )}
          </div>
        )}
        <Inp label="Product URL" value={form.productUrl} onChange={v => updateForm("productUrl", v)} placeholder="https://example.com/product" />
      </div>

      <VariantEditor variantOptions={variantOptions} setVariantOptions={setVariantOptions} variants={variants} setVariants={setVariants} has3D={has3D} />
    </div>
  );
}

// ─── BEAUTY ADD PRODUCT FORM ───
function BeautyAddForm({ onBack, onSaveProduct, editProduct }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getBeautyInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState([]);
  const [variants, setVariants] = useState(() => mapBeautyVariantsForEditor(editProduct));
  const [editingOption, setEditingOption] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState("");
  const isEditing = Boolean(editProduct);

  const categories = Object.keys(BEAUTY_CATEGORIES);
  const catData = form.category ? BEAUTY_CATEGORIES[form.category] : null;
  const subcategories = catData ? catData.subcategories : [];
  const additionalFields = catData ? catData.additionalFields : [];
  const hasAR = catData && form.subcategory ? catData.ar?.[form.subcategory] : false;

  const updateForm = (key, val) => {
    const next = { ...form, [key]: val };
    if (key === "category") { next.subcategory = ""; next.additionalFields = {}; }
    setForm(next);
  };

  useEffect(() => {
    setImportLink(editProduct?.productUrl || "");
    setForm(getBeautyInitialForm(editProduct));
    setVariantOptions([]);
    setVariants(mapBeautyVariantsForEditor(editProduct));
    setEditingOption(null);
    setNewValue("");
    setError("");
  }, [editProduct]);

  const handleImportProduct = () => {
    if (!importLink.trim()) {
      setError("Paste a product URL first to import details.");
      return;
    }
    try {
      const url = new URL(importLink.trim());
      const slug = url.pathname.split("/").filter(Boolean).pop() || "Imported Product";
      const productName = slugToName(slug);
      setForm(prev => ({
        ...prev,
        productName: prev.productName || productName,
        skuId: prev.skuId || buildSkuFromName(productName, "BT"),
      }));
      setError("");
    } catch {
      setError("Enter a valid product URL to import.");
    }
  };

  const handleSave = (nextView = "listing") => {
    if (!form.category || !form.subcategory || !form.productName.trim() || !form.skuId.trim()) {
      setError("Category, subcategory, product name, and SKU ID are required.");
      return;
    }

    const nextVariants = variants.length > 0 ? variants.map((variant, index) => ({
      id: variant.id || `var-${Date.now()}-${index}`,
      name: variant.name || `Variant ${index + 1}`,
      attributes: variant.attributes?.length ? variant.attributes : [{ attr: "Variant", val: variant.name || `Variant ${index + 1}` }],
      variantId: variant.variantId || "",
      price: variant.price || form.sellingPrice || "",
      color: variant.color || "",
    })) : [{
      id: `var-${Date.now()}-0`,
      name: "Default",
      attributes: [{ attr: "Variant", val: "Default" }],
      variantId: form.skuId.trim(),
      price: form.sellingPrice || "",
      color: "",
    }];

    onSaveProduct({
      id: editProduct?.id || createProductId("Beauty"),
      name: form.productName.trim(),
      skuId: form.skuId.trim(),
      category: form.category,
      subcategory: form.subcategory,
      headCategory: "Beauty",
      status: editProduct?.status || "active",
      date: editProduct?.date || getTodayDate(),
      variants: nextVariants,
      additionalFields: form.additionalFields,
      productUrl: importLink.trim(),
      costPrice: form.costPrice,
      sellingPrice: form.sellingPrice,
      media: {
        hasThumbnail: form.hasThumbnail,
      },
    }, nextView);
    setError("");
  };

  const doneEditing = () => {
    if (!editingOption.name.trim() || editingOption.values.length === 0) return;
    const newOpts = [...variantOptions, editingOption];
    setVariantOptions(newOpts);
    const combos = newOpts.reduce((acc, opt) => {
      if (acc.length === 0) return opt.values.map(v => [{ attr: opt.name, val: v }]);
      const next = []; acc.forEach(c => opt.values.forEach(v => next.push([...c, { attr: opt.name, val: v }]))); return next;
    }, []);
    setVariants(combos.map((c, i) => ({ id: `var-${Date.now()}-${i}`, name: c.map(x => x.val).join(" / "), attributes: c, variantId: "", price: "" })));
    setEditingOption(null);
  };

  const removeOption = (idx) => {
    const newOpts = variantOptions.filter((_, i) => i !== idx);
    setVariantOptions(newOpts);
    if (newOpts.length === 0) { setVariants([]); return; }
    const combos = newOpts.reduce((acc, opt) => {
      if (acc.length === 0) return opt.values.map(v => [{ attr: opt.name, val: v }]);
      const next = []; acc.forEach(c => opt.values.forEach(v => next.push([...c, { attr: opt.name, val: v }]))); return next;
    }, []);
    setVariants(combos.map((c, i) => ({ id: `var-${Date.now()}-${i}`, name: c.map(x => x.val).join(" / "), attributes: c, variantId: "", price: "" })));
  };

  const updateVariant = (id, key, val) => setVariants(variants.map(v => v.id === id ? { ...v, [key]: val } : v));

  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={onBack}>
          <ArrowLeft size={20} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{isEditing ? "Edit Product" : "Add Product"}</h1>
          <span style={{ fontSize: 12.5, color: "#999", background: "#f2f2f2", padding: "3px 12px", borderRadius: 20, fontWeight: 500 }}>Beauty</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={S.btnO} onClick={onBack}>Cancel</button>
          <button style={S.btnP} onClick={() => handleSave("listing")}>Save Product</button>
          {hasAR && <button style={S.btnG} onClick={() => handleSave("arStudio")}>Continue</button>}
        </div>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 13.5 }}>
          {error}
        </div>
      )}

      <div style={{ ...S.card, padding: 22, marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Link size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
            <input style={{ ...S.input, paddingLeft: 40 }} placeholder="Paste product URL to auto-import..." value={importLink} onChange={e => setImportLink(e.target.value)} />
          </div>
          <button style={S.btnG} onClick={handleImportProduct}>Import Product</button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
        <span style={{ fontSize: 11, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>or fill manually</span>
        <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
      </div>

      <div style={{ ...S.card, padding: 28, marginBottom: 22 }}>
        <div style={{ marginBottom: 24 }}>
          <label style={S.label}>Product Thumbnail</label>
          <div onClick={() => updateForm("hasThumbnail", true)}>
            <UBox label="Upload product thumbnail" />
          </div>
          {form.hasThumbnail && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 10, fontWeight: 500 }}>Thumbnail selected</p>}
        </div>
        <div style={{ marginBottom: 24 }}><Inp label="SKU ID" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. BT-001" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          <DD label="Category" value={form.category} onChange={v => updateForm("category", v)} options={categories} placeholder="Select category" />
          <DD label="Subcategory" value={form.subcategory} onChange={v => updateForm("subcategory", v)} options={subcategories} placeholder="Select subcategory" />
        </div>
        <div style={{ marginBottom: 24 }}><Inp label="Product Name" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Velvet Matte Lipstick" /></div>
        {additionalFields.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Additional Details</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(additionalFields.length, 3)}, 1fr)`, gap: 18 }}>
              {additionalFields.map(f => <DD key={f.name} label={f.label} value={form.additionalFields[f.name] || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, [f.name]: v })} options={f.options} placeholder={`Select ${f.label.toLowerCase()}`} />)}
            </div>
          </div>
        )}
        {variants.length === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Inp label="Cost Price" value={form.costPrice} onChange={v => updateForm("costPrice", v)} placeholder="Rs. 0.00" />
            <Inp label="Selling Price" value={form.sellingPrice} onChange={v => updateForm("sellingPrice", v)} placeholder="Rs. 0.00" />
          </div>
        )}
      </div>

      <div style={{ ...S.card, padding: 28, marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Variants</div>
          {variantOptions.length > 0 && <button onClick={() => { setVariantOptions([]); setVariants([]); setEditingOption(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Trash2 size={13} /> Remove all</button>}
        </div>
        {variantOptions.map((opt, oi) => (
          <div key={oi} style={{ background: "#fafafa", borderRadius: 10, padding: 16, border: "1px solid #f0f0f0", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><span style={{ fontSize: 13, fontWeight: 600 }}>{opt.name}</span><span style={{ fontSize: 12.5, color: "#999", marginLeft: 10 }}>{opt.values.join(", ")}</span></div>
            <button onClick={() => removeOption(oi)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={14} color="#999" /></button>
          </div>
        ))}
        {editingOption && (
          <div style={{ background: "#fafafa", borderRadius: 12, padding: 22, border: "1px solid #eaeaea", marginBottom: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>Option name</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <GripVertical size={16} color="#ccc" />
                <input style={{ ...S.input, background: "#fff" }} value={editingOption.name} onChange={e => setEditingOption({ ...editingOption, name: e.target.value })} placeholder="e.g. Color, Size"
                  onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>Option values</label>
              {editingOption.values.map((v, vi) => (
                <div key={vi} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <GripVertical size={16} color="#ccc" />
                  <input style={{ ...S.input, background: "#fff" }} value={v} readOnly />
                  <button onClick={() => setEditingOption({ ...editingOption, values: editingOption.values.filter((_, i) => i !== vi) })} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={14} color="#999" /></button>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 16 }} />
                <input style={{ ...S.input, background: "#fff" }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Add another value"
                  onKeyDown={e => { if (e.key === "Enter" && newValue.trim()) { setEditingOption({ ...editingOption, values: [...editingOption.values, newValue.trim()] }); setNewValue(""); } }}
                  onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setEditingOption(null)} style={{ background: "#f5f5f5", color: "#dc2626", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer" }}>Delete</button>
              <button onClick={doneEditing} style={{ ...S.btnP, padding: "8px 22px", fontSize: 13 }}>Done</button>
            </div>
          </div>
        )}
        {variants.length > 0 && !editingOption && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12.5, color: "#999", marginBottom: 12 }}>{variants.length} variant{variants.length !== 1 ? "s" : ""}</div>
            {variants.map(v => (
              <div key={v.id} style={{ border: "1px solid #eaeaea", borderRadius: 12, padding: 20, marginBottom: 12, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={18} color="#ccc" /></div>
                  <div><div style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</div><div style={{ fontSize: 11.5, color: "#999" }}>{v.attributes.map(a => a.attr).join(", ")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Inp label="Variant ID" value={v.variantId} onChange={val => updateVariant(v.id, "variantId", val)} placeholder="e.g. VAR-001" />
                  <Inp label="Price" value={v.price} onChange={val => updateVariant(v.id, "price", val)} placeholder="Rs. 0.00" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!editingOption && (
          <button style={{ ...S.btnP, width: "100%", justifyContent: "center", padding: 16, borderRadius: 12, fontSize: 14 }} onClick={() => setEditingOption({ name: "", values: [] })}>
            <Plus size={16} /> Add Variant
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LIFESTYLE / HOME PRODUCT DETAIL ───
function ProductDetail({ product, headCategory, onBack, onPrev, onNext, onEditProduct }) {
  const [previewTab, setPreviewTab] = useState("3d");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const catData = getCategoryData(headCategory, product.category);
  const has3D = catData?.modelling3D?.[product.subcategory];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={onBack}>
          <ArrowLeft size={20} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{product.name}</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnO, padding: "8px 14px" }} onClick={onPrev}><ChevronLeft size={14} /> Previous</button>
          <button style={{ ...S.btnO, padding: "8px 14px" }} onClick={onNext}>Next <ChevronRight size={14} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 300px", gap: 22 }}>
        <div>
          <div style={{ ...S.card, padding: 22, marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Product Info</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#f43f5e", fontSize: 12.5, fontWeight: 600 }} onClick={() => onEditProduct(product)}>Edit</button>
            </div>
            {[{ l: "SKU ID", v: product.skuId }, { l: "Category", v: product.category }, { l: "Subcategory", v: product.subcategory }].map(item => (
              <div key={item.l} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>{item.l}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 2 }}>{item.v}</div>
              </div>
            ))}
            {product.variants[selectedVariant]?.dimension && (
              <div><div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>Dimension</div><div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 2 }}>{product.variants[selectedVariant].dimension}</div></div>
            )}
          </div>
          <div style={{ ...S.card, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Variants</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#f43f5e", fontSize: 12.5, fontWeight: 600 }}>Manage</button>
            </div>
            {product.variants.map((v, i) => (
              <div key={v.id} onClick={() => setSelectedVariant(i)} style={{ padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: selectedVariant === i ? "#141414" : "transparent", color: selectedVariant === i ? "#fff" : "#1a1a1a" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: v.color || "#f0f0f0", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{i + 1}. {v.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...S.card, display: "flex", flexDirection: "column" }}>
          {has3D && (
            <div style={{ display: "flex", background: "#f2f2f2", borderRadius: "12px 12px 0 0", padding: 3 }}>
              {["3d", "ar"].map(tab => (
                <div key={tab} style={{ flex: 1, textAlign: "center", padding: "11px 0", borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: previewTab === tab ? "#141414" : "transparent", color: previewTab === tab ? "#fff" : "#999", textTransform: "uppercase", letterSpacing: 0.5 }}
                  onClick={() => setPreviewTab(tab)}>{tab}</div>
              ))}
            </div>
          )}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340, padding: 28 }}>
            <div style={{ textAlign: "center", color: "#ccc" }}>
              <Box size={56} strokeWidth={1} />
              <p style={{ marginTop: 16, fontSize: 15, fontWeight: 600, color: "#999" }}>Generating 3D</p>
              <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 6 }}>Takes up to 24 Hours</p>
              <div style={{ marginTop: 20, width: 220, height: 4, background: "#f0f0f0", borderRadius: 2, overflow: "hidden", margin: "20px auto 0" }}>
                <div style={{ width: "35%", height: "100%", background: "linear-gradient(90deg, #f43f5e, #ec4899)", borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...S.card, padding: 22, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>AR Settings</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ccc", gap: 10 }}>
            <div style={{ width: 68, height: 68, borderRadius: 14, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}><Package size={28} strokeWidth={1} /></div>
            <p style={{ fontSize: 12.5, color: "#bbb" }}>AR settings will appear here</p>
          </div>
          <button style={{ ...S.btnP, width: "100%", justifyContent: "center", marginTop: "auto" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── AR SETTINGS PANEL (Beauty) ───
function ARSettingsPanel({ subcategory }) {
  const config = getARConfig(subcategory);
  const [color, setColor] = useState("#ff0000");
  const [style, setStyle] = useState("");
  const [finish, setFinish] = useState("Matte");
  const [shimmer, setShimmer] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [patterns, setPatterns] = useState(() => {
    const key = subcategory?.toLowerCase().replace(/\s+/g, "");
    const names = PATTERN_NAMES[key] || ["pattern1"];
    return [{ id: "pat1", name: names[0], colorIntensity: 50, gloss: 50, thickness: 50, smoothness: 50, finish: "Matte", color: "#ff0000" }];
  });
  const [patternCollapse, setPatternCollapse] = useState({});

  if (!config) return (
    <div style={{ padding: 22, textAlign: "center", color: "#bbb" }}>
      <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
      <p style={{ fontSize: 13 }}>AR not available for {subcategory}</p>
    </div>
  );

  const togglePattern = (id) => setPatternCollapse(p => ({ ...p, [id]: !p[id] }));
  const addPattern = () => {
    const key = subcategory?.toLowerCase().replace(/\s+/g, "");
    const names = PATTERN_NAMES[key] || ["pattern"];
    const name = names[patterns.length % names.length] || `pattern${patterns.length + 1}`;
    setPatterns(p => [...p, { id: `pat-${Date.now()}`, name, colorIntensity: 50, gloss: 50, thickness: 50, smoothness: 50, finish: "Matte", color: "#ff0000" }]);
  };
  const updatePattern = (id, key, val) => setPatterns(ps => ps.map(p => p.id === id ? { ...p, [key]: val } : p));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {config.hasStyle && (
        <div style={{ ...S.arSectionCard, padding: 18 }}>
          <DD label="Style" value={style} onChange={setStyle} options={config.styleOptions} placeholder="Select style" />
        </div>
      )}
      {config.hasColor && (
        <div style={{ ...S.arSectionCard, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: config.hasShimmer ? "minmax(0, 1fr) minmax(170px, 220px)" : "minmax(0, 1fr)", gap: 16, alignItems: "end" }}>
            <div style={{ flex: 1 }}>
              <label style={S.labelReq}>Select Color <span style={{ color: "#f43f5e" }}>*</span></label>
              <ColorPicker color={color} onChange={setColor} />
            </div>
            {config.hasShimmer && (
              <div>
                <label style={S.label}>Enable Shimmer</label>
                <div style={{ ...S.arMiniPanel, minHeight: 52 }}>
                  <Tog on={shimmer} onToggle={() => setShimmer(s => !s)} />
                  <span style={{ fontSize: 12.5, color: "#999" }}>{shimmer ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            )}
          </div>
          {config.hasAddColor && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button style={{ ...S.btnPink, width: "auto", height: 42, padding: "0 16px", borderRadius: 12 }} onClick={() => {}}>
                <Plus size={16} /> Add Color
              </button>
            </div>
          )}
        </div>
      )}
      {config.hasFinish && (
        <div style={{ ...S.arSectionCard, padding: 18 }}>
          <DD label="Finish" value={finish} onChange={setFinish} options={config.finishOptions} />
        </div>
      )}
      {!config.hasFinishAdjust && config.patternFields?.includes("colorIntensity") && (
        <div style={{ ...S.arSectionCard, padding: 18 }}>
          <SliderField label="Color Intensity" value={intensity} onChange={setIntensity} required />
        </div>
      )}
      {config.hasFinishAdjust && (
        <div style={{ ...S.arSectionCard, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{config.finishLabel}</h3>
            <button onClick={addPattern} style={{ background: "none", border: "none", cursor: "pointer", color: "#f43f5e", fontSize: 13.5, fontWeight: 600 }}>{config.addLabel}</button>
          </div>
          {patterns.map(pat => (
            <div key={pat.id} style={{ border: "1px solid #ece7e7", borderRadius: 16, marginBottom: 14, overflow: "hidden", background: "#fff", boxShadow: "0 10px 30px rgba(20,20,20,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", cursor: "pointer", background: "#fff7f9" }} onClick={() => togglePattern(pat.id)}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, textTransform: "capitalize" }}>{pat.name}</span>
                  <p style={{ fontSize: 12, color: "#999", marginTop: 3 }}>Pattern controls and preview</p>
                </div>
                {patternCollapse[pat.id] ? <ChevronDown size={18} color="#999" /> : <ChevronUp size={18} color="#999" />}
              </div>
              {!patternCollapse[pat.id] && (
                <div style={{ padding: 18, display: "grid", gridTemplateColumns: "140px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
                  <div style={{ borderRadius: 16, background: "linear-gradient(180deg, #fff7f9, #fbecef)", minHeight: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #f2d9df", gap: 10 }}>
                    <div style={{ width: 54, height: 54, borderRadius: "50%", background: pat.color || "#ff0000", opacity: 0.18 }} />
                    <Palette size={30} color={pat.color || "#e8a0bf"} strokeWidth={1.5} />
                    <span style={{ fontSize: 11.5, color: "#9a6b76", fontWeight: 600 }}>Live swatch</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, alignItems: "start" }}>
                    {config.patternFields.includes("finish") && <DD label="Finish" value={pat.finish} onChange={v => updatePattern(pat.id, "finish", v)} options={["Matte", "Shimmer", "Satin", "Glossy"]} />}
                    {config.patternFields.includes("color") && <div><label style={S.label}>Color</label><ColorPicker color={pat.color} onChange={v => updatePattern(pat.id, "color", v)} /></div>}
                    {config.patternFields.includes("colorIntensity") && <SliderField label="Color Intensity" value={pat.colorIntensity} onChange={v => updatePattern(pat.id, "colorIntensity", v)} required />}
                    {config.patternFields.includes("gloss") && <SliderField label="Gloss" value={pat.gloss} onChange={v => updatePattern(pat.id, "gloss", v)} required />}
                    {config.patternFields.includes("thickness") && <SliderField label="Thickness" value={pat.thickness} onChange={v => updatePattern(pat.id, "thickness", v)} required />}
                    {config.patternFields.includes("smoothness") && <SliderField label="Smoothness" value={pat.smoothness} onChange={v => updatePattern(pat.id, "smoothness", v)} required />}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── AR STUDIO (Beauty) ───
function ARStudio({ product, onBack, onPrev, onNext, onToggleStatus, onEditProduct }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const hasAR = BEAUTY_CATEGORIES[product.category]?.ar?.[product.subcategory];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={onBack}>
          <ArrowLeft size={20} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{product.name}</h1>
          <span style={{ fontSize: 12.5, color: "#999", background: "#f2f2f2", padding: "3px 12px", borderRadius: 20, fontWeight: 500 }}>{product.subcategory}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Tog on={product.status === "active"} onToggle={() => onToggleStatus(product.id)} label={product.status === "active" ? "Active" : "Inactive"} />
          <button style={{ ...S.btnO, padding: "8px 14px" }} onClick={onPrev}><ChevronLeft size={14} /> Previous</button>
          <button style={{ ...S.btnO, padding: "8px 14px" }} onClick={onNext}>Next <ChevronRight size={14} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px minmax(0, 1fr) 420px", gap: 22, alignItems: "start" }}>
        <div>
          <div style={{ ...S.card, padding: 22, marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Product Info</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#f43f5e", fontSize: 12.5, fontWeight: 600 }} onClick={() => onEditProduct(product)}>Edit</button>
            </div>
            {[{ l: "SKU ID", v: product.skuId }, { l: "Category", v: product.category }, { l: "Subcategory", v: product.subcategory }].map(item => (
              <div key={item.l} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>{item.l}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 2 }}>{item.v}</div>
              </div>
            ))}
          </div>
          <div style={{ ...S.card, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Variants</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#f43f5e", fontSize: 12.5, fontWeight: 600 }}>Manage</button>
            </div>
            {product.variants.map((v, i) => (
              <div key={v.id} onClick={() => setSelectedVariant(i)} style={{ padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: selectedVariant === i ? "#141414" : "transparent", color: selectedVariant === i ? "#fff" : "#1a1a1a" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: v.color || "#f0f0f0", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{i + 1}. {v.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...S.card, display: "flex", flexDirection: "column", minHeight: 640 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #eaeaea", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#999" }}>AR Preview</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 380, padding: 28 }}>
            <div style={{ textAlign: "center", color: "#ccc" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #fce4ec, #f8bbd0)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Palette size={48} strokeWidth={1} color="#e91e63" />
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#999" }}>AR Preview</p>
              <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 6 }}>Adjust settings on the right to preview</p>
            </div>
          </div>
        </div>

        <div style={{ ...S.card, display: "flex", flexDirection: "column", minHeight: 640, background: "linear-gradient(180deg, #ffffff 0%, #fff9fa 100%)" }}>
          <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #f0e4e7" }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>AR Settings</div>
            <p style={{ fontSize: 12.5, color: "#8c8c8c" }}>Tune colors, patterns, and finish controls for this product variant.</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>
            {hasAR ? <ARSettingsPanel subcategory={product.subcategory} /> : (
              <div style={{ textAlign: "center", color: "#bbb", paddingTop: 60 }}>
                <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
                <p>AR not available for {product.subcategory}</p>
              </div>
            )}
          </div>
          <div style={{ padding: "16px 22px", borderTop: "1px solid #eaeaea" }}>
            <button style={{ ...S.btnP, width: "100%", justifyContent: "center" }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI STYLIST PAGE ───
const STYLIST_TYPES = [
  { type: "Eyewear Stylist", subtitle: "Frame and lens recommendations" },
  { type: "Makeup Stylist", subtitle: "Looks and color guidance" },
  { type: "AI Personal Stylist", subtitle: "Personalized beauty and fashion insights" },
];

const CREATE_APP_STEPS = [
  { key: "appDetails", label: "App Details" },
  { key: "instructionsQuestions", label: "Instruction & Questions" },
  { key: "reportSetup", label: "Report Setup" },
  { key: "appAppearance", label: "App Appearance" },
];

const DEFAULT_ROUTINE_QUESTIONS = [
  { id: "q1", code: "Q1", prompt: "What is your skin type?", type: "Single Select", required: true },
  { id: "q2", code: "Q2", prompt: "What are your primary skin concerns?", type: "Multi Select", required: true },
  { id: "q3", code: "Q3", prompt: "What products are you currently using?", type: "Multi Select", required: false },
  { id: "q4", code: "Q4", prompt: "Do you use active ingredients like Retinol or AHA/BHA?", type: "Yes / No", required: false },
  { id: "q5", code: "Q5", prompt: "Do you wear sunscreen daily?", type: "Yes / No", required: true },
];

function makeCreateFlow(type) {
  return {
    type,
    currentStep: 0,
    appDetails: {
      name: "",
      storageDuration: "1 year",
      allowedDomains: "www.glamar.io/",
      sdkVersion: "Version 2.0",
      algorithmVersion: "Version 3.0",
      language: "English",
      watermark: true,
    },
    instruction: {
      enabled: true,
      bannerName: "face-scan-banner.png",
      headerText: "Instructions",
      lines: [
        "Ensure you are in a well-lit environment",
        "Remove glasses or any face coverings",
        "Avoid makeup for accurate results",
      ],
      loaderFacts: true,
      facts: [
        "Dehydrated skin is not always dry. Oily skin can be dehydrated too.",
        "Daily SPF helps protect skin from photoaging.",
        "Gentle cleansing can strengthen your skin barrier.",
        "Consistency matters more than adding too many products.",
      ],
    },
    questions: {
      enabled: true,
      items: DEFAULT_ROUTINE_QUESTIONS,
    },
    reportSetup: {
      reportType: "Basic",
      baseDetailsEnabled: true,
      logoName: "logo.png",
      showReportTitle: true,
      showSubtitle: false,
      showUserFaceImage: true,
      showFaceShape: true,
      showFrameShape: true,
      showFrameSize: true,
      showIntroSummary: true,
      showCompatibility: true,
      showCategoryTags: true,
      explanationLength: "Medium",
      explanationCopyLength: "Medium",
      explanationTone: "Friendly",
      showShapeOnly: false,
      occasionEnabled: true,
      occasionCount: 2,
      occasionShowFrameImage: true,
      occasionShowColorPalette: true,
      occasionShowExplanationCopy: true,
      occasionShowSuitability: true,
      occasionShowTags: true,
      detailFaceDataEnabled: true,
      detailFields: {
        PD: true,
        "Skin tone": true,
        "Eye shape": true,
        "Eye color": true,
        "Hair color": true,
        "Frame size": true,
        "Face shape": true,
        "Face width": true,
      },
    },
    appAppearance: {
      typography: "DM Sans",
      theme: "Custom",
      previewMode: "Preview",
      prompt: "",
    },
  };
}

function AIStylistPage({ onFullscreenChange }) {
  const [apps, setApps] = useState([
    { id: "app-1", type: "Eyewear Stylist", name: "Applicant 01", date: "12 June 2025", appId: "5566778899", active: true },
    { id: "app-2", type: "Makeup Stylist", name: "Applicant 01", date: "12 June 2025", appId: "5566778899", active: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [createFlow, setCreateFlow] = useState(null);
  const [toast, setToast] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => () => onFullscreenChange?.(false), [onFullscreenChange]);

  const openCreate = () => {
    setSelectedType("");
    setFormError("");
    setShowModal(true);
    onFullscreenChange?.(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError("");
    if (!createFlow) onFullscreenChange?.(false);
  };

  const handleContinueFromModal = () => {
    if (!selectedType) {
      setFormError("Please select a stylist type.");
      return;
    }
    setFormError("");
    setCreateFlow(makeCreateFlow(selectedType));
    setShowModal(false);
  };

  const updateFlowSection = (section, updates) => {
    setCreateFlow(prev => (prev ? { ...prev, [section]: { ...prev[section], ...updates } } : prev));
  };

  const updateQuestion = (id, updates) => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: prev.questions.items.map(question => (question.id === id ? { ...question, ...updates } : question)),
        },
      };
    });
  };

  const addQuestion = () => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      const nextIndex = prev.questions.items.length + 1;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: [
            ...prev.questions.items,
            { id: `q-${Date.now()}`, code: `Q${nextIndex}`, prompt: "", type: "Single Select", required: false },
          ],
        },
      };
    });
  };

  const removeQuestion = (id) => {
    setCreateFlow(prev => {
      if (!prev || prev.questions.items.length <= 1) return prev;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: prev.questions.items.filter(question => question.id !== id),
        },
      };
    });
  };

  const updateReportDetailField = (field) => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        reportSetup: {
          ...prev.reportSetup,
          detailFields: {
            ...prev.reportSetup.detailFields,
            [field]: !prev.reportSetup.detailFields[field],
          },
        },
      };
    });
  };

  const toggleApp = (id) => setApps(prev => prev.map(a => (a.id === id ? { ...a, active: !a.active } : a)));

  const completion = createFlow ? {
    appDetails: Boolean(createFlow.appDetails.name.trim() && createFlow.appDetails.allowedDomains.trim()),
    instructionsQuestions: (!createFlow.instruction.enabled || createFlow.instruction.lines.filter(line => line.trim()).length >= 3)
      && (!createFlow.questions.enabled || (createFlow.questions.items.length >= 5 && createFlow.questions.items.every(question => question.prompt.trim()))),
    reportSetup: Boolean(createFlow.reportSetup.reportType),
    appAppearance: Boolean(createFlow.appAppearance.typography && createFlow.appAppearance.theme),
  } : {};

  const currentStepIndex = createFlow?.currentStep || 0;
  const currentStep = CREATE_APP_STEPS[currentStepIndex];
  const canMoveNext = createFlow ? completion[currentStep.key] : false;
  const canPublish = createFlow ? CREATE_APP_STEPS.every(step => completion[step.key]) : false;

  const goToStep = (stepIndex) => {
    setCreateFlow(prev => (prev ? { ...prev, currentStep: stepIndex } : prev));
    setFormError("");
  };

  const goPrevious = () => {
    setCreateFlow(prev => (prev ? { ...prev, currentStep: Math.max(prev.currentStep - 1, 0) } : prev));
    setFormError("");
  };

  const goNext = () => {
    if (!createFlow) return;
    if (!canMoveNext) {
      setFormError(`Please complete ${currentStep.label} before moving ahead.`);
      return;
    }
    setFormError("");
    setCreateFlow(prev => (prev ? { ...prev, currentStep: Math.min(prev.currentStep + 1, CREATE_APP_STEPS.length - 1) } : prev));
  };

  const handlePublish = () => {
    if (!createFlow) return;
    if (!canPublish) {
      setFormError("Please complete all sections before publishing the app.");
      return;
    }
    const created = {
      id: `app-${Date.now()}`,
      type: createFlow.type,
      name: createFlow.appDetails.name.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      appId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      active: true,
    };
    setApps(prev => [created, ...prev]);
    setToast(`"${created.name}" has been published.`);
    setCreateFlow(null);
    setFormError("");
    onFullscreenChange?.(false);
  };

  const typeColor = (type) => {
    const map = { "Eyewear Stylist": "#1a1a1a", "Makeup Stylist": "#1a1a1a", "AI Personal Stylist": "#1a1a1a" };
    return map[type] || "#1a1a1a";
  };

  const ToggleSwitch = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 42, height: 22, borderRadius: 12, cursor: "pointer", background: on ? "#f43f5e" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: on ? "translateX(20px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );

  const CardTitle = ({ title, subtitle }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: "#8b8b8b", marginTop: 4 }}>{subtitle}</div>}
    </div>
  );

  const renderStepContent = () => {
    if (!createFlow) return null;

    if (currentStep.key === "appDetails") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18, background: "#fff8fb", borderColor: "#f8d7e2", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12.5, color: "#7a5563" }}>Upgrade to access advanced skin analysis and exclusive tools</span>
            <button style={{ ...S.btnP, background: "#f43f5e", borderRadius: 20, padding: "8px 14px", fontSize: 12 }}>Upgrade plan</button>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="App details" subtitle={`Setup for ${createFlow.type}`} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <Inp
                label="App name"
                value={createFlow.appDetails.name}
                onChange={v => updateFlowSection("appDetails", { name: v })}
                placeholder="Enter app name"
                required
              />
              <div>
                <label style={S.label}>Data storage duration</label>
                <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: "10px 12px", display: "flex", gap: 20 }}>
                  {["None", "1 year", "3 year"].map(option => (
                    <label key={option} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, cursor: "pointer" }}>
                      <input type="radio" name="storageDuration" checked={createFlow.appDetails.storageDuration === option} onChange={() => updateFlowSection("appDetails", { storageDuration: option })} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <Inp
                label="Allowed domains"
                value={createFlow.appDetails.allowedDomains}
                onChange={v => updateFlowSection("appDetails", { allowedDomains: v })}
                placeholder="www.example.com"
                required
              />
              <DD
                label="SDK version"
                value={createFlow.appDetails.sdkVersion}
                onChange={v => updateFlowSection("appDetails", { sdkVersion: v })}
                options={["Version 2.0", "Version 1.9"]}
                placeholder="Select SDK version"
              />
              <DD
                label="Algorithm version"
                value={createFlow.appDetails.algorithmVersion}
                onChange={v => updateFlowSection("appDetails", { algorithmVersion: v })}
                options={["Version 3.0", "Version 2.8"]}
                placeholder="Select algorithm version"
              />
              <DD
                label="Language support"
                value={createFlow.appDetails.language}
                onChange={v => updateFlowSection("appDetails", { language: v })}
                options={["English", "Hindi", "Spanish"]}
                placeholder="Select language"
              />
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show watermark on images</span>
                <ToggleSwitch on={createFlow.appDetails.watermark} onToggle={() => updateFlowSection("appDetails", { watermark: !createFlow.appDetails.watermark })} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep.key === "instructionsQuestions") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Instruction</span>
              <ToggleSwitch on={createFlow.instruction.enabled} onToggle={() => updateFlowSection("instruction", { enabled: !createFlow.instruction.enabled })} />
            </div>
            {createFlow.instruction.enabled ? (
              <>
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Banner (1:1)</label>
                  <UBox label="Upload banner image" />
                  <div style={{ marginTop: 8, fontSize: 11.5, color: "#7f7f7f" }}>Uploaded: {createFlow.instruction.bannerName}</div>
                </div>
                <Inp
                  label="Header text"
                  value={createFlow.instruction.headerText}
                  onChange={v => updateFlowSection("instruction", { headerText: v })}
                  placeholder="Instructions"
                />
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {createFlow.instruction.lines.map((line, index) => (
                    <Inp
                      key={`inst-${index}`}
                      label={`Instruction ${index + 1}`}
                      value={line}
                      onChange={v => {
                        const nextLines = [...createFlow.instruction.lines];
                        nextLines[index] = v;
                        updateFlowSection("instruction", { lines: nextLines });
                      }}
                      placeholder="Enter instruction"
                    />
                  ))}
                </div>
                <div style={{ ...S.card, padding: 16, marginTop: 14, borderColor: "#ececec" }}>
                  <CardTitle title="Customize loader screen" subtitle="Show quick educational facts while AI analyzes results" />
                  <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5 }}>Loader facts</span>
                    <ToggleSwitch on={createFlow.instruction.loaderFacts} onToggle={() => updateFlowSection("instruction", { loaderFacts: !createFlow.instruction.loaderFacts })} />
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {createFlow.instruction.facts.map((fact, index) => (
                      <Inp
                        key={`fact-${index}`}
                        label={`Fact ${index + 1}`}
                        value={fact}
                        onChange={v => {
                          const nextFacts = [...createFlow.instruction.facts];
                          nextFacts[index] = v;
                          updateFlowSection("instruction", { facts: nextFacts });
                        }}
                        placeholder="Enter loader fact"
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Instruction is turned off for this app.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Routine intake questions" subtitle="Configure what users answer before AI builds their routine" />
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Questions</span>
              <ToggleSwitch on={createFlow.questions.enabled} onToggle={() => updateFlowSection("questions", { enabled: !createFlow.questions.enabled })} />
            </div>
            {createFlow.questions.enabled ? (
              <>
                <div style={{ display: "grid", gap: 10 }}>
                  {createFlow.questions.items.map(question => (
                    <div key={question.id} style={{ border: "1px solid #ececec", borderRadius: 12, padding: 12, background: "#fff" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e" }}>{question.code}</span>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
                          title="Remove question"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <Inp
                        value={question.prompt}
                        onChange={v => updateQuestion(question.id, { prompt: v })}
                        placeholder="Question"
                      />
                      <div style={{ display: "grid", gridTemplateColumns: "170px 1fr auto", gap: 10, marginTop: 10, alignItems: "center" }}>
                        <DD
                          value={question.type}
                          onChange={v => updateQuestion(question.id, { type: v })}
                          options={["Single Select", "Multi Select", "Yes / No"]}
                        />
                        <span style={{ fontSize: 12.5, color: "#777" }}>{question.type}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 12, color: "#8a8a8a" }}>Required</span>
                          <ToggleSwitch on={question.required} onToggle={() => updateQuestion(question.id, { required: !question.required })} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ ...S.btnO, width: "100%", justifyContent: "center", marginTop: 10 }} onClick={addQuestion}>+ Add Question</button>
                <div style={{ fontSize: 11.5, color: "#888", marginTop: 8 }}>Keep it to 5-7 questions for best completion rate.</div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Questions are turned off for this app.</div>
            )}
          </div>
        </div>
      );
    }

    if (currentStep.key === "reportSetup") {
      const chip = (active) => ({
        border: `1.5px solid ${active ? "#16a34a" : "#d8d8d8"}`,
        borderRadius: 10,
        background: active ? "#eafbea" : "#fff",
        padding: "7px 14px",
        fontSize: 12.5,
        fontWeight: 600,
        color: "#1a1a1a",
        cursor: "pointer",
      });

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Select report type" subtitle="Choose how detailed your generated report should be" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", gap: 8 }}>
              {["Basic", "Professional", "Advance", "Custom"].map(type => (
                <button
                  key={type}
                  onClick={() => updateFlowSection("reportSetup", { reportType: type })}
                  style={{ border: `1.5px solid ${createFlow.reportSetup.reportType === type ? "#f43f5e" : "#e5e5e5"}`, background: createFlow.reportSetup.reportType === type ? "#fff1f5" : "#fff", color: "#1a1a1a", borderRadius: 10, padding: "12px 10px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 3 }}>{type}</div>
                  <div style={{ fontSize: 11, color: "#777", lineHeight: 1.25 }}>
                    {type === "Basic" && "Only face shape + frame size"}
                    {type === "Professional" && "Shape + size + color"}
                    {type === "Advance" && "Shape + style + occasion + facial data"}
                    {type === "Custom" && "Customize every section manually"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Base report detail" />
              <ToggleSwitch on={createFlow.reportSetup.baseDetailsEnabled} onToggle={() => updateFlowSection("reportSetup", { baseDetailsEnabled: !createFlow.reportSetup.baseDetailsEnabled })} />
            </div>
            {createFlow.reportSetup.baseDetailsEnabled ? (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                  <button style={{ ...S.btnO, borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>Logo</button>
                  <span style={{ fontSize: 12.5, color: "#666" }}>Upload logo here</span>
                </div>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>Show report title</span>
                  <ToggleSwitch on={createFlow.reportSetup.showReportTitle} onToggle={() => updateFlowSection("reportSetup", { showReportTitle: !createFlow.reportSetup.showReportTitle })} />
                </div>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>Show subtitle</span>
                  <ToggleSwitch on={createFlow.reportSetup.showSubtitle} onToggle={() => updateFlowSection("reportSetup", { showSubtitle: !createFlow.reportSetup.showSubtitle })} />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Base report detail is turned off.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Face Scan Hero Section" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["showUserFaceImage", "Show user face image"],
                ["showFaceShape", "Show face shape"],
                ["showFrameShape", "Show frame shape"],
                ["showFrameSize", "Show frame size"],
              ].map(([key, label]) => (
                <div key={key} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>{label}</span>
                  <ToggleSwitch on={createFlow.reportSetup[key]} onToggle={() => updateFlowSection("reportSetup", { [key]: !createFlow.reportSetup[key] })} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show intro summary paragraph</span>
                <ToggleSwitch on={createFlow.reportSetup.showIntroSummary} onToggle={() => updateFlowSection("reportSetup", { showIntroSummary: !createFlow.reportSetup.showIntroSummary })} />
              </div>
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Why this best suits you" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show compatibility %</span>
                <ToggleSwitch on={createFlow.reportSetup.showCompatibility} onToggle={() => updateFlowSection("reportSetup", { showCompatibility: !createFlow.reportSetup.showCompatibility })} />
              </div>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show category tag</span>
                <ToggleSwitch on={createFlow.reportSetup.showCategoryTags} onToggle={() => updateFlowSection("reportSetup", { showCategoryTags: !createFlow.reportSetup.showCategoryTags })} />
              </div>
            </div>
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12.5 }}>Explanation copy length</span>
              <div style={{ display: "flex", gap: 8 }}>
                {["Small", "Medium", "Large"].map(option => (
                  <button key={option} onClick={() => updateFlowSection("reportSetup", { explanationLength: option })} style={chip(createFlow.reportSetup.explanationLength === option)}>{option}</button>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid #ececec", borderRadius: 16, padding: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Explanation copy</div>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: "#666" }}>Length</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Small", "Medium", "Large"].map(option => (
                    <button key={option} onClick={() => updateFlowSection("reportSetup", { explanationCopyLength: option })} style={chip(createFlow.reportSetup.explanationCopyLength === option)}>{option}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 10, alignItems: "start" }}>
                <span style={{ fontSize: 12.5, color: "#666", marginTop: 6 }}>Tone</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Professional", "Friendly", "Premium", "Clinical", "Luxury retail"].map(tone => (
                    <button key={tone} onClick={() => updateFlowSection("reportSetup", { explanationTone: tone })} style={chip(createFlow.reportSetup.explanationTone === tone)}>{tone}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ececec", marginTop: 12, paddingTop: 12 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show only shape-based recommendation</span>
                <ToggleSwitch on={createFlow.reportSetup.showShapeOnly} onToggle={() => updateFlowSection("reportSetup", { showShapeOnly: !createFlow.reportSetup.showShapeOnly })} />
              </div>
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Occasion-Based Looks" />
              <ToggleSwitch on={createFlow.reportSetup.occasionEnabled} onToggle={() => updateFlowSection("reportSetup", { occasionEnabled: !createFlow.reportSetup.occasionEnabled })} />
            </div>
            {createFlow.reportSetup.occasionEnabled ? (
              <>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5 }}>Number of occasions to display</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={createFlow.reportSetup.occasionCount}
                    onChange={e => updateFlowSection("reportSetup", { occasionCount: Math.max(1, Math.min(5, Number(e.target.value) || 1)) })}
                    style={{ ...S.input, width: 70, textAlign: "center", padding: "8px 10px" }}
                  />
                </div>
                <div style={{ fontSize: 11.5, color: "#8a8a8a", marginTop: 6 }}>Note: You can&apos;t add more than 5</div>
                <div style={{ borderTop: "1px solid #ececec", marginTop: 12, paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["occasionShowFrameImage", "Show frame image"],
                    ["occasionShowColorPalette", "Show color palette"],
                    ["occasionShowExplanationCopy", "Show explanation copy"],
                    ["occasionShowSuitability", "Show suitability %"],
                    ["occasionShowTags", "Show tags"],
                  ].map(([key, label]) => (
                    <div key={key} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gridColumn: key === "occasionShowTags" ? "1 / 2" : "auto" }}>
                      <span style={{ fontSize: 12.5 }}>{label}</span>
                      <ToggleSwitch on={createFlow.reportSetup[key]} onToggle={() => updateFlowSection("reportSetup", { [key]: !createFlow.reportSetup[key] })} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Occasion-based looks are turned off.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Detailed Face Data" />
              <ToggleSwitch on={createFlow.reportSetup.detailFaceDataEnabled} onToggle={() => updateFlowSection("reportSetup", { detailFaceDataEnabled: !createFlow.reportSetup.detailFaceDataEnabled })} />
            </div>
            {createFlow.reportSetup.detailFaceDataEnabled ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Object.keys(createFlow.reportSetup.detailFields).map(field => (
                  <div key={field} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5 }}>{field}</span>
                    <ToggleSwitch on={createFlow.reportSetup.detailFields[field]} onToggle={() => updateReportDetailField(field)} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Detailed face data section is turned off.</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...S.card, padding: 18 }}>
          <CardTitle title="Typography" />
          <DD
            value={createFlow.appAppearance.typography}
            onChange={v => updateFlowSection("appAppearance", { typography: v })}
            options={["DM Sans", "Manrope", "Lato", "Poppins"]}
            placeholder="Select typography"
          />
        </div>

        <div style={{ ...S.card, padding: 18 }}>
          <CardTitle title="Choose theme" />
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            {["Light", "Dark", "Custom"].map(theme => (
              <button
                key={theme}
                onClick={() => updateFlowSection("appAppearance", { theme })}
                style={{ border: `1.5px solid ${createFlow.appAppearance.theme === theme ? "#f43f5e" : "#d8d8d8"}`, borderRadius: 10, background: createFlow.appAppearance.theme === theme ? "#fff1f5" : "#fff", padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                {theme}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "#8a8a8a" }}>Preview/code toggle works when Custom theme is selected.</div>
        </div>

        {createFlow.appAppearance.theme === "Custom" && (
          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Custom theme AI assistant" subtitle="Add color tokens or website link and ask AI to generate a theme." />
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, padding: 14, minHeight: 210, background: "#fafafa", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8a8a", fontSize: 16 }}>
              Chat
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8 }}>
              <input
                style={{ ...S.input }}
                value={createFlow.appAppearance.prompt}
                onChange={e => updateFlowSection("appAppearance", { prompt: e.target.value })}
                placeholder="Add your color tokens or website link"
              />
              <button style={{ ...S.btnO, padding: "10px 12px", borderRadius: 8 }}>Sonnet 4.6</button>
              <button style={{ ...S.btnP, padding: "10px 16px", borderRadius: 8 }}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (createFlow) {
    const isLastStep = currentStepIndex === CREATE_APP_STEPS.length - 1;

    return (
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={() => { setCreateFlow(null); setFormError(""); onFullscreenChange?.(false); }} style={{ background: "none", border: "none", padding: 0, display: "flex", alignItems: "center", gap: 6, color: "#666", cursor: "pointer", fontSize: 13 }}>
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 style={{ fontSize: 31, fontWeight: 700, letterSpacing: -0.6 }}>Create app</h1>
        </div>

        {formError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13 }}>{formError}</div>
        )}

        <div style={{ ...S.card, padding: 14, background: "#f6f6f7" }}>
          <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0,1fr) 240px", gap: 14, alignItems: "start" }}>
            <div style={{ ...S.card, padding: 12 }}>
              <div style={{ display: "grid", gap: 8 }}>
                {CREATE_APP_STEPS.map((step, index) => {
                  const isActive = currentStepIndex === index;
                  const isDone = completion[step.key];
                  return (
                    <button
                      key={step.key}
                      onClick={() => goToStep(index)}
                      style={{ border: `1.5px solid ${isActive ? "#f43f5e" : isDone ? "#16a34a" : "#dadada"}`, background: isActive ? "#fff1f5" : "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 13, textAlign: "left", fontWeight: isActive ? 700 : 600, color: "#1a1a1a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                      <span>{step.label}</span>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: isDone ? "#16a34a" : isActive ? "#f43f5e" : "#cfcfcf" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>{renderStepContent()}</div>

            <div style={{ ...S.card, padding: 12, position: "sticky", top: 12 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
                <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", fontSize: 12, fontWeight: 700 }}>SDK Preview</div>
                <div style={{ padding: 12 }}>
                  <div style={{ background: "#f6f6f6", borderRadius: 12, padding: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{createFlow.appDetails.name || "Untitled app"}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{createFlow.type}</div>
                  </div>
                  <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Instructions to get started</div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {createFlow.instruction.lines.slice(0, 3).map((line, index) => (
                        <div key={`preview-${index}`} style={{ fontSize: 11.5, color: "#666", lineHeight: 1.35 }}>{line || "Add instruction text"}</div>
                      ))}
                    </div>
                    <button style={{ marginTop: 10, width: "100%", border: "none", background: "#141414", color: "#fff", borderRadius: 18, padding: "8px 10px", fontSize: 12, fontWeight: 600 }}>Start scan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <button onClick={goPrevious} disabled={currentStepIndex === 0} style={currentStepIndex === 0 ? { ...S.btnDisabled, borderRadius: 999, padding: "9px 16px" } : { ...S.btnO, borderRadius: 999, padding: "9px 16px" }}>
              Previous
            </button>
            {isLastStep ? (
              <button onClick={handlePublish} style={canPublish ? { ...S.btnP, background: "#f43f5e", borderRadius: 999, padding: "9px 18px" } : { ...S.btnDisabled, borderRadius: 999, padding: "9px 18px" }}>
                Publish App
              </button>
            ) : (
              <button onClick={goNext} style={canMoveNext ? { ...S.btnP, background: "#f43f5e", borderRadius: 999, padding: "9px 18px" } : { ...S.btnDisabled, borderRadius: 999, padding: "9px 18px" }}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>AI Stylist</h1>
      </div>

      {toast && (
        <div style={{ marginBottom: 14, background: "#ecfdf5", border: "1px solid #bbf7d0", color: "#166534", borderRadius: 10, padding: "10px 14px", fontSize: 13.5 }}>
          {toast}
        </div>
      )}

      {/* Apps listing */}
      <div style={{ ...S.card, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Your apps</span>
          <button style={{ ...S.btnO, borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600 }} onClick={openCreate}>
            Create App
          </button>
        </div>

        {apps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#bbb" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#999" }}>No apps yet</div>
            <div style={{ fontSize: 13, color: "#bbb", marginTop: 6 }}>Click "Create App" to get started</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {apps.map(app => (
              <div key={app.id} style={{ border: "1.5px solid #e5e5e5", borderRadius: 16, padding: 20, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Top row: badge + icons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ border: "1.5px solid #1a1a1a", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: typeColor(app.type), background: "#fff" }}>{app.type}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }} title="Preview">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }} title="More options">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                {/* App name & date */}
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{app.name}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>Created at {app.date}</div>
                </div>
                {/* Divider */}
                <div style={{ height: 1, background: "#f0f0f0" }} />
                {/* Bottom row: App ID + Active toggle */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>App ID</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e", cursor: "pointer" }}>{app.appId}</span>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 0, lineHeight: 1, display: "flex" }} title="Copy App ID" onClick={() => navigator.clipboard?.writeText(app.appId)}>
                      <Copy size={13} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: app.active ? "#16a34a" : "#999", fontWeight: 600 }}>{app.active ? "Active" : "Inactive"}</span>
                    <div onClick={() => toggleApp(app.id)} style={{ width: 42, height: 24, borderRadius: 12, cursor: "pointer", background: app.active ? "#f43f5e" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: app.active ? "translateX(18px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create App Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, width: 900, maxWidth: "95vw", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden" }}>
            {/* Modal header */}
            <div style={{ padding: "22px 28px", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Choose AI stylist</div>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#aaa" }}><X size={20} /></button>
            </div>
            {/* Modal body */}
            <div style={{ padding: "22px 28px 12px" }}>
              {formError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>{formError}</div>
              )}
              <p style={{ fontSize: 13, color: "#777", marginBottom: 14 }}>Select one stylist to continue creating your app.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
                {STYLIST_TYPES.map(item => (
                  <div key={item.type} onClick={() => setSelectedType(item.type)} style={{ border: `2px solid ${selectedType === item.type ? "#f43f5e" : "#e5e5e5"}`, borderRadius: 18, padding: 12, cursor: "pointer", background: "#fff", transition: "all 0.15s", boxShadow: selectedType === item.type ? "0 0 0 2px #fff1f5 inset" : "none" }}>
                    <div style={{ borderRadius: 14, border: "1.5px solid #e7e7e7", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative", background: "#fafafa" }}>
                      {selectedType === item.type && <div style={{ position: "absolute", top: 10, left: 10, width: 18, height: 18, borderRadius: "50%", background: "#f43f5e", border: "3px solid #fff", boxShadow: "0 0 0 1px #f43f5e" }} />}
                      <span style={{ fontSize: 18, color: "#b3b3b3", fontWeight: 700 }}>graphics</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>{item.type}</div>
                    <div style={{ fontSize: 12.5, color: "#888", marginTop: 4 }}>{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal footer */}
            <div style={{ padding: "16px 28px", borderTop: "1px solid #eaeaea", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={closeModal} style={{ ...S.btnO, borderRadius: 12, padding: "10px 18px" }}>Cancel</button>
              <button onClick={handleContinueFromModal} style={selectedType ? { ...S.btnP, background: "#141414", borderRadius: 12, padding: "10px 22px" } : { ...S.btnDisabled, borderRadius: 12, padding: "10px 22px" }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ───
export default function App() {
  const [activeTab, setActiveTab] = useState("Lifestyle");
  const [view, setView] = useState("listing");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarPage, setSidebarPage] = useState("products"); // 'products' | 'aiStylist'
  const [aiStylistFullscreen, setAIStylistFullscreen] = useState(false);

  const hideSidebar = view === "addProduct" || view === "productDetail" || view === "arStudio" || aiStylistFullscreen;
  const isAIStylist = sidebarPage === "aiStylist";

  const handleSidebarNavigate = (page) => {
    setSidebarPage(page);
    if (page !== "aiStylist") setAIStylistFullscreen(false);
    if (page === "products") {
      setView("listing");
      setSelectedProduct(null);
    }
  };

  const tabProducts = products.filter(p => p.headCategory === activeTab);

  const handleAddProduct = () => { setSelectedProduct(null); setView("addProduct"); };
  const handleTabChange = (tab) => { setActiveTab(tab); setView("listing"); setSelectedProduct(null); };
  const handleViewProduct = (p) => { setSelectedProduct(p); setView(p.headCategory === "Beauty" ? "arStudio" : "productDetail"); };
  const handleEditProduct = (p) => { setSelectedProduct(p); setView("addProduct"); };
  const handleToggleStatus = (id) => setProducts(ps => ps.map(p => p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p));
  const handleSaveProduct = (productData, nextView = "listing") => {
    setProducts(prev => {
      const exists = prev.some(product => product.id === productData.id);
      return exists
        ? prev.map(product => product.id === productData.id ? productData : product)
        : [productData, ...prev];
    });
    setActiveTab(productData.headCategory);
    setSelectedProduct(productData);
    setView(nextView);
    if (nextView === "listing") {
      setSelectedProduct(null);
    }
  };
  const handleGoToARStudio = () => { if (!selectedProduct) setSelectedProduct(tabProducts[0]); setView("arStudio"); };
  const handleGoToProductDetail = () => { if (!selectedProduct) setSelectedProduct(tabProducts[0]); setView("productDetail"); };
  const handlePrev = () => {
    if (!selectedProduct) return;
    const idx = tabProducts.findIndex(p => p.id === selectedProduct.id);
    if (idx > 0) setSelectedProduct(tabProducts[idx - 1]);
  };
  const handleNext = () => {
    if (!selectedProduct) return;
    const idx = tabProducts.findIndex(p => p.id === selectedProduct.id);
    if (idx < tabProducts.length - 1) setSelectedProduct(tabProducts[idx + 1]);
  };

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        input:focus, select:focus { border-color: #f43f5e !important; outline: none; }
        input[type="range"]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #141414; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #141414; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
      `}</style>
      {!hideSidebar && <Sidebar activePage={sidebarPage} onNavigate={handleSidebarNavigate} />}
      <div style={S.main}>
        <Topbar />
        <div style={S.content}>
          {/* AI STYLIST */}
          {isAIStylist && <AIStylistPage onFullscreenChange={setAIStylistFullscreen} />}
          {/* LISTING */}
          {!isAIStylist && view === "listing" && activeTab !== "Beauty" && (
            <GeneralListing products={products} activeTab={activeTab} setActiveTab={handleTabChange}
              onAddProduct={handleAddProduct} onEditProduct={handleEditProduct}
              onViewProduct={handleViewProduct} onToggleStatus={handleToggleStatus} />
          )}
          {!isAIStylist && view === "listing" && activeTab === "Beauty" && (
            <BeautyListing products={products} activeTab={activeTab} setActiveTab={handleTabChange}
              onAddProduct={handleAddProduct} onEditProduct={handleEditProduct}
              onViewProduct={handleViewProduct} onToggleStatus={handleToggleStatus} />
          )}
          {/* ADD / EDIT */}
          {!isAIStylist && view === "addProduct" && activeTab !== "Beauty" && (
            <GeneralAddForm headCategory={activeTab} onBack={() => setView("listing")}
              onSaveProduct={handleSaveProduct} editProduct={selectedProduct} />
          )}
          {!isAIStylist && view === "addProduct" && activeTab === "Beauty" && (
            <BeautyAddForm onBack={() => setView("listing")} onSaveProduct={handleSaveProduct} editProduct={selectedProduct} />
          )}
          {/* PRODUCT DETAIL (Lifestyle / Home) */}
          {!isAIStylist && view === "productDetail" && selectedProduct && (
            <ProductDetail product={selectedProduct} headCategory={activeTab}
              onBack={() => setView("listing")} onPrev={handlePrev} onNext={handleNext} onEditProduct={handleEditProduct} />
          )}
          {/* AR STUDIO (Beauty) */}
          {!isAIStylist && view === "arStudio" && selectedProduct && (
            <ARStudio product={selectedProduct} onBack={() => setView("listing")}
              onPrev={handlePrev} onNext={handleNext} onToggleStatus={handleToggleStatus} onEditProduct={handleEditProduct} />
          )}
        </div>
      </div>
    </div>
  );
}

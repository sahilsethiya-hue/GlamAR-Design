import { useEffect, useRef, useState } from "react";
import { Search, Filter, LayoutGrid, Plus, ChevronLeft, ChevronRight, MoreVertical, X, Upload, Link, Trash2, Edit3, Eye, Copy, ChevronDown, ChevronUp, Image, Box, Info, ArrowLeft, Package, GripVertical, Palette, BarChart2, Camera, Scan, Settings, Users, KeyRound, CreditCard, Megaphone, Layers, Home, Tag, Sparkles, Webhook, HelpCircle, Headphones, Bell, Crown, QrCode, Code2, Download, Check } from "lucide-react";

// ─── CUSTOM SVG ICONS ───
const IcSort = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.19518 13.138C4.45553 13.3983 4.87764 13.3983 5.13799 13.138L7.80466 10.4713C8.06501 10.211 8.06501 9.78886 7.80466 9.52851C7.54431 9.26816 7.1222 9.26816 6.86185 9.52851L5.33325 11.0571V3.99992C5.33325 3.63173 5.03477 3.33325 4.66659 3.33325C4.2984 3.33325 3.99992 3.63173 3.99992 3.99992V11.0571L2.47132 9.52851C2.21097 9.26816 1.78886 9.26816 1.52851 9.52851C1.26816 9.78886 1.26816 10.211 1.52851 10.4713L4.19518 13.138Z" fill="#000000" fillOpacity="0.65" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.8619 2.86201C11.1223 2.60166 11.5444 2.60166 11.8047 2.86201L14.4714 5.52868C14.7318 5.78903 14.7318 6.21114 14.4714 6.47149C14.2111 6.73184 13.7889 6.73184 13.5286 6.47149L12 4.94289V12.0001C12 12.3683 11.7015 12.6667 11.3333 12.6667C10.9651 12.6667 10.6667 12.3683 10.6667 12.0001V4.94289L9.13807 6.47149C8.87772 6.73184 8.45561 6.73184 8.19526 6.47149C7.93491 6.21114 7.93491 5.78903 8.19526 5.52868L10.8619 2.86201Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcEditPen = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9808 5.48348L14.5142 9.01681L6.73084 16.8001L3.65584 17.3251C3.36418 17.3918 3.11418 17.3251 2.89751 17.1085C2.68084 16.8918 2.60584 16.6418 2.68084 16.3501L3.20584 13.2751L10.9808 5.48348ZM16.8642 4.29181L15.7058 3.13348C15.3892 2.81681 14.9892 2.65015 14.5225 2.65015C14.0558 2.65015 13.6558 2.80848 13.3392 3.12515L12.1725 4.29181L15.7058 7.82515L16.8725 6.65848C17.1892 6.34181 17.3475 5.94181 17.3475 5.47515C17.3475 5.00848 17.1892 4.60848 16.8642 4.29181Z" fill="#5a5a5a" />
  </svg>
);
const IcCopy = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66659 16.6666L1.66659 8.33325C1.66659 7.41658 2.40825 6.66658 3.33325 6.66658L11.6666 6.66658C12.5833 6.66659 13.3333 7.41659 13.3333 8.33325L13.3333 16.6666C13.3333 17.5833 12.5833 18.3333 11.6666 18.3333L3.33325 18.3333C2.40825 18.3333 1.66659 17.5833 1.66659 16.6666ZM14.9999 6.66659L14.9999 13.3333L16.6666 13.3333C17.5833 13.3333 18.3333 12.5833 18.3333 11.6666L18.3333 3.33325C18.3333 2.41659 17.5833 1.66659 16.6666 1.66659L8.33325 1.66658C7.40825 1.66658 6.66659 2.41658 6.66659 3.33325L6.66659 4.99992L13.3333 4.99992C14.2499 4.99992 14.9999 5.74992 14.9999 6.66659Z" fill="#5a5a5a" />
  </svg>
);
const IcRequest = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49992 15.0001H12.4999C12.736 15.0001 12.9339 14.9202 13.0937 14.7605C13.2534 14.6008 13.3333 14.4029 13.3333 14.1667C13.3333 13.9306 13.2534 13.7327 13.0937 13.573C12.9339 13.4133 12.736 13.3334 12.4999 13.3334H7.49992C7.26381 13.3334 7.06589 13.4133 6.90617 13.573C6.74645 13.7327 6.66659 13.9306 6.66659 14.1667C6.66659 14.4029 6.74645 14.6008 6.90617 14.7605C7.06589 14.9202 7.26381 15.0001 7.49992 15.0001ZM7.49992 11.6667H12.4999C12.736 11.6667 12.9339 11.5869 13.0937 11.4272C13.2534 11.2674 13.3333 11.0695 13.3333 10.8334C13.3333 10.5973 13.2534 10.3994 13.0937 10.2397C12.9339 10.0799 12.736 10.0001 12.4999 10.0001H7.49992C7.26381 10.0001 7.06589 10.0799 6.90617 10.2397C6.74645 10.3994 6.66659 10.5973 6.66659 10.8334C6.66659 11.0695 6.74645 11.2674 6.90617 11.4272C7.06589 11.5869 7.26381 11.6667 7.49992 11.6667ZM4.99992 18.3334C4.54159 18.3334 4.14922 18.1702 3.82284 17.8438C3.49645 17.5174 3.33325 17.1251 3.33325 16.6667V3.33341C3.33325 2.87508 3.49645 2.48272 3.82284 2.15633C4.14922 1.82994 4.54159 1.66675 4.99992 1.66675H10.9791C11.2013 1.66675 11.4131 1.70841 11.6145 1.79175C11.8159 1.87508 11.993 1.99314 12.1458 2.14591L16.1874 6.18758C16.3402 6.34036 16.4583 6.51744 16.5416 6.71883C16.6249 6.92022 16.6666 7.13203 16.6666 7.35425V16.6667C16.6666 17.1251 16.5034 17.5174 16.177 17.8438C15.8506 18.1702 15.4583 18.3334 14.9999 18.3334H4.99992ZM10.8333 6.66675C10.8333 6.90286 10.9131 7.10078 11.0728 7.2605C11.2326 7.42022 11.4305 7.50008 11.6666 7.50008H14.9999L10.8333 3.33341V6.66675Z" fill="#5a5a5a" />
  </svg>
);
const IcTrash = ({ color = "#5a5a5a" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.82903 17.5C5.3871 17.5 5.00881 17.3428 4.69414 17.0283C4.37947 16.7138 4.22214 16.3357 4.22214 15.894V4.61836H3.99992C3.81103 4.61836 3.65273 4.55447 3.52503 4.42669C3.39718 4.29891 3.33325 4.14063 3.33325 3.95185C3.33325 3.76292 3.39718 3.60471 3.52503 3.47723C3.65273 3.3496 3.81103 3.28578 3.99992 3.28578H7.33325C7.33325 3.06827 7.40992 2.8829 7.56325 2.72965C7.71644 2.57655 7.90184 2.5 8.11947 2.5H11.8804C12.098 2.5 12.2834 2.57655 12.4366 2.72965C12.5899 2.8829 12.6666 3.06827 12.6666 3.28578H15.9999C16.1888 3.28578 16.3471 3.34967 16.4748 3.47745C16.6027 3.60523 16.6666 3.76351 16.6666 3.95229C16.6666 4.14122 16.6027 4.29943 16.4748 4.42692C16.3471 4.55455 16.1888 4.61836 15.9999 4.61836H15.7777V15.894C15.7777 16.3357 15.6204 16.7138 15.3057 17.0283C14.991 17.3428 14.6127 17.5 14.1708 17.5H5.82903ZM8.35925 14.3906C8.54814 14.3906 8.70644 14.3268 8.83414 14.1992C8.9617 14.0714 9.02547 13.9131 9.02547 13.7243V7.06143C9.02547 6.87265 8.96155 6.71437 8.8337 6.58659C8.70599 6.45896 8.54762 6.39514 8.35859 6.39514C8.1697 6.39514 8.0114 6.45896 7.8837 6.58659C7.75614 6.71437 7.69236 6.87265 7.69236 7.06143V13.7243C7.69236 13.9131 7.75621 14.0714 7.88392 14.1992C8.01177 14.3268 8.17021 14.3906 8.35925 14.3906ZM11.6413 14.3906C11.8301 14.3906 11.9884 14.3268 12.1161 14.1992C12.2437 14.0714 12.3075 13.9131 12.3075 13.7243V7.06143C12.3075 6.87265 12.2436 6.71437 12.1159 6.58659C11.9881 6.45896 11.8296 6.39514 11.6406 6.39514C11.4517 6.39514 11.2934 6.45896 11.1657 6.58659C11.0381 6.71437 10.9744 6.87265 10.9744 7.06143V13.7243C10.9744 13.9131 11.0383 14.0714 11.1661 14.1992C11.2938 14.3268 11.4522 14.3906 11.6413 14.3906Z" fill={color} />
  </svg>
);

const BARCODE_FIELD = { name: "barcode", label: "Barcode", type: "text" };

// ─── PIXELBIN PATTERNS API ───
// x-ebg-param = base64 of current UTC timestamp in compact ISO format
// x-ebg-signature = v1:HMAC-SHA256(signing_key, "GET\n{path}\n{param}")
// Signing key comes from PixelBin SDK — update PIXELBIN_SIGNING_KEY with your key
const PIXELBIN_SIGNING_KEY = "";  // paste your PixelBin API signing key here

async function generateEbgHeaders(path) {
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

async function fetchPatterns(subcategory) {
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

// ─── SDK CONFIG MAPPINGS (subcategory → display name options) ───
// In production these come from SDK Configuration; here they're editable at runtime via addSdkMapping
const DEFAULT_SDK_MAPPINGS = {
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
const DIMENSION_UNITS = ["mm", "cm", "m", "in", "ft"];

// ─── BEAUTY DATA ───
const BEAUTY_CATEGORIES = {
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

const AR_SETTINGS_CONFIG = {
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

function getCategoryData(headCategory, cat) {
  return CATEGORY_TREE[headCategory]?.[cat] || null;
}

function categoryHasL2(headCategory, category) {
  return Boolean(getCategoryData(headCategory, category)?.subcategories?.length);
}

function getCategoryLookupKey(headCategory, category, subcategory) {
  if (!category) return "";
  return categoryHasL2(headCategory, category) ? subcategory : category;
}

// ─── SAMPLE PRODUCTS ───
const INITIAL_PRODUCTS = [
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

function getEmptyMeasurementFields() {
  return {
    dimensionLength: "",
    dimensionBreadth: "",
    dimensionHeight: "",
    dimensionUnit: "mm",
    ringInnerDiameter: "",
    ringBandWidth: "",
    watchCaseDiameter: "",
    watchLugToLug: "",
    watchCaseThickness: "",
    watchStrapType: "",
  };
}

function getMeasurementSchema(headCategory, category, subcategory) {
  if (headCategory === "Lifestyle" && category === "Watches") return "watch";
  if (headCategory === "Lifestyle" && category === "Jewellery" && subcategory === "Rings") return "ring";
  return "dimension";
}

function parseDimension(dimension = "") {
  const raw = (dimension || "").trim();
  if (!raw) {
    return { dimensionLength: "", dimensionBreadth: "", dimensionHeight: "", dimensionUnit: "mm" };
  }

  const unitMatch = raw.match(/([a-zA-Z]+)\s*$/);
  const unit = unitMatch ? unitMatch[1].toLowerCase() : "mm";
  const valuePart = unitMatch ? raw.slice(0, unitMatch.index).trim() : raw;
  const pieces = valuePart.split(/x|×/i).map(part => part.trim()).filter(Boolean);

  return {
    dimensionLength: pieces[0] || "",
    dimensionBreadth: pieces[1] || "",
    dimensionHeight: pieces[2] || "",
    dimensionUnit: DIMENSION_UNITS.includes(unit) ? unit : "mm",
  };
}

function formatDimension({ dimensionLength, dimensionBreadth, dimensionHeight, dimensionUnit }) {
  const parts = [dimensionLength, dimensionBreadth, dimensionHeight].map(v => (v || "").trim()).filter(Boolean);
  if (parts.length === 0) return "";
  return `${parts.join(" x ")} ${(dimensionUnit || "mm").trim()}`.trim();
}

function hydrateMeasurementFields(measurements, dimension) {
  const base = getEmptyMeasurementFields();
  if (measurements?.schema === "ring") {
    return {
      ...base,
      ringInnerDiameter: measurements.innerDiameter || "",
      ringBandWidth: measurements.bandWidth || "",
    };
  }
  if (measurements?.schema === "watch") {
    return {
      ...base,
      watchCaseDiameter: measurements.caseDiameter || "",
      watchLugToLug: measurements.lugToLug || "",
      watchCaseThickness: measurements.caseThickness || "",
      watchStrapType: measurements.strapType || "",
    };
  }
  if (measurements?.schema === "dimension") {
    return {
      ...base,
      dimensionLength: measurements.length || "",
      dimensionBreadth: measurements.breadth || "",
      dimensionHeight: measurements.height || "",
      dimensionUnit: measurements.unit || "mm",
    };
  }
  return { ...base, ...parseDimension(dimension || "") };
}

function buildMeasurement(schema, values) {
  if (schema === "ring") {
    const innerDiameter = (values.ringInnerDiameter || "").trim();
    const bandWidth = (values.ringBandWidth || "").trim();
    const parts = [];
    if (innerDiameter) parts.push(`Inner diameter: ${innerDiameter} mm`);
    if (bandWidth) parts.push(`Band width: ${bandWidth}`);
    return {
      dimension: parts.join(" | "),
      measurements: { schema: "ring", innerDiameter, bandWidth },
    };
  }

  if (schema === "watch") {
    const caseDiameter = (values.watchCaseDiameter || "").trim();
    const lugToLug = (values.watchLugToLug || "").trim();
    const caseThickness = (values.watchCaseThickness || "").trim();
    const strapType = (values.watchStrapType || "").trim();
    const parts = [];
    if (caseDiameter) parts.push(`Case diameter: ${caseDiameter} mm`);
    if (lugToLug) parts.push(`Lug-to-lug: ${lugToLug} mm`);
    if (caseThickness) parts.push(`Case thickness: ${caseThickness} mm`);
    if (strapType) parts.push(`Strap type: ${strapType}`);
    return {
      dimension: parts.join(" | "),
      measurements: { schema: "watch", caseDiameter, lugToLug, caseThickness, strapType },
    };
  }

  const length = (values.dimensionLength || "").trim();
  const breadth = (values.dimensionBreadth || "").trim();
  const height = (values.dimensionHeight || "").trim();
  const unit = (values.dimensionUnit || "mm").trim();
  return {
    dimension: formatDimension({ dimensionLength: length, dimensionBreadth: breadth, dimensionHeight: height, dimensionUnit: unit }),
    measurements: { schema: "dimension", length, breadth, height, unit },
  };
}

function getGeneralInitialForm(editProduct) {
  const measurementSource = editProduct?.measurements || editProduct?.variants?.[0]?.measurements;
  const parsedMeasurements = hydrateMeasurementFields(measurementSource, editProduct?.dimension || editProduct?.variants?.[0]?.dimension || "");
  return {
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    displayName: editProduct?.displayName || "",
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
    ...parsedMeasurements,
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
  return (product?.variants || []).map((variant, index) => {
    const parsedMeasurements = hydrateMeasurementFields(variant.measurements, variant.dimension || "");
    return {
      id: variant.id || `var-${Date.now()}-${index}`,
      name: variant.name || `Variant ${index + 1}`,
      attributes: variant.attributes || [{ attr: "Variant", val: variant.name || `Variant ${index + 1}` }],
      variantId: variant.variantId || "",
      ...parsedMeasurements,
      price: variant.price || "",
      color: variant.color || "",
    };
  });
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

// ─── SHARED SMALL COMPONENTS ───
function DD({ label, value, onChange, options = [], placeholder, required, disabled = false }) {
  return (
    <div>
      {label && <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>}
      <div style={{ position: "relative" }}>
        <select
          style={{ ...S.select, background: disabled ? "#f5f5f5" : "#fff", color: disabled ? "#999" : "#1a1a1a", cursor: disabled ? "not-allowed" : "pointer" }}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#aaa" }} />
      </div>
    </div>
  );
}

function DisplayNameDropdown({ subcategory, value, onChange, sdkMappings, onAddMapping }) {
  const [open, setOpen] = useState(false);
  const [addText, setAddText] = useState("");
  const options = subcategory ? (sdkMappings[subcategory] || []) : [];
  const disabled = !subcategory;

  const handleSelect = (opt) => { onChange(opt); setOpen(false); };
  const handleAdd = () => {
    const trimmed = addText.trim();
    if (!trimmed) return;
    onAddMapping(subcategory, trimmed);
    onChange(trimmed);
    setAddText("");
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <label style={S.label}>Display Name</label>
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "11px 14px", borderRadius: 10,
          border: open ? "1px solid #da0e64" : "1px solid #d9d9d9",
          background: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          boxSizing: "border-box", userSelect: "none",
          transition: "border-color 0.15s",
        }}
      >
        <span style={{ fontSize: 13.5, color: value ? "#1a1a1a" : "#aaa" }}>
          {value || (disabled ? "Select subcategory first" : "Add or select the display name")}
        </span>
        {value
          ? <Check size={15} color="#16a34a" />
          : <ChevronDown size={14} color="#aaa" />
        }
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 200,
          background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10,
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)", overflow: "hidden",
        }}>
          {options.length > 0 && (
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {options.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: "10px 14px", fontSize: 13.5, cursor: "pointer",
                    background: value === opt ? "#FFF5FC" : "#fff",
                    color: value === opt ? "#DA0E64" : "#1a1a1a",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                  onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = "#f9f9f9"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = value === opt ? "#FFF5FC" : "#fff"; }}
                >
                  <span>{opt}</span>
                  {value === opt && <Check size={13} color="#DA0E64" />}
                </div>
              ))}
            </div>
          )}
          <div style={{ borderTop: options.length > 0 ? "1px solid #f0f0f0" : "none", padding: "8px 10px", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              style={{ ...S.input, flex: 1, fontSize: 13, padding: "7px 12px", height: "auto" }}
              placeholder="Type to add new..."
              value={addText}
              onChange={e => setAddText(e.target.value)}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
            />
            <button
              onClick={e => { e.stopPropagation(); handleAdd(); }}
              style={{ height: 34, padding: "0 14px", background: "#DA0E64", color: "#fff", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
            >
              Add
            </button>
          </div>
        </div>
      )}
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
// ─── SIDEBAR CUSTOM ICONS ───
const IcNavDashboard = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 11C4.45 11 3.97917 10.8042 3.5875 10.4125C3.19583 10.0208 3 9.55 3 9V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9C9.55 3 10.0208 3.19583 10.4125 3.5875C10.8042 3.97917 11 4.45 11 5V9C11 9.55 10.8042 10.0208 10.4125 10.4125C10.0208 10.8042 9.55 11 9 11H5ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V15C3 14.45 3.19583 13.9792 3.5875 13.5875C3.97917 13.1958 4.45 13 5 13H9C9.55 13 10.0208 13.1958 10.4125 13.5875C10.8042 13.9792 11 14.45 11 15V19C11 19.55 10.8042 20.0208 10.4125 20.4125C10.0208 20.8042 9.55 21 9 21H5ZM15 11C14.45 11 13.9792 10.8042 13.5875 10.4125C13.1958 10.0208 13 9.55 13 9V5C13 4.45 13.1958 3.97917 13.5875 3.5875C13.9792 3.19583 14.45 3 15 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V9C21 9.55 20.8042 10.0208 20.4125 10.4125C20.0208 10.8042 19.55 11 19 11H15ZM15 21C14.45 21 13.9792 20.8042 13.5875 20.4125C13.1958 20.0208 13 19.55 13 19V15C13 14.45 13.1958 13.9792 13.5875 13.5875C13.9792 13.1958 14.45 13 15 13H19C19.55 13 20.0208 13.1958 20.4125 13.5875C20.8042 13.9792 21 14.45 21 15V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H15Z" fill="white"/></svg>);
const IcNavAnalytics = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.0254 7.10005V2.05005C5.97539 2.55005 2.02539 6.82005 2.02539 12C2.02539 17.18 5.97539 21.45 11.0254 21.95V16.9C8.74539 16.44 7.02539 14.42 7.02539 12C7.02539 9.58005 8.74539 7.56005 11.0254 7.10005ZM16.9254 11H21.9754C21.5054 6.28005 17.7554 2.52005 13.0254 2.05005V7.10005C14.9854 7.50005 16.5354 9.04005 16.9254 11ZM13.0254 16.9V21.95C17.7554 21.48 21.5054 17.72 21.9754 13H16.9254C16.5354 14.96 14.9854 16.5 13.0254 16.9Z" fill="white"/></svg>);
const IcNav3DAssets = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip3d)"><path d="M11.4076 0.405869C9.52254 0.948099 9.63391 3.70398 11.4998 4.19144V7.69129C11.5837 8.27551 12.4126 8.27368 12.4957 7.69129L12.5057 4.16862C15.0261 3.4429 13.9854 -0.335361 11.4085 0.404956L11.4076 0.405869ZM11.9827 3.23478C10.8261 3.21652 10.7348 1.53141 11.8037 1.34884C13.2177 1.10785 13.3401 3.25577 11.9827 3.23478ZM3.23121 20.0183C1.63373 19.1301 -0.177354 20.682 0.429688 22.4082C0.60678 22.913 1.03125 23.3484 1.52784 23.5438C3.2659 24.2275 4.88255 22.3917 3.98157 20.7696L3.99526 20.7112L6.14227 18.5249C6.26551 18.0639 5.98892 17.739 5.5115 17.8485C5.15549 18.0101 3.38913 20.033 3.23121 20.0183ZM2.44434 22.6647C1.03125 22.8573 0.971005 20.8134 2.23256 20.7669C3.4156 20.7231 3.57444 22.5104 2.44434 22.6647ZM17.8833 18.5834C18.0978 18.9165 19.9774 20.5551 20.013 20.7377C20.0193 20.7705 19.8404 21.1466 19.814 21.2534C19.2717 23.4424 22.2887 24.631 23.4014 22.7441C24.4275 21.0033 22.5215 19.0407 20.7642 20.0174L20.7058 20.0037L18.6309 17.9279C18.5086 17.8175 18.2932 17.8111 18.1389 17.8467C17.834 17.9161 17.7528 18.3323 17.8833 18.5834ZM21.9071 22.6647C20.4876 22.8573 20.4018 20.8171 21.6953 20.7669C22.872 20.7212 23.0089 22.515 21.9071 22.6647Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M10.356 7.45923C10.3561 8.36675 11.092 9.10265 11.9995 9.10278C12.9071 9.10278 13.643 8.36684 13.6431 7.45923V7.22974L18.2153 9.85864C18.4613 10.0011 18.6526 10.189 18.7886 10.4221C18.9245 10.6552 18.9917 10.9146 18.9917 11.1995V16.9055C18.3762 16.5229 17.5575 16.5986 17.023 17.1331C16.3999 17.7562 16.3999 18.7658 17.023 19.3889L17.0308 19.3967L12.7759 21.845C12.5298 21.9874 12.2705 22.0588 11.9985 22.0588C11.7266 22.0588 11.4672 21.9874 11.2212 21.845L6.91748 19.3694C7.50095 18.7556 7.50648 17.7872 6.91455 17.1692C6.40658 16.639 5.62147 16.5374 5.00537 16.8704V11.1995C5.00537 10.9145 5.07349 10.6552 5.20947 10.4221C5.3454 10.1892 5.53588 10.001 5.78174 9.85864L10.356 7.22876V7.45923ZM11.9985 13.3948L7.39502 10.7327L6.55908 11.219V12.0344L11.2212 14.7346V20.0579L11.9985 20.5042L12.7759 20.0579V14.7346L17.438 12.0344V11.219L16.603 10.7327L11.9985 13.3948Z" fill="white"/></g><defs><clipPath id="clip3d"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>);
const IcNavTryOns = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 22C3.45 22 2.98 21.8 2.59 21.41C2.2 21.02 2 20.55 2 20V17C2 16.72 2.1 16.48 2.29 16.29C2.48 16.1 2.72 16 3 16C3.28 16 3.52 16.1 3.71 16.29C3.9 16.48 4 16.72 4 17V20H7C7.28 20 7.52 20.1 7.71 20.29C7.9 20.48 8 20.72 8 21C8 21.28 7.9 21.52 7.71 21.71C7.52 21.9 7.28 22 7 22H4ZM2 7V4C2 3.45 2.2 2.98 2.59 2.59C2.98 2.2 3.45 2 4 2H7C7.28 2 7.52 2.1 7.71 2.29C7.9 2.48 8 2.72 8 3C8 3.28 7.9 3.52 7.71 3.71C7.52 3.9 7.28 4 7 4H4V7C4 7.28 3.9 7.52 3.71 7.71C3.52 7.9 3.28 8 3 8C2.72 8 2.48 7.9 2.29 7.71C2.1 7.52 2 7.28 2 7ZM20 22H17C16.72 22 16.48 21.9 16.29 21.71C16.1 21.52 16 21.28 16 21C16 20.72 16.1 20.48 16.29 20.29C16.48 20.1 16.72 20 17 20H20V17C20 16.72 20.1 16.48 20.29 16.29C20.48 16.1 20.72 16 21 16C21.28 16 21.52 16.1 21.71 16.29C21.9 16.48 22 16.72 22 17V20C22 20.55 21.8 21.02 21.41 21.41C21.02 21.8 20.55 22 20 22ZM20 7V4H17C16.72 4 16.48 3.9 16.29 3.71C16.1 3.52 16 3.28 16 3C16 2.72 16.1 2.48 16.29 2.29C16.48 2.1 16.72 2 17 2H20C20.55 2 21.02 2.2 21.41 2.59C21.8 2.98 22 3.45 22 4V7C22 7.28 21.9 7.52 21.71 7.71C21.52 7.9 21.28 8 21 8C20.72 8 20.48 7.9 20.29 7.71C20.1 7.52 20 7.28 20 7Z" fill="white"/><path d="M11.3689 17.8337L6.94968 15.4192C6.74976 15.3093 6.59456 15.1643 6.48408 14.9843C6.3736 14.8044 6.31836 14.6044 6.31836 14.3844V9.61546C6.31836 9.3955 6.3736 9.19554 6.48408 9.01558C6.59456 8.83562 6.74976 8.69065 6.94968 8.58067L11.3689 6.16619C11.5688 6.05621 11.7793 6.00122 12.0002 6.00122C12.2212 6.00122 12.4316 6.05621 12.6316 6.16619L17.0508 8.58067C17.2507 8.69065 17.4059 8.83562 17.5164 9.01558C17.6269 9.19554 17.6821 9.3955 17.6821 9.61546V14.3844C17.6821 14.6044 17.6269 14.8044 17.5164 14.9843C17.4059 15.1643 17.2507 15.3093 17.0508 15.4192L12.6316 17.8337C12.4316 17.9437 12.2212 17.9987 12.0002 17.9987C11.7793 17.9987 11.5688 17.9437 11.3689 17.8337ZM11.3689 12.3449V16.454L12.0002 16.7989L12.6316 16.454V12.3449L16.4195 10.2603V9.63045L15.7408 9.25553L12.0002 11.3101L8.25967 9.25553L7.581 9.63045V10.2603L11.3689 12.3449Z" fill="white"/></svg>);
const IcNavSkinAnalysis = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 19.2727C9.97273 19.2727 8.24545 18.5636 6.83636 17.1545C5.42727 15.7455 4.71818 14.0273 4.71818 11.9909C4.71818 9.95455 5.42727 8.23636 6.83636 6.82727C8.24545 5.41818 9.96364 4.70909 12 4.70909C14.0364 4.70909 15.7545 5.41818 17.1636 6.82727C18.5727 8.23636 19.2818 9.95455 19.2818 11.9909C19.2818 14.0273 18.5727 15.7455 17.1636 17.1545C15.7545 18.5636 14.0364 19.2727 12 19.2727ZM12 17.4545C13.5182 17.4545 14.8 16.9273 15.8636 15.8636C16.9273 14.8 17.4545 13.5182 17.4545 12C17.4545 11.7455 17.4364 11.4909 17.4 11.2364C17.3636 10.9818 17.3091 10.7364 17.2273 10.5C17 10.5455 16.7727 10.5818 16.5455 10.6C16.3182 10.6182 16.0909 10.6364 15.8636 10.6364C14.9091 10.6364 14 10.4545 13.1364 10.0909C12.2727 9.72727 11.5 9.2 10.8182 8.5C10.3909 9.36364 9.80909 10.1182 9.06364 10.7545C8.31818 11.3909 7.48182 11.8545 6.53636 12.1455C6.58182 13.6273 7.12727 14.8909 8.18182 15.9182C9.23636 16.9455 10.5 17.4636 11.9909 17.4636L12 17.4545ZM9.72727 13.8182C9.47273 13.8182 9.25455 13.7273 9.08182 13.5545C8.90909 13.3818 8.81818 13.1636 8.81818 12.9091C8.81818 12.6545 8.90909 12.4364 9.08182 12.2636C9.25455 12.0909 9.47273 12 9.72727 12C9.98182 12 10.2 12.0909 10.3727 12.2636C10.5455 12.4364 10.6364 12.6545 10.6364 12.9091C10.6364 13.1636 10.5455 13.3818 10.3727 13.5545C10.2 13.7273 9.98182 13.8182 9.72727 13.8182ZM14.2727 13.8182C14.0182 13.8182 13.8 13.7273 13.6273 13.5545C13.4545 13.3818 13.3636 13.1636 13.3636 12.9091C13.3636 12.6545 13.4545 12.4364 13.6273 12.2636C13.8 12.0909 14.0182 12 14.2727 12C14.5273 12 14.7455 12.0909 14.9182 12.2636C15.0909 12.4364 15.1818 12.6545 15.1818 12.9091C15.1818 13.1636 15.0909 13.3818 14.9182 13.5545C14.7455 13.7273 14.5273 13.8182 14.2727 13.8182ZM2 5.63636V3.81818C2 3.31818 2.18182 2.89091 2.53636 2.53636C2.89091 2.18182 3.31818 2 3.81818 2H5.63636C5.89091 2 6.10909 2.09091 6.28182 2.26364C6.45455 2.43636 6.54545 2.65455 6.54545 2.90909C6.54545 3.16364 6.45455 3.38182 6.28182 3.55455C6.10909 3.72727 5.89091 3.81818 5.63636 3.81818H3.81818V5.63636C3.81818 5.89091 3.72727 6.10909 3.55455 6.28182C3.38182 6.45455 3.16364 6.54545 2.90909 6.54545C2.65455 6.54545 2.43636 6.45455 2.26364 6.28182C2.09091 6.10909 2 5.89091 2 5.63636ZM5.63636 22H3.81818C3.31818 22 2.89091 21.8182 2.53636 21.4636C2.18182 21.1091 2 20.6818 2 20.1818V18.3636C2 18.1091 2.09091 17.8909 2.26364 17.7182C2.43636 17.5455 2.65455 17.4545 2.90909 17.4545C3.16364 17.4545 3.38182 17.5455 3.55455 17.7182C3.72727 17.8909 3.81818 18.1091 3.81818 18.3636V20.1818H5.63636C5.89091 20.1818 6.10909 20.2727 6.28182 20.4455C6.45455 20.6182 6.54545 20.8364 6.54545 21.0909C6.54545 21.3455 6.45455 21.5636 6.28182 21.7364C6.10909 21.9091 5.89091 22 5.63636 22ZM20.1818 22H18.3636C18.1091 22 17.8909 21.9091 17.7182 21.7364C17.5455 21.5636 17.4545 21.3455 17.4545 21.0909C17.4545 20.8364 17.5455 20.6182 17.7182 20.4455C17.8909 20.2727 18.1091 20.1818 18.3636 20.1818H20.1818V17.4545H22V20.1818C22 20.6818 21.8182 21.1091 21.4636 21.4636C21.1091 21.8182 20.6818 22 20.1818 22ZM20.1818 5.63636V3.81818H18.3636C18.1091 3.81818 17.8909 3.72727 17.7182 3.55455C17.5455 3.38182 17.4545 3.16364 17.4545 2.90909C17.4545 2.65455 17.5455 2.43636 17.7182 2.26364C17.8909 2.09091 18.1091 2 18.3636 2H20.1818C20.6818 2 21.1091 2.18182 21.4636 2.53636C21.8182 2.89091 22 3.31818 22 3.81818V5.63636C22 5.89091 21.9091 6.10909 21.7364 6.28182C21.5636 6.45455 21.3455 6.54545 21.0909 6.54545C20.8364 6.54545 20.6182 6.45455 20.4455 6.28182C20.2727 6.10909 20.1818 5.89091 20.1818 5.63636Z" fill="white"/></svg>);
const IcNavAIStylist = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.63108 2.56421H10.4056C10.4056 3.36727 10.6799 3.96956 11.1423 4.37109C12.0668 4.97338 14.9022 5.73811 14.7989 6.17797C14.6102 6.98102 12.2365 9.94669 12.7604 11.1971C14.1904 14.6101 14.7989 16.2162 13.6853 17.0192C9.29227 19.4284 4.20855 17.8223 3.47222 16.2162C3.00684 15.201 4.62533 13.0039 5.08775 11.3978C5.55017 9.79171 3.00684 6.37873 3.00684 5.9772C3.00684 5.57567 6.28651 4.97338 6.93745 4.57185C7.4143 4.27771 7.63108 3.1665 7.63108 2.56421Z" fill="white"/><path d="M10.4049 1.67944C10.8935 1.67944 11.2895 2.0755 11.2895 2.56405C11.2895 3.11474 11.4601 3.449 11.6789 3.6606C11.8414 3.75726 12.1031 3.88173 12.4563 4.02804C12.8434 4.18833 13.2571 4.34469 13.6819 4.51296C14.0839 4.6722 14.5028 4.84462 14.8199 5.01516C14.9725 5.09724 15.1569 5.20827 15.3094 5.34919C15.4105 5.44261 15.7918 5.81722 15.6596 6.38009C15.6099 6.59158 15.5097 6.80678 15.4235 6.97558C15.3293 7.15988 15.2115 7.36414 15.0894 7.57224C14.8359 8.00424 14.5553 8.46124 14.2866 8.94753C14.0188 9.43212 13.7981 9.88681 13.6727 10.2721C13.6106 10.463 13.5795 10.6119 13.5713 10.7214C13.5631 10.8317 13.5802 10.8652 13.5759 10.855C14.2784 12.5317 14.8304 13.8768 15.0434 14.9083C15.1518 15.4336 15.1921 15.9628 15.071 16.4598C14.9418 16.99 14.6442 17.4175 14.2025 17.736C14.1731 17.7573 14.1422 17.7773 14.1104 17.7948C11.7147 19.1086 9.14106 19.3236 7.06921 18.9973C6.03316 18.8341 5.09695 18.5311 4.35087 18.1415C3.6362 17.7682 2.97317 17.2498 2.66804 16.5842C2.42506 16.0538 2.49565 15.4826 2.60469 15.0465C2.71919 14.5888 2.92219 14.1067 3.12877 13.6585C3.57623 12.6879 4.03147 11.8704 4.23799 11.1533C4.27957 11.0089 4.27287 10.7022 4.11359 10.195C3.9632 9.71615 3.71571 9.17947 3.43632 8.64575C3.15799 8.11409 2.86698 7.62089 2.63003 7.20941C2.5155 7.01051 2.4075 6.81908 2.3271 6.66113C2.28716 6.58265 2.24456 6.49434 2.21076 6.40773C2.18867 6.35113 2.12207 6.18043 2.12207 5.97694C2.1221 5.64168 2.29148 5.4118 2.3893 5.30427C2.49253 5.19085 2.60628 5.11266 2.68647 5.06354C2.85025 4.96327 3.04443 4.88126 3.21862 4.81589C3.5773 4.68131 4.04274 4.54657 4.49024 4.42196C4.95547 4.29243 5.40671 4.17291 5.79527 4.05683C5.98708 3.99953 6.14906 3.94695 6.27674 3.90018C6.34022 3.87693 6.38981 3.85658 6.42648 3.84029C6.4332 3.8373 6.43859 3.83348 6.44376 3.83107C6.45095 3.82097 6.46316 3.80663 6.47601 3.78385C6.52011 3.70563 6.56965 3.58864 6.61423 3.43599C6.70472 3.126 6.74669 2.78063 6.74669 2.56405C6.74669 2.0755 7.14274 1.67944 7.6313 1.67944H10.4049ZM8.42376 3.44866C8.39349 3.60986 8.35818 3.77321 8.31204 3.93128C8.24284 4.16832 8.14779 4.42185 8.01717 4.65348C7.89161 4.87605 7.69807 5.1424 7.40209 5.325C7.12126 5.49823 6.67386 5.64126 6.30208 5.75234C5.89265 5.87465 5.40083 6.00527 4.9648 6.12668C4.67406 6.20764 4.40834 6.28734 4.18155 6.35935C4.40551 6.74763 4.71264 7.26913 5.00396 7.82564C5.30249 8.39591 5.60461 9.03881 5.80103 9.66397C5.98848 10.2608 6.12773 10.9842 5.9381 11.6428C5.68214 12.5317 5.09655 13.6161 4.73559 14.3992C4.53808 14.8276 4.39345 15.1852 4.32093 15.475C4.24303 15.7864 4.28657 15.8701 4.276 15.847C4.33895 15.9843 4.58732 16.2696 5.16983 16.5738C5.72113 16.8617 6.46879 17.112 7.34449 17.25C9.08056 17.5234 11.2209 17.3395 13.2027 16.2709C13.2907 16.1988 13.3302 16.132 13.3525 16.0405C13.3856 15.904 13.3929 15.6678 13.3099 15.2653C13.1394 14.4399 12.6722 13.275 11.9449 11.5392C11.6846 10.9179 11.8244 10.2322 11.9898 9.72387C12.1681 9.17648 12.4549 8.6051 12.7385 8.09171C13.0213 7.58 13.3362 7.06618 13.5644 6.67726C13.6146 6.59179 13.6564 6.51002 13.698 6.43653C13.5128 6.3531 13.2875 6.25981 13.03 6.15778C12.6433 6.00461 12.1804 5.82871 11.7791 5.66249C11.3853 5.49942 10.9663 5.31182 10.6595 5.11191C10.6254 5.08974 10.5922 5.06598 10.5616 5.03935C10.0856 4.62602 9.76866 4.08306 9.61937 3.44866H8.42376Z" fill="white"/><path d="M8.01947 21.4357V19.0768C8.01947 18.5882 8.41552 18.1922 8.90408 18.1922C9.39264 18.1922 9.78869 18.5882 9.78869 19.0768V21.4357C9.78869 21.9243 9.39264 22.3203 8.90408 22.3203C8.41552 22.3203 8.01947 21.9243 8.01947 21.4357Z" fill="white"/><path d="M21.0562 10.6527C20.2643 10.9508 19.6474 11.5615 19.3681 12.3228L19.098 13.0665C19.0428 13.217 18.8156 13.217 18.7604 13.0665L18.4903 12.3228C18.211 11.5585 17.5941 10.9478 16.8022 10.6527L16.0933 10.3871C15.9429 10.3311 15.9429 10.1303 16.0933 10.0743L16.8022 9.80866C17.5941 9.51066 18.211 8.89982 18.4903 8.13848L18.7604 7.39486C18.8156 7.24436 19.0428 7.24436 19.098 7.39486L19.3681 8.13848C19.6474 8.90278 20.2643 9.51361 21.0562 9.80866L21.7651 10.0743C21.9155 10.1303 21.9155 10.3311 21.7651 10.3871L21.0562 10.6527Z" fill="white"/></svg>);
const IcNavSettings = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.9738 21.2466C10.6328 21.2466 10.3383 21.1334 10.0903 20.9071C9.84212 20.6809 9.69112 20.4024 9.63729 20.0716L9.39304 18.2003C9.1252 18.1107 8.85054 17.9851 8.56904 17.8236C8.2877 17.6619 8.03612 17.4888 7.81429 17.3043L6.08154 18.0408C5.76737 18.1793 5.4517 18.1927 5.13454 18.0811C4.8172 17.9696 4.5707 17.7671 4.39504 17.4736L3.26804 15.5196C3.09237 15.2261 3.04179 14.9155 3.11629 14.5878C3.19062 14.2603 3.36112 13.9902 3.62779 13.7773L5.12579 12.6523C5.10279 12.5037 5.08645 12.3543 5.07679 12.2043C5.06712 12.0543 5.06229 11.9049 5.06229 11.7561C5.06229 11.6139 5.06712 11.4694 5.07679 11.3226C5.08645 11.1757 5.10279 11.0152 5.12579 10.8408L3.62779 9.71583C3.36112 9.503 3.1922 9.23117 3.12104 8.90033C3.04987 8.56967 3.10212 8.2575 3.27779 7.96383L4.39504 6.03883C4.5707 5.75167 4.8172 5.55075 5.13454 5.43608C5.4517 5.32125 5.76737 5.33308 6.08154 5.47158L7.80454 6.19858C8.0457 6.00758 8.30312 5.83292 8.57679 5.67458C8.85045 5.51625 9.11937 5.389 9.38354 5.29283L9.63729 3.42158C9.69112 3.09075 9.84212 2.81225 10.0903 2.58608C10.3383 2.35975 10.6328 2.24658 10.9738 2.24658H13.1893C13.5303 2.24658 13.8248 2.35975 14.0728 2.58608C14.321 2.81225 14.472 3.09075 14.5258 3.42158L14.77 5.30233C15.07 5.41133 15.3415 5.53858 15.5843 5.68408C15.8273 5.82958 16.0725 6.00108 16.32 6.19858L18.0913 5.47158C18.4053 5.33308 18.721 5.32125 19.0383 5.43608C19.3556 5.55075 19.602 5.75167 19.7775 6.03883L20.895 7.97358C21.0707 8.26708 21.1213 8.57766 21.0468 8.90533C20.9725 9.23283 20.802 9.503 20.5353 9.71583L18.9988 10.8696C19.0346 11.0311 19.0542 11.1821 19.0575 11.3226C19.0607 11.4629 19.0623 11.6042 19.0623 11.7466C19.0623 11.8824 19.059 12.0206 19.0525 12.1611C19.0462 12.3014 19.0232 12.462 18.9835 12.6428L20.491 13.7773C20.7577 13.9902 20.9299 14.2603 21.0075 14.5878C21.085 14.9155 21.036 15.2261 20.8603 15.5196L19.7275 17.4638C19.552 17.7575 19.304 17.9601 18.9835 18.0716C18.663 18.1831 18.3457 18.1696 18.0315 18.0311L16.32 17.2946C16.0725 17.4921 15.82 17.6667 15.5623 17.8186C15.3046 17.9706 15.0405 18.0947 14.77 18.1908L14.5258 20.0716C14.472 20.4024 14.321 20.6809 14.0728 20.9071C13.8248 21.1334 13.5303 21.2466 13.1893 21.2466H10.9738ZM12.093 14.7466C12.925 14.7466 13.633 14.4546 14.217 13.8706C14.801 13.2866 15.093 12.5786 15.093 11.7466C15.093 10.9146 14.801 10.2066 14.217 9.62258C13.633 9.03858 12.925 8.74658 12.093 8.74658C11.2507 8.74658 10.5401 9.03858 9.96129 9.62258C9.38245 10.2066 9.09304 10.9146 9.09304 11.7466C9.09304 12.5786 9.38245 13.2866 9.96129 13.8706C10.5401 14.4546 11.2507 14.7466 12.093 14.7466Z" fill="white"/></svg>);

// L2 panel icons (20×20, #5a5a5a)
const IcL2Lifestyle = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5003 15C17.5003 15.4583 17.1253 15.8333 16.667 15.8333H15.6837C15.342 16.8 14.4253 17.5 13.3337 17.5C12.242 17.5 11.3337 16.8 10.9837 15.8333H9.00866C8.66699 16.8 7.75033 17.5 6.65866 17.5C5.56699 17.5 4.65866 16.8 4.30866 15.8333H3.32533C2.86699 15.8333 2.49199 15.4583 2.49199 15C2.49199 14.5417 2.86699 14.1667 3.32533 14.1667H4.30866C4.65033 13.2 5.56699 12.5 6.65866 12.5C7.75033 12.5 8.65866 13.2 9.00866 14.1667H10.9837C11.3253 13.2 12.242 12.5 13.3337 12.5C14.4253 12.5 15.3337 13.2 15.6837 14.1667H16.667C17.1253 14.1667 17.5003 14.5417 17.5003 15ZM17.5003 9.16667H15.8337L14.542 4.01667C14.317 3.125 13.517 2.5 12.6003 2.5C12.167 2.5 11.7587 2.65833 11.4087 2.9C11.0087 3.175 10.5253 3.33333 10.0003 3.33333C9.47533 3.33333 8.99199 3.175 8.59199 2.9C8.23366 2.65833 7.83366 2.5 7.40033 2.5C6.48366 2.5 5.68366 3.125 5.45866 4.01667L4.16699 9.16667H2.50033C2.04199 9.16667 1.66699 9.54167 1.66699 10C1.66699 10.4583 2.04199 10.8333 2.50033 10.8333H17.5003C17.9587 10.8333 18.3337 10.4583 18.3337 10C18.3337 9.54167 17.9587 9.16667 17.5003 9.16667Z" fill="#5a5a5a"/></svg>);
const IcL2Beauty = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3.33301 10H8.33301V15.8333C8.33301 16.75 7.58301 17.5 6.66634 17.5H4.99967C4.08301 17.5 3.33301 16.75 3.33301 15.8333V10ZM7.49967 3.68333C7.49967 2.94167 6.59967 2.56667 6.07467 3.09167L4.40801 4.75833C4.24967 4.91667 4.16634 5.125 4.16634 5.35V8.34167H7.49967V3.68333ZM11.6663 15.8417C11.6663 16.7583 12.4163 17.5083 13.333 17.5083C14.2497 17.5083 14.9997 16.7583 14.9997 15.8417V10.0083H11.6663V15.8417ZM17.208 3.69167C16.408 2.95 14.508 2.5 13.3247 2.5C12.1413 2.5 10.2413 2.95833 9.44134 3.7C9.18301 3.94167 9.09967 4.325 9.24134 4.65L11.658 8.33333H14.9913L17.408 4.64167C17.5497 4.31667 17.4663 3.93333 17.208 3.69167Z" fill="#5a5a5a"/></svg>);
const IcL2HomeDecor = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5272 10.412V15.9732C12.5272 16.9001 11.7689 17.6584 10.842 17.6584H9.67082C9.20739 17.6584 8.82822 17.2792 8.82822 16.8158V13.4454C8.82822 12.982 8.44905 12.6028 7.98562 12.6028H6.30041C5.83698 12.6028 5.45781 12.982 5.45781 13.4454V16.8158C5.45781 17.2792 5.07864 17.6584 4.61521 17.6584H3.44399C2.51713 17.6584 1.75879 16.9001 1.75879 15.9732V10.412C1.75879 9.88962 2.01157 9.38406 2.43287 9.07229L6.13189 6.29171C6.73014 5.8367 7.55589 5.8367 8.15414 6.29171L11.8532 9.07229C12.2829 9.38406 12.5272 9.88962 12.5272 10.412ZM18.4255 3.73862V15.9816C18.4255 16.9085 17.6671 17.6668 16.7403 17.6668H15.055C14.5916 17.6668 14.2124 17.2877 14.2124 16.8242V10.4205C14.2124 9.35035 13.6985 8.33923 12.8643 7.73256L8.87035 4.7329C8.55859 4.49697 8.37321 4.13465 8.37321 3.73862C8.37321 3.05612 8.92933 2.5 9.61184 2.5H17.1784C17.8609 2.5 18.417 3.05612 18.417 3.73862H18.4255Z" fill="#5a5a5a"/></svg>);
const IcL2LooksBuilder = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.43972 12.831C6.1973 12.831 6.00033 12.7443 5.83366 12.5709C5.66699 12.3974 5.58366 12.1925 5.58366 11.9402C5.58366 11.688 5.66699 11.483 5.83366 11.3096C6.00033 11.1362 6.1973 11.0495 6.43972 11.0495C6.68215 11.0495 6.87911 11.1362 7.04578 11.3096C7.21245 11.483 7.29578 11.688 7.29578 11.9402C7.29578 12.1925 7.21245 12.3974 7.04578 12.5709C6.87911 12.7443 6.68215 12.831 6.43972 12.831ZM10.5306 12.831C10.2882 12.831 10.0912 12.7443 9.92457 12.5709C9.7579 12.3974 9.67457 12.1925 9.67457 11.9402C9.67457 11.688 9.7579 11.483 9.92457 11.3096C10.0912 11.1362 10.2882 11.0495 10.5306 11.0495C10.7731 11.0495 10.97 11.1362 11.1367 11.3096C11.3034 11.483 11.3867 11.688 11.3867 11.9402C11.3867 12.1925 11.3034 12.3974 11.1367 12.5709C10.97 12.7443 10.7731 12.831 10.5306 12.831ZM8.48517 18.3333C7.5382 18.3333 6.65184 18.1441 5.82609 17.7736C5.00033 17.4031 4.27306 16.8986 3.65942 16.2601C3.04578 15.6216 2.56093 14.8727 2.20487 14.0056C1.84881 13.1384 1.66699 12.224 1.66699 11.2386C1.66699 10.2533 1.84881 9.33884 2.20487 8.47171C2.56093 7.60459 3.04578 6.8557 3.65942 6.21718C4.27306 5.57866 4.99275 5.07415 5.82609 4.70365C6.65942 4.33315 7.5382 4.14395 8.48517 4.14395C9.43214 4.14395 10.3109 4.33315 11.1443 4.70365C11.9776 5.07415 12.6973 5.57866 13.3109 6.21718C13.9246 6.8557 14.4094 7.60459 14.7655 8.47171C15.1215 9.33884 15.3034 10.2612 15.3034 11.2386C15.3034 12.2161 15.1215 13.1463 14.7655 14.0056C14.4094 14.8648 13.9246 15.6216 13.3109 16.2601C12.6973 16.8986 11.9776 17.4031 11.1443 17.7736C10.3109 18.1441 9.42457 18.3333 8.48517 18.3333Z" fill="#5a5a5a"/><path d="M16.2959 4.07291L15.7884 4.27787C15.2202 4.50647 14.7808 4.97945 14.5762 5.57067L14.3793 6.14613C14.3414 6.26438 14.1747 6.26438 14.1368 6.14613L13.9399 5.57067C13.7429 4.97945 13.2959 4.50647 12.7277 4.27787L12.2202 4.07291C12.1141 4.03349 12.1141 3.87583 12.2202 3.82854L12.7277 3.62358C13.2959 3.39497 13.7353 2.92199 13.9399 2.33077L14.1368 1.75531C14.1747 1.63706 14.3414 1.63706 14.3793 1.75531L14.5762 2.33077C14.7732 2.92199 15.2202 3.39497 15.7884 3.62358L16.2959 3.82854C16.402 3.86795 16.402 4.02561 16.2959 4.07291Z" fill="#5a5a5a"/><path d="M18.2769 6.4811L17.9099 6.62208C17.5052 6.78185 17.1852 7.1108 17.0441 7.51494L16.9029 7.90967C16.8747 7.99426 16.7617 7.99426 16.7335 7.90967L16.5923 7.51494C16.4512 7.1108 16.1312 6.78185 15.7265 6.62208L15.3595 6.4811C15.2842 6.4529 15.2842 6.34012 15.3595 6.31193L15.7265 6.17095C16.1312 6.01118 16.4512 5.68223 16.5923 5.27809L16.7335 4.88336C16.7617 4.79877 16.8747 4.79877 16.9029 4.88336L17.0441 5.27809C17.1852 5.68223 17.5052 6.01118 17.9099 6.17095L18.2769 6.31193C18.3522 6.34012 18.3522 6.4529 18.2769 6.4811Z" fill="#5a5a5a"/></svg>);
const IcL2ARAds = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.28418 12.5574H4.07975C3.42057 12.5574 2.85091 12.3214 2.37891 11.8494C1.9069 11.3774 1.6709 10.8077 1.6709 10.1485V7.73967C1.6709 7.08049 1.9069 6.51082 2.37891 6.03882C2.85091 5.56681 3.42057 5.33081 4.07975 5.33081H8.9056L13.0967 2.79175C13.4954 2.54761 13.9023 2.54761 14.3174 2.79175C14.7324 3.03589 14.9359 3.38582 14.9359 3.84969V14.0385C14.9359 14.5024 14.7324 14.8523 14.3174 15.0964C13.9023 15.3406 13.4954 15.3406 13.0967 15.0964L8.9056 12.5655H7.70117V16.1788C7.70117 16.5206 7.58724 16.8054 7.35124 17.0414C7.11523 17.2774 6.8304 17.3914 6.48861 17.3914C6.14681 17.3914 5.86198 17.2774 5.62598 17.0414C5.38997 16.8054 5.27604 16.5206 5.27604 16.1788V12.5655L5.28418 12.5574ZM16.5228 12.9806V4.8995C17.068 5.37964 17.4994 5.96558 17.833 6.66545C18.1667 7.36532 18.3294 8.11401 18.3294 8.94409C18.3294 9.77417 18.1667 10.5229 17.833 11.2227C17.4994 11.9226 17.068 12.5004 16.5228 12.9887V12.9806Z" fill="#5a5a5a"/></svg>);
const IcChevronUp20 = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.17825 13.2114C4.01326 13.0464 3.92487 12.8519 3.91309 12.628C3.91309 12.4041 3.98969 12.2096 4.15468 12.0446L9.42263 6.77668C9.50512 6.69419 9.5994 6.63526 9.69368 6.59991C9.78797 6.56455 9.89992 6.54688 10.006 6.54688C10.1121 6.54688 10.224 6.56455 10.3183 6.59991C10.4126 6.63526 10.5069 6.69419 10.5894 6.77668L15.8337 12.0211C15.9987 12.1861 16.0812 12.3864 16.0871 12.6162C16.093 12.846 16.0046 13.0405 15.8337 13.2114C15.6687 13.3646 15.4743 13.4412 15.2386 13.4412C15.0029 13.4412 14.8202 13.3646 14.667 13.2114L10.006 8.55034L5.34498 13.2114C5.17999 13.3763 4.97964 13.4588 4.76161 13.453C4.54359 13.4471 4.34324 13.3646 4.17825 13.2114Z" fill="#5a5a5a"/></svg>);
const IcChevronDown20 = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15.017 6.66663C14.792 6.66663 14.6003 6.74163 14.4337 6.90829L10.0087 11.3333L5.58366 6.90829C5.43366 6.75829 5.24199 6.68329 5.00866 6.68329C4.77533 6.68329 4.58366 6.75829 4.41699 6.90829C4.25033 7.07496 4.16699 7.27496 4.16699 7.49996C4.16699 7.72496 4.25033 7.92496 4.41699 8.09163L9.42533 13.1C9.50866 13.1833 9.60033 13.2416 9.69199 13.275C9.78366 13.3083 9.89199 13.325 10.0087 13.325C10.117 13.325 10.2253 13.3083 10.3253 13.275C10.4253 13.2416 10.5087 13.1833 10.592 13.1L15.6253 8.07496C15.792 7.90829 15.8753 7.71663 15.867 7.49163C15.867 7.26663 15.7753 7.07496 15.6087 6.90829C15.442 6.75829 15.2503 6.67496 15.0253 6.66663H15.017Z" fill="#5a5a5a"/></svg>);

const SIDEBAR_NAV = [
  { id: "dashboard", label: "Dashboard", Icon: IcNavDashboard },
  { id: "analytics", label: "Analytics", Icon: IcNavAnalytics },
  { id: "assets", label: "3D Assets", Icon: IcNav3DAssets },
  {
    id: "tryons", label: "Try-Ons", Icon: IcNavTryOns, page: "products",
    l2Title: "AR Tools",
    l2Items: [
      {
        id: "lifestyle", label: "Lifestyle", L2Icon: IcL2Lifestyle, chevron: true, category: "Lifestyle",
        l3: [
          { id: "lifestyle-products", label: "Products", page: "products" },
          { id: "lifestyle-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "lifestyle-integration", label: "Integration", page: "integration" },
        ],
      },
      {
        id: "beauty", label: "Beauty", L2Icon: IcL2Beauty, chevron: true, category: "Beauty",
        l3: [
          { id: "beauty-products", label: "Products", page: "products" },
          { id: "beauty-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "beauty-integration", label: "Integration", page: "integration" },
        ],
      },
      {
        id: "home", label: "Home & Decor", L2Icon: IcL2HomeDecor, chevron: true, category: "Home",
        l3: [
          { id: "home-products", label: "Products", page: "products" },
          { id: "home-sdkconfig", label: "SDK configuration", page: "sdkconfig" },
          { id: "home-integration", label: "Integration", page: "integration" },
        ],
      },
      { id: "looks", label: "Looks builder", L2Icon: IcL2LooksBuilder },
      { id: "arads", label: "AR ads", L2Icon: IcL2ARAds },
    ],
  },
  { id: "skin", label: "Skin Analysis", Icon: IcNavSkinAnalysis },
  { id: "aistylist", label: "AI Stylist", Icon: IcNavAIStylist, page: "aiStylist" },
  {
    id: "settings", label: "Settings", Icon: IcNavSettings,
    l2Title: "Settings",
    l2Items: [
      { id: "overview", label: "Overview", L2Icon: IcL2LooksBuilder },
      { id: "team", label: "Team", L2Icon: IcL2ARAds },
      { id: "tokens", label: "Tokens", L2Icon: IcL2ARAds },
      { id: "webhooks", label: "Webhooks", L2Icon: IcL2ARAds },
      { id: "billing", label: "Billing & payments", L2Icon: IcL2ARAds },
    ],
  },
];

function Sidebar({ activePage, activeCategory, onNavigate }) {
  const defaultL2 = activePage === "products" || activePage === "sdkconfig" || activePage === "integration" ? "tryons" : null;
  const [openL2, setOpenL2] = useState(defaultL2);
  const categoryToL2Id = { Lifestyle: "lifestyle", Beauty: "beauty", Home: "home" };
  const [openL3, setOpenL3] = useState(categoryToL2Id[activeCategory] || "lifestyle");
  const activeL3Id = `${(categoryToL2Id[activeCategory] || "lifestyle")}-${activePage === "products" ? "products" : activePage === "sdkconfig" ? "sdkconfig" : activePage === "integration" ? "integration" : "products"}`;
  const [hovered, setHovered] = useState(null);
  const [hoveredL2, setHoveredL2] = useState(null);

  const activeItem = SIDEBAR_NAV.find(n => n.id === openL2);

  const handleNavClick = (item) => {
    if (item.l2Items) {
      setOpenL2(openL2 === item.id ? null : item.id);
      if (item.page) onNavigate(item.page);
    } else {
      setOpenL2(null);
      if (item.page) onNavigate(item.page);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", flexShrink: 0, fontFamily: "Inter, -apple-system, sans-serif" }}>
      {/* ── Icon Rail ── */}
      <div style={{ width: 76, background: "#141414", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 4px", gap: 16, overflowY: "auto", flexShrink: 0 }}>
        {SIDEBAR_NAV.map(item => {
          const NavIcon = item.Icon;
          const isActive = openL2 === item.id || (!openL2 && item.page === activePage);
          const isHov = hovered === item.id;
          return (
            <div
              key={item.id}
              style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", userSelect: "none", position: "relative" }}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                width: 48, borderRadius: 6,
                background: isActive ? "#262626" : isHov ? "#1e1e1e" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "6px 0", transition: "background 0.15s", position: "relative",
              }}>
                <NavIcon />
                {/* Tooltip arrow when L2 panel is open */}
                {isActive && openL2 === item.id && (
                  <div style={{ position: "absolute", right: -7, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
                    <svg width="7" height="16" viewBox="0 0 7 16" fill="none">
                      <path d="M1.84254 6.38376L4.96593 3.90196C6.26832 2.8671 7 1.46352 7 0L7 16C7 14.5365 6.26833 13.1329 4.96593 12.098L1.84254 9.61624C0.719156 8.72362 0.719153 7.27639 1.84254 6.38376Z" fill="#fafafa"/>
                    </svg>
                  </div>
                )}
              </div>
              <span style={{
                fontSize: 11, color: isActive ? "#fff" : "#aaa", lineHeight: "14px",
                fontWeight: isActive ? 500 : 400, textAlign: "center",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                width: 68, paddingLeft: 2, paddingRight: 2,
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── L2 Panel ── */}
      {openL2 && activeItem?.l2Items && (
        <div style={{
          width: 224, background: "#fafafa", display: "flex", flexDirection: "column",
          padding: "16px 8px", overflowY: "auto", flexShrink: 0,
          borderRight: "1px solid #e8e8e8",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          fontSize: 14, color: "#141414",
        }}>
          {/* Header */}
          <div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 8px", marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3, color: "#141414" }}>{activeItem.l2Title}</span>
          </div>

          {/* L2 Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {activeItem.l2Items.map(l2 => {
              const L2Icon = l2.L2Icon;
              const isL3Open = openL3 === l2.id;
              const isL2Hov = hoveredL2 === l2.id;
              return (
                <div key={l2.id}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", padding: 8, gap: 8,
                      cursor: "pointer", borderRadius: 8, userSelect: "none",
                      background: isL2Hov ? "#efefef" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onClick={() => l2.chevron ? setOpenL3(isL3Open ? null : l2.id) : null}
                    onMouseEnter={() => setHoveredL2(l2.id)}
                    onMouseLeave={() => setHoveredL2(null)}
                  >
                    {L2Icon && <div style={{ flexShrink: 0 }}><L2Icon /></div>}
                    <span style={{ flex: 1, lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 14, fontWeight: 400, color: "#141414" }}>{l2.label}</span>
                    {l2.chevron && (isL3Open ? <IcChevronUp20 /> : <IcChevronDown20 />)}
                  </div>

                  {/* L3 Submenu */}
                  {l2.l3 && isL3Open && (
                    <div style={{ display: "flex", paddingLeft: 16, paddingBottom: 4, gap: 8 }}>
                      {/* Tree line + dot */}
                      <div style={{ width: 8, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ flex: 1, width: 1, background: "#e0e0e0" }} />
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#da0e64", flexShrink: 0 }} />
                      </div>
                      {/* L3 list */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4px 0", gap: 8 }}>
                        {l2.l3.map(l3 => {
                          const isActive = activeL3Id === l3.id;
                          return (
                            <div
                              key={l3.id}
                              style={{
                                height: 32, borderRadius: 8, display: "flex", alignItems: "center",
                                padding: "4px 8px", cursor: "pointer",
                                background: isActive ? "#fcebf4" : "transparent",
                                color: isActive ? "#8f0941" : "#5a5a5a",
                                fontSize: 14, fontWeight: 400,
                                transition: "background 0.1s",
                              }}
                              onClick={() => { if (l3.page) onNavigate(l3.page, l2.category); }}
                              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#f2f2f2"; }}
                              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                            >
                              {l3.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Topbar() {
  const [hovBtn, setHovBtn] = useState(null);
  return (
    <div style={{ height: 56, background: "#141414", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 0 24px", flexShrink: 0, position: "relative", fontFamily: "Inter, -apple-system, sans-serif" }}>
      {/* ── Prefix: logo + logotype ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* GlamAR logomark */}
        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M30.8722 4.24337L27.0195 1.04279C25.3487 -0.346004 22.9243 -0.346004 21.2535 1.04279L16.5927 4.91428L11.9356 1.04279C10.2649 -0.346004 7.84427 -0.347912 6.17162 1.03897L2.30981 4.24337C0.845721 5.4575 0 7.25976 0 9.16167V17.1326C0 19.031 0.844399 20.8311 2.30408 22.0446L12.5034 30.5243C14.8714 32.4919 18.3069 32.4919 20.6729 30.5243L30.8722 22.0446C32.3332 20.83 33.1782 19.0285 33.1782 17.1285V9.15771C33.1782 7.25961 32.3324 5.45735 30.8722 4.24337ZM30.1712 16.6022C30.1712 17.9422 29.5735 19.2145 28.5437 20.0715L19.4721 27.6134C17.8014 29.0022 15.3769 29.0022 13.7043 27.6134L4.63268 20.0715C3.60275 19.2145 3.00699 17.9422 3.00699 16.6022V9.68992C3.00699 8.3481 3.60466 7.0757 4.63825 6.21868L7.37077 3.95217C8.34624 3.14226 9.75954 3.14402 10.733 3.95408L14.2399 6.86889L9.12239 11.1182C7.85763 12.1706 7.85572 14.112 9.12048 15.1644L14.8958 19.9774C15.8711 20.7894 17.2863 20.7911 18.2617 19.9793L24.0539 15.1644C25.3186 14.112 25.3186 12.1706 24.0539 11.1182L21.2419 8.78079C21.1026 8.66499 20.9008 8.66499 20.7615 8.78079L18.9967 10.2466C18.8159 10.3969 18.8157 10.6745 18.9967 10.8248L21.0883 12.5635C21.4509 12.8642 21.4509 13.4186 21.0883 13.7193L17.0627 17.0683C16.7826 17.2995 16.3785 17.2995 16.1004 17.0664L12.0861 13.7211C11.7253 13.4204 11.7253 12.866 12.088 12.5653L15.3375 9.86649L16.1117 9.22376L18.9439 6.8708L21.1935 5.00279L22.4546 3.95408C23.4299 3.14402 24.8432 3.14402 25.8168 3.95408L28.5437 6.21868C29.5737 7.0757 30.1712 8.34619 30.1712 9.68801V16.6022Z" fill="#ffffff" />
        </svg>
        {/* Vertical divider */}
        <svg width="1" height="21" viewBox="0 0 1 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M0.5 20.5L0.499999 0.5" stroke="#5A5A5A" strokeLinecap="round" />
        </svg>
        {/* GlamAR logotype */}
        <svg width="99" height="20" viewBox="0 0 99 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M81.0089 19.2908H78.0892C77.9525 19.2908 77.8308 19.2048 77.7851 19.0759L76.1286 14.4039C76.0833 14.275 75.9613 14.1891 75.8245 14.1891H68.5872C68.4505 14.1891 68.3283 14.2748 68.2831 14.4039L66.6268 19.0759C66.5813 19.2048 66.4592 19.2908 66.323 19.2908H63.5382C63.3118 19.2908 63.1558 19.0641 63.2366 18.8527L69.9995 1.2309C70.2702 0.520988 70.9573 0.0168887 71.7619 0.0168887H72.726C73.5268 0.0168887 74.2452 0.510109 74.5331 1.25751L81.3097 18.8526C81.3914 19.0637 81.2353 19.2908 81.0089 19.2908ZM75.0128 11.1959L72.5318 4.07805C72.4868 3.95589 72.3689 3.86827 72.2312 3.86827C72.0956 3.86827 71.9805 3.95368 71.9341 4.07291L69.4289 11.1947C69.3546 11.4046 69.5107 11.6244 69.733 11.6244H74.7079C74.9301 11.6244 75.086 11.4053 75.0128 11.1959Z" fill="#ffffff" />
          <path d="M96.5919 10.3594C97.6027 11.3101 98.2343 12.6595 98.2343 14.1571V18.9545C98.2343 19.14 98.0839 19.2907 97.8979 19.2907H95.6985C95.5128 19.2907 95.3622 19.14 95.3622 18.9545V14.5812C95.3622 13.1517 94.2115 11.682 92.7862 11.6604C92.7654 11.6607 92.7452 11.6635 92.7246 11.6635H86.3053C86.1368 11.6635 86.0005 11.8001 86.0005 11.9681V18.9486C86.0005 19.1344 85.8501 19.2848 85.6642 19.2848H83.3053C83.1197 19.2848 82.9689 19.1339 82.9689 18.9479V2.24397C82.977 1.43864 83.4065 0.735346 84.0459 0.340182C84.3734 0.114227 84.7546 0 85.1632 0H92.6115C95.4914 0 97.8264 2.33511 97.8264 5.21564V6.56211C97.8264 7.84462 97.352 9.01659 96.57 9.91277C96.4545 10.0451 96.4641 10.2387 96.5919 10.3594ZM94.7959 6.33468V5.48011C94.7959 4.0397 93.6282 2.87229 92.1881 2.87229H86.3144C86.1411 2.87229 86.001 3.01239 86.001 3.18572V8.62878C86.001 8.8021 86.1409 8.9422 86.3144 8.9422H92.1878C93.6282 8.9422 94.7959 7.77479 94.7959 6.33468Z" fill="#ffffff" />
          <path d="M18.5886 19.3022C18.4038 19.3022 18.254 19.1524 18.254 18.9676V0.379739C18.254 0.194947 18.4038 0.0451431 18.5886 0.0451431H20.9402C21.125 0.0451431 21.2749 0.194947 21.2749 0.379739V18.9676C21.2749 19.1524 21.125 19.3022 20.9402 19.3022H18.5886Z" fill="#ffffff" />
          <path d="M36.1953 5.58926C36.3804 5.58926 36.5301 5.73936 36.5301 5.92401V18.9547C36.5301 19.1394 36.3798 19.2895 36.195 19.2895H34.0053C33.8202 19.2895 33.6706 19.1394 33.6706 18.9547V18.2564C33.6706 18.1091 33.4942 18.034 33.388 18.1356C32.4037 19.0797 31.0678 19.6601 29.596 19.6601C29.5518 19.6601 29.5077 19.6593 29.4637 19.6582C29.4365 19.6585 29.409 19.6601 29.3816 19.6601C28.3049 19.6601 27.3649 19.4701 26.5619 19.0908C25.7585 18.7116 25.0924 18.1951 24.5628 17.5418C24.0333 16.8895 23.6359 16.1168 23.3715 15.2252C23.1067 14.3345 22.9744 13.3767 22.9744 12.3528C22.9744 11.1177 23.142 10.0496 23.4776 9.14912C23.8129 8.24898 24.2588 7.50775 24.8145 6.925C25.3705 6.34225 26.0059 5.91445 26.7208 5.64086C27.143 5.479 27.5702 5.36654 28.0017 5.30053L28.0011 5.29906C28.0011 5.29906 29.9027 4.96667 31.4031 5.59176C31.4281 5.60235 31.4512 5.61264 31.4731 5.62293C32.1308 5.88696 32.725 6.27389 33.2279 6.75653C33.3348 6.8587 33.512 6.78461 33.512 6.63671V5.92415C33.512 5.73921 33.6618 5.58941 33.8467 5.58941L36.1953 5.58926ZM33.6178 12.432C33.6178 10.9141 33.2779 9.73099 32.5986 8.88391C31.9184 8.03655 30.9966 7.61301 29.8316 7.61301C29.1255 7.61301 28.5301 7.75899 28.0446 8.04978C27.5592 8.341 27.162 8.72073 26.8533 9.18808C26.5444 9.65631 26.3237 10.1855 26.1914 10.7768C26.059 11.3684 25.9927 11.9729 25.9927 12.5906C25.9927 13.1732 26.0678 13.7467 26.2177 14.3115C26.3675 14.8768 26.597 15.3799 26.9063 15.8206C27.2149 16.2618 27.6079 16.615 28.0846 16.8798C28.5612 17.1443 29.1258 17.2767 29.7789 17.2767C30.4497 17.2767 31.0273 17.1356 31.5129 16.8531C31.998 16.5711 32.3951 16.2005 32.7043 15.7415C33.0127 15.2825 33.2422 14.7665 33.3929 14.1925C33.5427 13.6194 33.6178 13.0321 33.6178 12.432Z" fill="#ffffff" />
          <path d="M54.0185 5.21106C55.4671 5.21106 56.5935 5.56477 57.3979 6.27115C58.2021 6.97827 58.6042 8.1623 58.6042 9.82307V18.9517C58.6042 19.1359 58.4547 19.2854 58.2705 19.2854H55.9162C55.732 19.2854 55.5825 19.136 55.5825 18.9517V11.2807C55.5825 10.7332 55.5647 10.2335 55.5297 9.78308C55.4942 9.3325 55.3927 8.94439 55.225 8.617C55.0568 8.29005 54.8051 8.03837 54.4695 7.86136C54.1333 7.6851 53.674 7.59645 53.0908 7.59645C52.0659 7.59645 51.3235 7.91473 50.8642 8.55099C50.4047 9.18696 50.1752 10.0884 50.1752 11.2544V18.952C50.1752 19.1362 50.026 19.2857 49.8415 19.2857H47.4875C47.303 19.2857 47.1535 19.1363 47.1535 18.952V10.4858C47.1535 9.5317 46.9815 8.81149 46.6371 8.32548C46.2923 7.8399 45.6605 7.59675 44.7418 7.59675C44.3528 7.59675 43.9775 7.67628 43.6154 7.8352C43.2529 7.99441 42.9348 8.22419 42.661 8.52424C42.387 8.82487 42.1662 9.19607 41.9983 9.63754C41.8301 10.0793 41.7466 10.583 41.7466 11.1481V18.952C41.7466 19.1362 41.5971 19.2857 41.4129 19.2857H39.0587C38.8745 19.2857 38.725 19.1363 38.725 18.952V5.91598C38.725 5.73177 38.8745 5.58212 39.0587 5.58212H41.2537C41.4385 5.58212 41.5877 5.73162 41.5877 5.91627V6.61104C41.5877 6.7582 41.7638 6.83362 41.8697 6.73203C42.8514 5.79102 44.1833 5.21238 45.6506 5.21238C45.6906 5.21238 45.7305 5.21327 45.77 5.21444H45.7881V5.21268H45.7796C45.8134 5.21238 45.847 5.21135 45.8817 5.21135C45.9139 5.21135 45.9463 5.21209 45.9785 5.21268H46.0026C46.7872 5.23032 47.5202 5.41467 48.2008 5.76764C48.8343 6.09606 49.3047 6.58414 49.6129 7.23157C49.6395 7.28817 49.6977 7.32757 49.7646 7.32757C49.8185 7.32757 49.8662 7.30199 49.8966 7.26259C50.3683 6.66367 50.9032 6.18251 51.5009 5.82086C52.1722 5.41423 53.0113 5.21106 54.0185 5.21106Z" fill="#ffffff" />
          <path d="M15.863 10.3238V15.777C15.863 17.724 14.2847 19.3023 12.3377 19.3023H8.51043C3.81022 19.3023 0 15.4921 0 10.7918V8.55522C0 3.85529 3.81007 0.0450766 8.51014 0.0450766H13.8341C14.0122 0.0450766 14.1564 0.189441 14.1564 0.367323V2.59556C14.1564 2.77359 14.012 2.91795 13.834 2.91795H8.96661C5.68769 2.91795 3.02959 5.57605 3.02959 8.85497V10.2494C3.02959 13.6646 5.79809 16.4331 9.21329 16.4331H11.1368C12.0747 16.4331 12.835 15.6727 12.835 14.7348V11.1647C12.835 10.9866 12.6907 10.8423 12.5126 10.8423H8.63289C8.45472 10.8423 8.31035 10.6979 8.31035 10.5197V8.4554C8.31035 8.27737 8.45472 8.133 8.63275 8.133H13.6726C14.8823 8.133 15.863 9.11386 15.863 10.3238Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ── Suffix: upgrade + icons + profile ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Upgrade button */}
        <div style={{ background: "#ffd68a", borderRadius: 999, padding: "0 16px", height: 32, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", flexShrink: 0 }}>
          <Crown size={16} color="#141414" strokeWidth={1.8} />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Upgrade</span>
        </div>

        {/* Help icon */}
        <div
          style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "help" ? "#262626" : "transparent", transition: "background 0.15s" }}
          onMouseEnter={() => setHovBtn("help")} onMouseLeave={() => setHovBtn(null)}
        >
          <HelpCircle size={20} color="#fff" strokeWidth={1.6} />
        </div>

        {/* Support + Notification */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "support" ? "#262626" : "transparent", transition: "background 0.15s" }}
            onMouseEnter={() => setHovBtn("support")} onMouseLeave={() => setHovBtn(null)}
          >
            <Headphones size={20} color="#fff" strokeWidth={1.6} />
          </div>
          <div
            style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "bell" ? "#262626" : "transparent", transition: "background 0.15s" }}
            onMouseEnter={() => setHovBtn("bell")} onMouseLeave={() => setHovBtn(null)}
          >
            <Bell size={20} color="#fff" strokeWidth={1.6} />
          </div>
        </div>

        {/* Company profile card */}
        <div style={{ background: "#1f1f1f", border: "1px solid #2a2a2a", borderRadius: 8, padding: 4, display: "flex", alignItems: "center", gap: 4, height: 44, cursor: "pointer", flexShrink: 0 }}>
          {/* Avatar */}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fcebf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 400, color: "#8f0941", lineHeight: "16px" }}>FV</span>
          </div>
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0, maxWidth: 120 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#fff", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Fuschia Vine Designs</span>
            <span style={{ fontSize: 12, fontWeight: 400, color: "#888", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rahul Choudhary</span>
          </div>
        </div>
      </div>

      {/* Corner piece — dark notch matching the sidebar rail */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: 0, bottom: -12, pointerEvents: "none" }}>
        <path d="M12 12V0L0 5.24537e-07C6.62742 2.34843e-07 12 5.37258 12 12Z" fill="#141414" />
      </svg>
    </div>
  );
}

function ProductFlowHeader({
  title,
  tag,
  onBack,
  secondaryLabel = "Save",
  primaryLabel = "Generate 3D",
  onSecondary,
  onPrimary,
  showSecondary = true,
  showPrimary = true,
}) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      height: 56, background: "#fff", borderBottom: "1px solid #eaeaea",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", flexShrink: 0,
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: 13.5, fontWeight: 500, padding: "6px 10px 6px 0" }}
          onMouseEnter={e => e.currentTarget.style.color = "#141414"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
        <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: "#141414", maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h1>
        {tag && <span style={{ fontSize: 12, color: "#555", background: "#f0f0f0", padding: "3px 12px", borderRadius: 20, fontWeight: 500, flexShrink: 0 }}>{tag}</span>}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {showSecondary && (
          <button
            onClick={onSecondary}
            className="glamar-btn glamar-btn-secondary"
          >
            {secondaryLabel}
          </button>
        )}
        {showPrimary && (
          <button
            onClick={onPrimary}
            className="glamar-btn glamar-btn-primary"
          >
            {primaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SHARED LISTING TABS + HEADER ───
function ListingHeader() {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Product inventory</h1>
    </div>
  );
}

// ─── ACTIONS MENU (shared) ───
function ActionMenu({ product, openMenu, setOpenMenu, onToggleStatus, onEditProduct }) {
  const isActive = product.status === "active";
  const has3D = Boolean(product.media?.hasModel);
  return (
    <td style={{ ...S.td, width: 36, position: "relative" }} onClick={e => e.stopPropagation()}>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center" }}
        onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === product.id ? null : product.id); }}>
        <MoreVertical size={16} color={openMenu === product.id ? "#da0e64" : "#bbb"} />
      </button>
      {openMenu === product.id && (
        <div style={{ position: "absolute", right: 8, top: "calc(100% + 4px)", background: "#fff", border: "1px solid #eaeaea", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 220, overflow: "hidden" }}>
          {/* Active / Inactive toggle */}
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #f0f0f0", cursor: has3D ? "pointer" : "not-allowed", opacity: has3D ? 1 : 0.45 }}
            onClick={() => { if (has3D) { onToggleStatus(product.id); setOpenMenu(null); } }}>
            <span style={{ fontSize: 13.5, color: "#141414" }}>Active/ Inactive product</span>
            <div style={{ width: 36, height: 20, borderRadius: 999, background: has3D && isActive ? "#da0e64" : "#e0e0e0", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: has3D && isActive ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
          {[
            { icon: <IcEditPen />, label: "Edit", action: () => onEditProduct(product) },
            { icon: <IcCopy />, label: "Duplicate" },
            { divider: true },
            { icon: <IcTrash color="#dc2626" />, label: "Delete", danger: true },
          ].map((item, i) => item.divider ? (
            <div key={i} style={{ height: 1, background: "#f0f0f0" }} />
          ) : (
            <div key={i}
              style={{ padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, cursor: "pointer", color: item.danger ? "#dc2626" : "#333" }}
              onClick={e => { e.stopPropagation(); setOpenMenu(null); item.action?.(); }}
              onMouseEnter={e => e.currentTarget.style.background = "#f7f7f8"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      )}
    </td>
  );
}

// ─── LIFESTYLE / HOME LISTING ───
const MODE_BADGE = {
  "3D": { bg: "#fff1f2", color: "#e11d48", border: "#fda4af" },
  "2D": { bg: "#fff1f2", color: "#e11d48", border: "#fda4af" },
  "In process": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "None": { bg: "#f5f5f5", color: "#888", border: "#e0e0e0" },
};
function getMode(p) {
  if (p.media?.hasModel) return "3D";
  if (p.modelGenerating) return "In process";
  if (p.media?.is2D) return "2D";
  return "None";
}

function MultiSelectorBar({ selected, total, onClear, onSelectAll, onPublishAll, onDelete, onExport }) {
  const [moreOpen, setMoreOpen] = useState(false);
  if (selected < 2) return null;
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 1000, display: "flex", alignItems: "center" }}>
      <div style={{ borderRadius: 12, background: "#141414", display: "flex", alignItems: "center", padding: "8px 16px", gap: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#f5f5f5", whiteSpace: "nowrap" }}>
        {/* Label group */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onClear} style={{ width: 24, height: 24, borderRadius: 250, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
            <X size={16} color="#f5f5f5" />
          </button>
          <span style={{ lineHeight: "20px" }}>{selected} of {total} Selected</span>
          <button onClick={onSelectAll} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: "20px", padding: "4px 0" }}>Select All</button>
        </div>
        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        {/* Action group */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onPublishAll} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: "20px", padding: "4px 0" }}>Publish All</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setMoreOpen(v => !v)} style={{ width: 24, height: 24, borderRadius: 250, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
              <MoreVertical size={16} color="#fff" />
            </button>
            {moreOpen && (
              <div style={{ position: "absolute", bottom: 32, left: -0.5, background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "1px solid #fff", overflow: "hidden", minWidth: 120 }}>
                <div style={{ padding: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => { setMoreOpen(false); onDelete?.(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 8px", borderRadius: 8, background: "#fcebf4", border: "none", cursor: "pointer", width: "100%", color: "#da0e64", fontSize: 14, lineHeight: "20px" }}>
                    <Trash2 size={20} color="#da0e64" />
                    <span>Delete</span>
                  </button>
                  <button onClick={() => { setMoreOpen(false); onExport?.(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 8px", borderRadius: 8, background: "#fff", border: "none", cursor: "pointer", width: "100%", color: "#141414", fontSize: 14, lineHeight: "20px" }}>
                    <Download size={20} color="#141414" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralListing({ products, activeTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const handleSort = key => { setSortKey(k => k === key ? key : key); setSortDir(d => sortKey === key ? (d === "asc" ? "desc" : "asc") : "asc"); };

  const tabProducts = products.filter(p => p.headCategory === activeTab);
  const allCategories = [...new Set(tabProducts.map(p => p.category).filter(Boolean))];
  const allSubcategories = [...new Set(tabProducts.map(p => p.subcategory).filter(Boolean))];
  const hasActiveFilters = filterCategory || filterSubcategory || filterStatus || filterMode;

  const clearFilters = () => { setFilterCategory(""); setFilterSubcategory(""); setFilterStatus(""); setFilterMode(""); };

  const filtered = products.filter(p => {
    if (p.headCategory !== activeTab) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.skuId.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterSubcategory && p.subcategory !== filterSubcategory) return false;
    if (filterStatus) {
      const effectiveStatus = p.media?.hasModel ? p.status : "inactive";
      if (effectiveStatus !== filterStatus) return false;
    }
    if (filterMode) {
      if (getMode(p) !== filterMode) return false;
    }
    return true;
  });
  const sorted = sortKey ? [...filtered].sort((a, b) => {
    const va = sortKey === "date" ? new Date(a.date) : a.name.toLowerCase();
    const vb = sortKey === "date" ? new Date(b.date) : b.name.toLowerCase();
    return sortDir === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
  }) : filtered;
  const allChecked = sorted.length > 0 && sorted.every(p => selected.has(p.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(sorted.map(p => p.id)));
  const toggleRow = (id, e) => { e.stopPropagation(); const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };

  const TH = ({ children, sort }) => (
    <th style={{ ...S.th, fontWeight: 500, color: sort ? (sortKey === sort ? "#da0e64" : "#888") : "#888", fontSize: 13, textTransform: "none", position: "sticky", top: 0, zIndex: 1, background: "#fafafa", cursor: sort ? "pointer" : "default", userSelect: "none" }}
      onClick={() => sort && handleSort(sort)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}{sort && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: sortKey === sort ? "#fce8f3" : "#fafafa", flexShrink: 0 }}><IcSort /></span>}</span>
    </th>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
      <ListingHeader />
      <div style={{ ...S.card, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        {/* ── Toolbar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #e0e0e0", borderRadius: "12px 12px 0 0", background: "#fff", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#b5b5b5", pointerEvents: "none" }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search in product name, product ID, category"
                style={{ width: "100%", height: 32, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", padding: "0 10px 0 32px", fontSize: 14, color: "#141414", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button onClick={() => setShowFilters(v => !v)} style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${showFilters ? "#da0e64" : "#e0e0e0"}`, background: showFilters ? "#fff0f6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Filter size={15} color={showFilters ? "#da0e64" : "#555"} />
            </button>
            <button style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <BarChart2 size={15} color="#555" />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => { }} style={{ height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#e13e83", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s, border-color 0.15s, color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff0f6"; e.currentTarget.style.borderColor = "#e13e83"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#fce8f3"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#fff0f6"; }}>
              Import
            </button>
            <button onClick={onAddProduct} style={{ height: 32, borderRadius: 999, border: "none", background: "#da0e64", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c00d58"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#da0e64"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#a00b4a"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#c00d58"; }}>
              Add Product
            </button>
          </div>
        </div>

        {/* ── Filter bar ── */}
        {showFilters && (
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "8px 16px", background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
            {[
              { label: "Category", value: filterCategory, set: setFilterCategory, options: allCategories },
              { label: "Subcategory", value: filterSubcategory, set: setFilterSubcategory, options: allSubcategories },
              { label: "Status", value: filterStatus, set: setFilterStatus, options: ["active", "inactive"] },
              { label: "Mode", value: filterMode, set: setFilterMode, options: ["None", "2D", "3D", "In process"] },
            ].map(({ label, value, set, options }) => (
              <div key={label} style={{ position: "relative" }}>
                <select value={value} onChange={e => set(e.target.value)}
                  style={{ height: 24, paddingTop: 2, paddingBottom: 2, paddingLeft: 12, paddingRight: 24, background: value ? "#fff0f6" : "#fff", borderRadius: 999, border: `1px solid ${value ? "#da0e64" : "#e0e0e0"}`, color: value ? "#da0e64" : "#5a5a5a", fontSize: 14, fontFamily: "Inter", fontWeight: 400, cursor: "pointer", outline: "none", appearance: "none" }}>
                  <option value="">{label}</option>
                  {options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                </select>
                <ChevronDown size={12} color={value ? "#da0e64" : "#5a5a5a"} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            ))}
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ height: 24, paddingTop: 4, paddingBottom: 4, borderRadius: 999, background: "none", border: "none", color: "#8f0941", fontSize: 12, fontFamily: "Inter", fontWeight: 500, lineHeight: "16px", cursor: "pointer" }}>
                Clear All
              </button>
            )}
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th style={{ ...S.th, width: 44, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#da0e64" }} />
              </th>
              <TH sort="name">Product name</TH>
              <TH>SKU ID</TH>
              <TH sort="date">Date</TH>
              <TH>Modes</TH>
              <TH>Status</TH>
              <th style={{ ...S.th, width: 36, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }} />
              <th style={{ ...S.th, width: 36, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }} />
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={8} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb", fontSize: 14 }}>No products in {activeTab}</td></tr>
            ) : sorted.map(p => {
              const mode = getMode(p);
              const mb = MODE_BADGE[mode];
              const effectiveStatus = p.media?.hasModel ? p.status : "inactive";
              const isSelected = selected.has(p.id);
              return (
                <tr key={p.id} style={{ cursor: "pointer", borderBottom: "1px solid #f8f8f8", background: isSelected ? "#FFF5FC" : "transparent" }} onClick={() => onViewProduct(p)}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }} onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
                  <td style={{ ...S.td, width: 44 }} onClick={e => toggleRow(p.id, e)}>
                    <input type="checkbox" checked={isSelected} onChange={() => { }} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#DA0E64" }} />
                  </td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Image size={17} color="#ccc" />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: 13.5, color: "#141414" }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize: 13, color: "#555" }}>{p.skuId}</td>
                  <td style={{ ...S.td, fontSize: 13, color: "#888" }}>{p.date}</td>
                  <td style={S.td}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: mb.bg, color: mb.color, border: `1px solid ${mb.border}` }}>{mode}</span>
                  </td>
                  <td style={S.td}>
                    <span style={S.badge(effectiveStatus)}>{effectiveStatus ? effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1) : ""}</span>
                  </td>
                  <td style={{ ...S.td, width: 36 }} onClick={e => { e.stopPropagation(); onViewProduct(p); }}>
                    <Eye size={16} color="#bbb" style={{ cursor: "pointer", display: "block" }} />
                  </td>
                  <ActionMenu product={p} openMenu={openMenu} setOpenMenu={setOpenMenu} onToggleStatus={onToggleStatus} onEditProduct={onEditProduct} />
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: 13, color: "#888" }}>Showing 1–{Math.min(rowsPerPage, filtered.length)} of {filtered.length} results</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Rows per page</span>
              <div style={{ position: "relative" }}>
                <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}
                  style={{ appearance: "none", border: "1px solid #e0e0e0", borderRadius: 8, padding: "5px 28px 5px 12px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none", background: "#fff" }}>
                  {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={15} color="#555" /></button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} color="#555" /></button>
            </div>
          </div>
        </div>
      </div>
      <MultiSelectorBar
        selected={selected.size}
        total={filtered.length}
        onClear={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(filtered.map(p => p.id)))}
        onPublishAll={() => {}}
      />
    </div>
  );
}

// ─── BEAUTY LISTING ───
function BeautyListing({ products, activeTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const handleSort = key => { setSortKey(key); setSortDir(d => sortKey === key ? (d === "asc" ? "desc" : "asc") : "asc"); };

  const filtered = products.filter(p =>
    p.headCategory === "Beauty" &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skuId.toLowerCase().includes(search.toLowerCase()) || p.subcategory.toLowerCase().includes(search.toLowerCase()))
  );
  const sorted = sortKey ? [...filtered].sort((a, b) => {
    const va = sortKey === "date" ? new Date(a.date) : a.name.toLowerCase();
    const vb = sortKey === "date" ? new Date(b.date) : b.name.toLowerCase();
    return sortDir === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
  }) : filtered;
  const allChecked = sorted.length > 0 && sorted.every(p => selected.has(p.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(sorted.map(p => p.id)));
  const toggleRow = (id, e) => { e.stopPropagation(); const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };

  const TH = ({ children, sort }) => (
    <th style={{ ...S.th, fontWeight: 500, color: sort ? (sortKey === sort ? "#da0e64" : "#888") : "#888", fontSize: 13, textTransform: "none", cursor: sort ? "pointer" : "default", userSelect: "none" }}
      onClick={() => sort && handleSort(sort)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}{sort && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: sortKey === sort ? "#fce8f3" : "#fafafa", flexShrink: 0 }}><IcSort /></span>}</span>
    </th>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
      <ListingHeader />
      <div style={{ ...S.card, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #e0e0e0", borderRadius: "12px 12px 0 0", background: "#fff", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#b5b5b5", pointerEvents: "none" }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search in product name, product ID, category"
                style={{ width: "100%", height: 32, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", padding: "0 10px 0 32px", fontSize: 14, color: "#141414", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Filter size={15} color="#555" />
            </button>
            <button style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <BarChart2 size={15} color="#555" />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => { }} style={{ height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#e13e83", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff0f6"; e.currentTarget.style.borderColor = "#e13e83"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#fce8f3"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#fff0f6"; }}>
              Import
            </button>
            <button onClick={onAddProduct} style={{ height: 32, borderRadius: 999, border: "none", background: "#da0e64", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c00d58"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#da0e64"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#a00b4a"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#c00d58"; }}>
              Add Product
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th style={{ ...S.th, width: 44 }}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#da0e64" }} />
              </th>
              <TH sort="name">Product name</TH>
              <TH>SKU ID</TH>
              <TH sort="date">Date</TH>
              <TH>Status</TH>
              <th style={{ ...S.th, width: 36 }} />
              <th style={{ ...S.th, width: 36 }} />
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb", fontSize: 14 }}>No beauty products found</td></tr>
            ) : sorted.map(p => {
              const isSelected = selected.has(p.id);
              return (
                <tr key={p.id} style={{ cursor: "pointer", borderBottom: "1px solid #f8f8f8", background: isSelected ? "#FFF5FC" : "transparent" }} onClick={() => onViewProduct(p)}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }} onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
                  <td style={{ ...S.td, width: 44 }} onClick={e => toggleRow(p.id, e)}>
                    <input type="checkbox" checked={isSelected} onChange={() => { }} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#DA0E64" }} />
                  </td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Image size={17} color="#ccc" />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: 13.5, color: "#141414" }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize: 13, color: "#555" }}>{p.skuId}</td>
                  <td style={{ ...S.td, fontSize: 13, color: "#888" }}>{p.date}</td>
                  <td style={S.td}>
                    <span style={S.badge(p.status)}>{p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : ""}</span>
                  </td>
                  <td style={{ ...S.td, width: 36 }} onClick={e => { e.stopPropagation(); onViewProduct(p); }}>
                    <Eye size={16} color="#bbb" style={{ cursor: "pointer", display: "block" }} />
                  </td>
                  <ActionMenu product={p} openMenu={openMenu} setOpenMenu={setOpenMenu} onToggleStatus={onToggleStatus} onEditProduct={onEditProduct} />
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: 13, color: "#888" }}>Showing 1–{Math.min(rowsPerPage, filtered.length)} of {filtered.length} results</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Rows per page</span>
              <div style={{ position: "relative" }}>
                <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}
                  style={{ appearance: "none", border: "1px solid #e0e0e0", borderRadius: 8, padding: "5px 28px 5px 12px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none", background: "#fff" }}>
                  {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={15} color="#555" /></button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} color="#555" /></button>
            </div>
          </div>
        </div>
      </div>
      <MultiSelectorBar
        selected={selected.size}
        total={filtered.length}
        onClear={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(filtered.map(p => p.id)))}
        onPublishAll={() => {}}
      />
    </div>
  );
}

// ─── VARIANT EDITOR (Lifestyle / Home) ───
function VariantEditor({ variantOptions, setVariantOptions, variants, setVariants, has3D, measurementSchema }) {
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
    setVariants(combos.map((combo, i) => ({
      id: `var-${Date.now()}-${i}`,
      name: combo.map(c => c.val).join(" / "),
      attributes: combo,
      variantId: "",
      ...getEmptyMeasurementFields(),
      price: "",
    })));
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
    <div style={{ ...S.card, marginBottom: 22, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: editingOption || variants.length > 0 || variantOptions.length > 0 ? "1px solid #f2f2f2" : "none" }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Select variant</div>
        {!editingOption && !variantOptions.length && !variants.length && (
          <button className="glamar-btn glamar-btn-primary" style={{ padding: "0 16px" }} onClick={() => setEditingOption({ name: "", values: [] })}>
            <Plus size={14} /> Add Variant
          </button>
        )}
      </div>
      {(editingOption || variantOptions.length > 0 || variants.length > 0) && <div style={{ padding: "16px 24px 20px" }}>

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
              <button
                onClick={() => setEditingOption(null)}
                style={{
                  background: "#f5f5f5",
                  color: "#ff3b30",
                  border: "none",
                  borderRadius: 12,
                  height: 32,
                  padding: "0 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Delete
              </button>
              <button
                onClick={doneEditing}
                className="glamar-btn glamar-btn-primary"
              >
                Done
              </button>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <Inp label="SKU ID" value={v.variantId} onChange={val => updateVariant(v.id, "variantId", val)} placeholder="e.g. VAR-001" />
                  <Inp label="Price" value={v.price} onChange={val => updateVariant(v.id, "price", val)} placeholder="Rs. 0.00" />
                </div>
                {measurementSchema === "dimension" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 160px", gap: 14 }}>
                    <Inp label="Length" value={v.dimensionLength || ""} onChange={val => updateVariant(v.id, "dimensionLength", val)} placeholder="L" />
                    <Inp label="Breadth" value={v.dimensionBreadth || ""} onChange={val => updateVariant(v.id, "dimensionBreadth", val)} placeholder="B" />
                    <Inp label="Height" value={v.dimensionHeight || ""} onChange={val => updateVariant(v.id, "dimensionHeight", val)} placeholder="H" />
                    <DD label="Unit" value={v.dimensionUnit || "mm"} onChange={val => updateVariant(v.id, "dimensionUnit", val)} options={DIMENSION_UNITS} placeholder="Select unit" />
                  </div>
                )}
                {measurementSchema === "ring" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Inp label="Inner diameter (mm)" value={v.ringInnerDiameter || ""} onChange={val => updateVariant(v.id, "ringInnerDiameter", val)} placeholder="e.g. 18" />
                    <Inp label="Band width (optional)" value={v.ringBandWidth || ""} onChange={val => updateVariant(v.id, "ringBandWidth", val)} placeholder="e.g. 2" />
                  </div>
                )}
                {measurementSchema === "watch" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Inp label="Case diameter (mm)" value={v.watchCaseDiameter || ""} onChange={val => updateVariant(v.id, "watchCaseDiameter", val)} placeholder="e.g. 44" />
                    <Inp label="Lug-to-lug (mm)" value={v.watchLugToLug || ""} onChange={val => updateVariant(v.id, "watchLugToLug", val)} placeholder="e.g. 48" />
                    <Inp label="Case thickness (mm)" value={v.watchCaseThickness || ""} onChange={val => updateVariant(v.id, "watchCaseThickness", val)} placeholder="e.g. 12" />
                    <Inp label="Strap type" value={v.watchStrapType || ""} onChange={val => updateVariant(v.id, "watchStrapType", val)} placeholder="e.g. Leather" />
                  </div>
                )}
                {has3D && <div style={{ marginTop: 14 }}><UBox small label="Upload 3D model" /></div>}
              </div>
            ))}
          </div>
        )}

      </div>}
      {(editingOption || variantOptions.length > 0 || variants.length > 0) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 20px" }}>
          <div>
            {(variantOptions.length > 0 || variants.length > 0) && (
              <button onClick={() => { setVariantOptions([]); setVariants([]); setEditingOption(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 12.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                <IcTrash color="#dc2626" /> Remove all
              </button>
            )}
          </div>
          <div>
            {!editingOption && (
              <button className="glamar-btn glamar-btn-primary" style={{ padding: "0 16px" }} onClick={() => setEditingOption({ name: "", values: [] })}>
                <Plus size={14} /> Add Variant
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LIFESTYLE / HOME ADD PRODUCT FORM ───
function GeneralAddForm({ headCategory, onBack, onSaveProduct, editProduct, sdkMappings, onAddSdkMapping }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getGeneralInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState([]);
  const [variants, setVariants] = useState(() => mapGeneralVariantsForEditor(editProduct));
  const [error, setError] = useState("");
  const [showAdditional, setShowAdditional] = useState(true);
  const isEditing = Boolean(editProduct);

  const categories = Object.keys(CATEGORY_TREE[headCategory] || {});
  const catData = form.category ? CATEGORY_TREE[headCategory]?.[form.category] : null;
  const subcategories = catData ? catData.subcategories : [];
  const requiresSubcategory = Boolean(form.category && categoryHasL2(headCategory, form.category));
  const selectedCategoryKey = getCategoryLookupKey(headCategory, form.category, form.subcategory);
  const measurementSchema = getMeasurementSchema(headCategory, form.category, form.subcategory);
  const additionalFields = catData ? catData.additionalFields : [];
  const sides2D = catData ? catData.sides2D : null;
  const has3D = catData && selectedCategoryKey ? catData.modelling3D?.[selectedCategoryKey] : false;
  const show2DToggle = sides2D !== null;
  const hasMedia = form.hasImages || form.hasModel;
  const isLifestyle = headCategory === "Lifestyle";
  const mandatoryFilled = !!form.category && (!requiresSubcategory || !!form.subcategory) && !!form.productName.trim() && !!form.skuId.trim();
  const canGenerate3D = has3D && hasMedia && mandatoryFilled;
  const sideLabels = { 4: ["Front", "Left", "Right", "Back"], 1: ["Front"] };

  const updateForm = (key, val) => {
    const next = { ...form, [key]: val };
    if (key === "category" || key === "subcategory") {
      Object.assign(next, getEmptyMeasurementFields());
    }
    if (key === "category") { next.subcategory = ""; next.additionalFields = {}; next.is2D = false; next.hasImages = false; next.hasModel = false; next.displayName = ""; }
    if (key === "subcategory") { next.displayName = ""; }
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
    if (!form.category || (requiresSubcategory && !form.subcategory) || !form.productName.trim() || !form.skuId.trim()) {
      setError(requiresSubcategory
        ? "Category, subcategory, product name, and product ID are required."
        : "Category, product name, and product ID are required.");
      return;
    }

    const formMeasurement = buildMeasurement(measurementSchema, form);
    const nextVariants = variants.length > 0 ? variants.map((variant, index) => ({
      ...(() => {
        const variantMeasurement = buildMeasurement(measurementSchema, variant);
        return {
          dimension: variantMeasurement.dimension || formMeasurement.dimension || "",
          measurements: variantMeasurement.dimension ? variantMeasurement.measurements : formMeasurement.measurements,
        };
      })(),
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
      dimension: formMeasurement.dimension || "",
      measurements: formMeasurement.measurements,
      price: form.sellingPrice || "",
      color: "",
    }];

    onSaveProduct({
      id: editProduct?.id || createProductId(headCategory),
      name: form.productName.trim(),
      skuId: form.skuId.trim(),
      category: form.category,
      subcategory: requiresSubcategory ? form.subcategory : "",
      displayName: form.displayName || "",
      headCategory,
      status: editProduct?.status || "active",
      date: editProduct?.date || getTodayDate(),
      variants: nextVariants,
      additionalFields: form.additionalFields,
      productUrl: form.productUrl.trim(),
      costPrice: form.costPrice,
      sellingPrice: form.sellingPrice,
      dimension: formMeasurement.dimension,
      measurements: formMeasurement.measurements,
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ── Full-width sticky page header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        height: 56, background: "#fff", borderBottom: "1px solid #eaeaea",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", flexShrink: 0,
        fontFamily: "Inter, -apple-system, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: 13.5, fontWeight: 500, padding: "6px 10px 6px 0" }}
            onClick={onBack}
            onMouseEnter={e => e.currentTarget.style.color = "#141414"}
            onMouseLeave={e => e.currentTarget.style.color = "#555"}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
          <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: "#141414" }}>
            {isEditing ? "Edit Product" : "Create product"}
          </h1>
          <span style={{ fontSize: 12, color: "#555", background: "#f0f0f0", padding: "3px 12px", borderRadius: 20, fontWeight: 500 }}>{headCategory}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {isLifestyle ? (
            <>
              <button
                className="glamar-btn glamar-btn-secondary"
                onClick={() => handleSave("listing")}
              >
                Save
              </button>
              <button
                className="glamar-btn glamar-btn-primary"
                onClick={() => canGenerate3D && handleSave("productDetail")}
                disabled={!canGenerate3D}
              >
                {form.hasModel ? "Continue" : <><Box size={14} /> Generate 3D</>}
              </button>
            </>
          ) : (
            <>
              <button
                className="glamar-btn glamar-btn-secondary"
                onClick={() => handleSave("listing")}
              >
                Save as Draft
              </button>
              {has3D ? (
                <button
                  className="glamar-btn glamar-btn-primary"
                  onClick={() => (hasMedia && mandatoryFilled) && handleSave("productDetail")}
                  disabled={!(hasMedia && mandatoryFilled)}
                >
                  {form.hasModel ? "Continue" : <><Box size={14} /> Generate 3D</>}
                </button>
              ) : (
                <button
                  className="glamar-btn glamar-btn-primary"
                  onClick={() => handleSave("listing")}
                >
                  Save Product
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Scrollable form body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13.5 }}>
              {error}
            </div>
          )}

          {/* ── Import URL ── */}
          <div style={{ ...S.card, padding: "12px 16px", marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Link size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
                <input style={{ ...S.input, paddingLeft: 40, borderRadius: 8, fontSize: 13.5 }} placeholder="Enter product URL" value={importLink} onChange={e => setImportLink(e.target.value)} />
              </div>
              <button className="glamar-btn glamar-btn-primary" style={{ height: 36, padding: "0 22px", flexShrink: 0 }} onClick={handleImportProduct}>Import</button>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
            <span style={{ fontSize: 10.5, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>OR FILL MANUALLY</span>
            <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
          </div>

          {/* ── Basic Details ── */}
          <div style={{ ...S.card, padding: "22px 24px", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: -0.2 }}>Basic Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <DD label="Category*" value={form.category} onChange={v => updateForm("category", v)} options={categories} placeholder="Select category" />
              <DD
                label="Sub category*"
                value={requiresSubcategory ? form.subcategory : ""}
                onChange={v => updateForm("subcategory", v)}
                options={subcategories}
                placeholder={!form.category ? "Select category first" : (requiresSubcategory ? "Select sub category" : "No subcategory required")}
                disabled={!form.category || !requiresSubcategory}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <DisplayNameDropdown
                subcategory={form.subcategory || form.category}
                value={form.displayName}
                onChange={v => updateForm("displayName", v)}
                sdkMappings={sdkMappings}
                onAddMapping={onAddSdkMapping}
              />
            </div>
            {variants.length === 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <Inp label="Product ID" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. SKU-001" />
                <Inp label="Product name*" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="Enter product name" />
              </div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <Inp label="Product Name" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Classic Aviator" />
              </div>
            )}
            {/* Product Image */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400, lineHeight: "20px" }}>Product Image</label>
              <div
                style={{ background: "#F5F5F5", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
                onClick={() => updateForm("hasThumbnail", true)}
              >
                <div style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 12, background: "#FAFAFA", outline: "1px solid #DA0E64", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                  <Upload size={16} color="#8F0941" />
                  <span style={{ fontSize: 12, color: "#8F0941", fontWeight: 500, lineHeight: "16px" }}>Upload</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400, lineHeight: "20px" }}>Accepted image types: png, jpeg, webp</span>
                  <span style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400, lineHeight: "20px" }}>Aspect ratio: 16:9</span>
                </div>
              </div>
              {form.hasThumbnail && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 2, fontWeight: 500 }}>Image selected</p>}
            </div>
          </div>

          {/* ── Additional Fields ── */}
          <div style={{ ...S.card, marginBottom: 14, overflow: "hidden" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", cursor: "pointer", userSelect: "none" }}
              onClick={() => setShowAdditional(v => !v)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Additional fields</span>
              </div>
              {showAdditional ? <ChevronUp size={18} color="#aaa" /> : <ChevronDown size={18} color="#aaa" />}
            </div>
            {showAdditional && (
              <div style={{ padding: "4px 24px 22px" }}>
                {additionalFields.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(additionalFields.length, 3)}, 1fr)`, gap: 16 }}>
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
                  <>
                    {measurementSchema === "dimension" && (
                      <div style={{ marginBottom: 16 }}>
                        <label style={S.label}>Measurement*</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 130px", gap: 12 }}>
                          <Inp label="Length" value={form.dimensionLength || ""} onChange={v => updateForm("dimensionLength", v)} placeholder="0" />
                          <Inp label="Width" value={form.dimensionBreadth || ""} onChange={v => updateForm("dimensionBreadth", v)} placeholder="0" />
                          <Inp label="Height" value={form.dimensionHeight || ""} onChange={v => updateForm("dimensionHeight", v)} placeholder="0" />
                          <DD label="Unit" value={form.dimensionUnit || "mm"} onChange={v => updateForm("dimensionUnit", v)} options={DIMENSION_UNITS} placeholder="Unit" />
                        </div>
                      </div>
                    )}
                    {measurementSchema === "ring" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <Inp label="Inner diameter (mm)" value={form.ringInnerDiameter || ""} onChange={v => updateForm("ringInnerDiameter", v)} placeholder="e.g. 18" />
                        <Inp label="Band width (optional)" value={form.ringBandWidth || ""} onChange={v => updateForm("ringBandWidth", v)} placeholder="e.g. 2" />
                      </div>
                    )}
                    {measurementSchema === "watch" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <Inp label="Case diameter (mm)" value={form.watchCaseDiameter || ""} onChange={v => updateForm("watchCaseDiameter", v)} placeholder="e.g. 44" />
                        <Inp label="Lug-to-lug (mm)" value={form.watchLugToLug || ""} onChange={v => updateForm("watchLugToLug", v)} placeholder="e.g. 48" />
                        <Inp label="Case thickness (mm)" value={form.watchCaseThickness || ""} onChange={v => updateForm("watchCaseThickness", v)} placeholder="e.g. 12" />
                        <Inp label="Strap type" value={form.watchStrapType || ""} onChange={v => updateForm("watchStrapType", v)} placeholder="e.g. Leather" />
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <Inp label="Cost Price" value={form.costPrice} onChange={v => updateForm("costPrice", v)} placeholder="Enter cost pricing" />
                      <Inp label="Selling Price" value={form.sellingPrice} onChange={v => updateForm("sellingPrice", v)} placeholder="Enter selling pricing" />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div style={{ position: "relative" }}>
                        <label style={S.label}>Product URL</label>
                        <div style={{ position: "relative" }}>
                          <Link size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
                          <input style={{ ...S.input, paddingLeft: 36, fontSize: 13.5 }} value={form.productUrl} onChange={e => updateForm("productUrl", e.target.value)} placeholder="Enter product URL" />
                        </div>
                      </div>
                      <Inp label="Barcode (EAN, UPC, GTIN)" value={form.additionalFields?.barcode || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, barcode: v })} placeholder="Enter barcode" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ── Media ── */}
          {form.category && (
            <div style={{ ...S.card, padding: "22px 24px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Media</span>
                {show2DToggle && <Tog on={form.is2D} onToggle={() => updateForm("is2D", !form.is2D)} label="2D" />}
              </div>
              {!form.is2D && (
                <>
                  <div style={{ display: "flex", background: "#F0F0F0", borderRadius: 8, padding: 2, marginBottom: 18 }}>
                    {["productImages", "model"].map(tab => {
                      const isModelTab = tab === "model";
                      const isDisabled = isModelTab && variants.length > 0;
                      const isActive = form.imageTab === tab;
                      return (
                        <div key={tab}
                          title={isDisabled ? "3D model upload is available per variant below" : undefined}
                          style={{ flex: 1, textAlign: "center", paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, maxHeight: 28, borderRadius: 6, fontSize: 14, fontWeight: isActive && !isDisabled ? 500 : 400, transition: "all 0.15s", cursor: isDisabled ? "not-allowed" : "pointer", background: isActive && !isDisabled ? "#fff" : "transparent", color: isDisabled ? "#ccc" : isActive ? "#DA0E64" : "#5A5A5A", boxShadow: isActive && !isDisabled ? "0 1px 4px rgba(0,0,0,0.08)" : "none", display: "flex", justifyContent: "center", alignItems: "center" }}
                          onClick={() => { if (!isDisabled) updateForm("imageTab", tab); }}>
                          {isModelTab ? "Model" : "Product Images"}
                        </div>
                      );
                    })}
                  </div>
                  {form.imageTab === "productImages" && (
                    <>
                    <div
                      style={{ border: "2px dashed #e0e0e0", borderRadius: 12, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#fafafa", cursor: "pointer", transition: "all 0.15s" }}
                      onClick={() => updateForm("hasImages", true)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#f43f5e"; e.currentTarget.style.background = "#fff9fa"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
                    >
                      <Image size={36} color="#ccc" />
                      <button
                        className="glamar-btn glamar-btn-primary"
                        style={{ height: 38, padding: "0 20px", marginTop: 4 }}
                        onClick={e => { e.stopPropagation(); updateForm("hasImages", true); }}
                      >
                        <Upload size={14} /> Upload File
                      </button>
                      <p style={{ fontSize: 14, color: "#555", fontWeight: 500, margin: 0 }}>Drag and drop your files here</p>
                      <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Supported Format: PNG, JPG (5MB), Min. 3 images (MAX 20)</p>
                      {form.hasImages && <p style={{ fontSize: 11.5, color: "#16a34a", fontWeight: 500 }}>Images uploaded</p>}
                    </div>
                    {/* Info bar */}
                    <div style={{ padding: 8, background: "#FAFAFA", borderRadius: 8, outline: "1px solid #E0E0E0", outlineOffset: -1, display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                        <HelpCircle size={16} color="#DA0E64" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "#5A5A5A", fontWeight: 400, lineHeight: "20px" }}>Learn how to upload images and which types work best for 3D</span>
                      </div>
                      <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#8F0941", fontWeight: 500, lineHeight: "16px", flexShrink: 0, padding: "4px 0" }}>See Example</button>
                    </div>
                    </>
                  )}
                  {form.imageTab === "model" && (
                    <div
                      style={{ border: "2px dashed #e0e0e0", borderRadius: 12, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#fafafa", cursor: "pointer", transition: "all 0.15s" }}
                      onClick={() => updateForm("hasModel", true)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#f43f5e"; e.currentTarget.style.background = "#fff9fa"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
                    >
                      <Box size={36} color="#ccc" />
                      <button
                        className="glamar-btn glamar-btn-primary"
                        style={{ height: 38, padding: "0 20px", marginTop: 4 }}
                        onClick={e => { e.stopPropagation(); updateForm("hasModel", true); }}
                      >
                        <Upload size={14} /> Upload File
                      </button>
                      <p style={{ fontSize: 14, color: "#555", fontWeight: 500, margin: 0 }}>Drag and drop your files here</p>
                      <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Supported Format: GLB, USDZ (100MB)</p>
                      {form.hasModel && <p style={{ fontSize: 11.5, color: "#16a34a", fontWeight: 500 }}>Model uploaded</p>}
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

          {/* ── Variants ── */}
          <VariantEditor variantOptions={variantOptions} setVariantOptions={setVariantOptions} variants={variants} setVariants={setVariants} has3D={has3D} measurementSchema={measurementSchema} />
        </div>
      </div>
    </div>
  );
}

// ─── BEAUTY ADD PRODUCT FORM ───
function BeautyAddForm({ onBack, onSaveProduct, editProduct }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getBeautyInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState([]);
  const [variants, setVariants] = useState(() => mapBeautyVariantsForEditor(editProduct));
  const [error, setError] = useState("");
  const isEditing = Boolean(editProduct);

  const categories = Object.keys(BEAUTY_CATEGORIES);
  const catData = form.category ? BEAUTY_CATEGORIES[form.category] : null;
  const subcategories = catData ? catData.subcategories : [];
  const additionalFields = catData ? catData.additionalFields : [];
  const hasAR = catData && form.subcategory ? catData.ar?.[form.subcategory] : false;
  const canContinue = hasAR && !!form.category && !!form.subcategory && !!form.productName.trim() && !!form.skuId.trim();
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        height: 56, background: "#fff", borderBottom: "1px solid #eaeaea",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", flexShrink: 0,
        fontFamily: "Inter, -apple-system, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: 13.5, fontWeight: 500, padding: "6px 10px 6px 0" }}
            onClick={onBack}
            onMouseEnter={e => e.currentTarget.style.color = "#141414"}
            onMouseLeave={e => e.currentTarget.style.color = "#555"}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
          <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: "#141414" }}>
            {isEditing ? "Edit Product" : "Add Product"}
          </h1>
          <span style={{ fontSize: 12, color: "#555", background: "#f0f0f0", padding: "3px 12px", borderRadius: 20, fontWeight: 500 }}>Beauty</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="glamar-btn glamar-btn-secondary" onClick={() => handleSave("listing")}>Save Product</button>
          <button
            className="glamar-btn glamar-btn-primary"
            onClick={() => canContinue && handleSave("arStudio")}
            disabled={!canContinue}
          >
            Continue
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13.5 }}>
              {error}
            </div>
          )}

          {/* ── Import URL ── */}
          <div style={{ ...S.card, padding: "12px 16px", marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Link size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
                <input style={{ ...S.input, paddingLeft: 40, borderRadius: 8, fontSize: 13.5 }} placeholder="Enter product URL" value={importLink} onChange={e => setImportLink(e.target.value)} />
              </div>
              <button className="glamar-btn glamar-btn-primary" style={{ height: 36, padding: "0 22px", flexShrink: 0 }} onClick={handleImportProduct}>Import</button>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
            <span style={{ fontSize: 10.5, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>OR FILL MANUALLY</span>
            <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
          </div>

          {/* ── Basic Details ── */}
          <div style={{ ...S.card, padding: "22px 24px", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: -0.2 }}>Basic Details</div>

            {/* Product Image */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <label style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400, lineHeight: "20px" }}>Product Image</label>
              <div
                style={{ background: "#F5F5F5", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
                onClick={() => updateForm("hasThumbnail", true)}
              >
                <div style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 12, background: "#FAFAFA", outline: "1px solid #DA0E64", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                  <Upload size={16} color="#8F0941" />
                  <span style={{ fontSize: 12, color: "#8F0941", fontWeight: 500, lineHeight: "16px" }}>Upload</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400 }}>Accepted image types: png, jpeg, webp</span>
                  <span style={{ color: "rgba(0,0,0,0.65)", fontSize: 14, fontWeight: 400 }}>Aspect ratio: 1:1</span>
                </div>
              </div>
              {form.hasThumbnail && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 2, fontWeight: 500 }}>Image selected</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <DD label="Category*" value={form.category} onChange={v => updateForm("category", v)} options={categories} placeholder="Select category" />
              <DD label="Subcategory*" value={form.subcategory} onChange={v => updateForm("subcategory", v)} options={subcategories} placeholder="Select subcategory" disabled={!form.category} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Inp label="Product ID*" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. BT-001" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Inp label="Product Name*" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Velvet Matte Lipstick" />
            </div>
            {additionalFields.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(additionalFields.length, 3)}, 1fr)`, gap: 16 }}>
                  {additionalFields.map(f =>
                    f.type === "text" ? (
                      <Inp key={f.name} label={f.label} value={form.additionalFields[f.name] || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, [f.name]: v })} placeholder={`Enter ${f.label.toLowerCase()}`} />
                    ) : (
                      <DD key={f.name} label={f.label} value={form.additionalFields[f.name] || ""} onChange={v => updateForm("additionalFields", { ...form.additionalFields, [f.name]: v })} options={f.options || []} placeholder={`Select ${f.label.toLowerCase()}`} />
                    )
                  )}
                </div>
              </div>
            )}
            {variants.length === 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Inp label="Cost Price" value={form.costPrice} onChange={v => updateForm("costPrice", v)} placeholder="Rs. 0.00" />
                <Inp label="Selling Price" value={form.sellingPrice} onChange={v => updateForm("sellingPrice", v)} placeholder="Rs. 0.00" />
              </div>
            )}
          </div>

          {/* ── Variants ── */}
          <VariantEditor variantOptions={variantOptions} setVariantOptions={setVariantOptions} variants={variants} setVariants={setVariants} has3D={false} measurementSchema={null} />

        </div>
      </div>
    </div>
  );
}

// ─── GENERAL SETTINGS PANEL (Lifestyle / Home right panel) ───
const TEMPLATE_STYLES = [
  { id: "s1", label: "Style 1", bg: "linear-gradient(135deg,#c0392b,#922b21)" },
  { id: "s2", label: "Style 2", bg: "linear-gradient(135deg,#e74c3c,#c0392b)" },
  { id: "s3", label: "Style 3", bg: "linear-gradient(135deg,#8e1b1b,#c0392b)" },
  { id: "custom", label: "Custom", isCustom: true },
];

// ─── GS helper components ───
function GsSliderRow({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  const centerPct = ((-min) / (max - min)) * 100;
  const fillLeft = Math.min(pct, centerPct);
  const fillWidth = Math.abs(pct - centerPct);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
        <div style={{ flex: 1, position: "relative", height: 18, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#e0e0e0", borderRadius: 8 }} />
          <div style={{ position: "absolute", left: `${fillLeft}%`, width: `${fillWidth}%`, height: 2, background: "#da0e64", borderRadius: 8 }} />
          <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
            style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0, zIndex: 2 }} />
          <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, width: 16, height: 16, background: "#fff", borderRadius: "50%", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 1 }} />
        </div>
        <input type="number" value={value} min={min} max={max}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          style={{ width: 56, borderRadius: 4, background: "#fff", border: "1px solid #e0e0e0", padding: "2px 6px", fontSize: 13, color: "#141414", outline: "none", textAlign: "center" }} />
      </div>
    </div>
  );
}

const GS_SPEED_OPTIONS = ["-0.5x", "1x", "1.25x", "1.5x", "2x"];
function GsSpeedSelector({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Speed</span>
      <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2 }}>
        {GS_SPEED_OPTIONS.map(opt => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            flex: 1, borderRadius: 6, border: "none", cursor: "pointer",
            background: value === opt ? "#fff" : "transparent",
            color: value === opt ? "#da0e64" : "#5a5a5a",
            fontSize: 13, fontWeight: value === opt ? 600 : 400,
            padding: "4px 0", lineHeight: "20px",
            boxShadow: value === opt ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.12s",
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function GsSelectField({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && <span style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>{label}</span>}
      <div style={{ position: "relative" }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", appearance: "none", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 6, padding: "6px 32px 6px 10px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none" }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function GsToggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 36, height: 20, borderRadius: 999, border: "none", cursor: "pointer",
      background: value ? "#da0e64" : "#e0e0e0", position: "relative", padding: 0,
      transition: "background 0.2s", flexShrink: 0,
    }}>
      <div style={{ position: "absolute", top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "left 0.2s" }} />
    </button>
  );
}

function GsSectionHeader({ id, label, icon: Icon, help, expanded, onToggle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", cursor: "pointer", userSelect: "none" }}
      onClick={() => onToggle(id)}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon size={15} color="#555" strokeWidth={1.8} />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "#333" }}>{label}</span>
        {help && <HelpCircle size={13} color="#ccc" />}
      </div>
      {expanded
        ? <div style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronUp size={14} color="#da0e64" /></div>
        : <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fcebf4", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronDown size={14} color="#da0e64" /></div>
      }
    </div>
  );
}

function TransformationControlGroup({ title, onReset, rows }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#5a5a5a" }}>{title}</span>
        <button
          onClick={onReset}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: 0, lineHeight: "16px" }}
        >
          Reset
        </button>
      </div>
      {rows.map(row => (
        <GsSliderRow key={row.label} label={row.label} value={row.value} onChange={row.onChange} min={row.min} max={row.max} />
      ))}
    </div>
  );
}

function ArTransformSliderRow({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontSize: 13, color: "#4b4b4b", lineHeight: "20px" }}>{label}</span>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 112px", gap: 24, alignItems: "center" }}>
        <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "#dfdfdf", borderRadius: 999 }} />
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", margin: 0, zIndex: 2 }}
          />
          <div
            style={{
              position: "absolute",
              left: `calc(${pct}% - 14px)`,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #efefef",
              boxShadow: "0 2px 6px rgba(20,20,20,0.08)",
              pointerEvents: "none",
            }}
          />
        </div>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          style={{
            width: "100%",
            height: 42,
            borderRadius: 10,
            border: "1px solid #dcdcdc",
            background: "#fff",
            padding: "0 14px",
            fontSize: 14,
            lineHeight: "20px",
            color: "#1f1f1f",
            outline: "none",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
}

function ArTransformationControlGroup({ title, onReset, rows }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, color: "#5a5a5a", lineHeight: "24px" }}>{title}</span>
        <button
          onClick={onReset}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#a20f49", fontSize: 14, fontWeight: 500, padding: 0, lineHeight: "20px" }}
        >
          Reset
        </button>
      </div>
      {rows.map(row => (
        <ArTransformSliderRow key={row.label} label={row.label} value={row.value} onChange={row.onChange} min={row.min} max={row.max} />
      ))}
    </div>
  );
}


const GS_STUDIO_LIGHTS = [
  { id: "add", label: "Add", bg: "#141414", content: <Plus size={18} color="#fff" /> },
  { id: "studio_light", label: "Studio light", bg: "radial-gradient(circle at 38% 38%, #e8e8e8 0%, #8a8a8a 100%)", content: null },
  { id: "studio_warm", label: "Studio warm", bg: "radial-gradient(circle at 38% 38%, #f5ddb0 0%, #b07830 100%)", content: null },
  {
    id: "none", label: "None", bg: "#f0f0f0", content: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8" fill="none" stroke="#bbb" strokeWidth="1.5" /><line x1="5.5" y1="5.5" x2="16.5" y2="16.5" stroke="#bbb" strokeWidth="1.5" /></svg>
    )
  },
];

function GeneralSettingsPanel({ mode = "3d" }) {
  const [tplExpanded, setTplExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  const [selectedTpl, setSelectedTpl] = useState("s1");
  const [expandedSections, setExpandedSections] = useState({});

  // Model animation
  const [modelTransition, setModelTransition] = useState("Animation.01");
  const [modelSpeed, setModelSpeed] = useState("1x");

  // Measurement
  const [measureLength, setMeasureLength] = useState("0");
  const [measureWidth, setMeasureWidth] = useState("0");
  const [measureHeight, setMeasureHeight] = useState("0");
  const [measureUnit, setMeasureUnit] = useState("cm");

  // Environment
  const [studioLight, setStudioLight] = useState("none");
  const [rotateLight, setRotateLight] = useState(0);
  const [filter, setFilter] = useState("None");
  const [intensity, setIntensity] = useState(0);
  const [glowStrength, setGlowStrength] = useState(0);
  const [glowSpread, setGlowSpread] = useState(0);
  const [glowThreshold, setGlowThreshold] = useState(0);
  const [ambientLight, setAmbientLight] = useState(false);
  const [bgColour, setBgColour] = useState(false);

  // 3D viewer transformation
  const [viewerPosX, setViewerPosX] = useState(0);
  const [viewerPosY, setViewerPosY] = useState(0);
  const [viewerRotX, setViewerRotX] = useState(0);
  const [viewerRotY, setViewerRotY] = useState(0);
  const [viewerScale, setViewerScale] = useState(0);

  // Camera animation
  const [camTemplate, setCamTemplate] = useState("Default 360 rotation");
  const [camSpeed, setCamSpeed] = useState("1x");

  const toggleSection = (id) => setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  if (mode === "ar") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #eaeaea" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#141414" }}>General settings</span>
        </div>
        <div style={{ borderBottom: "1px solid #f0f0f0" }}>
          <GsSectionHeader id="objectSettings" label="Object settings" icon={Settings} help expanded={expandedSections.objectSettings} onToggle={toggleSection} />
          {expandedSections.objectSettings && (
            <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#141414" }}>Model transformation</span>
                <HelpCircle size={13} color="#ccc" />
              </div>
              <TransformationControlGroup
                title="Position"
                onReset={() => { setViewerPosX(0); setViewerPosY(0); }}
                rows={[
                  { label: "Move Left or Right", value: viewerPosX, onChange: setViewerPosX, min: -100, max: 100 },
                  { label: "Move Up or Down", value: viewerPosY, onChange: setViewerPosY, min: -100, max: 100 },
                ]}
              />
              <TransformationControlGroup
                title="Rotate"
                onReset={() => { setViewerRotX(0); setViewerRotY(0); }}
                rows={[
                  { label: "Left or Right", value: viewerRotX, onChange: setViewerRotX, min: -180, max: 180 },
                  { label: "Up or Down", value: viewerRotY, onChange: setViewerRotY, min: -90, max: 90 },
                ]}
              />
              <TransformationControlGroup
                title="Scale"
                onReset={() => setViewerScale(0)}
                rows={[
                  { label: "Object size", value: viewerScale, onChange: setViewerScale, min: 0, max: 200 },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #eaeaea" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#141414" }}>General settings</span>
      </div>

      {/* Templates */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", cursor: "pointer", userSelect: "none" }}
          onClick={() => setTplExpanded(v => !v)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={15} color="#555" strokeWidth={1.8} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#222" }}>Templates</span>
            <HelpCircle size={13} color="#ccc" />
          </div>
          {tplExpanded ? <ChevronUp size={15} color="#aaa" /> : <ChevronDown size={15} color="#aaa" />}
        </div>
        {tplExpanded && (
          <div style={{ padding: "0 20px 16px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {TEMPLATE_STYLES.map(t => (
              <div key={t.id} style={{ cursor: "pointer" }} onClick={() => setSelectedTpl(t.id)}>
                <div style={{ height: 58, borderRadius: 8, overflow: "hidden", background: t.isCustom ? "#f5f5f5" : t.bg, border: selectedTpl === t.id ? "2px solid #f43f5e" : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.15s" }}>
                  {t.isCustom && <Settings size={18} color="#bbb" strokeWidth={1.6} />}
                </div>
                <p style={{ fontSize: 11, textAlign: "center", color: selectedTpl === t.id ? "#f43f5e" : "#888", fontWeight: selectedTpl === t.id ? 600 : 400, marginTop: 5 }}>{t.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings row */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", cursor: "pointer", userSelect: "none" }}
          onClick={() => setSettingsExpanded(v => !v)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Settings size={15} color="#555" strokeWidth={1.8} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#222" }}>Settings</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: "#f43f5e", fontWeight: 500 }}>Reset</span>
            {settingsExpanded ? <ChevronUp size={15} color="#aaa" /> : <ChevronDown size={15} color="#aaa" />}
          </div>
        </div>
      </div>

      {/* ── Model animation ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="modelAnimation" label="Model animation" icon={Box} expanded={expandedSections.modelAnimation} onToggle={toggleSection} />
        {expandedSections.modelAnimation && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <GsSelectField label="Model transitions" value={modelTransition} onChange={setModelTransition}
              options={["Animation.01", "Animation.02", "Animation.03", "None"]} />
            <GsSpeedSelector value={modelSpeed} onChange={setModelSpeed} />
          </div>
        )}
      </div>

      {/* ── Measurement ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="measurement" label="Measurement" icon={Package} help expanded={expandedSections.measurement} onToggle={toggleSection} />
        {expandedSections.measurement && (
          <div style={{ padding: "0 20px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 68px", gap: 8 }}>
              {[["Length", measureLength, setMeasureLength], ["Width", measureWidth, setMeasureWidth], ["Height", measureHeight, setMeasureHeight]].map(([lbl, val, set]) => (
                <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 12, color: "#5a5a5a" }}>{lbl}</span>
                  <input value={val} onChange={e => set(e.target.value)}
                    style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 6, background: "#f5f5f5", padding: "5px 8px", fontSize: 13, color: "#141414", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Unit</span>
                <div style={{ position: "relative" }}>
                  <select value={measureUnit} onChange={e => setMeasureUnit(e.target.value)}
                    style={{ width: "100%", appearance: "none", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 6, padding: "5px 18px 5px 6px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none" }}>
                    {DIMENSION_UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                  <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Environment ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="environment" label="Environment" icon={Sparkles} help expanded={expandedSections.environment} onToggle={toggleSection} />
        {expandedSections.environment && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Studio lights */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Studio lights</span>
                <HelpCircle size={12} color="#ccc" />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {GS_STUDIO_LIGHTS.map(light => (
                  <div key={light.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <button onClick={() => setStudioLight(light.id)} style={{
                      width: 44, height: 44, borderRadius: "50%", background: light.bg,
                      border: studioLight === light.id ? "2px solid #da0e64" : "2px solid transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      outline: "none", padding: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    }}>{light.content}</button>
                    <span style={{ fontSize: 10, color: "#5a5a5a", textAlign: "center", lineHeight: "13px", maxWidth: 48 }}>{light.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <GsSliderRow label="Rotate studio light" value={rotateLight} onChange={setRotateLight} min={0} max={360} />

            <GsSelectField label="Filters" value={filter} onChange={setFilter} options={["None", "Warm", "Cool", "Sepia", "Vivid"]} />

            <GsSliderRow label="Intensity" value={intensity} onChange={setIntensity} min={0} max={100} />

            {/* Glow effects */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Glow effects</span>
                <HelpCircle size={12} color="#ccc" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <GsSliderRow label="Strength" value={glowStrength} onChange={setGlowStrength} min={0} max={100} />
                <GsSliderRow label="Spread" value={glowSpread} onChange={setGlowSpread} min={0} max={100} />
                <GsSliderRow label="Threshold" value={glowThreshold} onChange={setGlowThreshold} min={0} max={100} />
              </div>
            </div>

            {/* Toggles */}
            <div style={{ borderTop: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: "#141414" }}>Ambient light</span>
                <GsToggle value={ambientLight} onChange={setAmbientLight} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 13, color: "#141414" }}>Background colour</span>
                <GsToggle value={bgColour} onChange={setBgColour} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3D Viewer transformation ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="objectSettings" label="Object settings" icon={Settings} help expanded={expandedSections.objectSettings} onToggle={toggleSection} />
        {expandedSections.objectSettings && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#141414" }}>Model transformation</span>
              <HelpCircle size={13} color="#ccc" />
            </div>

            <TransformationControlGroup
              title="Position"
              onReset={() => { setViewerPosX(0); setViewerPosY(0); }}
              rows={[
                { label: "Move Left or Right", value: viewerPosX, onChange: setViewerPosX, min: -100, max: 100 },
                { label: "Move Up or Down", value: viewerPosY, onChange: setViewerPosY, min: -100, max: 100 },
              ]}
            />

            <TransformationControlGroup
              title="Rotate"
              onReset={() => { setViewerRotX(0); setViewerRotY(0); }}
              rows={[
                { label: "Left or Right", value: viewerRotX, onChange: setViewerRotX, min: -180, max: 180 },
                { label: "Up or Down", value: viewerRotY, onChange: setViewerRotY, min: -90, max: 90 },
              ]}
            />

            <TransformationControlGroup
              title="Scale"
              onReset={() => setViewerScale(0)}
              rows={[
                { label: "Object size", value: viewerScale, onChange: setViewerScale, min: 0, max: 200 },
              ]}
            />
          </div>
        )}
      </div>

      {/* ── Camera animation ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="cameraAnimation" label="Camera animation" icon={Camera} expanded={expandedSections.cameraAnimation} onToggle={toggleSection} />
        {expandedSections.cameraAnimation && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <GsSelectField label="Choose template" value={camTemplate} onChange={setCamTemplate}
              options={["Default 360 rotation", "Slow pan", "Orbit", "Zoom in", "Static"]} />
            <GsSpeedSelector value={camSpeed} onChange={setCamSpeed} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LIFESTYLE / HOME PRODUCT DETAIL ───
function ProductDetail({ product, headCategory, onBack, onPrev, onNext, onEditProduct }) {
  const [previewTab, setPreviewTab] = useState("3d");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activePopover, setActivePopover] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState(".glb");
  const [copied, setCopied] = useState(false);
  const catData = getCategoryData(headCategory, product.category);

  const handleCopyUrl = () => {
    setCopied(true);
    setActivePopover("copy");
    setTimeout(() => { setCopied(false); setActivePopover(null); }, 2000);
  };
  const lookupKey = getCategoryLookupKey(headCategory, product.category, product.subcategory);
  const has3D = catData?.modelling3D?.[lookupKey];
  const modelReady = !!product.media?.hasModel;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ProductFlowHeader title={product.name} tag={headCategory} onBack={onBack} showSecondary={false} primaryLabel="Save" onPrimary={onBack} />

      <div style={{ flex: 1, overflow: "hidden", padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "264px 1fr 284px", gap: 18, height: "100%" }}>

          {/* ── Left: Product details + Variants ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Product details */}
            <div style={{ ...S.card, overflow: "hidden", padding: 0 }}>
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Product details</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: "4px 0", lineHeight: "16px" }} onClick={() => onEditProduct(product)}>Edit</button>
              </div>
              {/* Body */}
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* SKU ID */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>SKU ID</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.skuId}</span>
                </div>
                {/* Horizontal divider */}
                <div style={{ height: 1, background: "#e0e0e0", borderRadius: 250 }} />
                {/* Dimension + Category row */}
                <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                  {product.variants[selectedVariant]?.dimension && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Dimension</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.variants[selectedVariant].dimension}</span>
                    </div>
                  )}
                  {/* Vertical divider */}
                  {product.variants[selectedVariant]?.dimension && (
                    <div style={{ width: 1, background: "#e0e0e0", borderRadius: 250, alignSelf: "stretch" }} />
                  )}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Category</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div style={{ ...S.card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0", background: "#fff" }}>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: "#141414" }}>Variant</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, lineHeight: "16px", padding: 0 }}>Manage</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.variants.map((v, i) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant(i)}
                    style={{ borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", padding: 12, gap: 10, border: `1px solid ${selectedVariant === i ? "#8f0941" : "#f0f0f0"}`, background: "#fff", transition: "border-color 0.12s" }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: v.color || "#8B4513", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, lineHeight: "16px", color: "#000" }}>{v.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Center: 3D/AR Viewer ── */}
          <div style={{ ...S.card, display: "flex", flexDirection: "column" }}>
            {has3D && (
              <div style={{ padding: "14px 20px", display: "flex", justifyContent: "center", borderBottom: "1px solid #f2f2f2" }}>
                <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2, gap: 0 }}>
                  {[{ id: "3d", label: "3D Viewer" }, { id: "ar", label: "AR Try-on" }].map(tab => {
                    const isActive = previewTab === tab.id;
                    return (
                      <div key={tab.id}
                        style={{ padding: "4px 8px", borderRadius: 6, fontSize: 14, fontWeight: isActive ? 500 : 400, cursor: "pointer", transition: "all 0.15s", background: isActive ? "#fff" : "transparent", color: isActive ? "#da0e64" : "#5a5a5a", maxHeight: 28, display: "flex", alignItems: "center", boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
                        onClick={() => setPreviewTab(tab.id)}>
                        {tab.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              {modelReady ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #fff0f5, #fce7f0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Box size={40} color="#f43f5e" strokeWidth={1} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#141414", margin: 0 }}>{previewTab === "ar" ? "AR / VTO Ready" : "3D Model Ready"}</p>
                  <p style={{ fontSize: 12.5, color: "#888", marginTop: 6 }}>{previewTab === "ar" ? "AR alignment controls are available in general settings" : "Model has been uploaded successfully"}</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Box size={60} color="#d0d0d0" strokeWidth={0.8} />
                  <p style={{ marginTop: 16, fontSize: 15, fontWeight: 600, color: "#888" }}>Generating 3D</p>
                  <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 5 }}>Takes up to 24 Hours</p>
                  <div style={{ marginTop: 18, width: 180, height: 3, background: "#f0f0f0", borderRadius: 2, overflow: "hidden", margin: "18px auto 0" }}>
                    <div style={{ width: "40%", height: "100%", background: "linear-gradient(90deg, #f43f5e, #ec4899)", borderRadius: 2 }} />
                  </div>
                </div>
              )}
            </div>
            {/* Bottom URL bar */}
            <div style={{ borderTop: "1px solid #f2f2f2", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, position: "relative" }}>

              {/* Copy toast */}
              {activePopover === "copy" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 10, padding: "8px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", zIndex: 50 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#141414", fontWeight: 500 }}>Copy to clipboard</span>
                </div>
              )}

              {/* QR code popover */}
              {activePopover === "qr" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 220 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>QR code</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <div style={{ background: "#f5f5f5", borderRadius: 10, padding: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <rect width="120" height="120" fill="white" />
                      <rect x="8" y="8" width="32" height="32" rx="3" fill="#141414" /><rect x="13" y="13" width="22" height="22" rx="2" fill="white" /><rect x="17" y="17" width="14" height="14" rx="1" fill="#141414" />
                      <rect x="80" y="8" width="32" height="32" rx="3" fill="#141414" /><rect x="85" y="13" width="22" height="22" rx="2" fill="white" /><rect x="89" y="17" width="14" height="14" rx="1" fill="#141414" />
                      <rect x="8" y="80" width="32" height="32" rx="3" fill="#141414" /><rect x="13" y="85" width="22" height="22" rx="2" fill="white" /><rect x="17" y="89" width="14" height="14" rx="1" fill="#141414" />
                      {[48, 54, 60, 66, 72].flatMap(x => [48, 54, 60, 66, 72].map(y => ((x + y) % 12 < 6) ? <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill="#141414" /> : null))}
                    </svg>
                  </div>
                  <button style={{ width: "100%", background: "#da0e64", color: "#fff", border: "none", borderRadius: 999, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Download</button>
                </div>
              )}

              {/* Embed code popover */}
              {activePopover === "embed" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#f5f5f5", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 320 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Embed code</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#141414" }}>Custom Code</span>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Copy size={15} color="#555" /></button>
                    </div>
                    <pre style={{ padding: "12px 14px", fontSize: 11.5, color: "#333", lineHeight: 1.8, margin: 0, overflowX: "auto", fontFamily: "monospace" }}>{`<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Heading</h1>\n    <h2>Heading</h2>\n    <p>paragraph.</p>\n  </body>\n</html>`}</pre>
                  </div>
                </div>
              )}

              {/* Download popover */}
              {activePopover === "download" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 260 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Download</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <p style={{ fontSize: 12, color: "#888", margin: "0 0 10px" }}>Select format</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {[".fbx", ".obj", ".glb", ".usdz"].map(fmt => (
                      <button key={fmt} onClick={() => setDownloadFormat(fmt)}
                        style={{ border: `1.5px solid ${downloadFormat === fmt ? "#da0e64" : "#e0e0e0"}`, background: "transparent", borderRadius: 8, padding: "5px 12px", fontSize: 13, color: downloadFormat === fmt ? "#da0e64" : "#555", cursor: "pointer", fontWeight: downloadFormat === fmt ? 600 : 400 }}>
                        {fmt}
                      </button>
                    ))}
                  </div>
                  <button style={{ width: "100%", background: "#da0e64", color: "#fff", border: "none", borderRadius: 999, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Download</button>
                </div>
              )}

              <Link size={14} color="#bbb" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://www.meshy.ai/3d-models/...</span>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {[
                  { id: "copy", Icon: Copy },
                  { id: "qr", Icon: QrCode },
                  { id: "embed", Icon: Code2 },
                  { id: "download", Icon: Download },
                ].map(({ id, Icon }) => (
                  <button key={id}
                    disabled={!modelReady}
                    onClick={() => modelReady && (id === "copy" ? handleCopyUrl() : setActivePopover(activePopover === id ? null : id))}
                    style={{ width: 28, height: 28, borderRadius: "50%", border: "none", cursor: modelReady ? "pointer" : "not-allowed", background: activePopover === id ? "#fcebf4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, opacity: modelReady ? 1 : 0.35 }}>
                    <Icon size={15} color={activePopover === id ? "#da0e64" : "#bbb"} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: General Settings ── */}
          <div style={{ ...S.card, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
            <GeneralSettingsPanel mode={previewTab === "ar" ? "ar" : "3d"} />
            {!modelReady && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,100)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, zIndex: 10, borderRadius: 12 }}>
                <Box size={28} color="#ccc" strokeWidth={1.2} />
                <p style={{ fontSize: 13, fontWeight: 600, color: "#888", textAlign: "center", margin: 0 }}>General settings unavailable</p>
                <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", margin: 0, maxWidth: 180, lineHeight: 1.5 }}>Add a 3D model on the product details page to unlock settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AR SETTINGS PANEL (Beauty) ───
// Icon components for the AR settings panel
const IcARPalette = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00341 14.6738C7.09008 14.6738 6.23008 14.5005 5.41675 14.1471C4.60341 13.7938 3.89674 13.3205 3.29008 12.7138C2.68341 12.1071 2.20341 11.4005 1.85674 10.5871C1.51008 9.77382 1.33008 8.91382 1.33008 8.00048C1.33008 7.08715 1.51008 6.21382 1.87008 5.40048C2.23008 4.58715 2.72341 3.88048 3.33674 3.28048C3.95008 2.68048 4.67008 2.20715 5.49675 1.85382C6.32341 1.50048 7.19674 1.32715 8.13008 1.32715C9.06341 1.32715 9.85675 1.48048 10.6501 1.78715C11.4434 2.09382 12.1301 2.51382 12.7234 3.05382C13.3167 3.59382 13.7901 4.23381 14.1434 4.97381C14.4967 5.71382 14.6701 6.50715 14.6701 7.36715C14.6701 8.64715 14.2834 9.62715 13.5034 10.3071C12.7234 10.9871 11.7834 11.3338 10.6701 11.3338H9.43674C9.33675 11.3338 9.27008 11.3605 9.23008 11.4205C9.19008 11.4805 9.17008 11.5405 9.17008 11.6071C9.17008 11.7405 9.25675 11.9338 9.42341 12.1805C9.59008 12.4271 9.67675 12.7138 9.67675 13.0405C9.67675 13.5938 9.52341 14.0071 9.21674 14.2738C8.91008 14.5405 8.51008 14.6738 8.01008 14.6738H8.00341ZM4.33675 8.67382C4.62341 8.67382 4.86341 8.58048 5.05675 8.38715C5.25008 8.19382 5.34341 7.96048 5.34341 7.66715C5.34341 7.37382 5.25008 7.14048 5.05675 6.94715C4.86341 6.75382 4.63008 6.66048 4.33675 6.66048C4.04341 6.66048 3.81008 6.75382 3.61674 6.94715C3.42341 7.14048 3.33008 7.37382 3.33008 7.66715C3.33008 7.96048 3.42341 8.19382 3.61674 8.38715C3.81008 8.58048 4.04341 8.67382 4.33675 8.67382ZM6.33675 6.00715C6.62341 6.00715 6.86341 5.91382 7.05675 5.72048C7.25008 5.52715 7.34341 5.29382 7.34341 5.00048C7.34341 4.70715 7.25008 4.47381 7.05675 4.28048C6.86341 4.08715 6.63008 3.99382 6.33675 3.99382C6.04341 3.99382 5.81008 4.08715 5.61674 4.28048C5.42341 4.47381 5.33008 4.70715 5.33008 5.00048C5.33008 5.29382 5.42341 5.52715 5.61674 5.72048C5.81008 5.91382 6.04341 6.00715 6.33675 6.00715ZM9.67008 6.00715C9.95675 6.00715 10.1967 5.91382 10.3901 5.72048C10.5834 5.52715 10.6767 5.29382 10.6767 5.00048C10.6767 4.70715 10.5834 4.47381 10.3901 4.28048C10.1967 4.08715 9.96341 3.99382 9.67008 3.99382C9.37675 3.99382 9.14341 4.08715 8.95008 4.28048C8.75675 4.47381 8.66341 4.70715 8.66341 5.00048C8.66341 5.29382 8.75675 5.52715 8.95008 5.72048C9.14341 5.91382 9.37675 6.00715 9.67008 6.00715ZM11.6701 8.67382C11.9567 8.67382 12.1967 8.58048 12.3901 8.38715C12.5834 8.19382 12.6767 7.96048 12.6767 7.66715C12.6767 7.37382 12.5834 7.14048 12.3901 6.94715C12.1967 6.75382 11.9634 6.66048 11.6701 6.66048C11.3767 6.66048 11.1434 6.75382 10.9501 6.94715C10.7567 7.14048 10.6634 7.37382 10.6634 7.66715C10.6634 7.96048 10.7567 8.19382 10.9501 8.38715C11.1434 8.58048 11.3767 8.67382 11.6701 8.67382Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARGrid = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.98809 13.9961C2.70809 13.9961 2.47609 13.9001 2.28409 13.7081C2.09209 13.5161 1.99609 13.2841 1.99609 13.0041C1.99609 12.7241 2.09209 12.4921 2.28409 12.3081C2.47609 12.1161 2.70809 12.0201 2.98809 12.0201C3.26809 12.0201 3.50009 12.1161 3.68409 12.3081C3.86809 12.5001 3.97209 12.7321 3.97209 13.0121C3.97209 13.2921 3.87609 13.5241 3.68409 13.7161C3.49209 13.9081 3.26009 14.0041 2.98809 14.0041V13.9961ZM6.32409 13.9961C6.04409 13.9961 5.81209 13.9001 5.62809 13.7081C5.43609 13.5161 5.34009 13.2841 5.34009 13.0041C5.34009 12.7241 5.43609 12.4921 5.62809 12.3081C5.82009 12.1161 6.05209 12.0201 6.32409 12.0201C6.60409 12.0201 6.83609 12.1161 7.02809 12.3081C7.22009 12.5001 7.31609 12.7321 7.31609 13.0121C7.31609 13.2921 7.22009 13.5241 7.02809 13.7161C6.83609 13.9081 6.60409 14.0041 6.32409 14.0041V13.9961ZM9.67609 13.9961C9.39609 13.9961 9.16409 13.9001 8.97209 13.7081C8.78009 13.5161 8.68409 13.2841 8.68409 13.0041C8.68409 12.7241 8.78009 12.4921 8.97209 12.3081C9.16409 12.1161 9.39609 12.0201 9.67609 12.0201C9.95609 12.0201 10.1881 12.1161 10.3801 12.3081C10.5721 12.5001 10.6681 12.7321 10.6681 13.0121C10.6681 13.2921 10.5721 13.5241 10.3801 13.7161C10.1881 13.9081 9.95609 14.0041 9.67609 14.0041V13.9961ZM13.0121 13.9961C12.7321 13.9961 12.5001 13.9001 12.3161 13.7081C12.1241 13.5161 12.0281 13.2841 12.0281 13.0041C12.0281 12.7241 12.1241 12.4921 12.3161 12.3081C12.5081 12.1161 12.7401 12.0201 13.0121 12.0201C13.2841 12.0201 13.5241 12.1161 13.7161 12.3081C13.9081 12.5001 14.0041 12.7321 14.0041 13.0041C14.0041 13.2761 13.9081 13.5161 13.7161 13.7081C13.5241 13.9001 13.2921 13.9961 13.0121 13.9961ZM2.98809 10.6601C2.70809 10.6601 2.47609 10.5641 2.28409 10.3721C2.09209 10.1801 1.99609 9.94809 1.99609 9.67609C1.99609 9.40409 2.09209 9.16409 2.28409 8.97209C2.47609 8.78009 2.70809 8.68409 2.98809 8.68409C3.26809 8.68409 3.50009 8.78009 3.68409 8.97209C3.87609 9.16409 3.97209 9.39609 3.97209 9.67609C3.97209 9.95609 3.87609 10.1881 3.68409 10.3721C3.49209 10.5641 3.26009 10.6601 2.98809 10.6601ZM6.32409 10.6601C6.04409 10.6601 5.81209 10.5641 5.62809 10.3721C5.43609 10.1801 5.34009 9.94809 5.34009 9.67609C5.34009 9.40409 5.43609 9.16409 5.62809 8.97209C5.82009 8.78009 6.05209 8.68409 6.32409 8.68409C6.59609 8.68409 6.83609 8.78009 7.02809 8.97209C7.22009 9.16409 7.31609 9.39609 7.31609 9.67609C7.31609 9.95609 7.22009 10.1881 7.02809 10.3721C6.83609 10.5641 6.60409 10.6601 6.32409 10.6601ZM9.67609 10.6601C9.39609 10.6601 9.16409 10.5641 8.97209 10.3721C8.78009 10.1801 8.68409 9.94809 8.68409 9.67609C8.68409 9.40409 8.78009 9.16409 8.97209 8.97209C9.16409 8.78009 9.39609 8.68409 9.67609 8.68409C9.95609 8.68409 10.1881 8.78009 10.3801 8.97209C10.5721 9.16409 10.6681 9.39609 10.6681 9.67609C10.6681 9.95609 10.5721 10.1881 10.3801 10.3721C10.1881 10.5641 9.95609 10.6601 9.67609 10.6601ZM13.0121 10.6601C12.7321 10.6601 12.5001 10.5641 12.3161 10.3721C12.1241 10.1801 12.0281 9.94809 12.0281 9.67609C12.0281 9.40409 12.1241 9.16409 12.3161 8.97209C12.5081 8.78009 12.7401 8.68409 13.0121 8.68409C13.2921 8.68409 13.5241 8.78009 13.7161 8.97209C13.9081 9.16409 14.0041 9.39609 14.0041 9.67609C14.0041 9.95609 13.9081 10.1881 13.7161 10.3721C13.5241 10.5641 13.2921 10.6601 13.0121 10.6601ZM2.98809 7.30809C2.70809 7.30809 2.47609 7.21209 2.28409 7.02009C2.09209 6.82809 1.99609 6.59609 1.99609 6.31609C1.99609 6.03609 2.09209 5.80409 2.28409 5.61209C2.47609 5.42009 2.70809 5.32409 2.98809 5.32409C3.26809 5.32409 3.50009 5.42009 3.68409 5.61209C3.87609 5.80409 3.97209 6.03609 3.97209 6.31609C3.97209 6.59609 3.87609 6.82809 3.68409 7.02009C3.49209 7.21209 3.26009 7.30809 2.98809 7.30809ZM6.32409 7.30809C6.04409 7.30809 5.81209 7.21209 5.62809 7.02009C5.43609 6.82809 5.34009 6.59609 5.34009 6.31609C5.34009 6.03609 5.43609 5.80409 5.62809 5.61209C5.82009 5.42009 6.05209 5.32409 6.32409 5.32409C6.59609 5.32409 6.83609 5.42009 7.02809 5.61209C7.22009 5.80409 7.31609 6.03609 7.31609 6.31609C7.31609 6.59609 7.22009 6.82809 7.02809 7.02009C6.83609 7.21209 6.60409 7.30809 6.32409 7.30809ZM9.67609 7.30809C9.39609 7.30809 9.16409 7.21209 8.97209 7.02009C8.78009 6.82809 8.68409 6.59609 8.68409 6.31609C8.68409 6.03609 8.78009 5.80409 8.97209 5.61209C9.16409 5.42009 9.39609 5.32409 9.67609 5.32409C9.95609 5.32409 10.1881 5.42009 10.3801 5.61209C10.5721 5.80409 10.6681 6.03609 10.6681 6.31609C10.6681 6.59609 10.5721 6.82809 10.3801 7.02009C10.1881 7.21209 9.95609 7.30809 9.67609 7.30809ZM13.0121 7.30809C12.7321 7.30809 12.5001 7.21209 12.3161 7.02009C12.1241 6.82809 12.0281 6.59609 12.0281 6.31609C12.0281 6.03609 12.1241 5.80409 12.3161 5.61209C12.5081 5.42009 12.7401 5.32409 13.0121 5.32409C13.2841 5.32409 13.5241 5.42009 13.7161 5.61209C13.9081 5.80409 14.0041 6.03609 14.0041 6.31609C14.0041 6.59609 13.9081 6.82809 13.7161 7.02009C13.5241 7.21209 13.2921 7.30809 13.0121 7.30809ZM2.98809 3.97209C2.70809 3.97209 2.47609 3.87609 2.28409 3.68409C2.09209 3.49209 1.99609 3.26009 1.99609 2.98809C1.99609 2.71609 2.10009 2.47609 2.29209 2.28409C2.48409 2.09209 2.71609 1.99609 2.99609 1.99609C3.27609 1.99609 3.50809 2.09209 3.69209 2.28409C3.88409 2.47609 3.98009 2.70809 3.98009 2.98809C3.98009 3.26809 3.88409 3.50009 3.69209 3.68409C3.50009 3.87609 3.26809 3.97209 2.99609 3.97209H2.98809ZM6.32409 3.97209C6.04409 3.97209 5.81209 3.87609 5.62809 3.68409C5.43609 3.49209 5.34009 3.26009 5.34009 2.98809C5.34009 2.71609 5.43609 2.47609 5.62809 2.28409C5.82009 2.09209 6.05209 1.99609 6.32409 1.99609C6.59609 1.99609 6.83609 2.09209 7.02809 2.28409C7.22009 2.47609 7.31609 2.70809 7.31609 2.98809C7.31609 3.26809 7.22009 3.50009 7.02809 3.68409C6.83609 3.87609 6.60409 3.97209 6.32409 3.97209ZM9.67609 3.97209C9.39609 3.97209 9.16409 3.87609 8.97209 3.68409C8.78009 3.49209 8.68409 3.26009 8.68409 2.98809C8.68409 2.71609 8.78009 2.47609 8.97209 2.28409C9.16409 2.09209 9.39609 1.99609 9.67609 1.99609C9.95609 1.99609 10.1881 2.09209 10.3801 2.28409C10.5721 2.47609 10.6681 2.70809 10.6681 2.98809C10.6681 3.26809 10.5721 3.50009 10.3801 3.68409C10.1881 3.87609 9.95609 3.97209 9.67609 3.97209ZM13.0121 3.97209C12.7321 3.97209 12.5001 3.87609 12.3161 3.68409C12.1321 3.49209 12.0281 3.26009 12.0281 2.98809C12.0281 2.71609 12.1241 2.47609 12.3161 2.28409C12.5081 2.09209 12.7401 1.99609 13.0121 1.99609C13.2841 1.99609 13.5241 2.09209 13.7161 2.28409C13.9081 2.47609 14.0041 2.70809 14.0041 2.98809C14.0041 3.26809 13.9081 3.50009 13.7161 3.68409C13.5241 3.87609 13.2921 3.97209 13.0121 3.97209Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.30769 8.69231H2.69231C2.49615 8.69231 2.33177 8.62592 2.19915 8.49315C2.06638 8.36038 2 8.19592 2 7.99977C2 7.80346 2.06638 7.63908 2.19915 7.50662C2.33177 7.374 2.49615 7.30769 2.69231 7.30769H7.30769V2.69231C7.30769 2.49615 7.37408 2.33177 7.50685 2.19915C7.63962 2.06638 7.80408 2 8.00023 2C8.19654 2 8.36092 2.06638 8.49339 2.19915C8.626 2.33177 8.69231 2.49615 8.69231 2.69231V7.30769H13.3077C13.5038 7.30769 13.6682 7.37408 13.8008 7.50685C13.9336 7.63962 14 7.80408 14 8.00023C14 8.19654 13.9336 8.36092 13.8008 8.49339C13.6682 8.626 13.5038 8.69231 13.3077 8.69231H8.69231V13.3077C8.69231 13.5038 8.62592 13.6682 8.49315 13.8008C8.36038 13.9336 8.19592 14 7.99977 14C7.80346 14 7.63908 13.9336 7.50662 13.8008C7.374 13.6682 7.30769 13.5038 7.30769 13.3077V8.69231Z" fill="#8f0941" />
  </svg>
);
const IcARClose = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6.7L7.45 8.15C7.54167 8.24167 7.65833 8.2875 7.8 8.2875C7.94167 8.2875 8.05833 8.24167 8.15 8.15C8.24167 8.05833 8.2875 7.94167 8.2875 7.8C8.2875 7.65833 8.24167 7.54167 8.15 7.45L6.7 6L8.15 4.55C8.24167 4.45833 8.2875 4.34167 8.2875 4.2C8.2875 4.05833 8.24167 3.94167 8.15 3.85C8.05833 3.75833 7.94167 3.7125 7.8 3.7125C7.65833 3.7125 7.54167 3.75833 7.45 3.85L6 5.3L4.55 3.85C4.45833 3.75833 4.34167 3.7125 4.2 3.7125C4.05833 3.7125 3.94167 3.75833 3.85 3.85C3.75833 3.94167 3.7125 4.05833 3.7125 4.2C3.7125 4.34167 3.75833 4.45833 3.85 4.55L5.3 6L3.85 7.45C3.75833 7.54167 3.7125 7.65833 3.7125 7.8C3.7125 7.94167 3.75833 8.05833 3.85 8.15C3.94167 8.24167 4.05833 8.2875 4.2 8.2875C4.34167 8.2875 4.45833 8.24167 4.55 8.15L6 6.7Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.016 6.66699C14.791 6.66699 14.5993 6.74199 14.4327 6.90866L10.0077 11.3337L5.58268 6.90866C5.43268 6.75866 5.24102 6.68366 5.00768 6.68366C4.77435 6.68366 4.58268 6.75866 4.41602 6.90866C4.24935 7.07533 4.16602 7.27533 4.16602 7.50033C4.16602 7.72533 4.24935 7.92533 4.41602 8.09199L9.42435 13.1003C9.50768 13.1837 9.59935 13.242 9.69102 13.2753C9.78268 13.3087 9.89102 13.3253 10.0077 13.3253C10.116 13.3253 10.2243 13.3087 10.3243 13.2753C10.4243 13.242 10.5077 13.1837 10.591 13.1003L15.6243 8.07533C15.791 7.90866 15.8743 7.71699 15.866 7.49199C15.866 7.26699 15.7743 7.07533 15.6077 6.90866C15.441 6.75866 15.2493 6.67533 15.0243 6.66699H15.016Z" fill="#5a5a5a" />
  </svg>
);
const IcARChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.34299 10.5689C3.211 10.4369 3.14029 10.2813 3.13086 10.1022C3.13086 9.92307 3.19214 9.7675 3.32414 9.63551L7.53849 5.42115C7.60449 5.35516 7.67991 5.30802 7.75534 5.27973C7.83076 5.25145 7.92033 5.2373 8.00518 5.2373C8.09003 5.2373 8.1796 5.25145 8.25503 5.27973C8.33045 5.30802 8.40588 5.35516 8.47187 5.42115L12.6674 9.61665C12.7994 9.74865 12.8654 9.90892 12.8701 10.0928C12.8748 10.2766 12.8041 10.4322 12.6674 10.5689C12.5354 10.6915 12.3798 10.7527 12.1913 10.7527C12.0027 10.7527 11.8566 10.6915 11.734 10.5689L8.00518 6.84008L4.27637 10.5689C4.14438 10.7009 3.9841 10.7669 3.80968 10.7622C3.63526 10.7575 3.47498 10.6915 3.34299 10.5689Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARAddCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.47433 8.52599V10.8067C7.47433 10.9558 7.5248 11.0808 7.62574 11.1816C7.72667 11.2825 7.8517 11.333 8.00083 11.333C8.15007 11.333 8.27504 11.2825 8.37574 11.1816C8.47656 11.0808 8.52697 10.9558 8.52697 10.8067V8.52599H10.8077C10.9568 8.52599 11.0818 8.47552 11.1826 8.37459C11.2835 8.27365 11.334 8.14862 11.334 7.9995C11.334 7.85026 11.2835 7.72529 11.1826 7.62459C11.0818 7.52377 10.9568 7.47336 10.8077 7.47336H8.52697V5.19266C8.52697 5.04353 8.4765 4.91856 8.37556 4.81774C8.27463 4.71681 8.1496 4.66634 8.00048 4.66634C7.85124 4.66634 7.72626 4.71681 7.62556 4.81774C7.52474 4.91856 7.47433 5.04353 7.47433 5.19266V7.47336H5.19363C5.04451 7.47336 4.91954 7.52383 4.81872 7.62476C4.71779 7.7257 4.66732 7.85073 4.66732 7.99985C4.66732 8.14909 4.71779 8.27406 4.81872 8.37476C4.91954 8.47558 5.04451 8.52599 5.19363 8.52599H7.47433ZM8.00188 14.6663C7.07977 14.6663 6.21305 14.4914 5.4017 14.1414C4.59036 13.7915 3.88463 13.3166 3.28451 12.7167C2.68439 12.1168 2.20925 11.4114 1.85907 10.6004C1.50901 9.78938 1.33398 8.92289 1.33398 8.0009C1.33398 7.0788 1.50896 6.21207 1.8589 5.40073C2.20884 4.58938 2.68375 3.88365 3.28363 3.28353C3.88352 2.68342 4.58896 2.20827 5.39995 1.8581C6.21094 1.50804 7.07743 1.33301 7.99942 1.33301C8.92153 1.33301 9.78825 1.50798 10.5996 1.85792C11.4109 2.20786 12.1167 2.68277 12.7168 3.28266C13.3169 3.88254 13.7921 4.58798 14.1422 5.39897C14.4923 6.20997 14.6673 7.07646 14.6673 7.99845C14.6673 8.92055 14.4923 9.78728 14.1424 10.5986C13.7925 11.41 13.3176 12.1157 12.7177 12.7158C12.1178 13.3159 11.4123 13.7911 10.6014 14.1413C9.79036 14.4913 8.92387 14.6663 8.00188 14.6663Z" fill="#5a5a5a" />
  </svg>
);
const IcARTrash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66264 14C4.3091 14 4.00646 13.8742 3.75473 13.6226C3.50299 13.371 3.37713 13.0686 3.37713 12.7152V3.69469H3.19935C3.04824 3.69469 2.9216 3.64358 2.81944 3.54135C2.71716 3.43913 2.66602 3.31251 2.66602 3.16148C2.66602 3.01033 2.71716 2.88377 2.81944 2.78178C2.9216 2.67968 3.04824 2.62862 3.19935 2.62862H5.86602C5.86602 2.45462 5.92735 2.30632 6.05002 2.18372C6.17256 2.06124 6.32089 2 6.49499 2H9.5037C9.67781 2 9.82613 2.06124 9.94868 2.18372C10.0713 2.30632 10.1327 2.45462 10.1327 2.62862H12.7993C12.9505 2.62862 13.0771 2.67974 13.1793 2.78196C13.2815 2.88418 13.3327 3.01081 13.3327 3.16184C13.3327 3.31298 13.2815 3.43955 13.1793 3.54153C13.0771 3.64364 12.9505 3.69469 12.7993 3.69469H12.6216V12.7152C12.6216 13.0686 12.4957 13.371 12.244 13.6226C11.9922 13.8742 11.6896 14 11.3361 14H4.66264ZM6.68682 11.5125C6.83793 11.5125 6.96456 11.4615 7.06673 11.3594C7.16877 11.2571 7.21979 11.1305 7.21979 10.9795V5.64915C7.21979 5.49812 7.16865 5.37149 7.06637 5.26927C6.96421 5.16717 6.83751 5.11611 6.68628 5.11611C6.53517 5.11611 6.40853 5.16717 6.30637 5.26927C6.20433 5.37149 6.1533 5.49812 6.1533 5.64915V10.9795C6.1533 11.1305 6.20439 11.2571 6.30655 11.3594C6.40883 11.4615 6.53559 11.5125 6.68682 11.5125ZM9.31242 11.5125C9.46353 11.5125 9.59016 11.4615 9.69233 11.3594C9.79437 11.2571 9.84539 11.1305 9.84539 10.9795V5.64915C9.84539 5.49812 9.79431 5.37149 9.69215 5.26927C9.58987 5.16717 9.46311 5.11611 9.31188 5.11611C9.16077 5.11611 9.03413 5.16717 8.93197 5.26927C8.82993 5.37149 8.7789 5.49812 8.7789 5.64915V10.9795C8.7789 11.1305 8.83004 11.2571 8.93233 11.3594C9.03449 11.4615 9.16119 11.5125 9.31242 11.5125Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);

// Small percentage field (0–100%) for AR settings
function ARTextField({ label, value, onChange }) {
  const [draft, setDraft] = useState(null);
  const displayVal = draft !== null ? draft : (parseInt(value) || 0).toString();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
      <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>{label}</div>
      <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "4px 8px", height: 32, display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={displayVal}
          onChange={e => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={() => {
            const num = Math.min(100, Math.max(0, parseInt(displayVal) || 0));
            onChange(num + "%");
            setDraft(null);
          }}
          style={{ border: "none", outline: "none", fontSize: 14, color: "#141414", width: "100%", background: "transparent" }}
        />
        <span style={{ fontSize: 14, color: "#141414", flexShrink: 0 }}>%</span>
      </div>
    </div>
  );
}

// Color hex field with swatch
function ARColorField({ color, onChange }) {
  return (
    <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: 4, display: "flex", alignItems: "center", gap: 8, alignSelf: "stretch" }}>
      <div style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #e0e0e0", background: color, flexShrink: 0 }} />
      <input
        type="text"
        value={color}
        onChange={e => onChange(e.target.value)}
        style={{ border: "none", outline: "none", fontSize: 14, fontWeight: 400, color: "#141414", width: "100%", background: "transparent" }}
      />
    </div>
  );
}

// Slider with range input + number box
function ARSlider({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {label && <span style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>{label}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
        <div style={{ flex: 1, position: "relative", height: 18, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#e0e0e0", borderRadius: 8 }} />
          <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 2, background: "#da0e64", borderRadius: 8 }} />
          <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
            style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0, zIndex: 2 }} />
          <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, width: 16, height: 16, background: "#fff", borderRadius: "50%", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 1 }} />
        </div>
        <input type="number" value={value} min={min} max={max}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          style={{ width: 56, borderRadius: 4, background: "#fff", border: "1px solid #e0e0e0", padding: "2px 6px", fontSize: 13, color: "#141414", outline: "none", textAlign: "center" }} />
      </div>
    </div>
  );
}

// Finish type icons
const IcFinishMatte = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="4" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="4" r="1.2" fill="#5a5a5a"/>
    <circle cx="4" cy="9" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="9" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="9" r="1.2" fill="#5a5a5a"/>
    <circle cx="4" cy="14" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="14" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="14" r="1.2" fill="#5a5a5a"/>
  </svg>
);
const IcFinishGloss = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2L9.8 7H15L10.6 10.2L12.4 15.4L9 12.4L5.6 15.4L7.4 10.2L3 7H8.2L9 2Z" fill="#5a5a5a"/>
  </svg>
);
const IcFinishShimmer = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16L16 2M6 16L16 6M2 12L12 2M10 16L16 10M2 8L8 2M14 16L16 14" stroke="#5a5a5a" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FINISH_ICONS = { Matte: <IcFinishMatte />, Gloss: <IcFinishGloss />, Shimmer: <IcFinishShimmer /> };

function ARSettingsPanel({ subcategory, onDirtyChange, saveVersion = 0 }) {
  const config = getARConfig(subcategory);

  // Colors adjustments state
  const [colorStyle, setColorStyle] = useState("Single");
  const [colors, setColors] = useState(["#9999FF", "#9999FF"]);
  const [colorStyleOpen, setColorStyleOpen] = useState(false);

  // Color-only mode state (lipstick, foundation, nail polish)
  const [finish, setFinish] = useState(config?.finishTypes?.[0] || "Matte");
  const [finishOpen, setFinishOpen] = useState(false);
  const [lipColor, setLipColor] = useState("#9999FF");
  const [intensity, setIntensity] = useState(50);
  const [glossValue, setGlossValue] = useState(50);
  const [shimmerColor, setShimmerColor] = useState("#9999FF");
  const [shimmerIntensity, setShimmerIntensity] = useState(50);
  const [shimmerDensity, setShimmerDensity] = useState(50);
  const [shimmerGranularity, setShimmerGranularity] = useState(50);

  // Color + pattern mode state (Eyeliner, Mascara, Eyebrows, Eyelashes, Lipliner)
  const [selectedPattern, setSelectedPattern] = useState(config?.patternTypes?.[0] || "");

  const [patternSliderValues, setPatternSliderValues] = useState({});
  const [apiPatterns, setApiPatterns] = useState(null); // fetched from PixelBin API
  const [patternsLoading, setPatternsLoading] = useState(false);

  // Eyeshadow mode state — pattern color cards (draggable, 1–3 per pattern)
  const [eyeshadowPatternColors, setEyeshadowPatternColors] = useState([
    { id: "ec1", isMain: true, color: "#9999FF", intensity: 50 },
    { id: "ec2", isMain: false, color: "#9999FF", intensity: 50 },
    { id: "ec3", isMain: false, color: "#9999FF", intensity: 50 },
  ]);
  const eyeshadowDragRef = useRef(null);

  useEffect(() => {
    if (!config?.colorAndPatternMode) return;
    setPatternsLoading(true);
    fetchPatterns(subcategory).then(items => {
      setApiPatterns(items);
      if (items?.length && !selectedPattern) setSelectedPattern(items[0].name);
      setPatternsLoading(false);
    });
  }, [subcategory]);

  // Pattern state — each pattern: { id, type, collapsed, intensity, gloss, density, granularity, color }
  const defaultPatternType = config?.patternTypes?.[0] || "Glossy";
  const defaultSubStyle = config?.blushSubStyles?.[0] || null;
  const [patterns, setPatterns] = useState([
    { id: "pat1", type: defaultPatternType, collapsed: false, intensity: "24%", gloss: "24%", density: "24%", granularity: "24%", color: "#9999FF", subStyle: defaultSubStyle }
  ]);
  const [selectedPatternId, setSelectedPatternId] = useState("pat1");

  const [showPatternPicker, setShowPatternPicker] = useState(false);
  const [pickerTargetId, setPickerTargetId] = useState(null);
  const [pickerPos, setPickerPos] = useState({ x: window.innerWidth / 2 - 160, y: window.innerHeight / 2 - 120 });
  const dragRef = useRef(null);

  const PATTERN_TYPES = config?.patternTypes || ["Glossy", "Shimmer", "Matte"];
  const PATTERN_THUMBS = config?.patternThumbs || {
    Glossy: "/pattern-glossy.png",
    Shimmer: "/pattern-shimmer.png",
    Matte: "/pattern-matte.png",
  };
  const styleOptions = config?.styleOptions || ["Single", "Dual", "Ombre"];
  const colorCount = colorStyle === "Dual" ? 2 : 1;

  const selectPattern = (type) => {
    if (pickerTargetId === null) {
      // Add new pattern
      const newId = `pat-${Date.now()}`;
      const newSubStyle = config?.blushSubStyles?.[0] || null;
      setPatterns(ps => [...ps, { id: newId, type, collapsed: false, intensity: "24%", gloss: "24%", density: "24%", granularity: "24%", color: "#9999FF", subStyle: newSubStyle }]);
      setSelectedPatternId(newId);
    } else {
      // Change existing pattern type
      updatePattern(pickerTargetId, "type", type);
    }
    setShowPatternPicker(false);
    setPickerTargetId(null);
  };

  const addPattern = () => {
    setPickerTargetId(null);
    setPickerPos({ x: window.innerWidth / 2 - 152, y: window.innerHeight / 2 - 120 });
    setShowPatternPicker(true);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragRef.current) return;
      const { startX, startY, origX, origY } = dragRef.current;
      setPickerPos({ x: origX + (e.clientX - startX), y: origY + (e.clientY - startY) });
    };
    const onMouseUp = () => { dragRef.current = null; };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  const removePattern = (id) => {
    setPatterns(ps => {
      const next = ps.filter(p => p.id !== id);
      if (selectedPatternId === id && next.length > 0) setSelectedPatternId(next[0].id);
      return next;
    });
  };
  const togglePattern = (id) => setPatterns(ps => ps.map(p => p.id === id ? { ...p, collapsed: !p.collapsed } : p));
  const updatePattern = (id, key, val) => setPatterns(ps => ps.map(p => p.id === id ? { ...p, [key]: val } : p));

  if (!config) return (
    <div style={{ padding: 22, textAlign: "center", color: "#bbb" }}>
      <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
      <p style={{ fontSize: 13 }}>AR not available for {subcategory}</p>
    </div>
  );

  // ── Eyeshadow mode ──
  if (config.eyeshadowMode) {
    const esPatList = (config.patternTypes || []).map(name => ({ id: name, name, thumb: config.patternThumbs?.[name] }));
    const esCurrentPat = esPatList.find(p => p.name === selectedPattern) || esPatList[0];

    const moveEsCard = (fromIdx, toIdx) => {
      setEyeshadowPatternColors(prev => {
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    };

    const onEsPointerUp = () => { eyeshadowDragRef.current = null; };
    const onEsPointerEnter = (idx) => {
      if (eyeshadowDragRef.current !== null && eyeshadowDragRef.current !== idx) {
        moveEsCard(eyeshadowDragRef.current, idx);
        eyeshadowDragRef.current = idx;
      }
    };

    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Pattern picker popover */}
        {showPatternPicker && (
          <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #fff", boxShadow: "0 4px 16px rgba(0,0,0,0.16)", width: 328, overflow: "hidden", userSelect: "none" }}>
            <div onMouseDown={e => { dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y }; e.preventDefault(); }} style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", gap: 4, minHeight: 40, cursor: "grab" }}>
              <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({esPatList.length})</span>
              <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" /></svg>
              </button>
            </div>
            <div style={{ padding: "16px 12px", display: "flex", flexWrap: "wrap", gap: 12 }}>
              {esPatList.map(pt => {
                const isSel = selectedPattern === pt.name;
                return (
                  <div key={pt.id} onClick={() => { setSelectedPattern(pt.name); setShowPatternPicker(false); }} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                    <div style={{ borderRadius: 16, border: `1px solid ${isSel ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                        {pt.thumb ? <img src={pt.thumb} alt={pt.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: isSel ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{pt.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Title */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        {/* Single card */}
        <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>
          {/* Colors adjustments */}
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
              <IcARPalette />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
            </div>
            {/* Main color */}
            <ARColorField color={lipColor} onChange={c => { setLipColor(c); setEyeshadowPatternColors(prev => prev.map((ec, i) => i === 0 ? { ...ec, color: c } : ec)); }} />
            {/* Finish: locked Shimmer */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
              <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><IcFinishShimmer /></span>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>Shimmer</span>
              </div>
            </div>
            {/* Shimmer extras — always visible */}
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                <ARColorField color={shimmerColor} onChange={setShimmerColor} />
              </div>
              <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
              <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
              <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
            </div>
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />
          {/* Pattern section */}
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            {/* Pattern card with Change button */}
            <div style={{ background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "6px 10px", display: "flex", alignItems: "center", gap: 10, height: 48 }}>
              {esCurrentPat?.thumb && (
                <img src={esCurrentPat.thumb} alt={esCurrentPat.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
              )}
              <span style={{ flex: 1, fontSize: 14, color: "#141414", textTransform: "capitalize" }}>{esCurrentPat?.name || "Select pattern"}</span>
              <button onClick={() => { setPickerPos({ x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 180 }); setShowPatternPicker(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 13, fontWeight: 500, padding: "4px 0", flexShrink: 0 }}>Change</button>
            </div>
            {/* Draggable color cards */}
            <div onPointerUp={onEsPointerUp} onPointerLeave={onEsPointerUp}>
            {eyeshadowPatternColors.map((ec, idx) => (
              <div
                key={ec.id}
                onPointerEnter={() => onEsPointerEnter(idx)}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: idx < eyeshadowPatternColors.length - 1 ? 12 : 0 }}
              >
                {/* Number badge */}
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f5f5f5", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#5a5a5a", flexShrink: 0, marginTop: 4 }}>
                  {idx + 1}
                </div>
                {/* Card content */}
                <div style={{ flex: 1, background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Color row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      {ec.isMain ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 36, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "0 10px" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 4, background: lipColor, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#5a5a5a", flex: 1 }}>Main color</span>
                        </div>
                      ) : (
                        <ARColorField color={ec.color} onChange={c => setEyeshadowPatternColors(prev => prev.map((x, i) => i === idx ? { ...x, color: c } : x))} />
                      )}
                    </div>
                    {/* Drag handle */}
                    <div
                      onPointerDown={e => { e.preventDefault(); eyeshadowDragRef.current = idx; }}
                      style={{ cursor: "grab", padding: 4, flexShrink: 0, touchAction: "none" }}
                    >
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                        <circle cx="3" cy="3" r="1.5" fill="#bbb" /><circle cx="9" cy="3" r="1.5" fill="#bbb" />
                        <circle cx="3" cy="8" r="1.5" fill="#bbb" /><circle cx="9" cy="8" r="1.5" fill="#bbb" />
                        <circle cx="3" cy="13" r="1.5" fill="#bbb" /><circle cx="9" cy="13" r="1.5" fill="#bbb" />
                      </svg>
                    </div>
                  </div>
                  {/* Intensity slider */}
                  <ARSlider label="Intensity" value={ec.intensity} onChange={v => setEyeshadowPatternColors(prev => prev.map((x, i) => i === idx ? { ...x, intensity: v } : x))} />
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Color-only mode (Lipstick, Foundation, Nail Polish) ──
  if (config.colorOnlyMode) {
    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Title */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        {/* Colors adjustments card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
            <IcARPalette />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
          </div>
          {/* 1. Color field */}
          <ARColorField color={lipColor} onChange={setLipColor} />
          {/* 2. Intensity */}
          <ARSlider label="Intensity" value={intensity} onChange={setIntensity} />
          {/* 3. Finish dropdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setFinishOpen(o => !o)}
                style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{FINISH_ICONS[finish]}</span>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>{finish}</span>
                <ChevronDown size={20} color="#5a5a5a" />
              </div>
              {finishOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                  {(config.finishTypes || ["Matte", "Gloss", "Shimmer"]).map(ft => (
                    <div key={ft} onClick={() => { setFinish(ft); setFinishOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: finish === ft ? "#da0e64" : "#141414", background: finish === ft ? "#fce8f3" : "transparent" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>{FINISH_ICONS[ft]}</span>
                      {ft}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* 4. Gloss extras */}
          {finish === "Gloss" && (
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <ARSlider label="Gloss" value={glossValue} onChange={setGlossValue} />
            </div>
          )}
          {/* 4. Shimmer extras */}
          {finish === "Shimmer" && (
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                <ARColorField color={shimmerColor} onChange={setShimmerColor} />
              </div>
              <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
              <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
              <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Color + Pattern mode (Eyeliner, Mascara, Eyebrows, Eyelashes) ──
  if (config.colorAndPatternMode) {
    // Use live API data when available, fall back to config
    const patList = apiPatterns
      ? apiPatterns.map(p => ({ id: p._id, name: p.name, thumb: p.thumbnailUrl }))
      : (config.patternTypes || []).map(name => ({ id: name, name, thumb: config.patternThumbs?.[name] }));
    const currentPat = patList.find(p => p.name === selectedPattern) || patList[0];
    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Pattern picker popover */}
        {showPatternPicker && (
          <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #e0e0e0", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", width: 328, overflow: "hidden", userSelect: "none" }}>
            <div onMouseDown={e => { dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y }; e.preventDefault(); }} style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", minHeight: 40, cursor: "grab" }}>
              <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({patList.length})</span>
              <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" /></svg>
              </button>
            </div>
            <div style={{ padding: "16px 12px", display: "flex", flexWrap: "wrap", gap: 12 }}>
              {patList.map(pt => {
                const isSel = selectedPattern === pt.name;
                return (
                  <div key={pt.id} onClick={() => { setSelectedPattern(pt.name); setShowPatternPicker(false); }} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                    <div style={{ borderRadius: 16, border: `1px solid ${isSel ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                        {pt.thumb ? <img src={pt.thumb} alt={pt.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: isSel ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{pt.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Title */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        {/* Single card: Colors adjustments + divider + Pattern */}
        <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>
          {/* Colors adjustments */}
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
              <IcARPalette />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
            </div>
            <ARColorField color={lipColor} onChange={setLipColor} />
            <ARSlider label="Intensity" value={intensity} onChange={setIntensity} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
              {(config.finishTypes || []).length > 1 ? (
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => setFinishOpen(o => !o)}
                    style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{FINISH_ICONS[finish]}</span>
                    <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>{finish}</span>
                    <ChevronDown size={20} color="#5a5a5a" />
                  </div>
                  {finishOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                      {(config.finishTypes).map(ft => (
                        <div key={ft} onClick={() => { setFinish(ft); setFinishOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: finish === ft ? "#da0e64" : "#141414", background: finish === ft ? "#fce8f3" : "transparent" }}>
                          <span style={{ display: "flex", alignItems: "center" }}>{FINISH_ICONS[ft]}</span>
                          {ft}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><IcFinishMatte /></span>
                  <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>Matte</span>
                </div>
              )}
            </div>
            {/* Shimmer extras */}
            {finish === "Shimmer" && (
              <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                  <ARColorField color={shimmerColor} onChange={setShimmerColor} />
                </div>
                <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
                <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
                <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
              </div>
            )}
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />
          {/* Pattern section */}
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            {patternsLoading ? (
              <div style={{ fontSize: 13, color: "#bbb", padding: "8px 0" }}>Loading patterns…</div>
            ) : (
              <div style={{ background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "6px 10px", display: "flex", alignItems: "center", gap: 10, height: 48 }}>
                {currentPat?.thumb && (
                  <img src={currentPat.thumb} alt={currentPat.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                )}
                <span style={{ flex: 1, fontSize: 14, color: "#141414", textTransform: "capitalize" }}>{currentPat?.name || config.patternLabel}</span>
                <button onClick={() => { setPickerPos({ x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 180 }); setShowPatternPicker(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 13, fontWeight: 500, padding: "4px 0", flexShrink: 0 }}>Change</button>
              </div>
            )}
            {/* Optional pattern sliders (e.g. Lipliner: Thickness, Smoothness) */}
            {config.patternSliders && config.patternSliders.map(sliderLabel => (
              <ARSlider
                key={sliderLabel}
                label={sliderLabel}
                value={patternSliderValues[sliderLabel] ?? 50}
                onChange={v => setPatternSliderValues(prev => ({ ...prev, [sliderLabel]: v }))}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
      {/* Pattern picker popover — positioned to the left of the panel */}
      {showPatternPicker && (
        <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #fff", boxShadow: "0 4px 16px rgba(0,0,0,0.16)", width: 328, overflow: "hidden", userSelect: "none" }}>
          <div
            onMouseDown={(e) => {
              dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y };
              e.preventDefault();
            }}
            style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", gap: 4, minHeight: 40, cursor: "grab" }}
          >
            <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({PATTERN_TYPES.length})</span>
            <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" />
              </svg>
            </button>
          </div>
          <div style={{ padding: "16px 12px", display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PATTERN_TYPES.map(type => {
              const isSelected = pickerTargetId ? patterns.find(p => p.id === pickerTargetId)?.type === type : false;
              return (
                <div key={type} onClick={() => selectPattern(type)} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                  <div style={{ borderRadius: 16, border: `1px solid ${isSelected ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                      <img src={PATTERN_THUMBS[type]} alt={type} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: isSelected ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{type}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Title */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
      </div>

      {/* Settings card */}
      <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>

        {/* Colors adjustments section */}
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IcARPalette />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Colors adjustments</span>
          </div>

          {/* Style dropdown */}
          {config.hasStyle && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 12, color: "#5a5a5a" }}>Style</div>
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => setColorStyleOpen(o => !o)}
                  style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                >
                  <span style={{ flex: 1, fontSize: 14, color: "#141414" }}>{colorStyle || "Select style"}</span>
                  {colorStyle && (
                    <>
                      <button onClick={e => { e.stopPropagation(); setColorStyle(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%" }}>
                        <IcARClose />
                      </button>
                      <div style={{ width: 1, height: 16, background: "#e0e0e0" }} />
                    </>
                  )}
                  <IcARChevronDown />
                </div>
                {colorStyleOpen && (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                    {styleOptions.map(opt => (
                      <div key={opt} onClick={() => { setColorStyle(opt); setColorStyleOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", color: colorStyle === opt ? "#da0e64" : "#141414", background: colorStyle === opt ? "#fce8f3" : "transparent" }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Color fields */}
          {Array.from({ length: colorCount }).map((_, i) => (
            <ARColorField key={i} color={colors[i] || "#9999FF"} onChange={v => setColors(cs => { const next = [...cs]; next[i] = v; return next; })} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />

        {/* Pattern section */}
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            <button onClick={addPattern} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 0" }}>
              <IcARPlus />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#8f0941" }}>Add</span>
            </button>
          </div>

          {/* Pattern items */}
          {patterns.map(pat => (
            <div key={pat.id} style={{ background: "#fafafa", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Header row: radio + thumbnail + name + icons */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42 }}>
                {/* Radio button */}
                <div style={{ padding: "2px 0", display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => setSelectedPatternId(pat.id)}>
                  {selectedPatternId === pat.id ? (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#da0e64", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                    </div>
                  ) : (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #5a5a5a", flexShrink: 0, boxSizing: "border-box" }} />
                  )}
                </div>
                {/* Thumbnail (click to change type) */}
                <button onClick={() => { setPickerTargetId(pat.id); setPickerPos({ x: window.innerWidth / 2 - 152, y: window.innerHeight / 2 - 120 }); setShowPatternPicker(true); }} style={{ width: 42, height: 42, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", flexShrink: 0, padding: "1.4px", overflow: "hidden", boxSizing: "border-box" }}>
                  <img src={PATTERN_THUMBS[pat.type]} alt={pat.type} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6, display: "block" }} />
                </button>
                {/* Name */}
                <span style={{ flex: 1, fontSize: 14, color: "#141414" }}>{pat.type}</span>
                {/* Icons */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <button onClick={() => removePattern(pat.id)} style={{ width: 20, height: 20, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "content-box" }}>
                    <IcARTrash />
                  </button>
                  <button onClick={() => togglePattern(pat.id)} style={{ width: 20, height: 20, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "content-box" }}>
                    {pat.collapsed ? <IcChevronDown20 /> : <IcARChevronUp />}
                  </button>
                </div>
              </div>

              {/* Collapsible fields */}
              {!pat.collapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Lipstick-specific type fields */}
                  {pat.type === "Glossy" && !config?.patternTypes && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                      <ARTextField label="Gloss" value={pat.gloss} onChange={v => updatePattern(pat.id, "gloss", v)} />
                    </div>
                  )}
                  {pat.type === "Shimmer" && !config?.patternTypes && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <ARColorField color={pat.color} onChange={v => updatePattern(pat.id, "color", v)} />
                      <div style={{ display: "flex", gap: 8 }}>
                        <ARTextField label="Density" value={pat.density} onChange={v => updatePattern(pat.id, "density", v)} />
                        <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                        <ARTextField label="Granularity" value={pat.granularity} onChange={v => updatePattern(pat.id, "granularity", v)} />
                      </div>
                    </div>
                  )}
                  {pat.type === "Matte" && !config?.patternTypes && (
                    <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                  )}
                  {/* Blush-specific fields */}
                  {config?.blushSubStyles && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {/* Sub-style dropdown */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Sub Style</div>
                        <div style={{ position: "relative" }}>
                          <select
                            value={pat.subStyle || config.blushSubStyles[0]}
                            onChange={e => updatePattern(pat.id, "subStyle", e.target.value)}
                            style={{ width: "100%", height: 32, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "0 28px 0 8px", fontSize: 14, color: "#141414", appearance: "none", cursor: "pointer", outline: "none" }}
                          >
                            {config.blushSubStyles.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#5a5a5a" }} />
                        </div>
                      </div>
                      {/* Matte: intensity only */}
                      {pat.type === "Matte" && (
                        <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                      )}
                      {/* Shimmer: intensity + shimmer color + density/intensity/granularity */}
                      {pat.type === "Shimmer" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                          <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                          <ARColorField color={pat.color} onChange={v => updatePattern(pat.id, "color", v)} />
                          <div style={{ display: "flex", gap: 8 }}>
                            <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                            <ARTextField label="Density" value={pat.density} onChange={v => updatePattern(pat.id, "density", v)} />
                            <ARTextField label="Granularity" value={pat.granularity} onChange={v => updatePattern(pat.id, "granularity", v)} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Generic: subcategories with config-defined pattern types but no sub-styles (e.g. Eyeliner) */}
                  {config?.patternTypes && !config?.blushSubStyles && (
                    <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AR STUDIO (Beauty) ───
function ARStudio({ product, onBack, onPrev, onNext, onToggleStatus, onEditProduct }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveVersion, setSaveVersion] = useState(0);
  const hasAR = BEAUTY_CATEGORIES[product.category]?.ar?.[product.subcategory];

  useEffect(() => {
    setHasUnsavedChanges(false);
    setSaveVersion(0);
  }, [product.id, product.subcategory]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ProductFlowHeader
        title="AR Settings"
        tag={product.category}
        onBack={onBack}
        primaryLabel="Save"
        onPrimary={() => setSaveVersion(v => v + 1)}
        showSecondary={false}
        showPrimary={hasAR && hasUnsavedChanges}
      />
      <div style={{ flex: 1, padding: "20px 24px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "grid", gridTemplateColumns: "264px minmax(0, 1fr) 320px", gap: 18, alignItems: "stretch", flex: 1, minHeight: 0 }}>

          {/* Left: Product details + Variants (lifestyle style) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", minHeight: 0 }}>
            <div style={{ ...S.card, overflow: "hidden", padding: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Product details</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: "4px 0", lineHeight: "16px" }} onClick={() => onEditProduct(product)}>Edit</button>
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>SKU ID</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.skuId}</span>
                </div>
                <div style={{ height: 1, background: "#e0e0e0", borderRadius: 250 }} />
                <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Category</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.category}</span>
                  </div>
                  <div style={{ width: 1, background: "#e0e0e0", borderRadius: 250, alignSelf: "stretch" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Subcategory</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.subcategory}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...S.card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Variant</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, lineHeight: "16px", padding: 0 }}>Manage</button>
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.variants.map((v, i) => (
                  <div key={v.id} onClick={() => setSelectedVariant(i)} style={{ borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", padding: 12, gap: 10, border: `1px solid ${selectedVariant === i ? "#8f0941" : "#f0f0f0"}`, background: "#fff" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: v.color || "#f0f0f0", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, lineHeight: "16px", color: "#000" }}>{i + 1}. {v.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: AR Canvas */}
          <div style={{ background: "#f5f5f5", borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
            {/* Viewer area */}
            <div style={{ flex: 1, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 14px" }}>
              <div style={{ textAlign: "center", color: "#ccc" }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #fce4ec, #f8bbd0)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Palette size={48} strokeWidth={1} color="#e91e63" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#999" }}>AR Preview</p>
                <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 6 }}>Adjust settings on the right to preview</p>
              </div>
            </div>

            {/* Bottom URL bar */}
            <div style={{ background: "#fff", borderTop: "1px solid #e0e0e0", padding: "8px 16px", display: "flex", alignItems: "center", gap: 16 }}>
              {/* URL input */}
              <div style={{ flex: 1, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "4px 8px", height: 32, display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M9.99991 15.8926C9.18477 16.7077 8.20268 17.1153 7.05363 17.1153C5.90458 17.1153 4.92249 16.7077 4.10735 15.8926C3.29221 15.0774 2.88464 14.0954 2.88464 12.9463C2.88464 11.7973 3.29221 10.8152 4.10735 10L5.87512 8.23226C6.04207 8.06531 6.23849 7.98183 6.46437 7.98183C6.69025 7.98183 6.88667 8.06531 7.05363 8.23226C7.22058 8.39922 7.30406 8.59564 7.30406 8.82152C7.30406 9.0474 7.22058 9.24382 7.05363 9.41077L5.28586 11.1785C4.79481 11.6696 4.54929 12.2588 4.54929 12.9463C4.54929 13.6338 4.79481 14.223 5.28586 14.7141C5.77691 15.2051 6.36616 15.4506 7.05363 15.4506C7.74109 15.4506 8.33035 15.2051 8.82139 14.7141L10.5892 12.9463C10.7561 12.7794 10.9525 12.6959 11.1784 12.6959C11.4043 12.6959 11.6007 12.7794 11.7677 12.9463C11.9346 13.1133 12.0181 13.3097 12.0181 13.5356C12.0181 13.7614 11.9346 13.9579 11.7677 14.1248L9.99991 15.8926ZM8.82139 12.3571C8.65444 12.524 8.45802 12.6075 8.23214 12.6075C8.00626 12.6075 7.80984 12.524 7.64288 12.3571C7.47593 12.1901 7.39245 11.9937 7.39245 11.7678C7.39245 11.5419 7.47593 11.3455 7.64288 11.1785L11.1784 7.64301C11.3454 7.47605 11.5418 7.39257 11.7677 7.39257C11.9936 7.39257 12.19 7.47605 12.3569 7.64301C12.5239 7.80996 12.6074 8.00638 12.6074 8.23226C12.6074 8.45814 12.5239 8.65456 12.3569 8.82152L8.82139 12.3571ZM14.1247 11.7678C13.9577 11.9348 13.7613 12.0182 13.5354 12.0182C13.3096 12.0182 13.1131 11.9348 12.9462 11.7678C12.7792 11.6008 12.6958 11.4044 12.6958 11.1785C12.6958 10.9527 12.7792 10.7562 12.9462 10.5893L14.714 8.82152C15.205 8.33047 15.4505 7.74121 15.4505 7.05375C15.4505 6.36628 15.205 5.77703 14.714 5.28598C14.2229 4.79494 13.6336 4.54941 12.9462 4.54941C12.2587 4.54941 11.6695 4.79494 11.1784 5.28598L9.41065 7.05375C9.24369 7.22071 9.04728 7.30418 8.82139 7.30418C8.59551 7.30418 8.39909 7.22071 8.23214 7.05375C8.06518 6.88679 7.98171 6.69038 7.98171 6.46449C7.98171 6.23861 8.06518 6.04219 8.23214 5.87524L9.99991 4.10747C10.815 3.29233 11.7971 2.88477 12.9462 2.88477C14.0952 2.88477 15.0773 3.29233 15.8925 4.10747C16.7076 4.92261 17.1152 5.9047 17.1152 7.05375C17.1152 8.2028 16.7076 9.18489 15.8925 10L14.1247 11.7678Z" fill="#000000" fillOpacity="0.65" />
                </svg>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://www.meshy.ai/3d-models/Russia-Matryoshka-dolls-colorful-Cute-Different-sizes-around-the-biggest-one</span>
              </div>
              {/* Action icons */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                {[
                  // Copy
                  <svg key="copy" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66671 16.6668L1.66671 8.33349C1.66671 7.41683 2.40838 6.66683 3.33338 6.66683L11.6667 6.66683C12.5834 6.66683 13.3334 7.41683 13.3334 8.3335L13.3334 16.6668C13.3334 17.5835 12.5834 18.3335 11.6667 18.3335L3.33337 18.3335C2.40837 18.3335 1.66671 17.5835 1.66671 16.6668ZM15 6.66683L15 13.3335L16.6667 13.3335C17.5834 13.3335 18.3334 12.5835 18.3334 11.6668L18.3334 3.3335C18.3334 2.41683 17.5834 1.66683 16.6667 1.66683L8.33338 1.66683C7.40838 1.66683 6.66671 2.41683 6.66671 3.3335L6.66671 5.00016L13.3334 5.00016C14.25 5.00016 15 5.75016 15 6.66683Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  // QR
                  <svg key="qr" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8.33333V3.33333C2.5 3.1 2.58333 2.9 2.74167 2.74167C2.9 2.58333 3.1 2.5 3.33333 2.5H8.33333C8.56667 2.5 8.76667 2.58333 8.925 2.74167C9.08333 2.9 9.16667 3.1 9.16667 3.33333V8.33333C9.16667 8.56667 9.08333 8.76667 8.925 8.925C8.76667 9.08333 8.56667 9.16667 8.33333 9.16667H3.33333C3.1 9.16667 2.9 9.08333 2.74167 8.925C2.58333 8.76667 2.5 8.56667 2.5 8.33333ZM4.16667 7.5H7.5V4.16667H4.16667V7.5ZM2.5 16.6667V11.6667C2.5 11.4333 2.58333 11.2333 2.74167 11.075C2.9 10.9167 3.1 10.8333 3.33333 10.8333H8.33333C8.56667 10.8333 8.76667 10.9167 8.925 11.075C9.08333 11.2333 9.16667 11.4333 9.16667 11.6667V16.6667C9.16667 16.9 9.08333 17.1 8.925 17.2583C8.76667 17.4167 8.56667 17.5 8.33333 17.5H3.33333C3.1 17.5 2.9 17.4167 2.74167 17.2583C2.58333 17.1 2.5 16.9 2.5 16.6667ZM4.16667 15.8333H7.5V12.5H4.16667V15.8333ZM10.8333 8.33333V3.33333C10.8333 3.1 10.9167 2.9 11.075 2.74167C11.2333 2.58333 11.4333 2.5 11.6667 2.5H16.6667C16.9 2.5 17.1 2.58333 17.2583 2.74167C17.4167 2.9 17.5 3.1 17.5 3.33333V8.33333C17.5 8.56667 17.4167 8.76667 17.2583 8.925C17.1 9.08333 16.9 9.16667 16.6667 9.16667H11.6667C11.4333 9.16667 11.2333 9.08333 11.075 8.925C10.9167 8.76667 10.8333 8.56667 10.8333 8.33333ZM12.5 7.5H15.8333V4.16667H12.5V7.5ZM15.8333 17.5V15.8333H17.5V17.5H15.8333ZM10.8333 12.5V10.8333H12.5V12.5H10.8333ZM12.5 14.1667V12.5H14.1667V14.1667H12.5ZM10.8333 15.8333V14.1667H12.5V15.8333H10.8333ZM12.5 17.5V15.8333H14.1667V17.5H12.5ZM14.1667 15.8333V14.1667H15.8333V15.8333H14.1667ZM14.1667 12.5V10.8333H15.8333V12.5H14.1667ZM15.8333 14.1667V12.5H17.5V14.1667H15.8333Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  // Code
                  <svg key="code" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.7554 10.0269L7.1279 13.3994C7.28746 13.559 7.36724 13.762 7.36724 14.0086C7.36724 14.2552 7.28746 14.4583 7.1279 14.6179C6.96834 14.7774 6.76526 14.8572 6.51867 14.8572C6.27208 14.8572 6.069 14.7774 5.90945 14.6179L1.90596 10.6144C1.81893 10.5273 1.75728 10.4331 1.72102 10.3315C1.68476 10.23 1.66663 10.1212 1.66663 10.0052C1.66663 9.88911 1.68476 9.78032 1.72102 9.67878C1.75728 9.57724 1.81893 9.48296 1.90596 9.39593L5.90945 5.39244C6.08351 5.21838 6.29021 5.13135 6.52955 5.13135C6.76889 5.13135 6.97559 5.21838 7.14965 5.39244C7.32372 5.56651 7.41075 5.77321 7.41075 6.01255C7.41075 6.25189 7.32372 6.45859 7.14965 6.63265L3.7554 10.0269ZM16.2445 9.98339L12.872 6.6109C12.7125 6.45134 12.6327 6.24826 12.6327 6.00167C12.6327 5.75508 12.7125 5.552 12.872 5.39244C13.0316 5.23289 13.2347 5.15311 13.4812 5.15311C13.7278 5.15311 13.9309 5.23289 14.0905 5.39244L18.094 9.39593C18.181 9.48296 18.2426 9.57724 18.2789 9.67878C18.3152 9.78032 18.3333 9.88911 18.3333 10.0052C18.3333 10.1212 18.3152 10.23 18.2789 10.3315C18.2426 10.4331 18.181 10.5273 18.094 10.6144L14.0905 14.6179C13.9164 14.7919 13.7133 14.8753 13.4812 14.8681C13.2492 14.8608 13.0461 14.7702 12.872 14.5961C12.698 14.422 12.6109 14.2153 12.6109 13.976C12.6109 13.7367 12.698 13.53 12.872 13.3559L16.2445 9.98339Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  // Download
                  <svg key="dl" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.15833 2.50179C9.15833 2.26846 9.24167 2.06846 9.4 1.91012C9.55833 1.75179 9.75833 1.66846 9.99167 1.66846C10.225 1.66846 10.425 1.75179 10.5833 1.91012C10.7417 2.06846 10.825 2.26846 10.825 2.50179V11.3435L12.9417 9.22679C13.1083 9.06012 13.3 8.97679 13.525 8.98512C13.75 8.98512 13.9417 9.06846 14.1083 9.22679C14.275 9.39346 14.3583 9.58512 14.3667 9.81012C14.375 10.0351 14.2917 10.2268 14.125 10.3935L10.5667 13.9518C10.4833 14.0351 10.3917 14.0935 10.2917 14.1268C10.1917 14.1601 10.0917 14.1768 9.975 14.1768C9.85833 14.1768 9.75833 14.1601 9.66667 14.1268C9.575 14.0935 9.48333 14.0351 9.4 13.9518L5.86667 10.4185C5.7 10.2518 5.61667 10.0518 5.61667 9.82679C5.61667 9.60179 5.7 9.40179 5.86667 9.23512C6.03333 9.08512 6.23333 9.01012 6.45833 9.01012C6.68333 9.01012 6.875 9.08512 7.03333 9.24346L9.15 11.3601V2.50179H9.15833ZM17.5 17.4985C17.5 17.0402 17.125 16.6652 16.6667 16.6652H3.33333C2.875 16.6652 2.5 17.0402 2.5 17.4985C2.5 17.9569 2.875 18.3319 3.33333 18.3319H16.6667C17.125 18.3319 17.5 17.9569 17.5 17.4985Z" fill="#000000" fillOpacity="0.65" /></svg>,
                ].map((icon, i) => (
                  <button key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: General Settings (no AR Settings wrapper) */}
          <div style={{ overflow: "visible", minHeight: 0, overflowY: "auto" }}>
            {hasAR ? <ARSettingsPanel subcategory={product.subcategory} onDirtyChange={setHasUnsavedChanges} saveVersion={saveVersion} /> : (
              <div style={{ ...S.card, textAlign: "center", color: "#bbb", padding: 40 }}>
                <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
                <p>AR not available for {product.subcategory}</p>
              </div>
            )}
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
  const [aiToast, setAiToast] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!aiToast) return undefined;
    const timer = setTimeout(() => setAiToast(null), 3500);
    return () => clearTimeout(timer);
  }, [aiToast]);

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
    setAiToast({ message: `"${created.name}" created successfully`, type: "success" });
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

      <Toast toast={aiToast} onClose={() => setAiToast(null)} />

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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
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

// ─── TOAST ───
function Toast({ toast, onClose }) {
  const [progress, setProgress] = useState(100);
  const duration = 3500;

  useEffect(() => {
    if (!toast) return;
    setProgress(100);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [toast]);

  if (!toast) return null;

  const isError = toast.type === "error";
  const bg = isError ? "#5c1a1a" : "#255626";
  const barColor = isError ? "#fca5a5" : "#e5fbe6";
  const iconBg = isError ? "#ef4444" : "#25ab21";

  return (
    <div style={{ position: "fixed", top: 20, right: 24, zIndex: 2000, width: 340 }}>
      <div style={{ background: bg, borderRadius: 12, border: `1px solid ${bg}`, padding: 12, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 0 8px rgba(255,255,255,0.3)", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
          {/* Icon */}
          <div style={{ flexShrink: 0 }}>
            {isError ? (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} color="#fff" />
              </div>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <path d="M10.5061 14.2592L8.06079 11.8137C7.915 11.6681 7.73175 11.5935 7.51105 11.59C7.29053 11.5867 7.10395 11.6612 6.95132 11.8137C6.79886 11.9663 6.72263 12.1512 6.72263 12.3684C6.72263 12.5856 6.79886 12.7705 6.95132 12.9232L9.84 15.8118C10.0304 16.002 10.2524 16.0971 10.5061 16.0971C10.7597 16.0971 10.9818 16.002 11.1721 15.8118L17.0284 9.95553C17.174 9.80974 17.2486 9.62649 17.2521 9.40579C17.2554 9.18526 17.1809 8.99868 17.0284 8.84605C16.8758 8.6936 16.6909 8.61737 16.4737 8.61737C16.2565 8.61737 16.0716 8.6936 15.9189 8.84605L10.5061 14.2592Z" fill="#25AB21" />
                <path d="M12.0018 22C10.6187 22 9.3186 21.7375 8.10158 21.2126C6.88456 20.6877 5.82596 19.9754 4.92579 19.0755C4.02561 18.1757 3.31289 17.1175 2.78763 15.9011C2.26254 14.6846 2 13.3848 2 12.0018C2 10.6187 2.26246 9.3186 2.78737 8.10158C3.31228 6.88456 4.02465 5.82596 4.92447 4.92579C5.8243 4.02561 6.88246 3.31289 8.09895 2.78763C9.31544 2.26254 10.6152 2 11.9982 2C13.3813 2 14.6814 2.26246 15.8984 2.78737C17.1154 3.31228 18.174 4.02465 19.0742 4.92447C19.9744 5.8243 20.6871 6.88246 21.2124 8.09895C21.7375 9.31544 22 10.6152 22 11.9982C22 13.3813 21.7375 14.6814 21.2126 15.8984C20.6877 17.1154 19.9754 18.174 19.0755 19.0742C18.1757 19.9744 17.1175 20.6871 15.9011 21.2124C14.6846 21.7375 13.3848 22 12.0018 22Z" fill="#25AB21" />
              </svg>
            )}
          </div>
          {/* Message */}
          <span style={{ flex: 1, color: "#fafafa", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{toast.message}</span>
          {/* Close */}
          <button onClick={onClose} style={{ width: 20, height: 20, borderRadius: 250, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
            <X size={16} color="#fff" />
          </button>
        </div>
        {/* Progress bar */}
        <div style={{ position: "absolute", left: 2, right: 0, bottom: 1, height: 4, overflow: "hidden" }}>
          <div style={{ background: barColor, borderRadius: 999, height: "100%", width: `${progress}%`, transition: "width 30ms linear" }} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function App() {
  const [activeTab, setActiveTab] = useState("Lifestyle");
  const [view, setView] = useState("listing");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarPage, setSidebarPage] = useState("products");
  const [aiStylistFullscreen, setAIStylistFullscreen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sdkMappings, setSdkMappings] = useState(DEFAULT_SDK_MAPPINGS);

  const addSdkMapping = (subcategory, displayName) => {
    setSdkMappings(prev => ({
      ...prev,
      [subcategory]: [...(prev[subcategory] || []), displayName],
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const hideSidebar = view === "addProduct" || view === "productDetail" || view === "arStudio" || aiStylistFullscreen;
  const hideTopbar = view === "addProduct" || view === "productDetail" || view === "arStudio";
  const isAIStylist = sidebarPage === "aiStylist";

  const handleSidebarNavigate = (page, category) => {
    setSidebarPage(page);
    if (category) setActiveTab(category);
    if (page !== "aiStylist") setAIStylistFullscreen(false);
    if (page === "products") {
      setView("listing");
      setSelectedProduct(null);
    }
  };

  const tabProducts = products.filter(p => p.headCategory === activeTab);

  const handleAddProduct = () => { setSelectedProduct(null); setView("addProduct"); };
  const handleViewProduct = (p) => { setSelectedProduct(p); setView(p.headCategory === "Beauty" ? "arStudio" : "productDetail"); };
  const handleEditProduct = (p) => { setSelectedProduct(p); setView("addProduct"); };
  const handleToggleStatus = (id) => setProducts(ps => ps.map(p => p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p));
  const handleSaveProduct = (productData, nextView = "listing") => {
    const isEdit = products.some(p => p.id === productData.id);
    const isGenerating3D = nextView === "productDetail";
    const enriched = {
      ...productData,
      modelGenerating: isGenerating3D ? true : (productData.modelGenerating || false),
      status: productData.media?.hasModel ? productData.status : "inactive",
    };
    setProducts(prev => isEdit
      ? prev.map(p => p.id === enriched.id ? enriched : p)
      : [enriched, ...prev]
    );
    setActiveTab(enriched.headCategory);
    setSelectedProduct(enriched);
    setView(nextView);
    if (nextView === "listing") setSelectedProduct(null);
    if (isGenerating3D) {
      showToast("3D model generation started");
    } else {
      showToast(isEdit ? "Product updated successfully" : "Product added successfully");
    }
  };

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
    <div style={{ ...S.app, flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        .glamar-btn,
        .glamar-btn * {
          box-sizing: border-box;
        }
        .glamar-btn {
          appearance: none;
          border-radius: 999px;
          height: 42px;
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: inherit;
          font-size: 13.5px;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
        }
        .glamar-btn:focus-visible {
          outline: 2px solid rgba(143, 9, 65, 0.22);
          outline-offset: 2px;
        }
        .glamar-btn-primary {
          height: 32px;
          min-height: 32px;
          max-height: 32px;
          padding: 0 16px;
          gap: 6px;
          border-radius: 999px;
          border: none;
          background: rgb(218, 14, 100);
          color: rgb(255, 255, 255);
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 16px;
          font-weight: 500;
          text-align: left;
        }
        .glamar-btn-primary:hover:not(:disabled) {
          background: #8f0941;
        }
        .glamar-btn-primary:active:not(:disabled) {
          background: #520525;
          color: #ff99c4;
        }
        .glamar-btn-primary:disabled {
          background: #ffa1c8;
          color: #ffffff;
          cursor: not-allowed;
          box-shadow: none;
        }
        .glamar-btn-secondary {
          height: 32px;
          min-height: 32px;
          max-height: 32px;
          padding: 0 16px;
          gap: 6px;
          background: #ffffff;
          color: #8f0941;
          border: 1px solid #e0e0e0;
          border-radius: 999px;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 16px;
          font-weight: 500;
        }
        .glamar-btn-secondary:hover:not(:disabled) {
          background: #fcebf4;
          color: #8f0941;
          border-color: #e0e0e0;
        }
        .glamar-btn-secondary:active:not(:disabled) {
          background: #fadce9;
          color: #520525;
          border-color: #e0e0e0;
        }
        .glamar-btn-secondary:disabled {
          background: #ffffff;
          color: #ffa1c8;
          border-color: #e0e0e0;
          cursor: not-allowed;
          box-shadow: none;
        }
        input:focus, select:focus { border-color: #f43f5e !important; outline: none; }
        input[type="range"]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #141414; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #141414; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
      {!hideTopbar && <Topbar />}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!hideSidebar && <Sidebar activePage={sidebarPage} activeCategory={activeTab} onNavigate={handleSidebarNavigate} />}
        <div style={S.main}>
          <div style={{ ...S.content, padding: hideTopbar ? 0 : S.content.padding, display: "flex", flexDirection: "column", overflow: (view === "listing" || view === "arStudio") ? "hidden" : "auto" }}>
            {/* AI STYLIST */}
            {isAIStylist && <AIStylistPage onFullscreenChange={setAIStylistFullscreen} />}
            {/* LISTING */}
            {!isAIStylist && view === "listing" && activeTab !== "Beauty" && (
              <GeneralListing products={products} activeTab={activeTab}
                onAddProduct={handleAddProduct} onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct} onToggleStatus={handleToggleStatus} />
            )}
            {!isAIStylist && view === "listing" && activeTab === "Beauty" && (
              <BeautyListing products={products} activeTab={activeTab}
                onAddProduct={handleAddProduct} onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct} onToggleStatus={handleToggleStatus} />
            )}
            {/* ADD / EDIT */}
            {!isAIStylist && view === "addProduct" && activeTab !== "Beauty" && (
              <GeneralAddForm headCategory={activeTab} onBack={() => setView("listing")}
                onSaveProduct={handleSaveProduct} editProduct={selectedProduct}
                sdkMappings={sdkMappings} onAddSdkMapping={addSdkMapping} />
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
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

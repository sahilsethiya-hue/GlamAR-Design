import { useState, useEffect } from "react";
import { ArrowLeft, Link, Upload } from "lucide-react";
import { S, BEAUTY_CATEGORIES } from "../../shared/constants.jsx";
import { DD, Inp } from "../../shared/ui";
import { VariantEditor, normalizeBeautyVariantOptions } from "../products/VariantEditor";
import {
  createProductId,
  getTodayDate,
  slugToName,
  buildSkuFromName,
  getBeautyInitialForm,
  mapVariantOptionsForEditor,
  mapBeautyVariantsForEditor,
} from "../products/utils";

export function BeautyAddForm({ onBack, onSaveProduct, editProduct }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getBeautyInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState(() => normalizeBeautyVariantOptions(mapVariantOptionsForEditor(editProduct)));
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
    setVariantOptions(normalizeBeautyVariantOptions(mapVariantOptionsForEditor(editProduct)));
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
        productUrl: importLink.trim(),
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
      costPrice: variant.costPrice || form.costPrice || "",
      sellingPrice: variant.sellingPrice || variant.price || form.sellingPrice || "",
      price: variant.sellingPrice || variant.price || form.sellingPrice || "",
      color: variant.color || "",
      productUrl: (variant.productUrl || "").trim(),
      modelFileName: variant.modelFileName || "",
    })) : [{
      id: `var-${Date.now()}-0`,
      name: "Default",
      attributes: [{ attr: "Variant", val: "Default" }],
      variantId: form.skuId.trim(),
      costPrice: form.costPrice || "",
      sellingPrice: form.sellingPrice || "",
      price: form.sellingPrice || "",
      color: "",
      productUrl: (form.productUrl || "").trim(),
      modelFileName: "",
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
      variantOptions: normalizeBeautyVariantOptions(variantOptions),
      variants: nextVariants,
      additionalFields: form.additionalFields,
      productUrl: (form.productUrl || "").trim(),
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Inp label="Product ID*" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. BT-001" />
              <Inp label="Product Name*" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="e.g. Velvet Matte Lipstick" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Inp label="Product URL" value={form.productUrl || ""} onChange={v => updateForm("productUrl", v)} placeholder="Enter product URL" />
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
          <VariantEditor variantOptions={variantOptions} setVariantOptions={setVariantOptions} variants={variants} setVariants={setVariants} has3D={false} measurementSchema={null} disabled={!form.category} beautyMode />

        </div>
      </div>
    </div>
  );
}

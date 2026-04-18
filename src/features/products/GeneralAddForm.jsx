import { useState, useEffect } from "react";
import { ArrowLeft, Link, Image, Upload, Box, Info, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { S, CATEGORY_TREE, DIMENSION_UNITS } from "../../shared/constants.jsx";
import { DD, Inp, UBox, Tog, DisplayNameDropdown } from "../../shared/ui";
import { VariantEditor } from "./VariantEditor";
import {
  createProductId,
  getTodayDate,
  slugToName,
  buildSkuFromName,
  getEmptyMeasurementFields,
  getMeasurementSchema,
  buildMeasurement,
  getGeneralInitialForm,
  mapVariantOptionsForEditor,
  mapGeneralVariantsForEditor,
  categoryHasL2,
  getCategoryLookupKey,
} from "./utils";


export function GeneralAddForm({ headCategory, onBack, onSaveProduct, editProduct, sdkMappings, onAddSdkMapping }) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getGeneralInitialForm(editProduct));
  const [variantOptions, setVariantOptions] = useState(() => mapVariantOptionsForEditor(editProduct));
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
    setVariantOptions(mapVariantOptionsForEditor(editProduct));
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
      costPrice: variant.costPrice || form.costPrice || "",
      sellingPrice: variant.sellingPrice || variant.price || form.sellingPrice || "",
      price: variant.sellingPrice || variant.price || form.sellingPrice || "",
      color: variant.color || "",
    })) : [{
      id: `var-${Date.now()}-0`,
      name: "Default",
      attributes: [{ attr: "Variant", val: "Default" }],
      variantId: form.skuId.trim(),
      dimension: formMeasurement.dimension || "",
      measurements: formMeasurement.measurements,
      costPrice: form.costPrice || "",
      sellingPrice: form.sellingPrice || "",
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
      variantOptions,
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
                        <DD label="Diamond Ring" value={form.isDiamondRing || "no"} onChange={v => updateForm("isDiamondRing", v)} options={["yes", "no"]} placeholder="Select" />
                        {form.isDiamondRing === "yes" && <>
                          <Inp label="Diamond Shape" value={form.diamondShape || ""} onChange={v => updateForm("diamondShape", v)} placeholder="e.g. Round, Princess" />
                          <Inp label="Carat Size (mm)" value={form.diamondCaratSize || ""} onChange={v => updateForm("diamondCaratSize", v)} placeholder="e.g. 6.5" />
                        </>}
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
          <VariantEditor variantOptions={variantOptions} setVariantOptions={setVariantOptions} variants={variants} setVariants={setVariants} has3D={has3D} measurementSchema={measurementSchema} disabled={!form.category} />
        </div>
      </div>
    </div>
  );
}

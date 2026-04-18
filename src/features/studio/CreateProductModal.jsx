import { useState, useEffect } from "react";
import { X, Link, Upload, Image, Box } from "lucide-react";
import { S, CATEGORY_TREE } from "../../shared/constants.jsx";
import { DD, Inp, Tog, DisplayNameDropdown } from "../../shared/ui";
import {
  getGeneralInitialForm, slugToName, buildSkuFromName, categoryHasL2,
  getCategoryLookupKey, getEmptyMeasurementFields, getStudioPopupCanContinue, buildStudioProductDraft,
} from "../products/utils";

export function StudioCreateProductModal({
  open,
  headCategory,
  editProduct,
  sdkMappings,
  onAddSdkMapping,
  onClose,
  onContinue,
}) {
  const [importLink, setImportLink] = useState("");
  const [form, setForm] = useState(() => getGeneralInitialForm(editProduct));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setImportLink(editProduct?.productUrl || "");
    setForm(getGeneralInitialForm(editProduct));
    setError("");
  }, [open, editProduct, headCategory]);

  if (!open) return null;

  const categories = Object.keys(CATEGORY_TREE[headCategory] || {});
  const catData = form.category ? CATEGORY_TREE[headCategory]?.[form.category] : null;
  const subcategories = catData?.subcategories || [];
  const requiresSubcategory = Boolean(form.category && categoryHasL2(headCategory, form.category));
  const selectedCategoryKey = getCategoryLookupKey(headCategory, form.category, form.subcategory);
  const show2DToggle = catData?.sides2D !== null;
  const has3D = Boolean(catData && selectedCategoryKey && catData.modelling3D?.[selectedCategoryKey]);
  const productIdRequired = !editProduct?.variants?.length;
  const canContinue = getStudioPopupCanContinue({ ...form, productUrl: importLink }, headCategory, editProduct);

  const updateForm = (key, val) => {
    const next = { ...form, [key]: val };
    if (key === "category" || key === "subcategory") {
      Object.assign(next, getEmptyMeasurementFields());
    }
    if (key === "category") {
      next.subcategory = "";
      next.additionalFields = {};
      next.is2D = false;
      next.hasImages = false;
      next.hasModel = false;
      next.displayName = "";
    }
    if (key === "subcategory") {
      next.displayName = "";
      next.hasImages = false;
      next.hasModel = false;
    }
    setForm(next);
  };

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
      }));
      setError("");
    } catch {
      setError("Enter a valid product URL to import.");
    }
  };

  const handleContinue = () => {
    if (!canContinue) {
      setError("Category, product basics, and required media are needed before continuing.");
      return;
    }
    onContinue(buildStudioProductDraft({
      form: { ...form, productUrl: importLink },
      headCategory,
      baseProduct: editProduct,
    }));
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,20,0.48)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 920, maxWidth: "100%", maxHeight: "92vh", background: "#fff", borderRadius: 24, boxShadow: "0 30px 80px rgba(20,20,20,0.22)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #ededed", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.6 }}>{editProduct ? "Edit product" : "Create product"}</span>
            <span style={{ fontSize: 12, color: "#555", background: "#f2f2f2", padding: "4px 12px", borderRadius: 999 }}>{headCategory}</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#f5f5f5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} color="#666" />
          </button>
        </div>

        <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 12, padding: "12px 14px", fontSize: 13.5 }}>
              {error}
            </div>
          )}

          <div style={{ ...S.card, padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Link size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
                <input style={{ ...S.input, paddingLeft: 40 }} placeholder="Enter product URL" value={importLink} onChange={e => setImportLink(e.target.value)} />
              </div>
              <button className="glamar-btn glamar-btn-secondary" style={{ height: 42 }} onClick={handleImportProduct}>Import</button>
            </div>
          </div>

          <div style={{ ...S.card, padding: "22px 24px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: -0.2 }}>Basic details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <DD label="Category" value={form.category} onChange={v => updateForm("category", v)} options={categories} placeholder="Select category" required />
              <DD
                label="Sub category"
                value={requiresSubcategory ? form.subcategory : ""}
                onChange={v => updateForm("subcategory", v)}
                options={subcategories}
                placeholder={!form.category ? "Select category first" : (requiresSubcategory ? "Select sub category" : "No subcategory required")}
                disabled={!form.category || !requiresSubcategory}
                required={requiresSubcategory}
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Inp label="Product ID" value={form.skuId} onChange={v => updateForm("skuId", v)} placeholder="e.g. SKU-001" required={productIdRequired} />
              <Inp label="Product name" value={form.productName} onChange={v => updateForm("productName", v)} placeholder="Enter product name" required />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={S.label}>Product thumbnail</label>
              <div style={{ background: "#f5f5f5", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }} onClick={() => updateForm("hasThumbnail", true)}>
                <div style={{ width: 80, height: 80, borderRadius: 12, background: "#fafafa", outline: "1px solid #da0e64", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Upload size={16} color="#8F0941" />
                  <span style={{ fontSize: 12, color: "#8F0941", fontWeight: 500 }}>Upload</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}>Accepted image types: png, jpeg, webp</span>
                  <span style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}>Aspect ratio: 1:1</span>
                  {form.hasThumbnail && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>Thumbnail selected</span>}
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...S.card, padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Media</span>
              {show2DToggle && <Tog on={form.is2D} onToggle={() => updateForm("is2D", !form.is2D)} label="2D" />}
            </div>

            {!form.is2D && (
              <>
                <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2, marginBottom: 18 }}>
                  {["productImages", "model"].map(tab => {
                    const isActive = form.imageTab === tab;
                    return (
                      <div
                        key={tab}
                        onClick={() => updateForm("imageTab", tab)}
                        style={{ flex: 1, textAlign: "center", padding: "5px 8px", borderRadius: 6, fontSize: 14, fontWeight: isActive ? 500 : 400, cursor: "pointer", background: isActive ? "#fff" : "transparent", color: isActive ? "#da0e64" : "#5A5A5A", boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
                      >
                        {tab === "model" ? "Model" : "Product Images"}
                      </div>
                    );
                  })}
                </div>

                {form.imageTab === "productImages" && (
                  <div
                    style={{ border: "2px dashed #e0e0e0", borderRadius: 12, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#fafafa", cursor: "pointer" }}
                    onClick={() => updateForm("hasImages", true)}
                  >
                    <Image size={34} color="#ccc" />
                    <button className="glamar-btn glamar-btn-primary" style={{ height: 38 }} onClick={e => { e.stopPropagation(); updateForm("hasImages", true); }}>
                      <Upload size={14} /> Upload File
                    </button>
                    <p style={{ fontSize: 14, color: "#555", fontWeight: 500, margin: 0 }}>Drag and drop your files here</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Supported Format: PNG, JPG (5MB), Min. 3 images (MAX 20)</p>
                    {form.hasImages && <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, margin: 0 }}>Images uploaded</p>}
                  </div>
                )}

                {form.imageTab === "model" && (
                  <div
                    style={{ border: "2px dashed #e0e0e0", borderRadius: 12, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#fafafa", cursor: "pointer" }}
                    onClick={() => updateForm("hasModel", true)}
                  >
                    <Box size={34} color="#ccc" />
                    <button className="glamar-btn glamar-btn-primary" style={{ height: 38 }} onClick={e => { e.stopPropagation(); updateForm("hasModel", true); }}>
                      <Upload size={14} /> Upload File
                    </button>
                    <p style={{ fontSize: 14, color: "#555", fontWeight: 500, margin: 0 }}>Drag and drop your files here</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Supported Format: GLB, USDZ (100MB)</p>
                    {form.hasModel && <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, margin: 0 }}>Model uploaded</p>}
                  </div>
                )}
              </>
            )}

            {form.is2D && (
              <div
                style={{ border: "2px dashed #e0e0e0", borderRadius: 12, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#fafafa", cursor: "pointer" }}
                onClick={() => updateForm("hasImages", true)}
              >
                <Image size={34} color="#ccc" />
                <button className="glamar-btn glamar-btn-primary" style={{ height: 38 }} onClick={e => { e.stopPropagation(); updateForm("hasImages", true); }}>
                  <Upload size={14} /> Upload File
                </button>
                <p style={{ fontSize: 14, color: "#555", fontWeight: 500, margin: 0 }}>Upload the base product images</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Use clean images from the supported sides for best results</p>
                {form.hasImages && <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, margin: 0 }}>Images uploaded</p>}
              </div>
            )}

            {has3D && !form.hasImages && !form.hasModel && (
              <div style={{ marginTop: 14, fontSize: 12.5, color: "#888" }}>
                Add product images or a model before entering Studio.
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #ededed", display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button className="glamar-btn glamar-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="glamar-btn glamar-btn-primary" disabled={!canContinue} onClick={handleContinue}>
            {editProduct ? "Save changes" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

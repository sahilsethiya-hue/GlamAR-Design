import { useState, useEffect } from "react";
import { Layers, Plus, Tag, Box, ChevronUp, ChevronDown, Upload, X } from "lucide-react";
import { S, CATEGORY_TREE, DIMENSION_UNITS } from "../../shared/constants.jsx";
import { DD, Inp, Tog } from "../../shared/ui";
import {
  ensureStudioVariantOptions,
  mapVariantOptionsForEditor,
  mapGeneralVariantsForEditor,
  getCategoryData,
  getCategoryLookupKey,
  getGeneralInitialForm,
  hydrateMeasurementFields,
  generateStudioVariants,
  buildMeasurement,
  getStudioMeasurementSchema,
  getMeasurementSchema,
  normalizeStudioValuesForType,
  getVariantValueLabel,
  getVariantAdditionalPriceFromMappings,
  getVariantSellingPrice,
  getTodayDate,
} from "../products/utils";
import { StudioVariantOptionModal, StudioVariantCombinationsPanel } from "./VariantCombinationsPanel";
import { StudioCreateProductModal } from "./CreateProductModal";
import { StudioPreviewPanel } from "./PreviewPanel";
import { GeneralSettingsPanel } from "./GeneralSettingsPanel";
import { ProductFlowHeader } from "../../layout/Topbar";

function StudioQuestionEditor({ question, onChange, onDelete }) {
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState("#da0e64");
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    setNewLabel("");
    setNewColor("#da0e64");
    setNewImageUrl("");
  }, [question?.name]);

  if (!question) {
    return (
      <div style={{ ...S.card, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#141414", marginBottom: 6 }}>Select a question</div>
        <div style={{ fontSize: 13, color: "#8b8b8b", lineHeight: 1.5 }}>Choose a configurator question from the left rail or add a new one to start building the Studio flow.</div>
      </div>
    );
  }

  const patchQuestion = (patch) => onChange({ ...question, ...patch });
  const patchStudioConfig = (patch) => patchQuestion({ studioConfig: { ...(question.studioConfig || {}), ...patch } });

  const normalizeForType = (nextType) => {
    patchQuestion({
      valueType: nextType,
      values: normalizeStudioValuesForType(question.values || [], nextType),
      studioConfig: {
        ...(question.studioConfig || {}),
        displayType: nextType === "image" ? "thumbnail" : nextType === "color" ? "swatch" : "text",
      },
    });
  };

  const updateValue = (index, patch) => {
    patchQuestion({
      values: (question.values || []).map((value, valueIndex) => valueIndex === index ? { ...value, ...patch } : value),
    });
  };

  const removeValue = (index) => {
    patchQuestion({ values: (question.values || []).filter((_, valueIndex) => valueIndex !== index) });
  };

  const addValue = () => {
    const label = newLabel.trim();
    if (!label) return;
    let nextValue = { label };
    if (question.valueType === "color") nextValue = { label, color: newColor };
    if (question.valueType === "image") {
      if (!newImageUrl) return;
      nextValue = { label, image: newImageUrl };
    }
    patchQuestion({ values: [...(question.values || []), nextValue] });
    setNewLabel("");
    setNewColor("#da0e64");
    setNewImageUrl("");
  };

  const displayTypeOptions = question.valueType === "image"
    ? ["thumbnail", "text"]
    : question.valueType === "color"
      ? ["swatch", "text"]
      : ["text"];

  return (
    <div style={{ ...S.card, padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#141414" }}>Question</div>
          <div style={{ fontSize: 12.5, color: "#8b8b8b", marginTop: 4 }}>Edit the question, answer type, and how it should appear in the configurator.</div>
        </div>
        <button onClick={onDelete} style={{ background: "#fff5f5", color: "#dc2626", border: "none", borderRadius: 999, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          Remove
        </button>
      </div>

      <Inp label="Question title" value={question.name} onChange={value => patchQuestion({ name: value })} placeholder="e.g. Head arch" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <DD label="Answer input type" value={question.valueType || "text"} onChange={normalizeForType} options={["color", "image", "text"]} placeholder="Select answer type" />
        <DD label="Display type" value={question.studioConfig?.displayType || "text"} onChange={value => patchStudioConfig({ displayType: value })} options={displayTypeOptions} placeholder="Select display type" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: question.valueType === "image" ? "1fr 1fr 1fr" : "1fr 1fr", gap: 16 }}>
        <div style={{ border: "1px solid #ececec", borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#777", textTransform: "uppercase", letterSpacing: 0.4 }}>Variant mapping</div>
          <div style={{ fontSize: 13.5, color: "#141414", marginTop: 8, fontWeight: 600 }}>
            {question.valueType === "text"
              ? "Text questions stay configurator-only"
              : question.optionRole === "sku"
                ? "Included in variant mapping"
                : "Use Map Variant to include this option"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #ececec", borderRadius: 12, padding: "10px 12px" }}>
          <span style={{ fontSize: 13.5, color: "#444" }}>Show name label</span>
          <Tog on={question.studioConfig?.showNameLabel ?? true} onToggle={() => patchStudioConfig({ showNameLabel: !(question.studioConfig?.showNameLabel ?? true) })} />
        </div>
        {question.valueType === "image" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #ececec", borderRadius: 12, padding: "10px 12px" }}>
            <span style={{ fontSize: 13.5, color: "#444" }}>Large thumbnail</span>
            <Tog on={question.studioConfig?.largeThumbnail ?? false} onToggle={() => patchStudioConfig({ largeThumbnail: !(question.studioConfig?.largeThumbnail ?? false) })} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Answers</div>
        {(question.values || []).length === 0 && (
          <div style={{ fontSize: 13, color: "#999", padding: "4px 0" }}>No answers yet. Add the first answer below.</div>
        )}
        {(question.values || []).map((value, index) => (
          <div key={`${question.name}-${index}`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {question.valueType === "color" && (
              <label style={{ width: 36, height: 36, borderRadius: 10, background: value.color || "#da0e64", border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <input type="color" value={value.color || "#da0e64"} onChange={e => updateValue(index, { color: e.target.value })} style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", opacity: 0, cursor: "pointer" }} />
              </label>
            )}
            {question.valueType === "image" && (
              <label style={{ width: 36, height: 36, borderRadius: 10, border: "1px dashed #d0d0d0", background: value.image ? "transparent" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}>
                {value.image ? <img src={value.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={12} color="#bbb" />}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) updateValue(index, { image: URL.createObjectURL(file) });
                }} />
              </label>
            )}
            <input
              style={S.input}
              value={getVariantValueLabel(value)}
              onChange={e => updateValue(index, { label: e.target.value })}
              placeholder="Answer label"
              onFocus={e => e.target.style.borderColor = "#f43f5e"}
              onBlur={e => e.target.style.borderColor = "#d9d9d9"}
            />
            <button onClick={() => removeValue(index)} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: "#f5f5f5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={14} color="#888" />
            </button>
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {question.valueType === "color" && (
            <label style={{ width: 36, height: 36, borderRadius: 10, background: newColor, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", opacity: 0, cursor: "pointer" }} />
            </label>
          )}
          {question.valueType === "image" && (
            <label style={{ width: 36, height: 36, borderRadius: 10, border: "1px dashed #d0d0d0", background: newImageUrl ? "transparent" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}>
              {newImageUrl ? <img src={newImageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={12} color="#bbb" />}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const file = e.target.files?.[0];
                if (file) setNewImageUrl(URL.createObjectURL(file));
              }} />
            </label>
          )}
          <input
            style={S.input}
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addValue(); }}
            placeholder="Add answer"
            onFocus={e => e.target.style.borderColor = "#f43f5e"}
            onBlur={e => e.target.style.borderColor = "#d9d9d9"}
          />
          <button className="glamar-btn glamar-btn-primary" style={{ height: 42 }} onClick={addValue}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function StudioProductSetupAccordion({ headCategory, draftProduct, setupForm, setSetupForm }) {
  const [expanded, setExpanded] = useState(true);
  const catData = draftProduct.category ? CATEGORY_TREE[headCategory]?.[draftProduct.category] : null;
  const dynamicFields = (catData?.additionalFields || []).filter(field => field.name !== "barcode");
  const measurementSchema = getMeasurementSchema(headCategory, draftProduct.category, draftProduct.subcategory);

  const updateSetup = (patch) => setSetupForm(prev => ({ ...prev, ...patch }));
  const updateAdditionalField = (name, value) => setSetupForm(prev => ({
    ...prev,
    additionalFields: { ...(prev.additionalFields || {}), [name]: value },
  }));

  return (
    <div style={{ ...S.card, overflow: "hidden" }}>
      <button onClick={() => setExpanded(value => !value)} style={{ width: "100%", background: "#fff", border: "none", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#141414", textAlign: "left" }}>Product setup</div>
          <div style={{ fontSize: 12.5, color: "#8b8b8b", marginTop: 4, textAlign: "left" }}>General product fields that support the configurator and saved output.</div>
        </div>
        {expanded ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
      </button>
      {expanded && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: 18, display: "flex", flexDirection: "column", gap: 18 }}>
          {dynamicFields.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {dynamicFields.map(field => field.type === "dropdown"
                ? (
                  <DD
                    key={field.name}
                    label={field.label}
                    value={setupForm.additionalFields?.[field.name] || ""}
                    onChange={value => updateAdditionalField(field.name, value)}
                    options={field.options || []}
                    placeholder={`Select ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <Inp
                    key={field.name}
                    label={field.label}
                    value={setupForm.additionalFields?.[field.name] || ""}
                    onChange={value => updateAdditionalField(field.name, value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )
              )}
            </div>
          )}

          {measurementSchema === "dimension" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 150px", gap: 16 }}>
              <Inp label="Length" value={setupForm.dimensionLength || ""} onChange={value => updateSetup({ dimensionLength: value })} placeholder="0" />
              <Inp label="Width" value={setupForm.dimensionBreadth || ""} onChange={value => updateSetup({ dimensionBreadth: value })} placeholder="0" />
              <Inp label="Height" value={setupForm.dimensionHeight || ""} onChange={value => updateSetup({ dimensionHeight: value })} placeholder="0" />
              <DD label="Unit" value={setupForm.dimensionUnit || "mm"} onChange={value => updateSetup({ dimensionUnit: value })} options={DIMENSION_UNITS} placeholder="Unit" />
            </div>
          )}

          {measurementSchema === "ring" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Inp label="Inner diameter (mm)" value={setupForm.ringInnerDiameter || ""} onChange={value => updateSetup({ ringInnerDiameter: value })} placeholder="e.g. 18" />
              <DD label="Diamond ring" value={setupForm.isDiamondRing || "no"} onChange={value => updateSetup({ isDiamondRing: value })} options={["yes", "no"]} placeholder="Select" />
              {setupForm.isDiamondRing === "yes" && (
                <>
                  <Inp label="Diamond shape" value={setupForm.diamondShape || ""} onChange={value => updateSetup({ diamondShape: value })} placeholder="e.g. Round" />
                  <Inp label="Carat size (mm)" value={setupForm.diamondCaratSize || ""} onChange={value => updateSetup({ diamondCaratSize: value })} placeholder="e.g. 6.5" />
                </>
              )}
            </div>
          )}

          {measurementSchema === "watch" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Inp label="Case diameter (mm)" value={setupForm.watchCaseDiameter || ""} onChange={value => updateSetup({ watchCaseDiameter: value })} placeholder="e.g. 44" />
              <Inp label="Lug-to-lug (mm)" value={setupForm.watchLugToLug || ""} onChange={value => updateSetup({ watchLugToLug: value })} placeholder="e.g. 48" />
              <Inp label="Case thickness (mm)" value={setupForm.watchCaseThickness || ""} onChange={value => updateSetup({ watchCaseThickness: value })} placeholder="e.g. 12" />
              <Inp label="Strap type" value={setupForm.watchStrapType || ""} onChange={value => updateSetup({ watchStrapType: value })} placeholder="e.g. Leather" />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Inp label="Default cost price" value={setupForm.costPrice || ""} onChange={value => updateSetup({ costPrice: value })} placeholder="Rs. 0.00" />
            <Inp label="Barcode" value={setupForm.additionalFields?.barcode || ""} onChange={value => updateAdditionalField("barcode", value)} placeholder="Enter barcode" />
          </div>

          <div>
            <Inp label="Product URL" value={setupForm.productUrl || ""} onChange={value => updateSetup({ productUrl: value })} placeholder="Enter product URL" />
          </div>
        </div>
      )}
    </div>
  );
}

export function StudioWorkspace({
  product,
  headCategory,
  sdkMappings,
  onAddSdkMapping,
  onBack,
  onSaveProduct,
  startDirty = false,
}) {
  const [draftProduct, setDraftProduct] = useState(product);
  const [setupForm, setSetupForm] = useState(() => {
    const initial = getGeneralInitialForm(product);
    return {
      additionalFields: initial.additionalFields || {},
      productUrl: product?.productUrl || "",
      costPrice: initial.costPrice || "",
      sellingPrice: initial.sellingPrice || "",
      ...hydrateMeasurementFields(product?.measurements, product?.dimension || ""),
    };
  });
  const [selectedPanel, setSelectedPanel] = useState({ type: "question", index: 0 });
  const [rightTab, setRightTab] = useState("configurator");
  const [previewTab, setPreviewTab] = useState("3d");
  const [isDirty, setIsDirty] = useState(startDirty);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);

  useEffect(() => {
    setDraftProduct({
      ...product,
      variantOptions: ensureStudioVariantOptions(product?.variantOptions?.length ? product.variantOptions : mapVariantOptionsForEditor(product)),
      variants: product?.variants?.length ? mapGeneralVariantsForEditor(product) : [],
      arSettings: product?.arSettings || {},
    });
    const initial = getGeneralInitialForm(product);
    setSetupForm({
      additionalFields: initial.additionalFields || {},
      productUrl: product?.productUrl || "",
      costPrice: initial.costPrice || "",
      sellingPrice: initial.sellingPrice || "",
      ...hydrateMeasurementFields(product?.measurements, product?.dimension || ""),
    });
    setSelectedPanel({ type: "question", index: 0 });
    setRightTab("configurator");
    setPreviewTab("3d");
    setIsDirty(startDirty);
    setShowAddOptionModal(false);
  }, [product, startDirty]);

  useEffect(() => {
    if (selectedPanel.type === "question" && selectedPanel.index >= (draftProduct?.variantOptions?.length || 0)) {
      setSelectedPanel((draftProduct?.variantOptions?.length || 0) > 0 ? { type: "question", index: 0 } : { type: "variants" });
    }
  }, [selectedPanel, draftProduct?.variantOptions?.length]);

  const catData = getCategoryData(headCategory, draftProduct?.category);
  const lookupKey = getCategoryLookupKey(headCategory, draftProduct?.category, draftProduct?.subcategory);
  const has3D = Boolean(catData?.modelling3D?.[lookupKey]);
  const arSupported = Boolean(catData?.ar?.[lookupKey]);
  const modelReady = Boolean(draftProduct?.media?.hasModel);
  const measurementSchema = getStudioMeasurementSchema(draftProduct || {});
  const selectedQuestion = selectedPanel.type === "question" ? draftProduct?.variantOptions?.[selectedPanel.index] : null;

  const markDirty = () => setIsDirty(true);

  const updateQuestionAt = (index, nextQuestion) => {
    setDraftProduct(prev => ({ ...prev, variantOptions: prev.variantOptions.map((question, questionIndex) => questionIndex === index ? nextQuestion : question) }));
    markDirty();
  };

  const addQuestion = () => {
    setShowAddOptionModal(true);
  };

  const handleAddQuestion = (nextQuestion) => {
    const normalizedQuestion = ensureStudioVariantOptions([nextQuestion])[0];
    const nextIndex = draftProduct.variantOptions.length;
    setDraftProduct(prev => ({ ...prev, variantOptions: [...(prev.variantOptions || []), normalizedQuestion] }));
    setSelectedPanel({ type: "question", index: nextIndex });
    setRightTab("configurator");
    setShowAddOptionModal(false);
    markDirty();
  };

  const removeQuestion = (index) => {
    const removedQuestion = draftProduct.variantOptions[index];
    const nextOptions = draftProduct.variantOptions.filter((_, questionIndex) => questionIndex !== index);
    const nextVariants = removedQuestion?.optionRole === "sku"
      ? generateStudioVariants(nextOptions, draftProduct.variants, measurementSchema)
      : draftProduct.variants;
    setDraftProduct(prev => {
      const nextPricingOptionNames = (prev.pricingOptionNames || []).filter((name) => name !== removedQuestion?.name);
      const nextPricingAdjustments = { ...(prev.pricingAdjustments || {}) };
      if (removedQuestion?.name) delete nextPricingAdjustments[removedQuestion.name];
      return {
        ...prev,
        variantOptions: nextOptions,
        variants: nextVariants,
        pricingOptionNames: nextPricingOptionNames,
        pricingAdjustments: nextPricingAdjustments,
      };
    });
    setSelectedPanel(nextOptions.length > 0 ? { type: "question", index: Math.max(0, index - 1) } : { type: "variants" });
    markDirty();
  };

  const handlePopupSave = (nextProduct) => {
    setDraftProduct(prev => ({
      ...prev,
      ...nextProduct,
      variantOptions: prev.variantOptions,
      variants: prev.variants,
      pricingAdjustments: prev.pricingAdjustments || {},
      pricingOptionNames: prev.pricingOptionNames || [],
      arSettings: prev.arSettings,
    }));
    setShowEditModal(false);
    markDirty();
  };

  const handleArSettingsChange = (nextArSettings) => {
    setDraftProduct(prev => {
      const prevSerialized = JSON.stringify(prev.arSettings || {});
      const nextSerialized = JSON.stringify(nextArSettings || {});
      if (prevSerialized === nextSerialized) return prev;
      setIsDirty(true);
      return { ...prev, arSettings: nextArSettings };
    });
  };

  const handleSave = () => {
    const formMeasurement = buildMeasurement(measurementSchema, setupForm);
    const nextVariants = (draftProduct.variants || []).map((variant, index) => {
      const variantMeasurement = buildMeasurement(measurementSchema, variant);
      const dimension = variantMeasurement.dimension || formMeasurement.dimension || "";
      const measurements = variantMeasurement.dimension ? variantMeasurement.measurements : formMeasurement.measurements;
      const additionalPrice = (draftProduct.pricingOptionNames || []).length
        ? getVariantAdditionalPriceFromMappings(variant, draftProduct.pricingAdjustments || {})
        : (variant.additionalPrice || "");
      const sellingPrice = getVariantSellingPrice(setupForm.sellingPrice || "", additionalPrice, variant.sellingPrice || variant.price || "");
      return {
        ...variant,
        id: variant.id || `var-${Date.now()}-${index}`,
        name: variant.name || (variant.attributes || []).map(attr => attr.val).join(" / ") || `Variant ${index + 1}`,
        additionalPrice,
        price: sellingPrice,
        sellingPrice,
        costPrice: variant.costPrice || "",
        dimension,
        measurements,
      };
    });

    const payload = {
      ...draftProduct,
      name: draftProduct.name?.trim() || "Untitled product",
      skuId: draftProduct.skuId?.trim() || "",
      additionalFields: setupForm.additionalFields || {},
      productUrl: (setupForm.productUrl || "").trim(),
      costPrice: setupForm.costPrice || "",
      sellingPrice: setupForm.sellingPrice || "",
      dimension: formMeasurement.dimension,
      measurements: formMeasurement.measurements,
      variantOptions: ensureStudioVariantOptions(draftProduct.variantOptions || []),
      variants: nextVariants,
      pricingAdjustments: draftProduct.pricingAdjustments || {},
      pricingOptionNames: draftProduct.pricingOptionNames || [],
      arSettings: draftProduct.arSettings || {},
      media: draftProduct.media || {},
      status: draftProduct.status || "inactive",
      date: draftProduct.date || getTodayDate(),
    };

    onSaveProduct(payload);
    setDraftProduct({
      ...payload,
      variants: payload.variants.length ? mapGeneralVariantsForEditor(payload) : [],
      variantOptions: ensureStudioVariantOptions(payload.variantOptions),
    });
    setIsDirty(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StudioVariantOptionModal
        open={showAddOptionModal}
        onClose={() => setShowAddOptionModal(false)}
        onSave={handleAddQuestion}
      />

      <StudioCreateProductModal
        open={showEditModal}
        headCategory={headCategory}
        editProduct={draftProduct}
        sdkMappings={sdkMappings}
        onAddSdkMapping={onAddSdkMapping}
        onClose={() => setShowEditModal(false)}
        onContinue={handlePopupSave}
      />

      <ProductFlowHeader
        title={draftProduct?.name || "Untitled product"}
        tag={headCategory}
        onBack={onBack}
        showSecondary={false}
        primaryLabel="Save"
        onPrimary={handleSave}
        primaryDisabled={!isDirty}
      />

      <div style={{ flex: 1, overflow: "hidden", padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "304px minmax(0, 1fr) 360px", gap: 18, height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
            <div style={{ ...S.card, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Product details</span>
                <button onClick={() => setShowEditModal(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 600 }}>Edit</button>
              </div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12.5, color: "#777", marginBottom: 4 }}>SKU ID</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>{draftProduct.skuId || "—"}</div>
                </div>
                <div style={{ height: 1, background: "#f0f0f0" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12.5, color: "#777", marginBottom: 4 }}>Category</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>{draftProduct.category || "—"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, color: "#777", marginBottom: 4 }}>Subcategory</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>{draftProduct.subcategory || "—"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...S.card, flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Layers size={16} color="#555" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Configurator</span>
                </div>
                <button onClick={addQuestion} style={{ width: 30, height: 30, borderRadius: 10, border: "1px solid #e6e6e6", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Plus size={16} color="#141414" />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {draftProduct.variantOptions.map((question, index) => {
                  const active = selectedPanel.type === "question" && selectedPanel.index === index;
                  return (
                    <button
                      key={`${question.name}-${index}`}
                      onClick={() => { setSelectedPanel({ type: "question", index }); setRightTab("configurator"); }}
                      style={{ width: "100%", border: `1px solid ${active ? "#8f0941" : "#ededed"}`, background: active ? "#fff5fb" : "#fff", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#141414", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{question.name || `Question ${index + 1}`}</div>
                        <div style={{ fontSize: 12, color: "#8b8b8b", marginTop: 4 }}>{question.optionRole === "sku" ? "SKU question" : "Configurator question"}</div>
                      </div>
                      <span style={{ fontSize: 12, color: "#8b8b8b", flexShrink: 0 }}>{question.values?.length || 0}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => { setSelectedPanel({ type: "variants" }); setRightTab("configurator"); }}
                  style={{ width: "100%", border: `1px solid ${selectedPanel.type === "variants" ? "#8f0941" : "#ededed"}`, background: selectedPanel.type === "variants" ? "#fff5fb" : "#fff", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#141414" }}>Mappings</div>
                    <div style={{ fontSize: 12, color: "#8b8b8b", marginTop: 4 }}>{draftProduct.variants?.length || 0} variant rows</div>
                  </div>
                  <Tag size={16} color="#555" />
                </button>
              </div>
            </div>
          </div>

          <StudioPreviewPanel
            draftProduct={draftProduct}
            previewTab={previewTab}
            setPreviewTab={setPreviewTab}
            selectedQuestionIndex={selectedPanel.type === "question" ? selectedPanel.index : -1}
          />

          <div style={{ ...S.card, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", padding: 8, gap: 8, borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
              {[
                { id: "configurator", label: "Configurator" },
                { id: "ar", label: "AR settings" },
              ].map(tab => {
                const active = rightTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setRightTab(tab.id)}
                    style={{ flex: 1, height: 40, borderRadius: 12, border: "none", background: active ? "#fff" : "transparent", color: active ? "#141414" : "#666", fontSize: 14, fontWeight: active ? 600 : 500, cursor: "pointer", boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              {rightTab === "configurator" && (
                <>
                  <StudioProductSetupAccordion headCategory={headCategory} draftProduct={draftProduct} setupForm={setupForm} setSetupForm={(next) => { setSetupForm(next); setIsDirty(true); }} />
                  {selectedPanel.type === "variants" ? (
                    <StudioVariantCombinationsPanel
                      variantOptions={draftProduct.variantOptions || []}
                      setVariantOptions={(nextOptions) => setDraftProduct(prev => ({ ...prev, variantOptions: nextOptions }))}
                      variants={draftProduct.variants || []}
                      setVariants={(nextVariants) => setDraftProduct(prev => ({ ...prev, variants: nextVariants }))}
                      measurementSchema={measurementSchema}
                      has3D={has3D}
                      pricingOptionNames={draftProduct.pricingOptionNames || []}
                      setPricingOptionNames={(nextNames) => setDraftProduct(prev => ({ ...prev, pricingOptionNames: typeof nextNames === "function" ? nextNames(prev.pricingOptionNames || []) : nextNames }))}
                      pricingAdjustments={draftProduct.pricingAdjustments || {}}
                      setPricingAdjustments={(nextAdjustments) => setDraftProduct(prev => ({ ...prev, pricingAdjustments: typeof nextAdjustments === "function" ? nextAdjustments(prev.pricingAdjustments || {}) : nextAdjustments }))}
                      basePrice={setupForm.sellingPrice || ""}
                      setBasePrice={(nextValue) => setSetupForm(prev => ({ ...prev, sellingPrice: nextValue }))}
                      onDirtyChange={markDirty}
                    />
                  ) : (
                    <StudioQuestionEditor
                      question={selectedQuestion}
                      onChange={(nextQuestion) => updateQuestionAt(selectedPanel.index, nextQuestion)}
                      onDelete={() => removeQuestion(selectedPanel.index)}
                    />
                  )}
                </>
              )}

              {rightTab === "ar" && (
                <div style={{ ...S.card, minHeight: 0, flex: 1, overflow: "hidden", position: "relative" }}>
                  <GeneralSettingsPanel mode="ar" initialArSettings={draftProduct.arSettings} onArSettingsChange={handleArSettingsChange} />
                  {(!arSupported || !modelReady) && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 24 }}>
                      <Box size={30} color="#ccc" strokeWidth={1.1} />
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#888", textAlign: "center" }}>
                        {!arSupported ? "AR settings unavailable" : "AR settings need a ready model"}
                      </div>
                      <div style={{ fontSize: 12.5, color: "#b1b1b1", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
                        {!arSupported
                          ? "This category doesn't support AR right now, but the tab stays here so the Studio flow remains consistent."
                          : "Upload or finish preparing the 3D model to unlock AR controls for this product."}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

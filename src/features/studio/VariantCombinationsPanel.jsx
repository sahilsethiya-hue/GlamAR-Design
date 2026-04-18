import { useState, useEffect } from "react";
import { X, Plus, ChevronDown, Info, Bell, Upload, GripVertical } from "lucide-react";
import { S, DIMENSION_UNITS } from "../../shared/constants.jsx";
import {
  normalizeStudioValuesForType, getVariantValueLabel, countStudioVariantCombinations,
  countStudioOptionAnswers, generateStudioVariants,
} from "../products/utils";

export function StudioVariantOptionModal({ open, onClose, onSave }) {
  const createEmptyValue = (valueType) => (
    valueType === "color"
      ? { label: "", color: "#b56d5c" }
      : valueType === "image"
        ? { label: "", image: "" }
        : { label: "" }
  );
  const [draft, setDraft] = useState({ name: "", valueType: "color", values: [createEmptyValue("color")] });

  useEffect(() => {
    if (!open) return;
    setDraft({ name: "", valueType: "color", values: [createEmptyValue("color")] });
  }, [open]);

  if (!open) return null;

  const setValueType = (nextType) => {
    setDraft(prev => ({
      ...prev,
      valueType: nextType,
      values: normalizeStudioValuesForType(prev.values.length ? prev.values : [createEmptyValue(nextType)], nextType),
    }));
  };

  const updateValue = (index, patch) => {
    setDraft(prev => ({
      ...prev,
      values: prev.values.map((value, valueIndex) => valueIndex === index ? { ...value, ...patch } : value),
    }));
  };

  const addValueRow = () => {
    setDraft(prev => ({ ...prev, values: [...prev.values, createEmptyValue(prev.valueType)] }));
  };

  const removeValue = (index) => {
    setDraft(prev => ({ ...prev, values: prev.values.filter((_, valueIndex) => valueIndex !== index) }));
  };

  const normalizedValues = (draft.values || [])
    .filter((value) => getVariantValueLabel(value).trim())
    .map((value) => (
      draft.valueType === "color"
        ? { label: getVariantValueLabel(value).trim(), color: value.color || "#b56d5c" }
        : draft.valueType === "image"
          ? { label: getVariantValueLabel(value).trim(), image: value.image || "" }
          : { label: getVariantValueLabel(value).trim() }
    ))
    .filter((value) => draft.valueType !== "image" || !!value.image);

  const canSave = !!draft.name.trim() && normalizedValues.length > 0;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,20,0.42)", zIndex: 1320, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 980, maxWidth: "100%", background: "#fff", borderRadius: 26, boxShadow: "0 30px 80px rgba(20,20,20,0.24)", overflow: "hidden" }}>
        <div style={{ padding: "22px 40px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1e1e1e" }}>Add Variant</div>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: "#f3f3f3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={16} color="#666" />
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            {[{ id: "color", label: "Color" }, { id: "image", label: "Image" }, { id: "text", label: "Text" }].map((type) => {
              const active = draft.valueType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setValueType(type.id)}
                  style={{ height: 34, padding: "0 14px", borderRadius: 999, border: `1px solid ${active ? "#da0e64" : "#e2e2e2"}`, background: active ? "#fff0f6" : "#fff", color: active ? "#8f0941" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          <div style={{ background: "#f7f7f7", borderRadius: 24, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 14 }}>Option Name</label>
              <input
                style={{ ...S.input, height: 62, fontSize: 22, borderRadius: 16 }}
                value={draft.name}
                onChange={(e) => setDraft(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Option name"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 18 }}>Option Value</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(draft.values || []).map((value, index) => (
                  <div key={`draft-value-${index}`} style={{ display: "grid", gridTemplateColumns: draft.valueType === "text" ? "24px minmax(0, 1fr) 32px" : "24px 76px minmax(0, 1fr) 32px", gap: 14, alignItems: "center" }}>
                    <GripVertical size={18} color="#666" />
                    {draft.valueType === "color" && (
                      <label style={{ width: 60, height: 60, borderRadius: 16, background: value.color || "#b56d5c", cursor: "pointer", overflow: "hidden", position: "relative" }}>
                        <input type="color" value={value.color || "#b56d5c"} onChange={(e) => updateValue(index, { color: e.target.value })} style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", opacity: 0, cursor: "pointer" }} />
                      </label>
                    )}
                    {draft.valueType === "image" && (
                      <label style={{ width: 60, height: 60, borderRadius: 16, border: "1px dashed #d4d4d4", background: value.image ? "transparent" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}>
                        {value.image ? <img src={value.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={16} color="#bbb" />}
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateValue(index, { image: URL.createObjectURL(file) });
                        }} />
                      </label>
                    )}
                    <input
                      style={{ ...S.input, height: 60, borderRadius: 16, fontSize: 22, background: "#fff" }}
                      value={getVariantValueLabel(value)}
                      onChange={(e) => updateValue(index, { label: e.target.value })}
                      placeholder="Value"
                    />
                    {index === draft.values.length - 1 ? (
                      <button onClick={addValueRow} style={{ width: 32, height: 32, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Plus size={20} color="#555" />
                      </button>
                    ) : (
                      <button onClick={() => removeValue(index)} style={{ width: 32, height: 32, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={20} color="#555" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {(draft.values || []).filter((value) => getVariantValueLabel(value).trim()).length > 0 && (
              <div style={{ background: "#fff", borderRadius: 22, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", minWidth: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#1f1f1f" }}>{draft.name || "Option preview"}</span>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(draft.values || []).filter((value) => getVariantValueLabel(value).trim()).map((value, index) => (
                      <div key={`preview-${index}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 12, border: "1px solid #dedede", background: "#fff" }}>
                        {draft.valueType === "color" && <div style={{ width: 14, height: 14, borderRadius: "50%", background: value.color || "#b56d5c" }} />}
                        {draft.valueType === "image" && value.image && <img src={value.image} alt="" style={{ width: 18, height: 18, borderRadius: 6, objectFit: "cover" }} />}
                        <span style={{ fontSize: 14, color: "#333" }}>{getVariantValueLabel(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ChevronDown size={20} color="#666" />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="glamar-btn glamar-btn-secondary" onClick={onClose}>Cancel</button>
              <button
                className="glamar-btn glamar-btn-primary"
                disabled={!canSave}
                onClick={() => onSave({
                  name: draft.name.trim(),
                  valueType: draft.valueType,
                  optionRole: "configurator",
                  values: normalizedValues,
                })}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudioVariantCombinationsModal({ open, options, selectedNames, onClose, onCreate }) {
  const eligibleOptions = options.filter((option) => option.valueType !== "text");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (!open) return;
    const initialRows = selectedNames.filter((name) => eligibleOptions.some((option) => option.name === name));
    setSelectedRows(initialRows.length ? initialRows : (eligibleOptions[0] ? [eligibleOptions[0].name] : []));
  }, [open, selectedNames, options]);

  if (!open) return null;

  const selectedOptions = selectedRows.map((name) => eligibleOptions.find((option) => option.name === name)).filter(Boolean);
  const totalVariants = countStudioVariantCombinations(selectedOptions);
  const canAddAnother = selectedRows.length < eligibleOptions.length;

  const getAvailableOptions = (rowIndex) => eligibleOptions.filter((option) => (
    option.name === selectedRows[rowIndex]
      || !selectedRows.some((name, index) => index !== rowIndex && name === option.name)
  ));

  const updateRow = (rowIndex, nextName) => {
    setSelectedRows((prev) => prev.map((name, index) => index === rowIndex ? nextName : name));
  };

  const removeRow = (rowIndex) => {
    setSelectedRows((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const canCreate = selectedOptions.length > 0 && totalVariants > 0;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,20,0.42)", zIndex: 1310, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 900, maxWidth: "100%", background: "#fff", borderRadius: 22, boxShadow: "0 24px 70px rgba(20,20,20,0.2)", overflow: "hidden" }}>
        <div style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #dfe6ff", boxShadow: "0 6px 18px rgba(59,130,246,0.08)", borderRadius: 18, padding: "16px 18px", color: "#667085" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Info size={18} color="#315efb" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 500 }}>Text field questions cannot be used to create variants</span>
          </div>

          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
            {eligibleOptions.length === 0 ? (
              <div style={{ ...S.card, padding: 20, fontSize: 14, color: "#888", lineHeight: 1.6 }}>
                Add a color or image option first. Once an option has answers, you can combine it here to create variant mappings.
              </div>
            ) : (
              <>
                {selectedRows.map((name, rowIndex) => {
                  const selectedOption = eligibleOptions.find((option) => option.name === name);
                  const answerCount = selectedOption ? countStudioOptionAnswers(selectedOption) : 0;
                  return (
                    <div key={`variant-map-row-${rowIndex}`} style={{ display: "grid", gridTemplateColumns: "minmax(0, 520px) auto", gap: 18, alignItems: "center" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 64px", gap: 12, alignItems: "center" }}>
                        <div style={{ position: "relative" }}>
                          <select style={{ ...S.select, height: 74, borderRadius: 18, fontSize: 22, fontWeight: 600 }} value={name} onChange={(e) => updateRow(rowIndex, e.target.value)}>
                            {getAvailableOptions(rowIndex).map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}
                          </select>
                          <ChevronDown size={24} color="#667085" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                        </div>
                        <button onClick={() => removeRow(rowIndex)} style={{ width: 64, height: 64, borderRadius: 16, border: "1px solid #ececec", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <X size={24} color="#4b5563" />
                        </button>
                      </div>
                      <div style={{ justifySelf: "end", textAlign: "right", minWidth: 150 }}>
                        {selectedOption && (
                          <div style={{ fontSize: 16, color: "#344054" }}>
                            {rowIndex > 0 && <span style={{ color: "#101828", marginRight: 8 }}>x</span>}
                            {answerCount} answer{answerCount === 1 ? "" : "s"}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => canAddAnother && setSelectedRows((prev) => [...prev, eligibleOptions.find((option) => !prev.includes(option.name))?.name || ""])}
                  disabled={!canAddAnother}
                  style={{ width: "fit-content", height: 54, padding: "0 20px", borderRadius: 14, border: "1px solid #e3e3e3", background: canAddAnother ? "#fff" : "#f7f7f7", color: canAddAnother ? "#111827" : "#b3b3b3", cursor: canAddAnother ? "pointer" : "not-allowed", fontSize: 18, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                >
                  <Plus size={22} /> Combine another question
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #efefef", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="glamar-btn glamar-btn-secondary" onClick={onClose}>Cancel</button>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {canCreate && <div style={{ fontSize: 17, color: "#344054" }}>{totalVariants} variant{totalVariants === 1 ? "" : "s"}</div>}
            <button className="glamar-btn glamar-btn-primary" disabled={!canCreate} onClick={() => onCreate(selectedOptions.map((option) => option.name))}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudioPricingMappingModal({ open, options, selectedNames, onClose, onAdd }) {
  const availableOptions = options.filter((option) => option.valueType !== "text" && countStudioOptionAnswers(option) > 0 && !selectedNames.includes(option.name));
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    if (!open) return;
    setSelectedName(availableOptions[0]?.name || "");
  }, [open, options, selectedNames]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,20,0.42)", zIndex: 1315, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 540, maxWidth: "100%", background: "#fff", borderRadius: 24, boxShadow: "0 24px 70px rgba(20,20,20,0.2)", overflow: "hidden" }}>
        <div style={{ padding: "28px 40px 34px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1f1f1f", marginBottom: 30 }}>Pricing Mapping</div>
          <div>
            <label style={{ display: "block", fontSize: 18, color: "#5f5f5f", marginBottom: 12 }}>Option name</label>
            <div style={{ position: "relative" }}>
              <select style={{ ...S.select, height: 78, borderRadius: 18, fontSize: 22, fontWeight: 500 }} value={selectedName} onChange={(e) => setSelectedName(e.target.value)} disabled={availableOptions.length === 0}>
                {!availableOptions.length && <option value="">No options available</option>}
                {availableOptions.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}
              </select>
              <ChevronDown size={26} color="#667085" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #efefef", padding: "18px 28px", display: "flex", justifyContent: "space-between" }}>
          <button className="glamar-btn glamar-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="glamar-btn glamar-btn-primary" disabled={!selectedName} onClick={() => onAdd(selectedName)}>Done</button>
        </div>
      </div>
    </div>
  );
}

export function StudioMappingEmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div style={{ minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 24px" }}>
      <div style={{ width: 132, height: 132, borderRadius: "50%", background: "linear-gradient(180deg, #fafafa, #f1f1f1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26, position: "relative" }}>
        <Bell size={56} color="#bfbfbf" strokeWidth={1.2} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#141414" }}>{title}</div>
      <div style={{ maxWidth: 760, fontSize: 15, color: "#666", lineHeight: 1.55, marginTop: 18 }}>{description}</div>
      <button className="glamar-btn glamar-btn-primary" style={{ marginTop: 30 }} onClick={onAction}>{actionLabel}</button>
    </div>
  );
}

export function StudioVariantCombinationsPanel({
  variantOptions,
  setVariantOptions,
  variants,
  setVariants,
  measurementSchema,
  has3D,
  pricingOptionNames,
  setPricingOptionNames,
  pricingAdjustments,
  setPricingAdjustments,
  basePrice,
  setBasePrice,
  onDirtyChange,
}) {
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [activePricingFilter, setActivePricingFilter] = useState("all");
  const [activeVariantFilter, setActiveVariantFilter] = useState("all");
  const [activeVariantValueFilter, setActiveVariantValueFilter] = useState("all");
  const [pricingSaved, setPricingSaved] = useState(false);
  const eligibleOptions = variantOptions.filter((option) => option.valueType !== "text");
  const skuOptions = variantOptions.filter((option) => option.optionRole === "sku" && option.valueType !== "text");

  useEffect(() => {
    setActivePricingFilter((current) => (
      current === "all" || pricingOptionNames.includes(current)
        ? current
        : (pricingOptionNames[0] || "all")
    ));
  }, [pricingOptionNames]);

  useEffect(() => {
    setActiveVariantFilter((current) => (
      current === "all" || skuOptions.some((option) => option.name === current)
        ? current
        : "all"
    ));
  }, [skuOptions]);

  useEffect(() => {
    setActiveVariantValueFilter("all");
  }, [activeVariantFilter]);

  useEffect(() => {
    if (!pricingSaved) return;
    const timer = setTimeout(() => setPricingSaved(false), 1400);
    return () => clearTimeout(timer);
  }, [pricingSaved]);

  const updateVariant = (id, key, value) => {
    setVariants((prev) => prev.map((variant) => variant.id === id ? { ...variant, [key]: value } : variant));
    onDirtyChange?.();
  };

  const handleCreateVariants = (selectedNames) => {
    const nextOptions = variantOptions.map((option) => ({
      ...option,
      optionRole: selectedNames.includes(option.name) ? "sku" : "configurator",
    }));
    setVariantOptions(nextOptions);
    setVariants(generateStudioVariants(nextOptions, variants, measurementSchema));
    setShowVariantModal(false);
    onDirtyChange?.();
  };

  const handleAddPricingOption = (optionName) => {
    if (!optionName) return;
    setPricingOptionNames((prev) => prev.includes(optionName) ? prev : [...prev, optionName]);
    setActivePricingFilter(optionName);
    setShowPricingModal(false);
    onDirtyChange?.();
  };

  const updatePricingAdjustment = (optionName, valueLabel, nextValue) => {
    setPricingAdjustments((prev) => ({
      ...prev,
      [optionName]: { ...(prev?.[optionName] || {}), [valueLabel]: nextValue },
    }));
    onDirtyChange?.();
  };

  const pricingRows = (activePricingFilter === "all" ? pricingOptionNames : [activePricingFilter]).flatMap((optionName) => {
    const option = eligibleOptions.find((item) => item.name === optionName);
    if (!option) return [];
    return (option.values || [])
      .filter((value) => getVariantValueLabel(value).trim())
      .map((value) => ({
        optionName,
        label: getVariantValueLabel(value),
        color: value.color,
        image: value.image,
        additionalPrice: pricingAdjustments?.[optionName]?.[getVariantValueLabel(value)] || "",
      }));
  });

  const renderVariantLabel = (variant) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {(variant.attributes || []).slice(0, 2).map((attr) => (
        attr.color
          ? <div key={`${variant.id}-${attr.attr}-${attr.val}`} style={{ width: 18, height: 18, borderRadius: "50%", background: attr.color, border: "1px solid rgba(0,0,0,0.08)" }} />
          : attr.image
            ? <img key={`${variant.id}-${attr.attr}-${attr.val}`} src={attr.image} alt="" style={{ width: 20, height: 20, borderRadius: 6, objectFit: "cover" }} />
            : null
      ))}
      <span style={{ fontSize: 14, color: "#1f2937", fontWeight: 500 }}>{variant.name}</span>
    </div>
  );

  const variantValueFilters = activeVariantFilter === "all"
    ? []
    : Array.from(new Set(
      variants
        .map((variant) => (variant.attributes || []).find((attr) => attr.attr === activeVariantFilter)?.val || "")
        .filter(Boolean)
    ));
  const selectedVariantValueFilter = variantValueFilters.includes(activeVariantValueFilter) ? activeVariantValueFilter : "all";
  const filteredVariantRows = variants.filter((variant) => {
    if (activeVariantFilter === "all") return true;
    const activeAttr = (variant.attributes || []).find((attr) => attr.attr === activeVariantFilter);
    if (!activeAttr) return false;
    return selectedVariantValueFilter === "all" ? true : activeAttr.val === selectedVariantValueFilter;
  });

  const renderMeasurementHeaders = () => {
    if (measurementSchema === "ring") {
      return (
        <>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Inner diameter</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Diamond ring</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Shape</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Carat size</th>
        </>
      );
    }
    if (measurementSchema === "watch") {
      return (
        <>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Case diameter</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Lug-to-lug</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Case thickness</th>
          <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Strap type</th>
        </>
      );
    }
    return (
      <>
        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Length</th>
        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Width</th>
        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Height</th>
        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Value</th>
      </>
    );
  };

  const renderMeasurementCells = (variant) => {
    if (measurementSchema === "ring") {
      return (
        <>
          <td style={S.td}><input style={{ ...S.input, minWidth: 110 }} value={variant.ringInnerDiameter || ""} onChange={(e) => updateVariant(variant.id, "ringInnerDiameter", e.target.value)} placeholder="12" /></td>
          <td style={S.td}><select style={{ ...S.select, minWidth: 120 }} value={variant.isDiamondRing || "no"} onChange={(e) => updateVariant(variant.id, "isDiamondRing", e.target.value)}><option value="yes">Yes</option><option value="no">No</option></select></td>
          <td style={S.td}><input style={{ ...S.input, minWidth: 120 }} value={variant.diamondShape || ""} onChange={(e) => updateVariant(variant.id, "diamondShape", e.target.value)} placeholder="Round" /></td>
          <td style={S.td}><input style={{ ...S.input, minWidth: 120 }} value={variant.diamondCaratSize || ""} onChange={(e) => updateVariant(variant.id, "diamondCaratSize", e.target.value)} placeholder="6.5" /></td>
        </>
      );
    }
    if (measurementSchema === "watch") {
      return (
        <>
          <td style={S.td}><input style={{ ...S.input, minWidth: 110 }} value={variant.watchCaseDiameter || ""} onChange={(e) => updateVariant(variant.id, "watchCaseDiameter", e.target.value)} placeholder="44" /></td>
          <td style={S.td}><input style={{ ...S.input, minWidth: 110 }} value={variant.watchLugToLug || ""} onChange={(e) => updateVariant(variant.id, "watchLugToLug", e.target.value)} placeholder="48" /></td>
          <td style={S.td}><input style={{ ...S.input, minWidth: 120 }} value={variant.watchCaseThickness || ""} onChange={(e) => updateVariant(variant.id, "watchCaseThickness", e.target.value)} placeholder="12" /></td>
          <td style={S.td}><input style={{ ...S.input, minWidth: 120 }} value={variant.watchStrapType || ""} onChange={(e) => updateVariant(variant.id, "watchStrapType", e.target.value)} placeholder="Leather" /></td>
        </>
      );
    }
    return (
      <>
        <td style={S.td}><input style={{ ...S.input, minWidth: 100 }} value={variant.dimensionLength || ""} onChange={(e) => updateVariant(variant.id, "dimensionLength", e.target.value)} placeholder="12" /></td>
        <td style={S.td}><input style={{ ...S.input, minWidth: 100 }} value={variant.dimensionBreadth || ""} onChange={(e) => updateVariant(variant.id, "dimensionBreadth", e.target.value)} placeholder="12" /></td>
        <td style={S.td}><input style={{ ...S.input, minWidth: 100 }} value={variant.dimensionHeight || ""} onChange={(e) => updateVariant(variant.id, "dimensionHeight", e.target.value)} placeholder="12" /></td>
        <td style={S.td}>
          <div style={{ position: "relative", minWidth: 146 }}>
            <select style={{ ...S.select, paddingRight: 36 }} value={variant.dimensionUnit || "mm"} onChange={(e) => updateVariant(variant.id, "dimensionUnit", e.target.value)}>
              {DIMENSION_UNITS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
            <ChevronDown size={16} color="#666" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </td>
      </>
    );
  };

  return (
    <>
      <StudioVariantCombinationsModal
        open={showVariantModal}
        options={variantOptions}
        selectedNames={skuOptions.map((option) => option.name)}
        onClose={() => setShowVariantModal(false)}
        onCreate={handleCreateVariants}
      />

      <StudioPricingMappingModal
        open={showPricingModal}
        options={variantOptions}
        selectedNames={pricingOptionNames}
        onClose={() => setShowPricingModal(false)}
        onAdd={handleAddPricingOption}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ ...S.card, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#141414" }}>Pricing Mapping</div>
            <button className="glamar-btn glamar-btn-primary" style={{ height: 38 }} onClick={() => setShowPricingModal(true)}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "#f7f7f7", borderRadius: 22, padding: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 16, alignItems: "end" }}>
                <div>
                  <label style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 10 }}>Base price</label>
                  <input style={{ ...S.input, height: 62, borderRadius: 16, fontSize: 22 }} value={basePrice || ""} onChange={(e) => { setBasePrice(e.target.value); onDirtyChange?.(); }} placeholder="$ 100" />
                </div>
                <button className="glamar-btn glamar-btn-primary" style={{ minWidth: 132 }} onClick={() => setPricingSaved(true)}>
                  {pricingSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {pricingOptionNames.length === 0 ? (
              <div style={{ fontSize: 13.5, color: "#8b8b8b", lineHeight: 1.6 }}>
                Add an option name to map additional pricing against its values.
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button onClick={() => setActivePricingFilter("all")} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: `1px dashed ${activePricingFilter === "all" ? "#da0e64" : "#d4d4d4"}`, background: activePricingFilter === "all" ? "#fff0f6" : "#fff", color: activePricingFilter === "all" ? "#8f0941" : "#555", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>All</button>
                  {pricingOptionNames.map((optionName) => (
                    <button key={optionName} onClick={() => setActivePricingFilter(optionName)} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: `1px solid ${activePricingFilter === optionName ? "#da0e64" : "#d4d4d4"}`, background: activePricingFilter === optionName ? "#fff0f6" : "#fff", color: activePricingFilter === optionName ? "#8f0941" : "#555", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{optionName}</button>
                  ))}
                  <button onClick={() => setShowPricingModal(true)} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: "1px solid #d4d4d4", background: "#fff", color: "#555", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Plus size={16} /> More
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Variant</th>
                        <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Additional Pricing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingRows.map((row) => (
                        <tr key={`${row.optionName}-${row.label}`} style={{ borderBottom: "1px solid #f4f4f4" }}>
                          <td style={S.td}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {row.color && <div style={{ width: 18, height: 18, borderRadius: "50%", background: row.color, border: "1px solid rgba(0,0,0,0.08)" }} />}
                              {row.image && <img src={row.image} alt="" style={{ width: 20, height: 20, borderRadius: 6, objectFit: "cover" }} />}
                              <span style={{ fontWeight: 500, color: "#1f2937" }}>{row.label}</span>
                              {activePricingFilter === "all" && <span style={{ fontSize: 11.5, color: "#888", border: "1px solid #e5e7eb", borderRadius: 999, padding: "3px 8px" }}>{row.optionName}</span>}
                            </div>
                          </td>
                          <td style={S.td}>
                            <input
                              style={{ ...S.input, minWidth: 220 }}
                              value={row.additionalPrice}
                              onChange={(e) => updatePricingAdjustment(row.optionName, row.label, e.target.value)}
                              placeholder="Placeholder Text"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ ...S.card, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#141414" }}>Variant Mapping</div>
            <button className="glamar-btn glamar-btn-primary" style={{ height: 38 }} onClick={() => setShowVariantModal(true)}>
              {variants.length > 0 ? "Edit" : "Select Variant"}
            </button>
          </div>

          {skuOptions.length === 0 || variants.length === 0 ? (
            <StudioMappingEmptyState
              title="Map Variant"
              description="Your product inventory is empty. Add your first item to unlock virtual try-ons, 3D views, and immersive experiences for your customers."
              actionLabel="Select Variant"
              onAction={() => setShowVariantModal(true)}
            />
          ) : (
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <button onClick={() => { setActiveVariantFilter("all"); setActiveVariantValueFilter("all"); }} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: `1px dashed ${activeVariantFilter === "all" ? "#da0e64" : "#d4d4d4"}`, background: activeVariantFilter === "all" ? "#fff0f6" : "#fff", color: activeVariantFilter === "all" ? "#8f0941" : "#555", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>All</button>
                {skuOptions.map((option) => (
                  <button key={option.name} onClick={() => { setActiveVariantFilter(option.name); setActiveVariantValueFilter("all"); }} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: `1px solid ${activeVariantFilter === option.name ? "#da0e64" : "#d4d4d4"}`, background: activeVariantFilter === option.name ? "#fff0f6" : "#fff", color: activeVariantFilter === option.name ? "#8f0941" : "#555", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{option.name}</button>
                ))}
                <button onClick={() => setShowVariantModal(true)} style={{ height: 46, padding: "0 18px", borderRadius: 999, border: "1px solid #d4d4d4", background: "#fff", color: "#555", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Plus size={16} /> More
                </button>
              </div>
              {activeVariantFilter !== "all" && variantValueFilters.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button onClick={() => setActiveVariantValueFilter("all")} style={{ height: 40, padding: "0 16px", borderRadius: 999, border: `1px dashed ${selectedVariantValueFilter === "all" ? "#da0e64" : "#d4d4d4"}`, background: selectedVariantValueFilter === "all" ? "#fff0f6" : "#fff", color: selectedVariantValueFilter === "all" ? "#8f0941" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>All values</button>
                  {variantValueFilters.map((valueLabel) => (
                    <button key={`${activeVariantFilter}-${valueLabel}`} onClick={() => setActiveVariantValueFilter(valueLabel)} style={{ height: 40, padding: "0 16px", borderRadius: 999, border: `1px solid ${selectedVariantValueFilter === valueLabel ? "#da0e64" : "#d4d4d4"}`, background: selectedVariantValueFilter === valueLabel ? "#fff0f6" : "#fff", color: selectedVariantValueFilter === valueLabel ? "#8f0941" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{valueLabel}</button>
                  ))}
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>Variant</th>
                      <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>SKU ID</th>
                      {renderMeasurementHeaders()}
                      {has3D && <th style={{ ...S.th, textTransform: "none", fontSize: 12, letterSpacing: 0 }}>3D file</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVariantRows.map((variant) => (
                      <tr key={variant.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                        <td style={S.td}>{renderVariantLabel(variant)}</td>
                        <td style={S.td}>
                          <input style={{ ...S.input, minWidth: 150 }} value={variant.variantId || ""} onChange={(e) => updateVariant(variant.id, "variantId", e.target.value)} placeholder="001" />
                        </td>
                        {renderMeasurementCells(variant)}
                        {has3D && (
                          <td style={S.td}>
                            <button style={{ width: 68, height: 64, borderRadius: 16, border: "1px dashed #f472b6", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Upload size={16} color="#8f0941" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

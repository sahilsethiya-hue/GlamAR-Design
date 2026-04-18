import { useState, useRef, useEffect } from "react";
import { ChevronDown, GripVertical, X, Plus, Upload, Image } from "lucide-react";
import { S, DIMENSION_UNITS } from "../../shared/constants.jsx";
import { IcSort, IcTrash } from "../../shared/icons";
import { getEmptyMeasurementFields } from "./utils";

export function normalizeBeautyVariantOptions(options = []) {
  return (options || []).map((option) => {
    const nextType = option?.valueType === "color" ? "color" : "image";
    return {
      ...option,
      optionRole: "sku",
      valueType: nextType,
      values: (option.values || []).map((value) => {
        const label = typeof value === "string" ? value : (value.label || "");
        if (nextType === "color") {
          return { ...(typeof value === "string" ? {} : value), label, color: (typeof value === "string" ? undefined : value.color) || "#da0e64" };
        }
        return { ...(typeof value === "string" ? {} : value), label, image: (typeof value === "string" ? undefined : value.image) || "" };
      }),
    };
  });
}

export function VariantEditor({ variantOptions, setVariantOptions, variants, setVariants, has3D, measurementSchema, disabled, beautyMode = false }) {
  const [editingOption, setEditingOption] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [newColor, setNewColor] = useState("#da0e64");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [variantOrder, setVariantOrder] = useState("");
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [vmFilterSelections, setVmFilterSelections] = useState({});
  const [vmActivePopoverOption, setVmActivePopoverOption] = useState("");
  const [vmPopoverLeft, setVmPopoverLeft] = useState(0);
  const [pmFilter, setPmFilter] = useState("All");
  const [basePrice, setBasePrice] = useState("");
  const [pmModalOpen, setPmModalOpen] = useState(false);
  const [pmModalSelection, setPmModalSelection] = useState("");
  const [pmSelectedOptions, setPmSelectedOptions] = useState([]);
  const vmFilterBarRef = useRef(null);
  const vmPopoverRef = useRef(null);
  const vmOptionButtonRefs = useRef({});

  const getLabel = (v) => (typeof v === "string" ? v : v.label || "");
  const updateEditingValue = (index, patch) => {
    setEditingOption(prev => (
      prev
        ? { ...prev, values: prev.values.map((value, i) => i === index ? { ...value, ...patch } : value) }
        : prev
    ));
  };
  const normalizeValuesForType = (values, valueType) => values.map((value) => {
    const label = getLabel(value);
    if (valueType === "color") return { label, color: value?.color || "#da0e64" };
    if (valueType === "image") return { label, image: value?.image || "" };
    return { label };
  });
  const getDraftValueForType = (valueType, currentCount = 0) => {
    const label = newValue.trim();
    if (valueType === "color") return label ? { label, color: newColor } : null;
    if (valueType === "image") {
      if (!newImageUrl) return null;
      return { label: label || `Image ${currentCount + 1}`, image: newImageUrl };
    }
    return label ? { label } : null;
  };
  const mergePendingDraft = (option) => {
    if (!option) return option;
    const draftValue = getDraftValueForType(option.valueType || "text", option.values?.length || 0);
    if (!draftValue) return option;
    return { ...option, values: [...option.values, draftValue] };
  };
  const createEmptyOption = () => ({ name: "", valueType: beautyMode ? "color" : "text", optionRole: "sku", values: [] });
  const normalizeEditingOption = (option) => {
    if (!option) return option;
    if (!beautyMode) return { ...option };
    const nextType = option.valueType === "color" ? "color" : "image";
    return { ...option, optionRole: "sku", valueType: nextType, values: normalizeValuesForType(option.values || [], nextType) };
  };
  const changeEditingOptionType = (nextType) => {
    const optionWithDraft = mergePendingDraft(editingOption);
    const normalizedType = beautyMode ? (nextType === "color" ? "color" : "image") : nextType;
    setEditingOption({ ...optionWithDraft, valueType: normalizedType, values: normalizeValuesForType(optionWithDraft.values, normalizedType) });
    resetNewRow();
  };

  const resetNewRow = () => { setNewValue(""); setNewColor("#da0e64"); setNewImageUrl(""); };

  const generateVariants = (opts) => {
    if (opts.length === 0) { setVariants([]); return; }
    const skuOpts = opts.filter(o => o.optionRole !== "configurator");
    if (skuOpts.length === 0) { setVariants([]); return; }
    const combos = skuOpts.reduce((acc, opt) => {
      if (acc.length === 0) return opt.values.map(v => [{ attr: opt.name, val: getLabel(v), color: v.color, image: v.image }]);
      const next = [];
      acc.forEach(c => opt.values.forEach(v => next.push([...c, { attr: opt.name, val: getLabel(v), color: v.color, image: v.image }])));
      return next;
    }, []);
    setVariants(combos.map((combo, i) => ({
      id: `var-${Date.now()}-${i}`,
      name: combo.map(c => c.val).join(" / "),
      attributes: combo,
      variantId: "",
      costPrice: "",
      sellingPrice: "",
      productUrl: "",
      modelFileName: "",
      ...getEmptyMeasurementFields(),
    })));
    setExpandedGroup(null);
  };

  const doneEditing = () => {
    const optionToSave = mergePendingDraft(editingOption);
    if (!optionToSave.name.trim() || optionToSave.values.length === 0) return;
    const nextType = beautyMode ? (optionToSave.valueType === "color" ? "color" : "image") : (optionToSave.valueType || "text");
    const updated = { name: optionToSave.name, valueType: nextType, optionRole: beautyMode ? "sku" : (optionToSave.optionRole || "sku"), values: normalizeValuesForType(optionToSave.values, nextType) };
    const newOpts = editingIndex !== null
      ? variantOptions.map((o, i) => i === editingIndex ? updated : o)
      : [...variantOptions, updated];
    setVariantOptions(newOpts);
    generateVariants(newOpts);
    setEditingOption(null);
    setEditingIndex(null);
    resetNewRow();
  };

  const addValue = () => {
    const type = editingOption.valueType || "text";
    let newVal;
    if (type === "color") {
      if (!newValue.trim()) return;
      newVal = { label: newValue.trim(), color: newColor };
    } else if (type === "image") {
      if (!newImageUrl) return;
      newVal = { label: newValue.trim() || `Image ${editingOption.values.length + 1}`, image: newImageUrl };
    } else {
      if (!newValue.trim()) return;
      newVal = { label: newValue.trim() };
    }
    setEditingOption({ ...editingOption, values: [...editingOption.values, newVal] });
    resetNewRow();
  };

  const removeOption = (idx) => {
    const newOpts = variantOptions.filter((_, i) => i !== idx);
    setVariantOptions(newOpts);
    generateVariants(newOpts);
  };

  const updateVariant = (id, key, val) => setVariants(variants.map(v => v.id === id ? { ...v, [key]: val } : v));
  const updateVariantAttributeColor = (attrName, attrValue, color) => {
    setVariants(prev => prev.map((variant) => {
      const matchesAttribute = variant.attributes?.some((attr) => attr.attr === attrName && attr.val === attrValue);
      if (!matchesAttribute) return variant;
      return {
        ...variant,
        color,
        attributes: variant.attributes.map((attr) => (
          attr.attr === attrName && attr.val === attrValue ? { ...attr, color } : attr
        )),
      };
    }));
    setVariantOptions(prev => prev.map((option) => {
      if (option.name !== attrName) return option;
      return {
        ...option,
        values: option.values.map((value) => (
          getLabel(value) === attrValue
            ? { ...(typeof value === "string" ? { label: value } : value), color }
            : value
        )),
      };
    }));
  };

  const renderSwatch = (v, size = 36) => {
    if (v?.color) return <div style={{ width: size, height: size, borderRadius: size * 0.22, background: v.color, flexShrink: 0, border: "1px solid rgba(0,0,0,0.08)" }} />;
    if (v?.image) return <img src={v.image} alt="" style={{ width: size, height: size, borderRadius: size * 0.22, objectFit: "cover", flexShrink: 0 }} />;
    return <div style={{ width: size, height: size, borderRadius: size * 0.22, background: "#f0f0f0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={size * 0.4} color="#ccc" /></div>;
  };

  const renderEditableSwatch = (attr, size = 36) => {
    if (attr?.color) {
      return (
        <label
          title={`Pick ${attr.attr.toLowerCase()}`}
          style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), background: attr.color, flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", overflow: "hidden", position: "relative" }}
        >
          <input
            type="color"
            value={attr.color || "#da0e64"}
            onChange={e => updateVariantAttributeColor(attr.attr, attr.val, e.target.value)}
            style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", border: "none", padding: 0, opacity: 0, cursor: "pointer" }}
          />
        </label>
      );
    }
    return renderSwatch(attr, size);
  };

  const orderOptions = variantOptions.filter(o => o.optionRole !== "configurator").map(o => o.name);

  useEffect(() => {
    if (orderOptions.length > 1) {
      setVariantOrder((current) => (current && orderOptions.includes(current) ? current : orderOptions[0]));
      return;
    }
    setVariantOrder("");
  }, [orderOptions]);

  const groupedVariants = (() => {
    if (!variantOrder || variantOptions.filter(o => o.optionRole !== "configurator").length <= 1) return null;
    const map = {};
    variants.forEach(v => {
      const attr = v.attributes.find(a => a.attr === variantOrder);
      const key = attr ? attr.val : v.name;
      if (!map[key]) map[key] = { key, variants: [], swatch: attr ? { color: attr.color, image: attr.image } : null };
      map[key].variants.push(v);
    });
    return Object.values(map);
  })();

  const filterTabs = ["All", ...variantOptions.filter(o => o.optionRole !== "configurator").map(o => o.name)];
  const vmFilterOptions = filterTabs.slice(1);
  const showMeasurementCols = ["dimension", "ring", "watch"].includes(measurementSchema);
  const tabPill = (active) => ({
    padding: "5px 14px", border: active ? "1.5px solid #1a1a1a" : "1.5px dashed #d0d0d0",
    borderRadius: 20, background: active ? "#1a1a1a" : "#fff", color: active ? "#fff" : "#666",
    fontSize: 12.5, fontWeight: active ? 600 : 400, cursor: "pointer", outline: "none",
  });
  const summarizeByAttr = (filter) => {
    if (filter === "All") return variants;
    const seen = new Set();
    return variants.reduce((acc, variant) => {
      const attr = variant.attributes.find((item) => item.attr === filter);
      if (!attr || seen.has(attr.val)) return acc;
      seen.add(attr.val);
      acc.push({ ...variant, name: attr.val });
      return acc;
    }, []);
  };
  const vmFilterValuesByOption = vmFilterOptions.reduce((acc, optionName) => {
    const option = variantOptions.find((item) => item.name === optionName);
    const valuesFromOption = Array.from(new Set((option?.values || []).map(getLabel).map(value => value.trim()).filter(Boolean)));
    if (valuesFromOption.length > 0) { acc[optionName] = valuesFromOption; return acc; }
    const valuesFromVariants = Array.from(new Set(
      variants.map((variant) => variant.attributes.find((attr) => attr.attr === optionName)?.val || "").map((value) => value.trim()).filter(Boolean)
    ));
    acc[optionName] = valuesFromVariants;
    return acc;
  }, {});
  const vmFilterOptionsKey = vmFilterOptions.join("||");
  const vmFilterValuesKey = vmFilterOptions.map((optionName) => `${optionName}:${(vmFilterValuesByOption[optionName] || []).join("|")}`).join("||");
  const activeVmFilters = Object.entries(vmFilterSelections).filter(([, values]) => Array.isArray(values) && values.length > 0);
  const vmRows = activeVmFilters.length === 0
    ? variants
    : variants.filter((variant) => activeVmFilters.every(([optionName, selectedValues]) => {
      const attr = variant.attributes.find((item) => item.attr === optionName);
      return Boolean(attr && selectedValues.includes(attr.val));
    }));
  const pmRows = summarizeByAttr(pmFilter);

  const vmFilterPillBase = { height: 34, borderRadius: 999, padding: "0 14px", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", outline: "none", background: "#fff", whiteSpace: "nowrap" };
  const vmFilterPillGhost = { ...vmFilterPillBase, border: "1px dashed #d0d0d0", color: "#5a5a5a" };
  const vmFilterPillSelected = { ...vmFilterPillBase, border: "1px solid #e0e0e0", color: "#141414" };

  const setVmOptionValues = (optionName, nextValues) => {
    setVmFilterSelections((prev) => {
      const cleanValues = Array.from(new Set((nextValues || []).map((value) => value.trim()).filter(Boolean)));
      if (cleanValues.length === 0) { const { [optionName]: _, ...rest } = prev; return rest; }
      return { ...prev, [optionName]: cleanValues };
    });
  };
  const toggleVmOptionValue = (optionName, value) => {
    const currentValues = vmFilterSelections[optionName] || [];
    const nextValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];
    setVmOptionValues(optionName, nextValues);
  };
  const clearAllVmFilters = () => { setVmFilterSelections({}); setVmActivePopoverOption(""); };
  const setVmOptionButtonRef = (optionName, element) => {
    if (!element) { delete vmOptionButtonRefs.current[optionName]; return; }
    vmOptionButtonRefs.current[optionName] = element;
  };
  const updateVmPopoverPosition = (optionName) => {
    const containerEl = vmFilterBarRef.current;
    const optionEl = vmOptionButtonRefs.current[optionName];
    if (!containerEl || !optionEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    const optionRect = optionEl.getBoundingClientRect();
    setVmPopoverLeft(optionRect.left - containerRect.left + optionRect.width / 2);
  };

  useEffect(() => {
    setVmFilterSelections((prev) => {
      const next = {};
      vmFilterOptions.forEach((optionName) => {
        const allowedValues = new Set(vmFilterValuesByOption[optionName] || []);
        const keptValues = (prev[optionName] || []).filter((value) => allowedValues.has(value));
        if (keptValues.length > 0) next[optionName] = keptValues;
      });
      const prevActive = Object.entries(prev).filter(([, values]) => values?.length > 0);
      const nextActive = Object.entries(next);
      const unchanged = prevActive.length === nextActive.length && prevActive.every(([optionName, values]) => {
        const nextValues = next[optionName] || [];
        return values.length === nextValues.length && values.every((value, index) => value === nextValues[index]);
      });
      return unchanged ? prev : next;
    });
  }, [vmFilterOptionsKey, vmFilterValuesKey]);

  useEffect(() => {
    if (!vmActivePopoverOption) return undefined;
    if (!vmFilterOptions.includes(vmActivePopoverOption)) { setVmActivePopoverOption(""); return undefined; }
    updateVmPopoverPosition(vmActivePopoverOption);
    const onResize = () => updateVmPopoverPosition(vmActivePopoverOption);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [vmActivePopoverOption, vmFilterOptionsKey, vmRows.length]);

  useEffect(() => {
    if (!vmActivePopoverOption) return undefined;
    const onPointerDown = (event) => {
      if (vmPopoverRef.current?.contains(event.target)) return;
      if (vmFilterBarRef.current?.contains(event.target)) return;
      setVmActivePopoverOption("");
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [vmActivePopoverOption]);

  const renderMeasurementHeaders = () => {
    if (measurementSchema === "ring") return (<><th style={{ ...S.th }}>Inner diameter</th><th style={{ ...S.th }}>Diamond ring</th><th style={{ ...S.th }}>Shape</th><th style={{ ...S.th }}>Carat size</th></>);
    if (measurementSchema === "watch") return (<><th style={{ ...S.th }}>Case diameter</th><th style={{ ...S.th }}>Lug-to-lug</th><th style={{ ...S.th }}>Case thickness</th><th style={{ ...S.th }}>Strap type</th></>);
    if (measurementSchema === "dimension") return (<><th style={{ ...S.th }}>Length</th><th style={{ ...S.th }}>Width</th><th style={{ ...S.th }}>Height</th><th style={{ ...S.th }}>Value</th></>);
    return null;
  };

  const renderMeasurementCells = (variant) => {
    if (measurementSchema === "ring") return (
      <>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 100 }} value={variant.ringInnerDiameter || ""} onChange={e => updateVariant(variant.id, "ringInnerDiameter", e.target.value)} placeholder="12" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><div style={{ position: "relative", width: 120 }}><select value={variant.isDiamondRing || "no"} onChange={e => updateVariant(variant.id, "isDiamondRing", e.target.value)} style={{ ...S.select, height: 34, fontSize: 12.5, padding: "0 28px 0 12px", width: 120 }}><option value="yes">Yes</option><option value="no">No</option></select><ChevronDown size={12} color="#aaa" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} /></div></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={variant.diamondShape || ""} onChange={e => updateVariant(variant.id, "diamondShape", e.target.value)} placeholder="Round" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={variant.diamondCaratSize || ""} onChange={e => updateVariant(variant.id, "diamondCaratSize", e.target.value)} placeholder="6.5" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
      </>
    );
    if (measurementSchema === "watch") return (
      <>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 100 }} value={variant.watchCaseDiameter || ""} onChange={e => updateVariant(variant.id, "watchCaseDiameter", e.target.value)} placeholder="44" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 100 }} value={variant.watchLugToLug || ""} onChange={e => updateVariant(variant.id, "watchLugToLug", e.target.value)} placeholder="48" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={variant.watchCaseThickness || ""} onChange={e => updateVariant(variant.id, "watchCaseThickness", e.target.value)} placeholder="12" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 130 }} value={variant.watchStrapType || ""} onChange={e => updateVariant(variant.id, "watchStrapType", e.target.value)} placeholder="Leather" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
      </>
    );
    if (measurementSchema === "dimension") return (
      <>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 72 }} value={variant.dimensionLength || ""} onChange={e => updateVariant(variant.id, "dimensionLength", e.target.value)} placeholder="12" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 72 }} value={variant.dimensionBreadth || ""} onChange={e => updateVariant(variant.id, "dimensionBreadth", e.target.value)} placeholder="12" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 72 }} value={variant.dimensionHeight || ""} onChange={e => updateVariant(variant.id, "dimensionHeight", e.target.value)} placeholder="12" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
        <td style={{ ...S.td }}><div style={{ position: "relative", width: 110 }}><select value={variant.dimensionUnit || "cm"} onChange={e => updateVariant(variant.id, "dimensionUnit", e.target.value)} style={{ ...S.select, height: 34, fontSize: 12.5, padding: "0 28px 0 12px", width: 110 }}>{DIMENSION_UNITS.map(u => <option key={u}>{u}</option>)}</select><ChevronDown size={12} color="#aaa" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} /></div></td>
      </>
    );
    return null;
  };

  return (
    <div>
      <div style={{ ...S.card, marginBottom: 22, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: editingOption || variants.length > 0 || variantOptions.length > 0 ? "1px solid #f2f2f2" : "none" }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Select variant</div>
          {!editingOption && !variantOptions.length && !variants.length && (
            <button className="glamar-btn glamar-btn-primary" style={{ padding: "0 16px", opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }} disabled={disabled} onClick={() => !disabled && setEditingOption(createEmptyOption())}>
              <Plus size={14} /> Add Variant
            </button>
          )}
        </div>

        {(editingOption || variantOptions.length > 0 || variants.length > 0) && <div style={{ padding: "16px 24px 4px" }}>
          {variantOptions.map((opt, oi) => editingIndex === oi ? null : (
            <div key={oi} onClick={() => { setEditingOption(normalizeEditingOption(opt)); setEditingIndex(oi); resetNewRow(); }}
              style={{ background: "#fafafa", borderRadius: 12, padding: "14px 18px", border: "1px solid #ebebeb", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{opt.name}</span>
                {opt.optionRole === "configurator" && <span style={{ fontSize: 11, background: "#f0f0f0", borderRadius: 4, padding: "1px 6px", color: "#888" }}>Configurator</span>}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
                  {opt.values.map((v, vi) => (
                    v.color ? <div key={vi} style={{ width: 16, height: 16, borderRadius: "50%", background: v.color, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                    : v.image ? <img key={vi} src={v.image} alt="" style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
                    : <span key={vi} style={{ fontSize: 12, color: "#999" }}>{getLabel(v)}</span>
                  ))}
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); removeOption(oi); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}><X size={14} color="#bbb" /></button>
            </div>
          ))}

          {editingOption && (
            <div style={{ background: "#fafafa", borderRadius: 12, padding: 22, border: "1px solid #eaeaea", marginBottom: 16 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Option name</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <GripVertical size={16} color="#ccc" />
                  {beautyMode && (
                    <div style={{ position: "relative" }}>
                      <select value={editingOption.valueType || "color"} onChange={e => changeEditingOptionType(e.target.value)}
                        style={{ appearance: "none", background: "#fff", border: "1px solid #d9d9d9", borderRadius: 10, padding: "0 32px 0 12px", height: 36, fontSize: 13, fontWeight: 500, color: "#333", cursor: "pointer", outline: "none", minWidth: 112 }}>
                        <option value="color">Color</option>
                        <option value="image">Others</option>
                      </select>
                      <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    </div>
                  )}
                  <input style={{ ...S.input, background: "#fff", flex: 1 }} value={editingOption.name}
                    onChange={e => setEditingOption({ ...editingOption, name: e.target.value })}
                    placeholder="e.g. Color, Size, Material"
                    onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                  {!beautyMode && (
                    <div style={{ position: "relative" }}>
                      <select value={editingOption.valueType || "text"} onChange={e => changeEditingOptionType(e.target.value)}
                        style={{ appearance: "none", background: "#fff", border: "1px solid #d9d9d9", borderRadius: 10, padding: "0 28px 0 12px", height: 36, fontSize: 13, fontWeight: 500, color: "#333", cursor: "pointer", outline: "none" }}>
                        <option value="color">Color</option>
                        <option value="image">Image</option>
                        <option value="text">Text</option>
                      </select>
                      <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={S.label}>Option values</label>
                {editingOption.values.map((v, vi) => (
                  <div key={vi} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <GripVertical size={16} color="#ccc" />
                    {(editingOption.valueType === "color") && (
                      <label style={{ width: 36, height: 36, borderRadius: 9, background: v.color, flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", overflow: "hidden", position: "relative" }} title="Pick color">
                        <input type="color" value={v.color || "#da0e64"} onChange={e => updateEditingValue(vi, { color: e.target.value })} style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", border: "none", padding: 0, opacity: 0, cursor: "pointer" }} />
                      </label>
                    )}
                    {(editingOption.valueType === "image") && (
                      <label style={{ width: 36, height: 36, borderRadius: 9, border: "1px dashed #d0d0d0", background: v.image ? "transparent" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, overflow: "hidden" }}>
                        {v.image ? <img src={v.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={12} color="#bbb" />}
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const file = e.target.files?.[0]; if (file) updateEditingValue(vi, { image: URL.createObjectURL(file) }); }} />
                      </label>
                    )}
                    <input style={{ ...S.input, background: "#fff" }} value={getLabel(v)} onChange={e => updateEditingValue(vi, { label: e.target.value })} onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                    <button onClick={() => setEditingOption({ ...editingOption, values: editingOption.values.filter((_, i) => i !== vi) })} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={14} color="#bbb" /></button>
                  </div>
                ))}
                {(editingOption.valueType === "color") ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16 }} />
                    <label style={{ width: 36, height: 36, borderRadius: 9, background: newColor, flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", overflow: "hidden", position: "relative" }} title="Pick color">
                      <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%", border: "none", padding: 0, opacity: 0, cursor: "pointer" }} />
                    </label>
                    <input style={{ ...S.input, background: "#fff" }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder={beautyMode ? "Optional label" : "Add another value"} onKeyDown={e => { if (e.key === "Enter") addValue(); }} onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                  </div>
                ) : (editingOption.valueType === "image") ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16 }} />
                    <label style={{ width: 36, height: 36, borderRadius: 9, border: "1px dashed #d0d0d0", background: newImageUrl ? "transparent" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, overflow: "hidden" }}>
                      {newImageUrl ? <img src={newImageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={12} color="#bbb" />}
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setNewImageUrl(URL.createObjectURL(f)); }} />
                    </label>
                    <input style={{ ...S.input, background: "#fff" }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Add another value" onKeyDown={e => { if (e.key === "Enter") addValue(); }} onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16 }} />
                    <input style={{ ...S.input, background: "#fff" }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Add another value" onKeyDown={e => { if (e.key === "Enter" && newValue.trim()) addValue(); }} onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => { if (editingIndex !== null) { removeOption(editingIndex); } setEditingOption(null); setEditingIndex(null); resetNewRow(); }}
                  style={{ background: "#f5f5f5", color: "#ff3b30", border: "none", borderRadius: 12, height: 32, padding: "0 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {editingIndex !== null ? "Delete" : "Cancel"}
                </button>
                <button onClick={doneEditing} className="glamar-btn glamar-btn-primary">Done</button>
              </div>
            </div>
          )}

          {variants.length > 0 && editingOption && (
            <div style={{ fontSize: 12.5, color: "#999", marginBottom: 8 }}>{variants.length} variant{variants.length !== 1 ? "s" : ""} generated</div>
          )}
        </div>}

        {(editingOption || variantOptions.length > 0 || variants.length > 0) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 20px" }}>
            <div>
              {(variantOptions.length > 0 || variants.length > 0) && (
                <button onClick={() => { setVariantOptions([]); setVariants([]); setEditingOption(null); resetNewRow(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 12.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                  <IcTrash color="#dc2626" /> Remove all
                </button>
              )}
            </div>
            <div>
              {!editingOption && (
                <button className="glamar-btn glamar-btn-primary" style={{ padding: "0 16px", opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }} disabled={disabled} onClick={() => !disabled && setEditingOption(createEmptyOption())}>
                  <Plus size={14} /> Add Variant
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {variants.length > 0 && !editingOption && (
        <>
          {/* ── Variant Mapping ── */}
          <div style={{ ...S.card, marginBottom: 22, overflow: "visible" }}>
            <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f2f2f2" }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2, marginBottom: 14 }}>Variant Mapping</div>
              {vmFilterOptions.length > 0 && (
                <div ref={vmFilterBarRef} style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button style={vmFilterPillGhost} onClick={clearAllVmFilters}>
                      <span style={{ fontSize: 14, lineHeight: "20px", color: "#5a5a5a" }}>All</span>
                    </button>
                    {vmFilterOptions.map((optionName) => {
                      const selectedValues = vmFilterSelections[optionName] || [];
                      const selectedCount = selectedValues.length;
                      const isPopoverOpen = vmActivePopoverOption === optionName;
                      return (
                        <button key={optionName} ref={(element) => setVmOptionButtonRef(optionName, element)}
                          style={{ ...(selectedCount > 0 ? vmFilterPillSelected : vmFilterPillGhost), borderColor: isPopoverOpen ? "#c6c6c6" : selectedCount > 0 ? "#e0e0e0" : "#d0d0d0" }}
                          onClick={() => { if (isPopoverOpen) { setVmActivePopoverOption(""); return; } setVmActivePopoverOption(optionName); requestAnimationFrame(() => updateVmPopoverPosition(optionName)); }}>
                          {selectedCount <= 1 ? (
                            <><span style={{ fontSize: 14, lineHeight: "20px", color: "#5a5a5a" }}>{selectedCount === 1 ? `${optionName}:` : optionName}</span>{selectedCount === 1 && <span style={{ fontSize: 14, lineHeight: "20px", color: "#141414" }}>{selectedValues[0]}</span>}</>
                          ) : (
                            <><span style={{ fontSize: 14, lineHeight: "20px", color: "#5a5a5a" }}>{optionName}</span><span style={{ background: "#fcebf4", borderRadius: 16, padding: "1px 6px", color: "#8f0941", fontSize: 11, lineHeight: "14px", minWidth: 16, textAlign: "center" }}>{selectedCount}</span></>
                          )}
                          <ChevronDown size={14} color="#5a5a5a" />
                        </button>
                      );
                    })}
                    <button style={{ ...vmFilterPillGhost, padding: "0 12px 0 10px" }} onClick={() => setVmActivePopoverOption("")}>
                      <Plus size={14} color="#5a5a5a" /><span style={{ fontSize: 14, lineHeight: "20px", color: "#5a5a5a" }}>More</span>
                    </button>
                  </div>
                  {vmActivePopoverOption && (vmFilterValuesByOption[vmActivePopoverOption] || []).length > 0 && (
                    <div ref={vmPopoverRef} style={{ position: "absolute", left: vmPopoverLeft, top: "calc(100% + 12px)", transform: "translateX(-50%)", width: 290, maxWidth: "90vw", background: "#fff", borderRadius: 16, border: "1px solid #ffffff", boxShadow: "0 4px 16px rgba(0,0,0,0.16)", zIndex: 20, overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 12, height: 12, background: "#fff", borderLeft: "1px solid #ffffff", borderTop: "1px solid #ffffff" }} />
                      <div style={{ padding: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5 }}>
                        {(vmFilterValuesByOption[vmActivePopoverOption] || []).map((value) => {
                          const selected = (vmFilterSelections[vmActivePopoverOption] || []).includes(value);
                          return (
                            <button key={`${vmActivePopoverOption}-${value}`} style={{ height: 30, borderRadius: 999, border: selected ? "1px solid #e0e0e0" : "1px dashed #e0e0e0", background: selected ? "#f0f0f0" : "#fff", color: "#5a5a5a", fontSize: 14, lineHeight: "20px", padding: "0 12px", cursor: "pointer" }}
                              onClick={() => toggleVmOptionValue(vmActivePopoverOption, value)}>
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...S.th }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}>Variant <IcSort /></div></th>
                    <th style={{ ...S.th }}>SKU ID</th>
                    {beautyMode ? (
                      <><th style={{ ...S.th }}>Price</th><th style={{ ...S.th }}>Product URL</th></>
                    ) : (
                      <>
                        {showMeasurementCols && renderMeasurementHeaders()}
                        {!showMeasurementCols && !has3D && <><th style={{ ...S.th }}>Cost ₹</th><th style={{ ...S.th }}>Sell ₹</th></>}
                        {has3D && <th style={{ ...S.th }}>3D file</th>}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {vmRows.map(v => (
                    <tr key={v.id}>
                      <td style={{ ...S.td, fontWeight: 500 }}>{v.name}</td>
                      <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 120 }} value={v.variantId || ""} onChange={e => updateVariant(v.id, "variantId", e.target.value)} placeholder="001" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                      {beautyMode ? (
                        <>
                          <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={v.sellingPrice || ""} onChange={e => updateVariant(v.id, "sellingPrice", e.target.value)} placeholder="₹" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                          <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 220 }} value={v.productUrl || ""} onChange={e => updateVariant(v.id, "productUrl", e.target.value)} placeholder="Enter product URL" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                        </>
                      ) : (
                        <>
                          {showMeasurementCols && renderMeasurementCells(v)}
                          {!showMeasurementCols && !has3D && <>
                            <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={v.costPrice || ""} onChange={e => updateVariant(v.id, "costPrice", e.target.value)} placeholder="₹" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                            <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5, width: 110 }} value={v.sellingPrice || ""} onChange={e => updateVariant(v.id, "sellingPrice", e.target.value)} placeholder="₹" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                          </>}
                          {has3D && (
                            <td style={{ ...S.td }}>
                              <label style={{ width: 36, height: 36, borderRadius: 9, border: "1.5px dashed #f43f5e", background: "#fff5f6", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                <Upload size={14} color="#f43f5e" />
                                <input type="file" accept=".glb,.gltf,.fbx,.obj" style={{ display: "none" }} />
                              </label>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Pricing Mapping ── */}
          <div style={{ ...S.card, marginBottom: 22, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: pmSelectedOptions.length > 0 ? "1px solid #f2f2f2" : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Pricing Mapping</div>
              {filterTabs.length > 1 && pmSelectedOptions.length === 0 && (
                <button className="glamar-btn glamar-btn-primary" style={{ padding: "0 20px" }}
                  onClick={() => { setPmModalSelection(filterTabs.slice(1).find(t => !pmSelectedOptions.includes(t)) || ""); setPmModalOpen(true); }}>
                  Add
                </button>
              )}
            </div>
            {pmSelectedOptions.length > 0 && (
              <div style={{ padding: "18px 24px 0" }}>
                <div style={{ background: "#f5f5f5", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 10 }}>Base price</div>
                  <input style={{ ...S.input }} value={basePrice} onChange={e => setBasePrice(e.target.value)} placeholder="$ 0" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {pmSelectedOptions.map(t => (
                    <button key={t} style={tabPill(pmFilter === t)} onClick={() => setPmFilter(t)}>{t}</button>
                  ))}
                  {filterTabs.slice(1).some(t => !pmSelectedOptions.includes(t)) && (
                    <button style={tabPill(false)} onClick={() => { setPmModalSelection(filterTabs.slice(1).find(t => !pmSelectedOptions.includes(t)) || ""); setPmModalOpen(true); }}>+ More</button>
                  )}
                </div>
              </div>
            )}
            {pmSelectedOptions.length > 0 && pmFilter && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ ...S.th, width: 44, paddingLeft: 20 }}><input type="checkbox" style={{ cursor: "pointer" }} /></th>
                      <th style={{ ...S.th }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}>Variant <IcSort /></div></th>
                      <th style={{ ...S.th }}>Additional Pricing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pmRows.map(v => (
                      <tr key={v.id}>
                        <td style={{ ...S.td, paddingLeft: 20, width: 44 }}><input type="checkbox" style={{ cursor: "pointer" }} /></td>
                        <td style={{ ...S.td, fontWeight: 500 }}>{v.name}</td>
                        <td style={{ ...S.td }}><input style={{ ...S.input, height: 34, fontSize: 12.5 }} value={v.costPrice || ""} onChange={e => updateVariant(v.id, "costPrice", e.target.value)} placeholder="Placeholder Text" onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {pmModalOpen && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setPmModalOpen(false)}>
              <div style={{ background: "#fff", borderRadius: 16, width: 480, maxWidth: "90vw", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
                <div style={{ background: "#f5f5f5", padding: "20px 24px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Pricing Mapping</div>
                  <button onClick={() => setPmModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#888" }}><X size={18} /></button>
                </div>
                <div style={{ padding: "24px 24px 20px" }}>
                  <label style={{ ...S.label, color: "#888", fontWeight: 400 }}>Option name</label>
                  <div style={{ position: "relative" }}>
                    <select value={pmModalSelection} onChange={e => setPmModalSelection(e.target.value)} style={{ ...S.select, height: 48, fontSize: 14 }}>
                      {filterTabs.slice(1).filter(t => !pmSelectedOptions.includes(t)).map(t => (<option key={t} value={t}>{t}</option>))}
                    </select>
                    <ChevronDown size={16} color="#888" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                </div>
                <div style={{ padding: "0 24px 24px", display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button onClick={() => setPmModalOpen(false)} style={{ background: "#fff", color: "#f43f5e", border: "1.5px solid #f43f5e", borderRadius: 24, padding: "9px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                  <button onClick={() => { if (!pmModalSelection) return; setPmSelectedOptions(prev => prev.includes(pmModalSelection) ? prev : [...prev, pmModalSelection]); setPmFilter(pmModalSelection); setPmModalOpen(false); }} className="glamar-btn glamar-btn-primary" style={{ borderRadius: 24, padding: "9px 24px" }}>Select</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

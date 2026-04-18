import { DIMENSION_UNITS, CATEGORY_TREE, AR_SETTINGS_CONFIG } from "../../shared/constants.jsx";

export function createProductId(headCategory) {
  const prefix = headCategory === "Beauty" ? "b" : headCategory === "Home" ? "h" : "p";
  return `${prefix}-${Date.now()}`;
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function slugToName(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function buildSkuFromName(name, fallbackPrefix = "SKU") {
  const letters = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6) || fallbackPrefix;
  return `${fallbackPrefix}-${letters}`;
}

export function getEmptyMeasurementFields() {
  return {
    dimensionLength: "",
    dimensionBreadth: "",
    dimensionHeight: "",
    dimensionUnit: "mm",
    ringInnerDiameter: "",
    isDiamondRing: "no",
    diamondShape: "",
    diamondCaratSize: "",
    watchCaseDiameter: "",
    watchLugToLug: "",
    watchCaseThickness: "",
    watchStrapType: "",
  };
}

export function getMeasurementSchema(headCategory, category, subcategory) {
  if (headCategory === "Lifestyle" && category === "Watches") return "watch";
  if (headCategory === "Lifestyle" && category === "Jewellery" && subcategory === "Rings") return "ring";
  return "dimension";
}

export function parseDimension(dimension = "") {
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

export function formatDimension({ dimensionLength, dimensionBreadth, dimensionHeight, dimensionUnit }) {
  const parts = [dimensionLength, dimensionBreadth, dimensionHeight].map(v => (v || "").trim()).filter(Boolean);
  if (parts.length === 0) return "";
  return `${parts.join(" x ")} ${(dimensionUnit || "mm").trim()}`.trim();
}

export function hydrateMeasurementFields(measurements, dimension) {
  const base = getEmptyMeasurementFields();
  if (measurements?.schema === "ring") {
    return {
      ...base,
      ringInnerDiameter: measurements.innerDiameter || "",
      isDiamondRing: measurements.isDiamondRing || "no",
      diamondShape: measurements.diamondShape || "",
      diamondCaratSize: measurements.diamondCaratSize || "",
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

export function buildMeasurement(schema, values) {
  if (schema === "ring") {
    const innerDiameter = (values.ringInnerDiameter || "").trim();
    const isDiamondRing = values.isDiamondRing || "no";
    const diamondShape = (values.diamondShape || "").trim();
    const diamondCaratSize = (values.diamondCaratSize || "").trim();
    const parts = [];
    if (innerDiameter) parts.push(`Inner diameter: ${innerDiameter} mm`);
    if (isDiamondRing === "yes") {
      parts.push("Diamond Ring");
      if (diamondShape) parts.push(`Shape: ${diamondShape}`);
      if (diamondCaratSize) parts.push(`Carat: ${diamondCaratSize} mm`);
    }
    return {
      dimension: parts.join(" | "),
      measurements: { schema: "ring", innerDiameter, isDiamondRing, diamondShape, diamondCaratSize },
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

export function getGeneralInitialForm(editProduct) {
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

export function getBeautyInitialForm(editProduct) {
  return {
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    productName: editProduct?.name || "",
    skuId: editProduct?.skuId || "",
    productUrl: editProduct?.productUrl || "",
    additionalFields: editProduct?.additionalFields || {},
    costPrice: editProduct?.costPrice || "",
    sellingPrice: editProduct?.sellingPrice || editProduct?.variants?.[0]?.price || "",
    hasThumbnail: editProduct?.media?.hasThumbnail || false,
  };
}

export function hydrateVariantAttributes(variant, index) {
  const fallbackName = variant.name || `Variant ${index + 1}`;
  if (variant.attributes?.length) {
    return variant.attributes.map((attr, attrIndex) => (
      attrIndex === 0 && !attr.color && !attr.image && (variant.color || variant.image)
        ? { ...attr, color: variant.color || undefined, image: variant.image || undefined }
        : attr
    ));
  }
  return [{
    attr: (variant.color || variant.image) ? "Color" : "Variant",
    val: fallbackName,
    color: variant.color || undefined,
    image: variant.image || undefined,
  }];
}

export function mapVariantOptionsForEditor(product) {
  if (product?.variantOptions?.length) return product.variantOptions;

  const optionMap = new Map();
  (product?.variants || []).forEach((variant, index) => {
    hydrateVariantAttributes(variant, index).forEach((attr) => {
      const optionName = attr.attr || "Variant";
      const valueType = attr.image ? "image" : attr.color ? "color" : "text";
      if (!optionMap.has(optionName)) {
        optionMap.set(optionName, { name: optionName, valueType, optionRole: "sku", values: [] });
      }
      const option = optionMap.get(optionName);
      if (valueType === "image") option.valueType = "image";
      else if (valueType === "color" && option.valueType === "text") option.valueType = "color";

      const exists = option.values.some((value) => value.label === attr.val);
      if (!exists) {
        option.values.push({
          label: attr.val,
          ...(attr.color ? { color: attr.color } : {}),
          ...(attr.image ? { image: attr.image } : {}),
        });
      }
    });
  });

  return Array.from(optionMap.values());
}

export function mapGeneralVariantsForEditor(product) {
  return (product?.variants || []).map((variant, index) => {
    const parsedMeasurements = hydrateMeasurementFields(variant.measurements, variant.dimension || "");
    const hydratedAttributes = hydrateVariantAttributes(variant, index);
    return {
      id: variant.id || `var-${Date.now()}-${index}`,
      name: variant.name || `Variant ${index + 1}`,
      attributes: hydratedAttributes,
      variantId: variant.variantId || "",
      additionalPrice: variant.additionalPrice || "",
      ...parsedMeasurements,
      costPrice: variant.costPrice || "",
      sellingPrice: variant.sellingPrice || variant.price || "",
      price: variant.sellingPrice || variant.price || "",
      color: variant.color || "",
    };
  });
}

export function mapBeautyVariantsForEditor(product) {
  return (product?.variants || []).map((variant, index) => {
    const hydratedAttributes = hydrateVariantAttributes(variant, index);
    return {
      id: variant.id || `var-${Date.now()}-${index}`,
      name: variant.name || `Variant ${index + 1}`,
      attributes: hydratedAttributes,
      variantId: variant.variantId || "",
      additionalPrice: variant.additionalPrice || "",
      costPrice: variant.costPrice || "",
      sellingPrice: variant.sellingPrice || variant.price || "",
      price: variant.sellingPrice || variant.price || "",
      color: variant.color || "",
      productUrl: variant.productUrl || "",
      modelFileName: variant.modelFileName || "",
    };
  });
}

export function getVariantValueLabel(value) {
  return typeof value === "string" ? value : value?.label || "";
}

export function getStudioDisplayType(option) {
  if (option?.studioConfig?.displayType) return option.studioConfig.displayType;
  if (option?.valueType === "image") return "thumbnail";
  if (option?.valueType === "color") return "swatch";
  return "text";
}

export function ensureStudioVariantOptions(options = []) {
  return options.map((option) => ({
    ...option,
    optionRole: option.optionRole || "configurator",
    values: (option.values || []).map((value) => (
      typeof value === "string"
        ? { label: value }
        : { ...value, label: getVariantValueLabel(value) }
    )),
    studioConfig: {
      displayType: getStudioDisplayType(option),
      showNameLabel: option?.studioConfig?.showNameLabel ?? true,
      largeThumbnail: option?.studioConfig?.largeThumbnail ?? false,
    },
  }));
}

export function normalizeStudioValuesForType(values, valueType) {
  return (values || []).map((value) => {
    const label = getVariantValueLabel(value);
    if (valueType === "color") return { label, color: value?.color || "#da0e64" };
    if (valueType === "image") return { label, image: value?.image || "" };
    return { label };
  });
}

export function getStudioMeasurementSchema(product) {
  return getMeasurementSchema(product?.headCategory, product?.category, product?.subcategory);
}

export function countStudioOptionAnswers(option = {}) {
  return (option.values || []).filter((value) => getVariantValueLabel(value).trim()).length;
}

export function countStudioVariantCombinations(options = []) {
  if (!options.length) return 0;
  return options.reduce((total, option) => total * countStudioOptionAnswers(option), 1);
}

export function parsePriceAmount(value) {
  const normalized = String(value || "").replace(/[^0-9.]/g, "");
  if (!normalized) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

export function formatPriceAmount(amount) {
  if (!Number.isFinite(amount)) return "";
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/\.?0+$/, "");
}

export function getVariantAdditionalPriceFromMappings(variant, pricingAdjustments = {}) {
  let total = 0;
  let hasAdjustment = false;
  (variant.attributes || []).forEach((attr) => {
    const amount = parsePriceAmount(pricingAdjustments?.[attr.attr]?.[attr.val]);
    if (amount === null) return;
    total += amount;
    hasAdjustment = true;
  });
  return hasAdjustment ? formatPriceAmount(total) : "";
}

export function getVariantSellingPrice(basePrice, additionalPrice, fallbackPrice = "") {
  const baseAmount = parsePriceAmount(basePrice);
  const additionalAmount = parsePriceAmount(additionalPrice);
  if (baseAmount !== null || additionalAmount !== null) {
    return formatPriceAmount((baseAmount || 0) + (additionalAmount || 0));
  }
  return (fallbackPrice || basePrice || "").trim();
}

export function getCategoryData(headCategory, cat) {
  return CATEGORY_TREE[headCategory]?.[cat] || null;
}

export function categoryHasL2(headCategory, category) {
  return Boolean(getCategoryData(headCategory, category)?.subcategories?.length);
}

export function getCategoryLookupKey(headCategory, category, subcategory) {
  if (!category) return "";
  return categoryHasL2(headCategory, category) ? subcategory : category;
}

export function getStudioPopupCanContinue(form, headCategory, baseProduct) {
  const catData = form.category ? CATEGORY_TREE[headCategory]?.[form.category] : null;
  const requiresSubcategory = Boolean(form.category && categoryHasL2(headCategory, form.category));
  const selectedCategoryKey = getCategoryLookupKey(headCategory, form.category, form.subcategory);
  const has3D = Boolean(catData && selectedCategoryKey && catData.modelling3D?.[selectedCategoryKey]);
  const hasMappedVariants = Boolean(baseProduct?.variants?.length);
  const hasRequiredProductId = hasMappedVariants || !!form.skuId.trim();
  const mandatoryFilled = !!form.category && (!requiresSubcategory || !!form.subcategory) && !!form.productName.trim() && hasRequiredProductId;
  const hasMedia = form.hasImages || form.hasModel;
  return mandatoryFilled && (!has3D || hasMedia);
}

export function buildStudioProductDraft({ form, headCategory, baseProduct }) {
  const requiresSubcategory = Boolean(form.category && categoryHasL2(headCategory, form.category));
  const selectedCategoryKey = getCategoryLookupKey(headCategory, form.category, form.subcategory);
  const catData = form.category ? CATEGORY_TREE[headCategory]?.[form.category] : null;
  const has3D = Boolean(catData && selectedCategoryKey && catData.modelling3D?.[selectedCategoryKey]);

  return {
    ...(baseProduct || {}),
    id: baseProduct?.id || createProductId(headCategory),
    name: form.productName.trim(),
    skuId: form.skuId.trim(),
    category: form.category,
    subcategory: requiresSubcategory ? form.subcategory : "",
    displayName: form.displayName || "",
    headCategory,
    status: baseProduct?.status || "inactive",
    date: baseProduct?.date || getTodayDate(),
    additionalFields: baseProduct?.additionalFields || {},
    productUrl: (form.productUrl || baseProduct?.productUrl || "").trim(),
    costPrice: baseProduct?.costPrice || "",
    sellingPrice: baseProduct?.sellingPrice || baseProduct?.variants?.[0]?.sellingPrice || baseProduct?.variants?.[0]?.price || "",
    dimension: baseProduct?.dimension || "",
    measurements: baseProduct?.measurements,
    variantOptions: ensureStudioVariantOptions(baseProduct?.variantOptions?.length ? baseProduct.variantOptions : mapVariantOptionsForEditor(baseProduct)),
    variants: baseProduct?.variants?.length ? mapGeneralVariantsForEditor(baseProduct) : [],
    pricingAdjustments: baseProduct?.pricingAdjustments || {},
    pricingOptionNames: baseProduct?.pricingOptionNames || [],
    arSettings: baseProduct?.arSettings || {},
    media: {
      ...(baseProduct?.media || {}),
      hasImages: form.hasImages,
      hasModel: has3D ? form.hasModel : false,
      is2D: form.is2D,
      imageTab: form.imageTab || "productImages",
      hasThumbnail: form.hasThumbnail,
    },
  };
}

export function makeVariantSignature(attributes = []) {
  return attributes.map((attr) => `${attr.attr}:${attr.val}`).join("|");
}

export function generateStudioVariants(options = [], existingVariants = [], measurementSchema = "dimension") {
  const skuOptions = options.filter((option) => option.optionRole !== "configurator" && option.valueType !== "text");
  if (skuOptions.length === 0) return [];

  const combos = skuOptions.reduce((acc, option) => {
    const optionValues = (option.values || []).map((value) => ({
      attr: option.name,
      val: getVariantValueLabel(value),
      color: value.color,
      image: value.image,
    })).filter((value) => value.val);

    if (acc.length === 0) return optionValues.map((value) => [value]);
    const next = [];
    acc.forEach((combo) => optionValues.forEach((value) => next.push([...combo, value])));
    return next;
  }, []);

  const existingMap = new Map((existingVariants || []).map((variant) => [makeVariantSignature(variant.attributes), variant]));

  return combos.map((combo, index) => {
    const signature = makeVariantSignature(combo);
    const existing = existingMap.get(signature);
    const detail = existing ? hydrateMeasurementFields(existing.measurements, existing.dimension || "") : getEmptyMeasurementFields();

    return {
      id: existing?.id || `var-${Date.now()}-${index}`,
      name: combo.map((item) => item.val).join(" / "),
      attributes: combo,
      variantId: existing?.variantId || "",
      additionalPrice: existing?.additionalPrice || "",
      costPrice: existing?.costPrice || "",
      sellingPrice: existing?.sellingPrice || existing?.price || "",
      price: existing?.sellingPrice || existing?.price || "",
      color: existing?.color || combo.find((item) => item.color)?.color || "",
      measurements: existing?.measurements || buildMeasurement(measurementSchema, detail).measurements,
      dimension: existing?.dimension || buildMeasurement(measurementSchema, detail).dimension,
      ...detail,
    };
  });
}

export function getARConfig(subcategory) {
  return AR_SETTINGS_CONFIG[subcategory?.toLowerCase().replace(/\s+/g, "")] || null;
}

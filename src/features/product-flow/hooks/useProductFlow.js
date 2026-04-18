import { useCallback, useMemo, useState } from "react";
import { VIEW_TYPES } from "../../../shared/constants/viewTypes";

export function useProductFlow({
  initialView = VIEW_TYPES.LISTING,
  initialActiveTab = "Lifestyle",
  initialSidebarPage = "products",
  products = [],
  setProducts,
} = {}) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [view, setView] = useState(initialView);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [arStudioStartsDirty, setArStudioStartsDirty] = useState(false);
  const [sidebarPage, setSidebarPage] = useState(initialSidebarPage);
  const [aiStylistFullscreen, setAIStylistFullscreen] = useState(false);
  const [toast, setToast] = useState(null);

  const isAIStylist = sidebarPage === "aiStylist";
  const hideSidebar =
    view === VIEW_TYPES.ADD_PRODUCT ||
    view === VIEW_TYPES.PRODUCT_DETAIL ||
    view === VIEW_TYPES.AR_STUDIO ||
    aiStylistFullscreen;
  const hideTopbar =
    view === VIEW_TYPES.ADD_PRODUCT ||
    view === VIEW_TYPES.PRODUCT_DETAIL ||
    view === VIEW_TYPES.AR_STUDIO;

  const openListing = useCallback(() => {
    setView(VIEW_TYPES.LISTING);
    setSelectedProduct(null);
    setArStudioStartsDirty(false);
  }, []);

  const openAddProduct = useCallback((product = null) => {
    setSelectedProduct(product);
    setArStudioStartsDirty(false);
    setView(VIEW_TYPES.ADD_PRODUCT);
  }, []);

  const openProduct = useCallback((product) => {
    setSelectedProduct(product ?? null);
    setArStudioStartsDirty(false);
    if (product?.headCategory === "Beauty") {
      setView(VIEW_TYPES.AR_STUDIO);
      return;
    }
    setView(VIEW_TYPES.PRODUCT_DETAIL);
  }, []);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleSidebarNavigate = useCallback((page, category) => {
    setSidebarPage(page);
    if (category) setActiveTab(category);
    if (page !== "aiStylist") setAIStylistFullscreen(false);
    if (page === "products") {
      setView(VIEW_TYPES.LISTING);
      setSelectedProduct(null);
      setArStudioStartsDirty(false);
    }
  }, []);

  const openProductDetail = useCallback((product) => {
    setSelectedProduct(product ?? null);
    setView(VIEW_TYPES.PRODUCT_DETAIL);
  }, []);

  const openARStudio = useCallback((product) => {
    setSelectedProduct(product ?? null);
    setView(VIEW_TYPES.AR_STUDIO);
  }, []);

  const goPrevProduct = useCallback((tabProducts) => {
    if (!selectedProduct) return;
    const idx = tabProducts.findIndex((p) => p.id === selectedProduct.id);
    if (idx > 0) setSelectedProduct(tabProducts[idx - 1]);
  }, [selectedProduct]);

  const goNextProduct = useCallback((tabProducts) => {
    if (!selectedProduct) return;
    const idx = tabProducts.findIndex((p) => p.id === selectedProduct.id);
    if (idx < tabProducts.length - 1) setSelectedProduct(tabProducts[idx + 1]);
  }, [selectedProduct]);

  const toggleProductStatus = useCallback((id) => {
    if (!setProducts) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, status: product.status === "active" ? "inactive" : "active" }
          : product
      )
    );
  }, [setProducts]);

  const handleSaveProduct = useCallback((productData, nextView = VIEW_TYPES.LISTING) => {
    if (!setProducts) return;
    const isEdit = products.some((product) => product.id === productData.id);
    const isGenerating3D = nextView === VIEW_TYPES.PRODUCT_DETAIL;
    const enriched = {
      ...productData,
      modelGenerating: isGenerating3D ? true : (productData.modelGenerating || false),
      status: productData.media?.hasModel ? productData.status : "inactive",
    };

    setProducts((prev) =>
      isEdit ? prev.map((product) => (product.id === enriched.id ? enriched : product)) : [enriched, ...prev]
    );

    setActiveTab(enriched.headCategory);
    setSelectedProduct(enriched);
    setArStudioStartsDirty(nextView === VIEW_TYPES.AR_STUDIO);
    setView(nextView);
    if (nextView === VIEW_TYPES.LISTING) setSelectedProduct(null);

    if (isGenerating3D) {
      showToast("3D model generation started");
    } else {
      showToast(isEdit ? "Product updated successfully" : "Product added successfully");
    }
  }, [products, setProducts, showToast]);

  const handleSaveARSettings = useCallback((productId, arSettings) => {
    if (!setProducts) return;
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, arSettings } : product))
    );
    setSelectedProduct((prev) => (prev && prev.id === productId ? { ...prev, arSettings } : prev));
    setArStudioStartsDirty(false);
    showToast("AR settings saved successfully");
  }, [setProducts, showToast]);

  const actions = useMemo(
    () => ({
      openListing,
      openAddProduct,
      openProduct,
      openProductDetail,
      openARStudio,
      goPrevProduct,
      goNextProduct,
      toggleProductStatus,
      handleSaveProduct,
      handleSaveARSettings,
      handleSidebarNavigate,
      showToast,
    }),
    [
      openListing,
      openAddProduct,
      openProduct,
      openProductDetail,
      openARStudio,
      goPrevProduct,
      goNextProduct,
      toggleProductStatus,
      handleSaveProduct,
      handleSaveARSettings,
      handleSidebarNavigate,
      showToast,
    ]
  );

  return {
    activeTab,
    setActiveTab,
    view,
    setView,
    selectedProduct,
    setSelectedProduct,
    arStudioStartsDirty,
    setArStudioStartsDirty,
    sidebarPage,
    setSidebarPage,
    aiStylistFullscreen,
    setAIStylistFullscreen,
    toast,
    setToast,
    isAIStylist,
    hideSidebar,
    hideTopbar,
    ...actions,
  };
}

import { useState } from "react";
import { Topbar } from "./layout/Topbar";
import { Sidebar } from "./layout/Sidebar";
import { DEFAULT_SDK_MAPPINGS, INITIAL_PRODUCTS, S } from "./shared/constants.jsx";
import ListingView from "./features/listing/views/ListingView";
import AddProductView from "./features/add-product/views/AddProductView";
import ProductDetailView from "./features/product-detail/views/ProductDetailView";
import ARStudioView from "./features/ar-studio/views/ARStudioView";
import { AIStylistPage } from "./features/ai-stylist/AIStylistPage";
import { useProductFlow } from "./features/product-flow/hooks/useProductFlow";
import Toast from "./shared/components/Toast";

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [sdkMappings, setSdkMappings] = useState(DEFAULT_SDK_MAPPINGS);

  const {
    activeTab,
    view,
    setView,
    selectedProduct,
    arStudioStartsDirty,
    sidebarPage,
    setAIStylistFullscreen,
    toast,
    setToast,
    isAIStylist,
    hideSidebar,
    hideTopbar,
    openAddProduct,
    openProduct,
    handleSidebarNavigate,
    goPrevProduct,
    goNextProduct,
    toggleProductStatus,
    handleSaveProduct,
    handleSaveARSettings,
  } = useProductFlow({ products, setProducts });

  const addSdkMapping = (subcategory, displayName) => {
    setSdkMappings((prev) => ({
      ...prev,
      [subcategory]: [...(prev[subcategory] || []), displayName],
    }));
  };

  const tabProducts = products.filter((product) => product.headCategory === activeTab);

  const handleAddProduct = () => openAddProduct(null);
  const handleViewProduct = (product) => openProduct(product);
  const handleEditProduct = (product) => openAddProduct(product);
  const handleToggleStatus = (id) => toggleProductStatus(id);

  const handlePrev = () => goPrevProduct(tabProducts);
  const handleNext = () => goNextProduct(tabProducts);

  return (
    <div style={{ ...S.app, flexDirection: "column" }}>
      {!hideTopbar && <Topbar />}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!hideSidebar && (
          <Sidebar
            activePage={sidebarPage}
            activeCategory={activeTab}
            onNavigate={handleSidebarNavigate}
          />
        )}

        <div style={S.main}>
          <div
            style={{
              ...S.content,
              padding: hideTopbar ? 0 : S.content.padding,
              display: "flex",
              flexDirection: "column",
              overflow: view === "listing" || view === "arStudio" ? "hidden" : "auto",
            }}
          >
            {isAIStylist && <AIStylistPage onFullscreenChange={setAIStylistFullscreen} />}

            {!isAIStylist && view === "listing" && (
              <ListingView
                products={products}
                activeTab={activeTab}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct}
                onToggleStatus={handleToggleStatus}
              />
            )}

            {!isAIStylist && view === "addProduct" && (
              <AddProductView
                activeTab={activeTab}
                selectedProduct={selectedProduct}
                sdkMappings={sdkMappings}
                onAddSdkMapping={addSdkMapping}
                onSaveProduct={handleSaveProduct}
                onBack={() => setView("listing")}
              />
            )}

            {!isAIStylist && view === "productDetail" && selectedProduct && (
              <ProductDetailView
                product={selectedProduct}
                headCategory={activeTab}
                onBack={() => setView("listing")}
                onPrev={handlePrev}
                onNext={handleNext}
                onEditProduct={handleEditProduct}
              />
            )}

            {!isAIStylist && view === "arStudio" && selectedProduct && (
              <ARStudioView
                product={selectedProduct}
                onBack={() => setView("listing")}
                onPrev={handlePrev}
                onNext={handleNext}
                onToggleStatus={handleToggleStatus}
                onEditProduct={handleEditProduct}
                startDirty={arStudioStartsDirty}
                onSaveSettings={(arSettings) =>
                  handleSaveARSettings(selectedProduct.id, arSettings)
                }
              />
            )}
          </div>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

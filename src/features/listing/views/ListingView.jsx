import { BeautyListing } from "../../beauty/BeautyListing";
import { GeneralListing } from "../../products/GeneralListing";

export default function ListingView({
  products,
  activeTab,
  onAddProduct,
  onEditProduct,
  onViewProduct,
  onToggleStatus,
}) {
  if (activeTab === "Beauty") {
    return (
      <BeautyListing
        products={products}
        activeTab={activeTab}
        onAddProduct={onAddProduct}
        onEditProduct={onEditProduct}
        onViewProduct={onViewProduct}
        onToggleStatus={onToggleStatus}
      />
    );
  }

  return (
    <GeneralListing
      products={products}
      activeTab={activeTab}
      onAddProduct={onAddProduct}
      onEditProduct={onEditProduct}
      onViewProduct={onViewProduct}
      onToggleStatus={onToggleStatus}
    />
  );
}

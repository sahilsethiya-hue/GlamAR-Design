import { BeautyAddForm } from "../../beauty/BeautyAddForm";
import { GeneralAddForm } from "../../products/GeneralAddForm";

export default function AddProductView({
  activeTab,
  selectedProduct,
  sdkMappings,
  onAddSdkMapping,
  onSaveProduct,
  onBack,
}) {
  if (activeTab === "Beauty") {
    return (
      <BeautyAddForm
        onBack={onBack}
        onSaveProduct={onSaveProduct}
        editProduct={selectedProduct}
      />
    );
  }

  return (
    <GeneralAddForm
      headCategory={activeTab}
      onBack={onBack}
      onSaveProduct={onSaveProduct}
      editProduct={selectedProduct}
      sdkMappings={sdkMappings}
      onAddSdkMapping={onAddSdkMapping}
    />
  );
}

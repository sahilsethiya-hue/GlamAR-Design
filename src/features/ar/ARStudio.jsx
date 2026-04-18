import { useState, useEffect } from "react";
import { Palette, Package } from "lucide-react";
import { BEAUTY_CATEGORIES, S } from "../../shared/constants.jsx";
import { ProductFlowHeader } from "../../layout/Topbar";
import { ARSettingsPanel } from "./ARSettingsPanel";

export function ARStudio({ product, onBack, onPrev, onNext, onToggleStatus, onEditProduct, startDirty = false, onSaveSettings }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveVersion, setSaveVersion] = useState(0);
  const hasAR = BEAUTY_CATEGORIES[product.category]?.ar?.[product.subcategory];

  useEffect(() => {
    setHasUnsavedChanges(startDirty);
    setSaveVersion(0);
  }, [product.id, product.subcategory, startDirty]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ProductFlowHeader
        title="AR Settings"
        tag={product.category}
        onBack={onBack}
        primaryLabel="Save"
        onPrimary={() => {
          if (hasAR && hasUnsavedChanges) setSaveVersion(v => v + 1);
        }}
        showSecondary={false}
        showPrimary={hasAR}
        primaryDisabled={!hasUnsavedChanges}
      />
      <div style={{ flex: 1, padding: "20px 24px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "grid", gridTemplateColumns: "264px minmax(0, 1fr) 320px", gap: 18, alignItems: "stretch", flex: 1, minHeight: 0 }}>

          {/* Left: Product details + Variants */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", minHeight: 0 }}>
            <div style={{ ...S.card, overflow: "hidden", padding: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Product details</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: "4px 0", lineHeight: "16px" }} onClick={() => onEditProduct(product)}>Edit</button>
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>SKU ID</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.skuId}</span>
                </div>
                <div style={{ height: 1, background: "#e0e0e0", borderRadius: 250 }} />
                <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Category</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.category}</span>
                  </div>
                  <div style={{ width: 1, background: "#e0e0e0", borderRadius: 250, alignSelf: "stretch" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Subcategory</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.subcategory}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...S.card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Variant</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, lineHeight: "16px", padding: 0 }}>Manage</button>
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.variants.map((v, i) => (
                  <div key={v.id} onClick={() => setSelectedVariant(i)} style={{ borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", padding: 12, gap: 10, border: `1px solid ${selectedVariant === i ? "#8f0941" : "#f0f0f0"}`, background: "#fff" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: v.color || "#f0f0f0", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, lineHeight: "16px", color: "#000" }}>{i + 1}. {v.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: AR Canvas */}
          <div style={{ background: "#f5f5f5", borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
            <div style={{ flex: 1, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 14px" }}>
              <div style={{ textAlign: "center", color: "#ccc" }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #fce4ec, #f8bbd0)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Palette size={48} strokeWidth={1} color="#e91e63" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#999" }}>AR Preview</p>
                <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 6 }}>Adjust settings on the right to preview</p>
              </div>
            </div>

            <div style={{ background: "#fff", borderTop: "1px solid #e0e0e0", padding: "8px 16px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "4px 8px", height: 32, display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M9.99991 15.8926C9.18477 16.7077 8.20268 17.1153 7.05363 17.1153C5.90458 17.1153 4.92249 16.7077 4.10735 15.8926C3.29221 15.0774 2.88464 14.0954 2.88464 12.9463C2.88464 11.7973 3.29221 10.8152 4.10735 10L5.87512 8.23226C6.04207 8.06531 6.23849 7.98183 6.46437 7.98183C6.69025 7.98183 6.88667 8.06531 7.05363 8.23226C7.22058 8.39922 7.30406 8.59564 7.30406 8.82152C7.30406 9.0474 7.22058 9.24382 7.05363 9.41077L5.28586 11.1785C4.79481 11.6696 4.54929 12.2588 4.54929 12.9463C4.54929 13.6338 4.79481 14.223 5.28586 14.7141C5.77691 15.2051 6.36616 15.4506 7.05363 15.4506C7.74109 15.4506 8.33035 15.2051 8.82139 14.7141L10.5892 12.9463C10.7561 12.7794 10.9525 12.6959 11.1784 12.6959C11.4043 12.6959 11.6007 12.7794 11.7677 12.9463C11.9346 13.1133 12.0181 13.3097 12.0181 13.5356C12.0181 13.7614 11.9346 13.9579 11.7677 14.1248L9.99991 15.8926ZM8.82139 12.3571C8.65444 12.524 8.45802 12.6075 8.23214 12.6075C8.00626 12.6075 7.80984 12.524 7.64288 12.3571C7.47593 12.1901 7.39245 11.9937 7.39245 11.7678C7.39245 11.5419 7.47593 11.3455 7.64288 11.1785L11.1784 7.64301C11.3454 7.47605 11.5418 7.39257 11.7677 7.39257C11.9936 7.39257 12.19 7.47605 12.3569 7.64301C12.5239 7.80996 12.6074 8.00638 12.6074 8.23226C12.6074 8.45814 12.5239 8.65456 12.3569 8.82152L8.82139 12.3571ZM14.1247 11.7678C13.9577 11.9348 13.7613 12.0182 13.5354 12.0182C13.3096 12.0182 13.1131 11.9348 12.9462 11.7678C12.7792 11.6008 12.6958 11.4044 12.6958 11.1785C12.6958 10.9527 12.7792 10.7562 12.9462 10.5893L14.714 8.82152C15.205 8.33047 15.4505 7.74121 15.4505 7.05375C15.4505 6.36628 15.205 5.77703 14.714 5.28598C14.2229 4.79494 13.6336 4.54941 12.9462 4.54941C12.2587 4.54941 11.6695 4.79494 11.1784 5.28598L9.41065 7.05375C9.24369 7.22071 9.04728 7.30418 8.82139 7.30418C8.59551 7.30418 8.39909 7.22071 8.23214 7.05375C8.06518 6.88679 7.98171 6.69038 7.98171 6.46449C7.98171 6.23861 8.06518 6.04219 8.23214 5.87524L9.99991 4.10747C10.815 3.29233 11.7971 2.88477 12.9462 2.88477C14.0952 2.88477 15.0773 3.29233 15.8925 4.10747C16.7076 4.92261 17.1152 5.9047 17.1152 7.05375C17.1152 8.2028 16.7076 9.18489 15.8925 10L14.1247 11.7678Z" fill="#000000" fillOpacity="0.65" />
                </svg>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://www.meshy.ai/3d-models/Russia-Matryoshka-dolls-colorful-Cute-Different-sizes-around-the-biggest-one</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                {[
                  <svg key="copy" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66671 16.6668L1.66671 8.33349C1.66671 7.41683 2.40838 6.66683 3.33338 6.66683L11.6667 6.66683C12.5834 6.66683 13.3334 7.41683 13.3334 8.3335L13.3334 16.6668C13.3334 17.5835 12.5834 18.3335 11.6667 18.3335L3.33337 18.3335C2.40837 18.3335 1.66671 17.5835 1.66671 16.6668ZM15 6.66683L15 13.3335L16.6667 13.3335C17.5834 13.3335 18.3334 12.5835 18.3334 11.6668L18.3334 3.3335C18.3334 2.41683 17.5834 1.66683 16.6667 1.66683L8.33338 1.66683C7.40838 1.66683 6.66671 2.41683 6.66671 3.3335L6.66671 5.00016L13.3334 5.00016C14.25 5.00016 15 5.75016 15 6.66683Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  <svg key="qr" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8.33333V3.33333C2.5 3.1 2.58333 2.9 2.74167 2.74167C2.9 2.58333 3.1 2.5 3.33333 2.5H8.33333C8.56667 2.5 8.76667 2.58333 8.925 2.74167C9.08333 2.9 9.16667 3.1 9.16667 3.33333V8.33333C9.16667 8.56667 9.08333 8.76667 8.925 8.925C8.76667 9.08333 8.56667 9.16667 8.33333 9.16667H3.33333C3.1 9.16667 2.9 9.08333 2.74167 8.925C2.58333 8.76667 2.5 8.56667 2.5 8.33333ZM4.16667 7.5H7.5V4.16667H4.16667V7.5ZM2.5 16.6667V11.6667C2.5 11.4333 2.58333 11.2333 2.74167 11.075C2.9 10.9167 3.1 10.8333 3.33333 10.8333H8.33333C8.56667 10.8333 8.76667 10.9167 8.925 11.075C9.08333 11.2333 9.16667 11.4333 9.16667 11.6667V16.6667C9.16667 16.9 9.08333 17.1 8.925 17.2583C8.76667 17.4167 8.56667 17.5 8.33333 17.5H3.33333C3.1 17.5 2.9 17.4167 2.74167 17.2583C2.58333 17.1 2.5 16.9 2.5 16.6667ZM4.16667 15.8333H7.5V12.5H4.16667V15.8333ZM10.8333 8.33333V3.33333C10.8333 3.1 10.9167 2.9 11.075 2.74167C11.2333 2.58333 11.4333 2.5 11.6667 2.5H16.6667C16.9 2.5 17.1 2.58333 17.2583 2.74167C17.4167 2.9 17.5 3.1 17.5 3.33333V8.33333C17.5 8.56667 17.4167 8.76667 17.2583 8.925C17.1 9.08333 16.9 9.16667 16.6667 9.16667H11.6667C11.4333 9.16667 11.2333 9.08333 11.075 8.925C10.9167 8.76667 10.8333 8.56667 10.8333 8.33333ZM12.5 7.5H15.8333V4.16667H12.5V7.5ZM15.8333 17.5V15.8333H17.5V17.5H15.8333ZM10.8333 12.5V10.8333H12.5V12.5H10.8333ZM12.5 14.1667V12.5H14.1667V14.1667H12.5ZM10.8333 15.8333V14.1667H12.5V15.8333H10.8333ZM12.5 17.5V15.8333H14.1667V17.5H12.5ZM14.1667 15.8333V14.1667H15.8333V15.8333H14.1667ZM14.1667 12.5V10.8333H15.8333V12.5H14.1667ZM15.8333 14.1667V12.5H17.5V14.1667H15.8333Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  <svg key="code" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.7554 10.0269L7.1279 13.3994C7.28746 13.559 7.36724 13.762 7.36724 14.0086C7.36724 14.2552 7.28746 14.4583 7.1279 14.6179C6.96834 14.7774 6.76526 14.8572 6.51867 14.8572C6.27208 14.8572 6.069 14.7774 5.90945 14.6179L1.90596 10.6144C1.81893 10.5273 1.75728 10.4331 1.72102 10.3315C1.68476 10.23 1.66663 10.1212 1.66663 10.0052C1.66663 9.88911 1.68476 9.78032 1.72102 9.67878C1.75728 9.57724 1.81893 9.48296 1.90596 9.39593L5.90945 5.39244C6.08351 5.21838 6.29021 5.13135 6.52955 5.13135C6.76889 5.13135 6.97559 5.21838 7.14965 5.39244C7.32372 5.56651 7.41075 5.77321 7.41075 6.01255C7.41075 6.25189 7.32372 6.45859 7.14965 6.63265L3.7554 10.0269ZM16.2445 9.98339L12.872 6.6109C12.7125 6.45134 12.6327 6.24826 12.6327 6.00167C12.6327 5.75508 12.7125 5.552 12.872 5.39244C13.0316 5.23289 13.2347 5.15311 13.4812 5.15311C13.7278 5.15311 13.9309 5.23289 14.0905 5.39244L18.094 9.39593C18.181 9.48296 18.2426 9.57724 18.2789 9.67878C18.3152 9.78032 18.3333 9.88911 18.3333 10.0052C18.3333 10.1212 18.3152 10.23 18.2789 10.3315C18.2426 10.4331 18.181 10.5273 18.094 10.6144L14.0905 14.6179C13.9164 14.7919 13.7133 14.8753 13.4812 14.8681C13.2492 14.8608 13.0461 14.7702 12.872 14.5961C12.698 14.422 12.6109 14.2153 12.6109 13.976C12.6109 13.7367 12.698 13.53 12.872 13.3559L16.2445 9.98339Z" fill="#000000" fillOpacity="0.65" /></svg>,
                  <svg key="dl" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.15833 2.50179C9.15833 2.26846 9.24167 2.06846 9.4 1.91012C9.55833 1.75179 9.75833 1.66846 9.99167 1.66846C10.225 1.66846 10.425 1.75179 10.5833 1.91012C10.7417 2.06846 10.825 2.26846 10.825 2.50179V11.3435L12.9417 9.22679C13.1083 9.06012 13.3 8.97679 13.525 8.98512C13.75 8.98512 13.9417 9.06846 14.1083 9.22679C14.275 9.39346 14.3583 9.58512 14.3667 9.81012C14.375 10.0351 14.2917 10.2268 14.125 10.3935L10.5667 13.9518C10.4833 14.0351 10.3917 14.0935 10.2917 14.1268C10.1917 14.1601 10.0917 14.1768 9.975 14.1768C9.85833 14.1768 9.75833 14.1601 9.66667 14.1268C9.575 14.0935 9.48333 14.0351 9.4 13.9518L5.86667 10.4185C5.7 10.2518 5.61667 10.0518 5.61667 9.82679C5.61667 9.60179 5.7 9.40179 5.86667 9.23512C6.03333 9.08512 6.23333 9.01012 6.45833 9.01012C6.68333 9.01012 6.875 9.08512 7.03333 9.24346L9.15 11.3601V2.50179H9.15833ZM17.5 17.4985C17.5 17.0402 17.125 16.6652 16.6667 16.6652H3.33333C2.875 16.6652 2.5 17.0402 2.5 17.4985C2.5 17.9569 2.875 18.3319 3.33333 18.3319H16.6667C17.125 18.3319 17.5 17.9569 17.5 17.4985Z" fill="#000000" fillOpacity="0.65" /></svg>,
                ].map((icon, i) => (
                  <button key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AR Settings panel */}
          <div style={{ overflow: "visible", minHeight: 0, overflowY: "auto" }}>
            {hasAR ? <ARSettingsPanel
              subcategory={product.subcategory}
              initialSettings={product.arSettings}
              startDirty={startDirty}
              onDirtyChange={setHasUnsavedChanges}
              onSaveSettings={onSaveSettings}
              saveVersion={saveVersion}
            /> : (
              <div style={{ ...S.card, textAlign: "center", color: "#bbb", padding: 40 }}>
                <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
                <p>AR not available for {product.subcategory}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowLeft, Box, Link, X, Copy, QrCode, Code2, Download } from "lucide-react";
import { S } from "../../shared/constants.jsx";
import { getCategoryData, getCategoryLookupKey } from "./utils";
import { ProductFlowHeader } from "../../layout/Topbar";
import { GeneralSettingsPanel } from "../studio/GeneralSettingsPanel";

export function ProductDetail({ product, headCategory, onBack, onPrev, onNext, onEditProduct }) {
  const [previewTab, setPreviewTab] = useState("3d");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activePopover, setActivePopover] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState(".glb");
  const [copied, setCopied] = useState(false);
  const catData = getCategoryData(headCategory, product.category);

  const handleCopyUrl = () => {
    setCopied(true);
    setActivePopover("copy");
    setTimeout(() => { setCopied(false); setActivePopover(null); }, 2000);
  };
  const lookupKey = getCategoryLookupKey(headCategory, product.category, product.subcategory);
  const has3D = catData?.modelling3D?.[lookupKey];
  const modelReady = !!product.media?.hasModel;
  const showSaveCta = Boolean(has3D && modelReady);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ProductFlowHeader title={product.name} tag={headCategory} onBack={onBack} showSecondary={false} primaryLabel="Save" onPrimary={onBack} showPrimary={showSaveCta} />

      <div style={{ flex: 1, overflow: "hidden", padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "264px 1fr 320px", gap: 18, height: "100%" }}>

          {/* ── Left: Product details + Variants ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                  {product.variants[selectedVariant]?.dimension && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Dimension</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.variants[selectedVariant].dimension}</span>
                    </div>
                  )}
                  {product.variants[selectedVariant]?.dimension && (
                    <div style={{ width: 1, background: "#e0e0e0", borderRadius: 250, alignSelf: "stretch" }} />
                  )}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 14, color: "#5a5a5a", fontWeight: 400 }}>Category</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>{product.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...S.card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f0f0f0", background: "#fff" }}>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: "#141414" }}>Variant</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, lineHeight: "16px", padding: 0 }}>Manage</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.variants.map((v, i) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant(i)}
                    style={{ borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", padding: 12, gap: 10, border: `1px solid ${selectedVariant === i ? "#8f0941" : "#f0f0f0"}`, background: "#fff", transition: "border-color 0.12s" }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: v.color || "#8B4513", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, lineHeight: "16px", color: "#000" }}>{v.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Center: 3D/AR Viewer ── */}
          <div style={{ ...S.card, display: "flex", flexDirection: "column" }}>
            {has3D && (
              <div style={{ padding: "14px 20px", display: "flex", justifyContent: "center", borderBottom: "1px solid #f2f2f2" }}>
                <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2, gap: 0 }}>
                  {[{ id: "3d", label: "3D Viewer" }, { id: "ar", label: "AR Try-on" }].map(tab => {
                    const isActive = previewTab === tab.id;
                    return (
                      <div key={tab.id}
                        style={{ padding: "4px 8px", borderRadius: 6, fontSize: 14, fontWeight: isActive ? 500 : 400, cursor: "pointer", transition: "all 0.15s", background: isActive ? "#fff" : "transparent", color: isActive ? "#da0e64" : "#5a5a5a", maxHeight: 28, display: "flex", alignItems: "center", boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
                        onClick={() => setPreviewTab(tab.id)}>
                        {tab.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              {modelReady ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #fff0f5, #fce7f0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Box size={40} color="#f43f5e" strokeWidth={1} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#141414", margin: 0 }}>{previewTab === "ar" ? "AR / VTO Ready" : "3D Model Ready"}</p>
                  <p style={{ fontSize: 12.5, color: "#888", marginTop: 6 }}>{previewTab === "ar" ? "AR alignment controls are available in general settings" : "Model has been uploaded successfully"}</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Box size={60} color="#d0d0d0" strokeWidth={0.8} />
                  <p style={{ marginTop: 16, fontSize: 15, fontWeight: 600, color: "#888" }}>Generating 3D</p>
                  <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 5 }}>Takes up to 24 Hours</p>
                  <div style={{ marginTop: 18, width: 180, height: 3, background: "#f0f0f0", borderRadius: 2, overflow: "hidden", margin: "18px auto 0" }}>
                    <div style={{ width: "40%", height: "100%", background: "linear-gradient(90deg, #f43f5e, #ec4899)", borderRadius: 2 }} />
                  </div>
                </div>
              )}
            </div>
            <div style={{ borderTop: "1px solid #f2f2f2", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
              {activePopover === "copy" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 10, padding: "8px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", zIndex: 50 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#141414", fontWeight: 500 }}>Copy to clipboard</span>
                </div>
              )}
              {activePopover === "qr" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 220 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>QR code</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <div style={{ background: "#f5f5f5", borderRadius: 10, padding: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <rect width="120" height="120" fill="white" />
                      <rect x="8" y="8" width="32" height="32" rx="3" fill="#141414" /><rect x="13" y="13" width="22" height="22" rx="2" fill="white" /><rect x="17" y="17" width="14" height="14" rx="1" fill="#141414" />
                      <rect x="80" y="8" width="32" height="32" rx="3" fill="#141414" /><rect x="85" y="13" width="22" height="22" rx="2" fill="white" /><rect x="89" y="17" width="14" height="14" rx="1" fill="#141414" />
                      <rect x="8" y="80" width="32" height="32" rx="3" fill="#141414" /><rect x="13" y="85" width="22" height="22" rx="2" fill="white" /><rect x="17" y="89" width="14" height="14" rx="1" fill="#141414" />
                      {[48, 54, 60, 66, 72].flatMap(x => [48, 54, 60, 66, 72].map(y => ((x + y) % 12 < 6) ? <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill="#141414" /> : null))}
                    </svg>
                  </div>
                  <button style={{ width: "100%", background: "#da0e64", color: "#fff", border: "none", borderRadius: 999, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Download</button>
                </div>
              )}
              {activePopover === "embed" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#f5f5f5", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 320 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Embed code</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#141414" }}>Custom Code</span>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Copy size={15} color="#555" /></button>
                    </div>
                    <pre style={{ padding: "12px 14px", fontSize: 11.5, color: "#333", lineHeight: 1.8, margin: 0, overflowX: "auto", fontFamily: "monospace" }}>{`<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Heading</h1>\n    <h2>Heading</h2>\n    <p>paragraph.</p>\n  </body>\n</html>`}</pre>
                  </div>
                </div>
              )}
              {activePopover === "download" && (
                <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 12, background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", zIndex: 50, width: 260 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>Download</span>
                    <button onClick={() => setActivePopover(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={15} color="#888" /></button>
                  </div>
                  <p style={{ fontSize: 12, color: "#888", margin: "0 0 10px" }}>Select format</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {[".fbx", ".obj", ".glb", ".usdz"].map(fmt => (
                      <button key={fmt} onClick={() => setDownloadFormat(fmt)}
                        style={{ border: `1.5px solid ${downloadFormat === fmt ? "#da0e64" : "#e0e0e0"}`, background: "transparent", borderRadius: 8, padding: "5px 12px", fontSize: 13, color: downloadFormat === fmt ? "#da0e64" : "#555", cursor: "pointer", fontWeight: downloadFormat === fmt ? 600 : 400 }}>
                        {fmt}
                      </button>
                    ))}
                  </div>
                  <button style={{ width: "100%", background: "#da0e64", color: "#fff", border: "none", borderRadius: 999, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Download</button>
                </div>
              )}
              <Link size={14} color="#bbb" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://www.meshy.ai/3d-models/...</span>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {[
                  { id: "copy", Icon: Copy },
                  { id: "qr", Icon: QrCode },
                  { id: "embed", Icon: Code2 },
                  { id: "download", Icon: Download },
                ].map(({ id, Icon }) => (
                  <button key={id}
                    disabled={!modelReady}
                    onClick={() => modelReady && (id === "copy" ? handleCopyUrl() : setActivePopover(activePopover === id ? null : id))}
                    style={{ width: 28, height: 28, borderRadius: "50%", border: "none", cursor: modelReady ? "pointer" : "not-allowed", background: activePopover === id ? "#fcebf4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, opacity: modelReady ? 1 : 0.35 }}>
                    <Icon size={15} color={activePopover === id ? "#da0e64" : "#bbb"} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: General Settings ── */}
          <div style={{ ...S.card, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
            <GeneralSettingsPanel mode={previewTab === "ar" ? "ar" : "3d"} />
            {!modelReady && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,100)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, zIndex: 10, borderRadius: 12 }}>
                <Box size={28} color="#ccc" strokeWidth={1.2} />
                <p style={{ fontSize: 13, fontWeight: 600, color: "#888", textAlign: "center", margin: 0 }}>General settings unavailable</p>
                <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", margin: 0, maxWidth: 180, lineHeight: 1.5 }}>Add a 3D model on the product details page to unlock settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

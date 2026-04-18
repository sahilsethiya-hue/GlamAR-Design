import { Box, Link, Copy, QrCode, Code2, Download, Image } from "lucide-react";
import { S } from "../../shared/constants.jsx";
import { getCategoryData, getCategoryLookupKey } from "../products/utils";

export function StudioPreviewPanel({ draftProduct, previewTab, setPreviewTab, selectedQuestionIndex }) {
  const headCategory = draftProduct.headCategory;
  const catData = getCategoryData(headCategory, draftProduct.category);
  const lookupKey = getCategoryLookupKey(headCategory, draftProduct.category, draftProduct.subcategory);
  const has3D = Boolean(catData?.modelling3D?.[lookupKey]);
  const modelReady = Boolean(draftProduct.media?.hasModel);
  const questions = draftProduct.variantOptions || [];
  const selectedQuestion = questions[selectedQuestionIndex] || null;

  return (
    <div style={{ ...S.card, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
      {has3D && (
        <div style={{ padding: "14px 20px", display: "flex", justifyContent: "center", borderBottom: "1px solid #f2f2f2" }}>
          <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2 }}>
            {[{ id: "3d", label: "3D Model" }, { id: "ar", label: "AR / VTO" }].map(tab => {
              const active = previewTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setPreviewTab(tab.id)}
                  style={{ padding: "4px 10px", borderRadius: 6, fontSize: 14, fontWeight: active ? 500 : 400, cursor: "pointer", background: active ? "#fff" : "transparent", color: active ? "#da0e64" : "#5A5A5A", boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
                >
                  {tab.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "320px minmax(0, 1fr)", minHeight: 0 }}>
        <div style={{ borderRight: "1px solid #f0f0f0", padding: 24, overflowY: "auto" }}>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.8, marginBottom: 18 }}>{draftProduct.name || "Untitled product"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {questions.length === 0 ? (
              <div style={{ fontSize: 13.5, color: "#8b8b8b", lineHeight: 1.6 }}>
                Add configurator questions on the left to see a Studio-style preview of the product options.
              </div>
            ) : questions.map((question, index) => {
              const previewValue = question.values?.[0];
              const active = index === selectedQuestionIndex;
              return (
                <div key={`${question.name}-${index}`} style={{ paddingBottom: 16, borderBottom: "1px solid #f2f2f2" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#141414" }}>{question.name || `Question ${index + 1}`}</span>
                    <span style={{ fontSize: 12, color: active ? "#da0e64" : "#8b8b8b", fontWeight: 600 }}>{previewValue?.label || "No answer"}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {(question.values || []).slice(0, 6).map((value, valueIndex) => (
                      <div key={`${question.name}-${valueIndex}`} style={{
                        minWidth: question.studioConfig?.displayType === "thumbnail" && question.studioConfig?.largeThumbnail ? 74 : 56,
                        minHeight: question.studioConfig?.displayType === "thumbnail" && question.studioConfig?.largeThumbnail ? 74 : 44,
                        padding: question.studioConfig?.displayType === "text" ? "10px 12px" : 6,
                        borderRadius: 14,
                        border: "1px solid #ebebeb",
                        background: "#fff",
                        display: "flex",
                        flexDirection: question.studioConfig?.displayType === "text" ? "row" : "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}>
                        {question.studioConfig?.displayType === "swatch" && <div style={{ width: 34, height: 34, borderRadius: "50%", background: value.color || "#e5e5e5", border: "1px solid rgba(0,0,0,0.08)" }} />}
                        {question.studioConfig?.displayType === "thumbnail" && (
                          value.image
                            ? <img src={value.image} alt="" style={{ width: question.studioConfig?.largeThumbnail ? 58 : 40, height: question.studioConfig?.largeThumbnail ? 58 : 40, borderRadius: 12, objectFit: "cover" }} />
                            : <div style={{ width: question.studioConfig?.largeThumbnail ? 58 : 40, height: question.studioConfig?.largeThumbnail ? 58 : 40, borderRadius: 12, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}><Image size={16} color="#ccc" /></div>
                        )}
                        {(question.studioConfig?.showNameLabel ?? true) && <span style={{ fontSize: 12.5, color: "#333", textAlign: "center" }}>{value.label}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32, position: "relative" }}>
          {modelReady ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #fff0f5, #fce7f0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                <Box size={46} color="#f43f5e" strokeWidth={1} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#141414" }}>{previewTab === "ar" ? "AR / VTO preview" : "3D configurator preview"}</div>
              <div style={{ fontSize: 13, color: "#8b8b8b", marginTop: 8, maxWidth: 360, lineHeight: 1.6 }}>
                {selectedQuestion
                  ? `Previewing how "${selectedQuestion.name}" will appear in the product experience.`
                  : "Previewing the current Studio setup with the existing question configuration."}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Box size={60} color="#d0d0d0" strokeWidth={0.8} />
              <p style={{ marginTop: 16, fontSize: 15, fontWeight: 600, color: "#888" }}>Studio preview ready</p>
              <p style={{ fontSize: 12.5, color: "#bbb", marginTop: 6, maxWidth: 300, lineHeight: 1.6 }}>
                Upload a model to unlock the full preview, but you can still build your configurator and variants right now.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #f2f2f2", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link size={14} color="#bbb" style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 12, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {draftProduct.productUrl || "https://www.meshy.ai/3d-models/..."}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {[Copy, QrCode, Code2, Download].map((Icon, index) => (
            <div key={index} style={{ width: 28, height: 28, borderRadius: "50%", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", opacity: modelReady ? 1 : 0.35 }}>
              <Icon size={15} color="#bbb" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

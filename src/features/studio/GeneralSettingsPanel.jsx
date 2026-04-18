import { useState, useEffect } from "react";
import { Settings, Box, Package, Sparkles, Camera, Layers, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { DIMENSION_UNITS } from "../../shared/constants.jsx";
import {
  GsSliderRow, GsSpeedSelector, GsSelectField, GsToggle, GsSectionHeader,
  TransformationControlGroup, CameraRangeSlider, GS_STUDIO_LIGHTS, TEMPLATE_STYLES,
} from "./ui";

export function GeneralSettingsPanel({ mode = "3d", initialArSettings = null, onArSettingsChange }) {
  const [tplExpanded, setTplExpanded] = useState(true);
  const [selectedTpl, setSelectedTpl] = useState("s1");
  const [expandedSections, setExpandedSections] = useState({});

  const [modelTransition, setModelTransition] = useState("Animation.01");
  const [modelSpeed, setModelSpeed] = useState("1x");

  const [measureLength, setMeasureLength] = useState("0");
  const [measureWidth, setMeasureWidth] = useState("0");
  const [measureHeight, setMeasureHeight] = useState("0");
  const [measureUnit, setMeasureUnit] = useState("cm");

  const [studioLight, setStudioLight] = useState("none");
  const [rotateLight, setRotateLight] = useState(0);
  const [filter, setFilter] = useState("None");
  const [intensity, setIntensity] = useState(0);
  const [glowStrength, setGlowStrength] = useState(0);
  const [glowSpread, setGlowSpread] = useState(0);
  const [glowThreshold, setGlowThreshold] = useState(0);
  const [ambientLight, setAmbientLight] = useState(false);
  const [bgColour, setBgColour] = useState(false);

  const [viewerPosX, setViewerPosX] = useState(0);
  const [viewerPosY, setViewerPosY] = useState(0);
  const [viewerRotX, setViewerRotX] = useState(0);
  const [viewerRotY, setViewerRotY] = useState(0);
  const [viewerScale, setViewerScale] = useState(0);

  const [camTemplate, setCamTemplate] = useState("Default 360 rotation");
  const [camSpeed, setCamSpeed] = useState("1x");
  const [camZoom, setCamZoom] = useState(0);
  const [camAdjustLR, setCamAdjustLR] = useState([50, 50]);
  const [camAdjustUD, setCamAdjustUD] = useState([50, 50]);

  const toggleSection = (id) => setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    if (mode !== "ar" || !initialArSettings) return;
    setViewerPosX(initialArSettings.viewerPosX ?? 0);
    setViewerPosY(initialArSettings.viewerPosY ?? 0);
    setViewerRotX(initialArSettings.viewerRotX ?? 0);
    setViewerRotY(initialArSettings.viewerRotY ?? 0);
    setViewerScale(initialArSettings.viewerScale ?? 0);
  }, [
    mode,
    initialArSettings?.viewerPosX,
    initialArSettings?.viewerPosY,
    initialArSettings?.viewerRotX,
    initialArSettings?.viewerRotY,
    initialArSettings?.viewerScale,
  ]);

  useEffect(() => {
    if (mode !== "ar" || !onArSettingsChange) return;
    onArSettingsChange({ viewerPosX, viewerPosY, viewerRotX, viewerRotY, viewerScale });
  }, [mode, onArSettingsChange, viewerPosX, viewerPosY, viewerRotX, viewerRotY, viewerScale]);

  if (mode === "ar") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #eaeaea" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#141414" }}>General settings</span>
        </div>
        <div style={{ borderBottom: "1px solid #f0f0f0" }}>
          <GsSectionHeader id="objectSettings" label="Object settings" icon={Settings} help expanded={expandedSections.objectSettings} onToggle={toggleSection} />
          {expandedSections.objectSettings && (
            <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#141414" }}>Model transformation</span>
                <HelpCircle size={13} color="#ccc" />
              </div>
              <TransformationControlGroup
                title="Position"
                onReset={() => { setViewerPosX(0); setViewerPosY(0); }}
                rows={[
                  { label: "Move Left or Right", value: viewerPosX, onChange: setViewerPosX, min: -100, max: 100 },
                  { label: "Move Up or Down", value: viewerPosY, onChange: setViewerPosY, min: -100, max: 100 },
                ]}
              />
              <TransformationControlGroup
                title="Rotate"
                onReset={() => { setViewerRotX(0); setViewerRotY(0); }}
                rows={[
                  { label: "Left or Right", value: viewerRotX, onChange: setViewerRotX, min: -180, max: 180 },
                  { label: "Up or Down", value: viewerRotY, onChange: setViewerRotY, min: -90, max: 90 },
                ]}
              />
              <TransformationControlGroup
                title="Scale"
                onReset={() => setViewerScale(0)}
                rows={[
                  { label: "Object size", value: viewerScale, onChange: setViewerScale, min: 0, max: 200 },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #eaeaea" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#141414" }}>General settings</span>
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", cursor: "pointer", userSelect: "none" }}
          onClick={() => setTplExpanded(v => !v)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={15} color="#555" strokeWidth={1.8} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#222" }}>Templates</span>
            <HelpCircle size={13} color="#ccc" />
          </div>
          {tplExpanded ? <ChevronUp size={15} color="#aaa" /> : <ChevronDown size={15} color="#aaa" />}
        </div>
        {tplExpanded && (
          <div style={{ padding: "0 20px 16px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {TEMPLATE_STYLES.map(t => (
              <div key={t.id} style={{ cursor: "pointer" }} onClick={() => setSelectedTpl(t.id)}>
                <div style={{ height: 58, borderRadius: 8, overflow: "hidden", background: t.isCustom ? "#f5f5f5" : t.bg, border: selectedTpl === t.id ? "2px solid #f43f5e" : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.15s" }}>
                  {t.isCustom && <Settings size={18} color="#bbb" strokeWidth={1.6} />}
                </div>
                <p style={{ fontSize: 11, textAlign: "center", color: selectedTpl === t.id ? "#f43f5e" : "#888", fontWeight: selectedTpl === t.id ? 600 : 400, marginTop: 5 }}>{t.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="modelAnimation" label="Model animation" icon={Box} expanded={expandedSections.modelAnimation} onToggle={toggleSection} />
        {expandedSections.modelAnimation && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <GsSelectField label="Model transitions" value={modelTransition} onChange={setModelTransition}
              options={["Animation.01", "Animation.02", "Animation.03", "None"]} />
            <GsSpeedSelector value={modelSpeed} onChange={setModelSpeed} />
          </div>
        )}
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="measurement" label="Measurement" icon={Package} help expanded={expandedSections.measurement} onToggle={toggleSection} />
        {expandedSections.measurement && (
          <div style={{ padding: "0 20px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 68px", gap: 8 }}>
              {[["Length", measureLength, setMeasureLength], ["Width", measureWidth, setMeasureWidth], ["Height", measureHeight, setMeasureHeight]].map(([lbl, val, set]) => (
                <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 12, color: "#5a5a5a" }}>{lbl}</span>
                  <input value={val} onChange={e => set(e.target.value)}
                    style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 6, background: "#f5f5f5", padding: "5px 8px", fontSize: 13, color: "#141414", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Unit</span>
                <div style={{ position: "relative" }}>
                  <select value={measureUnit} onChange={e => setMeasureUnit(e.target.value)}
                    style={{ width: "100%", appearance: "none", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 6, padding: "5px 18px 5px 6px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none" }}>
                    {DIMENSION_UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                  <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="environment" label="Environment" icon={Sparkles} help expanded={expandedSections.environment} onToggle={toggleSection} />
        {expandedSections.environment && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Studio lights</span>
                <HelpCircle size={12} color="#ccc" />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {GS_STUDIO_LIGHTS.map(light => (
                  <div key={light.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <button onClick={() => setStudioLight(light.id)} style={{
                      width: 44, height: 44, borderRadius: "50%", background: light.bg,
                      border: studioLight === light.id ? "2px solid #da0e64" : "2px solid transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      outline: "none", padding: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    }}>{light.content}</button>
                    <span style={{ fontSize: 10, color: "#5a5a5a", textAlign: "center", lineHeight: "13px", maxWidth: 48 }}>{light.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <GsSliderRow label="Rotate studio light" value={rotateLight} onChange={setRotateLight} min={0} max={360} />
            <GsSelectField label="Filters" value={filter} onChange={setFilter} options={["None", "Warm", "Cool", "Sepia", "Vivid"]} />
            <GsSliderRow label="Intensity" value={intensity} onChange={setIntensity} min={0} max={100} />

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#5a5a5a" }}>Glow effects</span>
                <HelpCircle size={12} color="#ccc" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <GsSliderRow label="Strength" value={glowStrength} onChange={setGlowStrength} min={0} max={100} />
                <GsSliderRow label="Spread" value={glowSpread} onChange={setGlowSpread} min={0} max={100} />
                <GsSliderRow label="Threshold" value={glowThreshold} onChange={setGlowThreshold} min={0} max={100} />
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: "#141414" }}>Ambient light</span>
                <GsToggle value={ambientLight} onChange={setAmbientLight} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 13, color: "#141414" }}>Background colour</span>
                <GsToggle value={bgColour} onChange={setBgColour} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="objectSettings" label="Object settings" icon={Settings} help expanded={expandedSections.objectSettings} onToggle={toggleSection} />
        {expandedSections.objectSettings && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#141414" }}>Model transformation</span>
              <HelpCircle size={13} color="#ccc" />
            </div>
            <TransformationControlGroup
              title="Position"
              onReset={() => { setViewerPosX(0); setViewerPosY(0); }}
              rows={[
                { label: "Move Left or Right", value: viewerPosX, onChange: setViewerPosX, min: -100, max: 100 },
                { label: "Move Up or Down", value: viewerPosY, onChange: setViewerPosY, min: -100, max: 100 },
              ]}
            />
            <TransformationControlGroup
              title="Rotate"
              onReset={() => { setViewerRotX(0); setViewerRotY(0); }}
              rows={[
                { label: "Left or Right", value: viewerRotX, onChange: setViewerRotX, min: -180, max: 180 },
                { label: "Up or Down", value: viewerRotY, onChange: setViewerRotY, min: -90, max: 90 },
              ]}
            />
            <TransformationControlGroup
              title="Scale"
              onReset={() => setViewerScale(0)}
              rows={[
                { label: "Object size", value: viewerScale, onChange: setViewerScale, min: 0, max: 200 },
              ]}
            />
          </div>
        )}
      </div>

      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <GsSectionHeader id="cameraAnimation" label="Camera animation" icon={Camera} expanded={expandedSections.cameraAnimation} onToggle={toggleSection} />
        {expandedSections.cameraAnimation && (
          <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#5a5a5a" }}>Zoom</span>
                <button onClick={() => setCamZoom(0)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: 0, lineHeight: "16px" }}>Reset</button>
              </div>
              <GsSliderRow label="In or Out" value={camZoom} onChange={setCamZoom} min={-100} max={100} />
            </div>
            <GsSelectField label="Choose template" value={camTemplate} onChange={setCamTemplate}
              options={["Default 360 rotation", "Slow pan", "Orbit", "Zoom in", "Static"]} />
            <GsSpeedSelector value={camSpeed} onChange={setCamSpeed} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#5a5a5a" }}>Adjust camera</span>
                <button onClick={() => { setCamAdjustLR([50, 50]); setCamAdjustUD([50, 50]); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: 0, lineHeight: "16px" }}>Reset</button>
              </div>
              <CameraRangeSlider label="Left and Right" value={camAdjustLR} onChange={setCamAdjustLR} />
              <CameraRangeSlider label="Up and Down" value={camAdjustUD} onChange={setCamAdjustUD} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

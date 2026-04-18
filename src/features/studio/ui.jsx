import { ChevronDown, ChevronUp, HelpCircle, Plus } from "lucide-react";

export const TEMPLATE_STYLES = [
  { id: "s1", label: "Style 1", bg: "linear-gradient(135deg,#c0392b,#922b21)" },
  { id: "s2", label: "Style 2", bg: "linear-gradient(135deg,#e74c3c,#c0392b)" },
  { id: "s3", label: "Style 3", bg: "linear-gradient(135deg,#8e1b1b,#c0392b)" },
  { id: "custom", label: "Custom", isCustom: true },
];

export function GsSliderRow({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  const centerPct = ((-min) / (max - min)) * 100;
  const fillLeft = Math.min(pct, centerPct);
  const fillWidth = Math.abs(pct - centerPct);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
        <div style={{ flex: 1, position: "relative", height: 18, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#e0e0e0", borderRadius: 8 }} />
          <div style={{ position: "absolute", left: `${fillLeft}%`, width: `${fillWidth}%`, height: 2, background: "#da0e64", borderRadius: 8 }} />
          <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
            style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0, zIndex: 2 }} />
          <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, width: 16, height: 16, background: "#fff", borderRadius: "50%", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 1 }} />
        </div>
        <input type="number" value={value} min={min} max={max}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          style={{ width: 56, borderRadius: 4, background: "#fff", border: "1px solid #e0e0e0", padding: "2px 6px", fontSize: 13, color: "#141414", outline: "none", textAlign: "center" }} />
      </div>
    </div>
  );
}

export const GS_SPEED_OPTIONS = ["-0.5x", "1x", "1.25x", "1.5x", "2x"];

export function GsSpeedSelector({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Speed</span>
      <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 2 }}>
        {GS_SPEED_OPTIONS.map(opt => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            flex: 1, borderRadius: 6, border: "none", cursor: "pointer",
            background: value === opt ? "#fff" : "transparent",
            color: value === opt ? "#da0e64" : "#5a5a5a",
            fontSize: 13, fontWeight: value === opt ? 600 : 400,
            padding: "4px 0", lineHeight: "20px",
            boxShadow: value === opt ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.12s",
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

export function GsSelectField({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && <span style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>{label}</span>}
      <div style={{ position: "relative" }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", appearance: "none", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 6, padding: "6px 32px 6px 10px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none" }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

export function GsToggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 36, height: 20, borderRadius: 999, border: "none", cursor: "pointer",
      background: value ? "#da0e64" : "#e0e0e0", position: "relative", padding: 0,
      transition: "background 0.2s", flexShrink: 0,
    }}>
      <div style={{ position: "absolute", top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "left 0.2s" }} />
    </button>
  );
}

export function GsSectionHeader({ id, label, icon: Icon, help, expanded, onToggle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", cursor: "pointer", userSelect: "none" }}
      onClick={() => onToggle(id)}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon size={15} color="#555" strokeWidth={1.8} />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "#333" }}>{label}</span>
        {help && <HelpCircle size={13} color="#ccc" />}
      </div>
      {expanded
        ? <div style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronUp size={14} color="#da0e64" /></div>
        : <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fcebf4", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronDown size={14} color="#da0e64" /></div>
      }
    </div>
  );
}

export function CameraRangeSlider({ label, value, onChange }) {
  const [left, right] = value;
  const leftPct = left;
  const rightPct = right;
  const fillLeft = Math.min(leftPct, rightPct);
  const fillWidth = Math.abs(rightPct - leftPct);
  const leftDeg = Math.round((left / 100) * 180 - 180);
  const rightDeg = Math.round((right / 100) * 180 - 180);
  const TICK_COUNT = 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>{label}</span>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, padding: "2px 6px", width: 56, fontSize: 13, color: "#141414", textAlign: "center" }}>{leftDeg}°</div>
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, padding: "2px 6px", width: 56, fontSize: 13, color: "#141414", textAlign: "center" }}>{rightDeg}°</div>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#e0e0e0", borderRadius: 8 }} />
        <div style={{ position: "absolute", left: `${fillLeft}%`, width: `${fillWidth}%`, height: 2, background: "#da0e64", borderRadius: 8 }} />
        <input type="range" min={0} max={100} value={left}
          onChange={e => { const v = Number(e.target.value); onChange([v, right]); }}
          style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0, zIndex: 3 }} />
        <input type="range" min={0} max={100} value={right}
          onChange={e => { const v = Number(e.target.value); onChange([left, v]); }}
          style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0, zIndex: 3 }} />
        <div style={{ position: "absolute", left: `calc(${leftPct}% - 8px)`, width: 16, height: 16, background: "#fff", borderRadius: "50%", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 2 }} />
        <div style={{ position: "absolute", left: `calc(${rightPct}% - 8px)`, width: 16, height: 16, background: "#fff", borderRadius: "50%", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 2 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Array.from({ length: TICK_COUNT }).map((_, i) => (
          <div key={i} style={{ width: 1, height: 6, background: "#b5b5b5" }} />
        ))}
      </div>
    </div>
  );
}

export function TransformationControlGroup({ title, onReset, rows }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#5a5a5a" }}>{title}</span>
        <button
          onClick={onReset}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 12, fontWeight: 500, padding: 0, lineHeight: "16px" }}
        >
          Reset
        </button>
      </div>
      {rows.map(row => (
        <GsSliderRow key={row.label} label={row.label} value={row.value} onChange={row.onChange} min={row.min} max={row.max} />
      ))}
    </div>
  );
}

export function ArTransformSliderRow({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontSize: 13, color: "#4b4b4b", lineHeight: "20px" }}>{label}</span>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 112px", gap: 24, alignItems: "center" }}>
        <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "#dfdfdf", borderRadius: 999 }} />
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", margin: 0, zIndex: 2 }}
          />
          <div
            style={{
              position: "absolute",
              left: `calc(${pct}% - 14px)`,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #efefef",
              boxShadow: "0 2px 6px rgba(20,20,20,0.08)",
              pointerEvents: "none",
            }}
          />
        </div>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          style={{
            width: "100%",
            height: 42,
            borderRadius: 10,
            border: "1px solid #dcdcdc",
            background: "#fff",
            padding: "0 14px",
            fontSize: 14,
            lineHeight: "20px",
            color: "#1f1f1f",
            outline: "none",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
}

export function ArTransformationControlGroup({ title, onReset, rows }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, color: "#5a5a5a", lineHeight: "24px" }}>{title}</span>
        <button
          onClick={onReset}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#a20f49", fontSize: 14, fontWeight: 500, padding: 0, lineHeight: "20px" }}
        >
          Reset
        </button>
      </div>
      {rows.map(row => (
        <ArTransformSliderRow key={row.label} label={row.label} value={row.value} onChange={row.onChange} min={row.min} max={row.max} />
      ))}
    </div>
  );
}

export const GS_STUDIO_LIGHTS = [
  { id: "add", label: "Add", bg: "#141414", content: <Plus size={18} color="#fff" /> },
  { id: "studio_light", label: "Studio light", bg: "radial-gradient(circle at 38% 38%, #e8e8e8 0%, #8a8a8a 100%)", content: null },
  { id: "studio_warm", label: "Studio warm", bg: "radial-gradient(circle at 38% 38%, #f5ddb0 0%, #b07830 100%)", content: null },
  {
    id: "none", label: "None", bg: "#f0f0f0", content: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8" fill="none" stroke="#bbb" strokeWidth="1.5" /><line x1="5.5" y1="5.5" x2="16.5" y2="16.5" stroke="#bbb" strokeWidth="1.5" /></svg>
    )
  },
];

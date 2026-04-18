import { useState, useEffect } from "react";
import { Upload, ChevronDown, Check, X } from "lucide-react";
import { S } from "./constants.jsx";

export function DD({ label, value, onChange, options = [], placeholder, required, disabled = false }) {
  return (
    <div>
      {label && <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>}
      <div style={{ position: "relative" }}>
        <select
          style={{ ...S.select, background: disabled ? "#f5f5f5" : "#fff", color: disabled ? "#999" : "#1a1a1a", cursor: disabled ? "not-allowed" : "pointer" }}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#aaa" }} />
      </div>
    </div>
  );
}

export function Inp({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      {label && <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>}
      <input style={S.input} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={e => e.target.style.borderColor = "#f43f5e"} onBlur={e => e.target.style.borderColor = "#d9d9d9"} />
    </div>
  );
}

export function UBox({ label, small }) {
  return (
    <div style={{ ...S.upZone, padding: small ? 16 : 24, minHeight: small ? 80 : 100 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#f43f5e"; e.currentTarget.style.background = "#fff5f6"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4d4d4"; e.currentTarget.style.background = "#fafafa"; }}>
      <Upload size={small ? 16 : 20} color="#bbb" />
      <span style={{ fontSize: small ? 11.5 : 12.5, color: "#aaa", fontWeight: 500 }}>{label || "Upload"}</span>
    </div>
  );
}

export function Tog({ on, onToggle, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {label && <span style={{ fontSize: 12.5, color: "#666", fontWeight: 500 }}>{label}</span>}
      <div onClick={onToggle} style={{ width: 42, height: 24, borderRadius: 12, cursor: "pointer", background: on ? "#141414" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: on ? "translateX(18px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

export function ColorPicker({ color, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input style={{ ...S.input, width: 160 }} value={color} onChange={e => onChange(e.target.value)} placeholder="#ff0000" />
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color || "#ff0000", border: "1px solid #e5e5e5", flexShrink: 0, cursor: "pointer" }}>
        <input type="color" value={color || "#ff0000"} onChange={e => onChange(e.target.value)} style={{ opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} />
      </div>
    </div>
  );
}

export function SliderField({ label, value, onChange, required }) {
  return (
    <div>
      <label style={required ? S.labelReq : S.label}>{label}{required && <span style={{ color: "#f43f5e" }}> *</span>}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fafafa", border: "1px solid #eaeaea", borderRadius: 10, padding: "12px 16px" }}>
        <input type="range" min="0" max="100" value={value} onChange={e => onChange(parseInt(e.target.value))}
          style={{ flex: 1, height: 6, borderRadius: 3, appearance: "none", background: `linear-gradient(to right, #141414 ${value}%, #e5e5e5 ${value}%)`, outline: "none", cursor: "pointer" }} />
        <span style={{ fontSize: 14, fontWeight: 600, minWidth: 32, textAlign: "right" }}>{value}</span>
      </div>
    </div>
  );
}

export function Toast({ toast, onClose }) {
  const [progress, setProgress] = useState(100);
  const duration = 3500;

  useEffect(() => {
    if (!toast) return;
    setProgress(100);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [toast]);

  if (!toast) return null;

  const isError = toast.type === "error";
  const bg = isError ? "#5c1a1a" : "#255626";
  const barColor = isError ? "#fca5a5" : "#e5fbe6";
  const iconBg = isError ? "#ef4444" : "#25ab21";

  return (
    <div style={{ position: "fixed", top: 20, right: 24, zIndex: 2000, width: 340 }}>
      <div style={{ background: bg, borderRadius: 12, border: `1px solid ${bg}`, padding: 12, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 0 8px rgba(255,255,255,0.3)", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
          <div style={{ flexShrink: 0 }}>
            {isError ? (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} color="#fff" />
              </div>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <path d="M10.5061 14.2592L8.06079 11.8137C7.915 11.6681 7.73175 11.5935 7.51105 11.59C7.29053 11.5867 7.10395 11.6612 6.95132 11.8137C6.79886 11.9663 6.72263 12.1512 6.72263 12.3684C6.72263 12.5856 6.79886 12.7705 6.95132 12.9232L9.84 15.8118C10.0304 16.002 10.2524 16.0971 10.5061 16.0971C10.7597 16.0971 10.9818 16.002 11.1721 15.8118L17.0284 9.95553C17.174 9.80974 17.2486 9.62649 17.2521 9.40579C17.2554 9.18526 17.1809 8.99868 17.0284 8.84605C16.8758 8.6936 16.6909 8.61737 16.4737 8.61737C16.2565 8.61737 16.0716 8.6936 15.9189 8.84605L10.5061 14.2592Z" fill="#25AB21" />
                <path d="M12.0018 22C10.6187 22 9.3186 21.7375 8.10158 21.2126C6.88456 20.6877 5.82596 19.9754 4.92579 19.0755C4.02561 18.1757 3.31289 17.1175 2.78763 15.9011C2.26254 14.6846 2 13.3848 2 12.0018C2 10.6187 2.26246 9.3186 2.78737 8.10158C3.31228 6.88456 4.02465 5.82596 4.92447 4.92579C5.8243 4.02561 6.88246 3.31289 8.09895 2.78763C9.31544 2.26254 10.6152 2 11.9982 2C13.3813 2 14.6814 2.26246 15.8984 2.78737C17.1154 3.31228 18.174 4.02465 19.0742 4.92447C19.9744 5.8243 20.6871 6.88246 21.2124 8.09895C21.7375 9.31544 22 10.6152 22 11.9982C22 13.3813 21.7375 14.6814 21.2126 15.8984C20.6877 17.1154 19.9754 18.174 19.0755 19.0742C18.1757 19.9744 17.1175 20.6871 15.9011 21.2124C14.6846 21.7375 13.3848 22 12.0018 22Z" fill="#25AB21" />
              </svg>
            )}
          </div>
          <span style={{ flex: 1, color: "#fafafa", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{toast.message}</span>
          <button onClick={onClose} style={{ width: 20, height: 20, borderRadius: 250, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
            <X size={16} color="#fff" />
          </button>
        </div>
        <div style={{ position: "absolute", left: 2, right: 0, bottom: 1, height: 4, overflow: "hidden" }}>
          <div style={{ background: barColor, borderRadius: 999, height: "100%", width: `${progress}%`, transition: "width 30ms linear" }} />
        </div>
      </div>
    </div>
  );
}

export function DisplayNameDropdown({ subcategory, value, onChange, sdkMappings, onAddMapping }) {
  const [open, setOpen] = useState(false);
  const [addText, setAddText] = useState("");
  const options = subcategory ? (sdkMappings[subcategory] || []) : [];
  const disabled = !subcategory;

  const handleSelect = (opt) => { onChange(opt); setOpen(false); };
  const handleAdd = () => {
    const trimmed = addText.trim();
    if (!trimmed) return;
    onAddMapping(subcategory, trimmed);
    onChange(trimmed);
    setAddText("");
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <label style={S.label}>Display Name</label>
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "11px 14px", borderRadius: 10,
          border: open ? "1px solid #da0e64" : "1px solid #d9d9d9",
          background: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          boxSizing: "border-box", userSelect: "none",
          transition: "border-color 0.15s",
        }}
      >
        <span style={{ fontSize: 13.5, color: value ? "#1a1a1a" : "#aaa" }}>
          {value || (disabled ? "Select subcategory first" : "Add or select the display name")}
        </span>
        {value
          ? <Check size={15} color="#16a34a" />
          : <ChevronDown size={14} color="#aaa" />
        }
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 200,
          background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10,
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)", overflow: "hidden",
        }}>
          {options.length > 0 && (
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {options.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: "10px 14px", fontSize: 13.5, cursor: "pointer",
                    background: value === opt ? "#FFF5FC" : "#fff",
                    color: value === opt ? "#DA0E64" : "#1a1a1a",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                  onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = "#f9f9f9"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = value === opt ? "#FFF5FC" : "#fff"; }}
                >
                  <span>{opt}</span>
                  {value === opt && <Check size={13} color="#DA0E64" />}
                </div>
              ))}
            </div>
          )}
          <div style={{ borderTop: options.length > 0 ? "1px solid #f0f0f0" : "none", padding: "8px 10px", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              style={{ ...S.input, flex: 1, fontSize: 13, padding: "7px 12px", height: "auto" }}
              placeholder="Type to add new..."
              value={addText}
              onChange={e => setAddText(e.target.value)}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
            />
            <button
              onClick={e => { e.stopPropagation(); handleAdd(); }}
              style={{ height: 34, padding: "0 14px", background: "#DA0E64", color: "#fff", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

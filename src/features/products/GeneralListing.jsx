import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Eye, Image, X, Trash2, Download } from "lucide-react";
import { S } from "../../shared/constants.jsx";
import { IcSort, IcEditPen, IcCopy, IcTrash } from "../../shared/icons";
import { ListingHeader } from "../../layout/Topbar";

export const MODE_BADGE = {
  "3D": { bg: "#fff1f2", color: "#e11d48", border: "#fda4af" },
  "2D": { bg: "#fff1f2", color: "#e11d48", border: "#fda4af" },
  "In process": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "None": { bg: "#f5f5f5", color: "#888", border: "#e0e0e0" },
};

export function getMode(p) {
  if (p.media?.hasModel) return "3D";
  if (p.modelGenerating) return "In process";
  if (p.media?.is2D) return "2D";
  return "None";
}

export function ActionMenu({ product, openMenu, setOpenMenu, onToggleStatus, onEditProduct }) {
  const isActive = product.status === "active";
  const has3D = Boolean(product.media?.hasModel);
  return (
    <td style={{ ...S.td, width: 36, position: "relative" }} onClick={e => e.stopPropagation()}>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center" }}
        onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === product.id ? null : product.id); }}>
        <MoreVertical size={16} color={openMenu === product.id ? "#da0e64" : "#bbb"} />
      </button>
      {openMenu === product.id && (
        <div style={{ position: "absolute", right: 8, top: "calc(100% + 4px)", background: "#fff", border: "1px solid #eaeaea", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 220, overflow: "hidden" }}>
          {/* Active / Inactive toggle */}
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #f0f0f0", cursor: has3D ? "pointer" : "not-allowed", opacity: has3D ? 1 : 0.45 }}
            onClick={() => { if (has3D) { onToggleStatus(product.id); setOpenMenu(null); } }}>
            <span style={{ fontSize: 13.5, color: "#141414" }}>Active/ Inactive product</span>
            <div style={{ width: 36, height: 20, borderRadius: 999, background: has3D && isActive ? "#da0e64" : "#e0e0e0", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: has3D && isActive ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
          {[
            { icon: <IcEditPen />, label: "Edit", action: () => onEditProduct(product) },
            { icon: <IcCopy />, label: "Duplicate" },
            { divider: true },
            { icon: <IcTrash color="#dc2626" />, label: "Delete", danger: true },
          ].map((item, i) => item.divider ? (
            <div key={i} style={{ height: 1, background: "#f0f0f0" }} />
          ) : (
            <div key={i}
              style={{ padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, cursor: "pointer", color: item.danger ? "#dc2626" : "#333" }}
              onClick={e => { e.stopPropagation(); setOpenMenu(null); item.action?.(); }}
              onMouseEnter={e => e.currentTarget.style.background = "#f7f7f8"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      )}
    </td>
  );
}

export function MultiSelectorBar({ selected, total, onClear, onSelectAll, onPublishAll, onDelete, onExport }) {
  const [moreOpen, setMoreOpen] = useState(false);
  if (selected < 2) return null;
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 1000, display: "flex", alignItems: "center" }}>
      <div style={{ borderRadius: 12, background: "#141414", display: "flex", alignItems: "center", padding: "8px 16px", gap: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#f5f5f5", whiteSpace: "nowrap" }}>
        {/* Label group */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onClear} style={{ width: 24, height: 24, borderRadius: 250, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
            <X size={16} color="#f5f5f5" />
          </button>
          <span style={{ lineHeight: "20px" }}>{selected} of {total} Selected</span>
          <button onClick={onSelectAll} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: "20px", padding: "4px 0" }}>Select All</button>
        </div>
        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        {/* Action group */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onPublishAll} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: "20px", padding: "4px 0" }}>Publish All</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setMoreOpen(v => !v)} style={{ width: 24, height: 24, borderRadius: 250, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
              <MoreVertical size={16} color="#fff" />
            </button>
            {moreOpen && (
              <div style={{ position: "absolute", bottom: 32, left: -0.5, background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "1px solid #fff", overflow: "hidden", minWidth: 120 }}>
                <div style={{ padding: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => { setMoreOpen(false); onDelete?.(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 8px", borderRadius: 8, background: "#fcebf4", border: "none", cursor: "pointer", width: "100%", color: "#da0e64", fontSize: 14, lineHeight: "20px" }}>
                    <Trash2 size={20} color="#da0e64" />
                    <span>Delete</span>
                  </button>
                  <button onClick={() => { setMoreOpen(false); onExport?.(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 8px", borderRadius: 8, background: "#fff", border: "none", cursor: "pointer", width: "100%", color: "#141414", fontSize: 14, lineHeight: "20px" }}>
                    <Download size={20} color="#141414" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GeneralListing({ products, activeTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const handleSort = key => { setSortKey(k => k === key ? key : key); setSortDir(d => sortKey === key ? (d === "asc" ? "desc" : "asc") : "asc"); };

  const tabProducts = products.filter(p => p.headCategory === activeTab);
  const allCategories = [...new Set(tabProducts.map(p => p.category).filter(Boolean))];
  const allSubcategories = [...new Set(tabProducts.map(p => p.subcategory).filter(Boolean))];
  const hasActiveFilters = filterCategory || filterSubcategory || filterStatus || filterMode;

  const clearFilters = () => { setFilterCategory(""); setFilterSubcategory(""); setFilterStatus(""); setFilterMode(""); };

  const filtered = products.filter(p => {
    if (p.headCategory !== activeTab) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.skuId.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterSubcategory && p.subcategory !== filterSubcategory) return false;
    if (filterStatus) {
      const effectiveStatus = p.media?.hasModel ? p.status : "inactive";
      if (effectiveStatus !== filterStatus) return false;
    }
    if (filterMode) {
      if (getMode(p) !== filterMode) return false;
    }
    return true;
  });
  const sorted = sortKey ? [...filtered].sort((a, b) => {
    const va = sortKey === "date" ? new Date(a.date) : a.name.toLowerCase();
    const vb = sortKey === "date" ? new Date(b.date) : b.name.toLowerCase();
    return sortDir === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
  }) : filtered;
  const allChecked = sorted.length > 0 && sorted.every(p => selected.has(p.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(sorted.map(p => p.id)));
  const toggleRow = (id, e) => { e.stopPropagation(); const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };

  const TH = ({ children, sort }) => (
    <th style={{ ...S.th, fontWeight: 500, color: sort ? (sortKey === sort ? "#da0e64" : "#888") : "#888", fontSize: 13, textTransform: "none", position: "sticky", top: 0, zIndex: 1, background: "#fafafa", cursor: sort ? "pointer" : "default", userSelect: "none" }}
      onClick={() => sort && handleSort(sort)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}{sort && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: sortKey === sort ? "#fce8f3" : "#fafafa", flexShrink: 0 }}><IcSort /></span>}</span>
    </th>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
      <ListingHeader />
      <div style={{ ...S.card, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        {/* ── Toolbar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #e0e0e0", borderRadius: "12px 12px 0 0", background: "#fff", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#b5b5b5", pointerEvents: "none" }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search in product name, product ID, category"
                style={{ width: "100%", height: 32, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", padding: "0 10px 0 32px", fontSize: 14, color: "#141414", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button onClick={() => setShowFilters(v => !v)} style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${showFilters ? "#da0e64" : "#e0e0e0"}`, background: showFilters ? "#fff0f6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Filter size={15} color={showFilters ? "#da0e64" : "#555"} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => { }} style={{ height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#e13e83", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s, border-color 0.15s, color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff0f6"; e.currentTarget.style.borderColor = "#e13e83"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#fce8f3"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#fff0f6"; }}>
              Import
            </button>
            <button onClick={onAddProduct} style={{ height: 32, borderRadius: 999, border: "none", background: "#da0e64", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c00d58"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#da0e64"; }}
              onMouseDown={e => { e.currentTarget.style.background = "#a00b4a"; }}
              onMouseUp={e => { e.currentTarget.style.background = "#c00d58"; }}>
              Add Product
            </button>
          </div>
        </div>

        {/* ── Filter bar ── */}
        {showFilters && (
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "8px 16px", background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
            {[
              { label: "Category", value: filterCategory, set: setFilterCategory, options: allCategories },
              { label: "Subcategory", value: filterSubcategory, set: setFilterSubcategory, options: allSubcategories },
              { label: "Status", value: filterStatus, set: setFilterStatus, options: ["active", "inactive"] },
              { label: "Mode", value: filterMode, set: setFilterMode, options: ["None", "2D", "3D", "In process"] },
            ].map(({ label, value, set, options }) => (
              <div key={label} style={{ position: "relative" }}>
                <select value={value} onChange={e => set(e.target.value)}
                  style={{ height: 24, paddingTop: 2, paddingBottom: 2, paddingLeft: 12, paddingRight: 24, background: value ? "#fff0f6" : "#fff", borderRadius: 999, border: `1px solid ${value ? "#da0e64" : "#e0e0e0"}`, color: value ? "#da0e64" : "#5a5a5a", fontSize: 14, fontFamily: "Inter", fontWeight: 400, cursor: "pointer", outline: "none", appearance: "none" }}>
                  <option value="">{label}</option>
                  {options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                </select>
                <ChevronDown size={12} color={value ? "#da0e64" : "#5a5a5a"} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            ))}
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ height: 24, paddingTop: 4, paddingBottom: 4, borderRadius: 999, background: "none", border: "none", color: "#8f0941", fontSize: 12, fontFamily: "Inter", fontWeight: 500, lineHeight: "16px", cursor: "pointer" }}>
                Clear All
              </button>
            )}
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <th style={{ ...S.th, width: 44, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#da0e64" }} />
                </th>
                <TH sort="name">Product name</TH>
                <TH>SKU ID</TH>
                <TH sort="date">Date</TH>
                <TH>Modes</TH>
                <TH>Status</TH>
                <th style={{ ...S.th, width: 36, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }} />
                <th style={{ ...S.th, width: 36, position: "sticky", top: 0, zIndex: 1, background: "#fafafa" }} />
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan={8} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb", fontSize: 14 }}>No products in {activeTab}</td></tr>
              ) : sorted.map(p => {
                const mode = getMode(p);
                const mb = MODE_BADGE[mode];
                const effectiveStatus = p.media?.hasModel ? p.status : "inactive";
                const isSelected = selected.has(p.id);
                return (
                  <tr key={p.id} style={{ cursor: "pointer", borderBottom: "1px solid #f8f8f8", background: isSelected ? "#FFF5FC" : "transparent" }} onClick={() => onViewProduct(p)}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }} onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
                    <td style={{ ...S.td, width: 44 }} onClick={e => toggleRow(p.id, e)}>
                      <input type="checkbox" checked={isSelected} onChange={() => { }} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#DA0E64" }} />
                    </td>
                    <td style={S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Image size={17} color="#ccc" />
                        </div>
                        <span style={{ fontWeight: 500, fontSize: 13.5, color: "#141414" }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ ...S.td, fontSize: 13, color: "#555" }}>{p.skuId}</td>
                    <td style={{ ...S.td, fontSize: 13, color: "#888" }}>{p.date}</td>
                    <td style={S.td}>
                      <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: mb.bg, color: mb.color, border: `1px solid ${mb.border}` }}>{mode}</span>
                    </td>
                    <td style={S.td}>
                      <span style={S.badge(effectiveStatus)}>{effectiveStatus ? effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1) : ""}</span>
                    </td>
                    <td style={{ ...S.td, width: 36 }} onClick={e => { e.stopPropagation(); onViewProduct(p); }}>
                      <Eye size={16} color="#bbb" style={{ cursor: "pointer", display: "block" }} />
                    </td>
                    <ActionMenu product={p} openMenu={openMenu} setOpenMenu={setOpenMenu} onToggleStatus={onToggleStatus} onEditProduct={onEditProduct} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: 13, color: "#888" }}>Showing 1–{Math.min(rowsPerPage, filtered.length)} of {filtered.length} results</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Rows per page</span>
              <div style={{ position: "relative" }}>
                <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}
                  style={{ appearance: "none", border: "1px solid #e0e0e0", borderRadius: 8, padding: "5px 28px 5px 12px", fontSize: 13, color: "#141414", cursor: "pointer", outline: "none", background: "#fff" }}>
                  {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <ChevronDown size={13} color="#888" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={15} color="#555" /></button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} color="#555" /></button>
            </div>
          </div>
        </div>
      </div>
      <MultiSelectorBar
        selected={selected.size}
        total={filtered.length}
        onClear={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(filtered.map(p => p.id)))}
        onPublishAll={() => {}}
      />
    </div>
  );
}

import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Eye, Image } from "lucide-react";
import { S } from "../../shared/constants.jsx";
import { IcSort } from "../../shared/icons";
import { ListingHeader } from "../../layout/Topbar";
import { ActionMenu, MultiSelectorBar } from "../products/GeneralListing";

export function BeautyListing({ products, activeTab, onAddProduct, onEditProduct, onViewProduct, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const handleSort = key => { setSortKey(key); setSortDir(d => sortKey === key ? (d === "asc" ? "desc" : "asc") : "asc"); };

  const filtered = products.filter(p =>
    p.headCategory === "Beauty" &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skuId.toLowerCase().includes(search.toLowerCase()) || p.subcategory.toLowerCase().includes(search.toLowerCase()))
  );
  const sorted = sortKey ? [...filtered].sort((a, b) => {
    const va = sortKey === "date" ? new Date(a.date) : a.name.toLowerCase();
    const vb = sortKey === "date" ? new Date(b.date) : b.name.toLowerCase();
    return sortDir === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
  }) : filtered;
  const allChecked = sorted.length > 0 && sorted.every(p => selected.has(p.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(sorted.map(p => p.id)));
  const toggleRow = (id, e) => { e.stopPropagation(); const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };

  const TH = ({ children, sort }) => (
    <th style={{ ...S.th, fontWeight: 500, color: sort ? (sortKey === sort ? "#da0e64" : "#888") : "#888", fontSize: 13, textTransform: "none", cursor: sort ? "pointer" : "default", userSelect: "none" }}
      onClick={() => sort && handleSort(sort)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}{sort && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: sortKey === sort ? "#fce8f3" : "#fafafa", flexShrink: 0 }}><IcSort /></span>}</span>
    </th>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
      <ListingHeader />
      <div style={{ ...S.card, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #e0e0e0", borderRadius: "12px 12px 0 0", background: "#fff", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#b5b5b5", pointerEvents: "none" }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search in product name, product ID, category"
                style={{ width: "100%", height: 32, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", padding: "0 10px 0 32px", fontSize: 14, color: "#141414", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Filter size={15} color="#555" />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => { }} style={{ height: 32, borderRadius: 999, border: "1px solid #e0e0e0", background: "#fff", padding: "0 16px", fontSize: 14, fontWeight: 500, color: "#e13e83", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s, border-color 0.15s" }}
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
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <th style={{ ...S.th, width: 44 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#da0e64" }} />
                </th>
                <TH sort="name">Product name</TH>
                <TH>SKU ID</TH>
                <TH sort="date">Date</TH>
                <TH>Status</TH>
                <th style={{ ...S.th, width: 36 }} />
                <th style={{ ...S.th, width: 36 }} />
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", padding: 48, color: "#bbb", fontSize: 14 }}>No beauty products found</td></tr>
              ) : sorted.map(p => {
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
                      <span style={S.badge(p.status)}>{p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : ""}</span>
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

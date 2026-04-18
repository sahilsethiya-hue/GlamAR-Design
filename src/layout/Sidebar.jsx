import { useState } from "react";
import { S, SIDEBAR_NAV, IcChevronDown20, IcChevronUp20 } from "../shared/constants.jsx";

export function Sidebar({ activePage, activeCategory, onNavigate }) {
  const defaultL2 = activePage === "products" || activePage === "sdkconfig" || activePage === "integration" ? "tryons" : null;
  const [openL2, setOpenL2] = useState(defaultL2);
  const categoryToL2Id = { Lifestyle: "lifestyle", Beauty: "beauty", Home: "home" };
  const [openL3, setOpenL3] = useState(categoryToL2Id[activeCategory] || "lifestyle");
  const activeL3Id = `${(categoryToL2Id[activeCategory] || "lifestyle")}-${activePage === "products" ? "products" : activePage === "sdkconfig" ? "sdkconfig" : activePage === "integration" ? "integration" : "products"}`;
  const [hovered, setHovered] = useState(null);
  const [hoveredL2, setHoveredL2] = useState(null);

  const activeItem = SIDEBAR_NAV.find(n => n.id === openL2);

  const handleNavClick = (item) => {
    if (item.l2Items) {
      setOpenL2(openL2 === item.id ? null : item.id);
      if (item.page) onNavigate(item.page);
    } else {
      setOpenL2(null);
      if (item.page) onNavigate(item.page);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", flexShrink: 0, fontFamily: "Inter, -apple-system, sans-serif" }}>
      {/* ── Icon Rail ── */}
      <div style={{ width: 76, background: "#141414", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 4px", gap: 16, overflowY: "auto", flexShrink: 0 }}>
        {SIDEBAR_NAV.map(item => {
          const NavIcon = item.Icon;
          const isActive = openL2 === item.id || (!openL2 && item.page === activePage);
          const isHov = hovered === item.id;
          return (
            <div
              key={item.id}
              style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", userSelect: "none", position: "relative" }}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                width: 48, borderRadius: 6,
                background: isActive ? "#262626" : isHov ? "#1e1e1e" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "6px 0", transition: "background 0.15s", position: "relative",
              }}>
                <NavIcon />
                {/* Tooltip arrow when L2 panel is open */}
                {isActive && openL2 === item.id && (
                  <div style={{ position: "absolute", right: -7, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
                    <svg width="7" height="16" viewBox="0 0 7 16" fill="none">
                      <path d="M1.84254 6.38376L4.96593 3.90196C6.26832 2.8671 7 1.46352 7 0L7 16C7 14.5365 6.26833 13.1329 4.96593 12.098L1.84254 9.61624C0.719156 8.72362 0.719153 7.27639 1.84254 6.38376Z" fill="#fafafa"/>
                    </svg>
                  </div>
                )}
              </div>
              <span style={{
                fontSize: 11, color: isActive ? "#fff" : "#aaa", lineHeight: "14px",
                fontWeight: isActive ? 500 : 400, textAlign: "center",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                width: 68, paddingLeft: 2, paddingRight: 2,
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── L2 Panel ── */}
      {openL2 && activeItem?.l2Items && (
        <div style={{
          width: 224, background: "#fafafa", display: "flex", flexDirection: "column",
          padding: "16px 8px", overflowY: "auto", flexShrink: 0,
          borderRight: "1px solid #e8e8e8",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          fontSize: 14, color: "#141414",
        }}>
          {/* Header */}
          <div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 8px", marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3, color: "#141414" }}>{activeItem.l2Title}</span>
          </div>

          {/* L2 Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {activeItem.l2Items.map(l2 => {
              const L2Icon = l2.L2Icon;
              const isL3Open = openL3 === l2.id;
              const isL2Hov = hoveredL2 === l2.id;
              return (
                <div key={l2.id}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", padding: 8, gap: 8,
                      cursor: "pointer", borderRadius: 8, userSelect: "none",
                      background: isL2Hov ? "#efefef" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onClick={() => l2.chevron ? setOpenL3(isL3Open ? null : l2.id) : null}
                    onMouseEnter={() => setHoveredL2(l2.id)}
                    onMouseLeave={() => setHoveredL2(null)}
                  >
                    {L2Icon && <div style={{ flexShrink: 0 }}><L2Icon /></div>}
                    <span style={{ flex: 1, lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 14, fontWeight: 400, color: "#141414" }}>{l2.label}</span>
                    {l2.chevron && (isL3Open ? <IcChevronUp20 /> : <IcChevronDown20 />)}
                  </div>

                  {/* L3 Submenu */}
                  {l2.l3 && isL3Open && (
                    <div style={{ display: "flex", paddingLeft: 16, paddingBottom: 4, gap: 8 }}>
                      {/* Tree line + dot */}
                      <div style={{ width: 8, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ flex: 1, width: 1, background: "#e0e0e0" }} />
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#da0e64", flexShrink: 0 }} />
                      </div>
                      {/* L3 list */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4px 0", gap: 8 }}>
                        {l2.l3.map(l3 => {
                          const isActive = activeL3Id === l3.id;
                          return (
                            <div
                              key={l3.id}
                              style={{
                                height: 32, borderRadius: 8, display: "flex", alignItems: "center",
                                padding: "4px 8px", cursor: "pointer",
                                background: isActive ? "#fcebf4" : "transparent",
                                color: isActive ? "#8f0941" : "#5a5a5a",
                                fontSize: 14, fontWeight: 400,
                                transition: "background 0.1s",
                              }}
                              onClick={() => { if (l3.page) onNavigate(l3.page, l2.category); }}
                              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#f2f2f2"; }}
                              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                            >
                              {l3.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

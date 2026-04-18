import { useState } from "react";
import { Crown, HelpCircle, Headphones, Bell, ArrowLeft } from "lucide-react";

export function Topbar() {
  const [hovBtn, setHovBtn] = useState(null);
  return (
    <div style={{ height: 56, background: "#141414", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 0 24px", flexShrink: 0, position: "relative", fontFamily: "Inter, -apple-system, sans-serif" }}>
      {/* ── Prefix: logo + logotype ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* GlamAR logomark */}
        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M30.8722 4.24337L27.0195 1.04279C25.3487 -0.346004 22.9243 -0.346004 21.2535 1.04279L16.5927 4.91428L11.9356 1.04279C10.2649 -0.346004 7.84427 -0.347912 6.17162 1.03897L2.30981 4.24337C0.845721 5.4575 0 7.25976 0 9.16167V17.1326C0 19.031 0.844399 20.8311 2.30408 22.0446L12.5034 30.5243C14.8714 32.4919 18.3069 32.4919 20.6729 30.5243L30.8722 22.0446C32.3332 20.83 33.1782 19.0285 33.1782 17.1285V9.15771C33.1782 7.25961 32.3324 5.45735 30.8722 4.24337ZM30.1712 16.6022C30.1712 17.9422 29.5735 19.2145 28.5437 20.0715L19.4721 27.6134C17.8014 29.0022 15.3769 29.0022 13.7043 27.6134L4.63268 20.0715C3.60275 19.2145 3.00699 17.9422 3.00699 16.6022V9.68992C3.00699 8.3481 3.60466 7.0757 4.63825 6.21868L7.37077 3.95217C8.34624 3.14226 9.75954 3.14402 10.733 3.95408L14.2399 6.86889L9.12239 11.1182C7.85763 12.1706 7.85572 14.112 9.12048 15.1644L14.8958 19.9774C15.8711 20.7894 17.2863 20.7911 18.2617 19.9793L24.0539 15.1644C25.3186 14.112 25.3186 12.1706 24.0539 11.1182L21.2419 8.78079C21.1026 8.66499 20.9008 8.66499 20.7615 8.78079L18.9967 10.2466C18.8159 10.3969 18.8157 10.6745 18.9967 10.8248L21.0883 12.5635C21.4509 12.8642 21.4509 13.4186 21.0883 13.7193L17.0627 17.0683C16.7826 17.2995 16.3785 17.2995 16.1004 17.0664L12.0861 13.7211C11.7253 13.4204 11.7253 12.866 12.088 12.5653L15.3375 9.86649L16.1117 9.22376L18.9439 6.8708L21.1935 5.00279L22.4546 3.95408C23.4299 3.14402 24.8432 3.14402 25.8168 3.95408L28.5437 6.21868C29.5737 7.0757 30.1712 8.34619 30.1712 9.68801V16.6022Z" fill="#ffffff" />
        </svg>
        {/* Vertical divider */}
        <svg width="1" height="21" viewBox="0 0 1 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M0.5 20.5L0.499999 0.5" stroke="#5A5A5A" strokeLinecap="round" />
        </svg>
        {/* GlamAR logotype */}
        <svg width="99" height="20" viewBox="0 0 99 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M81.0089 19.2908H78.0892C77.9525 19.2908 77.8308 19.2048 77.7851 19.0759L76.1286 14.4039C76.0833 14.275 75.9613 14.1891 75.8245 14.1891H68.5872C68.4505 14.1891 68.3283 14.2748 68.2831 14.4039L66.6268 19.0759C66.5813 19.2048 66.4592 19.2908 66.323 19.2908H63.5382C63.3118 19.2908 63.1558 19.0641 63.2366 18.8527L69.9995 1.2309C70.2702 0.520988 70.9573 0.0168887 71.7619 0.0168887H72.726C73.5268 0.0168887 74.2452 0.510109 74.5331 1.25751L81.3097 18.8526C81.3914 19.0637 81.2353 19.2908 81.0089 19.2908ZM75.0128 11.1959L72.5318 4.07805C72.4868 3.95589 72.3689 3.86827 72.2312 3.86827C72.0956 3.86827 71.9805 3.95368 71.9341 4.07291L69.4289 11.1947C69.3546 11.4046 69.5107 11.6244 69.733 11.6244H74.7079C74.9301 11.6244 75.086 11.4053 75.0128 11.1959Z" fill="#ffffff" />
          <path d="M96.5919 10.3594C97.6027 11.3101 98.2343 12.6595 98.2343 14.1571V18.9545C98.2343 19.14 98.0839 19.2907 97.8979 19.2907H95.6985C95.5128 19.2907 95.3622 19.14 95.3622 18.9545V14.5812C95.3622 13.1517 94.2115 11.682 92.7862 11.6604C92.7654 11.6607 92.7452 11.6635 92.7246 11.6635H86.3053C86.1368 11.6635 86.0005 11.8001 86.0005 11.9681V18.9486C86.0005 19.1344 85.8501 19.2848 85.6642 19.2848H83.3053C83.1197 19.2848 82.9689 19.1339 82.9689 18.9479V2.24397C82.977 1.43864 83.4065 0.735346 84.0459 0.340182C84.3734 0.114227 84.7546 0 85.1632 0H92.6115C95.4914 0 97.8264 2.33511 97.8264 5.21564V6.56211C97.8264 7.84462 97.352 9.01659 96.57 9.91277C96.4545 10.0451 96.4641 10.2387 96.5919 10.3594ZM94.7959 6.33468V5.48011C94.7959 4.0397 93.6282 2.87229 92.1881 2.87229H86.3144C86.1411 2.87229 86.001 3.01239 86.001 3.18572V8.62878C86.001 8.8021 86.1409 8.9422 86.3144 8.9422H92.1878C93.6282 8.9422 94.7959 7.77479 94.7959 6.33468Z" fill="#ffffff" />
          <path d="M18.5886 19.3022C18.4038 19.3022 18.254 19.1524 18.254 18.9676V0.379739C18.254 0.194947 18.4038 0.0451431 18.5886 0.0451431H20.9402C21.125 0.0451431 21.2749 0.194947 21.2749 0.379739V18.9676C21.2749 19.1524 21.125 19.3022 20.9402 19.3022H18.5886Z" fill="#ffffff" />
          <path d="M36.1953 5.58926C36.3804 5.58926 36.5301 5.73936 36.5301 5.92401V18.9547C36.5301 19.1394 36.3798 19.2895 36.195 19.2895H34.0053C33.8202 19.2895 33.6706 19.1394 33.6706 18.9547V18.2564C33.6706 18.1091 33.4942 18.034 33.388 18.1356C32.4037 19.0797 31.0678 19.6601 29.596 19.6601C29.5518 19.6601 29.5077 19.6593 29.4637 19.6582C29.4365 19.6585 29.409 19.6601 29.3816 19.6601C28.3049 19.6601 27.3649 19.4701 26.5619 19.0908C25.7585 18.7116 25.0924 18.1951 24.5628 17.5418C24.0333 16.8895 23.6359 16.1168 23.3715 15.2252C23.1067 14.3345 22.9744 13.3767 22.9744 12.3528C22.9744 11.1177 23.142 10.0496 23.4776 9.14912C23.8129 8.24898 24.2588 7.50775 24.8145 6.925C25.3705 6.34225 26.0059 5.91445 26.7208 5.64086C27.143 5.479 27.5702 5.36654 28.0017 5.30053L28.0011 5.29906C28.0011 5.29906 29.9027 4.96667 31.4031 5.59176C31.4281 5.60235 31.4512 5.61264 31.4731 5.62293C32.1308 5.88696 32.725 6.27389 33.2279 6.75653C33.3348 6.8587 33.512 6.78461 33.512 6.63671V5.92415C33.512 5.73921 33.6618 5.58941 33.8467 5.58941L36.1953 5.58926ZM33.6178 12.432C33.6178 10.9141 33.2779 9.73099 32.5986 8.88391C31.9184 8.03655 30.9966 7.61301 29.8316 7.61301C29.1255 7.61301 28.5301 7.75899 28.0446 8.04978C27.5592 8.341 27.162 8.72073 26.8533 9.18808C26.5444 9.65631 26.3237 10.1855 26.1914 10.7768C26.059 11.3684 25.9927 11.9729 25.9927 12.5906C25.9927 13.1732 26.0678 13.7467 26.2177 14.3115C26.3675 14.8768 26.597 15.3799 26.9063 15.8206C27.2149 16.2618 27.6079 16.615 28.0846 16.8798C28.5612 17.1443 29.1258 17.2767 29.7789 17.2767C30.4497 17.2767 31.0273 17.1356 31.5129 16.8531C31.998 16.5711 32.3951 16.2005 32.7043 15.7415C33.0127 15.2825 33.2422 14.7665 33.3929 14.1925C33.5427 13.6194 33.6178 13.0321 33.6178 12.432Z" fill="#ffffff" />
          <path d="M54.0185 5.21106C55.4671 5.21106 56.5935 5.56477 57.3979 6.27115C58.2021 6.97827 58.6042 8.1623 58.6042 9.82307V18.9517C58.6042 19.1359 58.4547 19.2854 58.2705 19.2854H55.9162C55.732 19.2854 55.5825 19.136 55.5825 18.9517V11.2807C55.5825 10.7332 55.5647 10.2335 55.5297 9.78308C55.4942 9.3325 55.3927 8.94439 55.225 8.617C55.0568 8.29005 54.8051 8.03837 54.4695 7.86136C54.1333 7.6851 53.674 7.59645 53.0908 7.59645C52.0659 7.59645 51.3235 7.91473 50.8642 8.55099C50.4047 9.18696 50.1752 10.0884 50.1752 11.2544V18.952C50.1752 19.1362 50.026 19.2857 49.8415 19.2857H47.4875C47.303 19.2857 47.1535 19.1363 47.1535 18.952V10.4858C47.1535 9.5317 46.9815 8.81149 46.6371 8.32548C46.2923 7.8399 45.6605 7.59675 44.7418 7.59675C44.3528 7.59675 43.9775 7.67628 43.6154 7.8352C43.2529 7.99441 42.9348 8.22419 42.661 8.52424C42.387 8.82487 42.1662 9.19607 41.9983 9.63754C41.8301 10.0793 41.7466 10.583 41.7466 11.1481V18.952C41.7466 19.1362 41.5971 19.2857 41.4129 19.2857H39.0587C38.8745 19.2857 38.725 19.1363 38.725 18.952V5.91598C38.725 5.73177 38.8745 5.58212 39.0587 5.58212H41.2537C41.4385 5.58212 41.5877 5.73162 41.5877 5.91627V6.61104C41.5877 6.7582 41.7638 6.83362 41.8697 6.73203C42.8514 5.79102 44.1833 5.21238 45.6506 5.21238C45.6906 5.21238 45.7305 5.21327 45.77 5.21444H45.7881V5.21268H45.7796C45.8134 5.21238 45.847 5.21135 45.8817 5.21135C45.9139 5.21135 45.9463 5.21209 45.9785 5.21268H46.0026C46.7872 5.23032 47.5202 5.41467 48.2008 5.76764C48.8343 6.09606 49.3047 6.58414 49.6129 7.23157C49.6395 7.28817 49.6977 7.32757 49.7646 7.32757C49.8185 7.32757 49.8662 7.30199 49.8966 7.26259C50.3683 6.66367 50.9032 6.18251 51.5009 5.82086C52.1722 5.41423 53.0113 5.21106 54.0185 5.21106Z" fill="#ffffff" />
          <path d="M15.863 10.3238V15.777C15.863 17.724 14.2847 19.3023 12.3377 19.3023H8.51043C3.81022 19.3023 0 15.4921 0 10.7918V8.55522C0 3.85529 3.81007 0.0450766 8.51014 0.0450766H13.8341C14.0122 0.0450766 14.1564 0.189441 14.1564 0.367323V2.59556C14.1564 2.77359 14.012 2.91795 13.834 2.91795H8.96661C5.68769 2.91795 3.02959 5.57605 3.02959 8.85497V10.2494C3.02959 13.6646 5.79809 16.4331 9.21329 16.4331H11.1368C12.0747 16.4331 12.835 15.6727 12.835 14.7348V11.1647C12.835 10.9866 12.6907 10.8423 12.5126 10.8423H8.63289C8.45472 10.8423 8.31035 10.6979 8.31035 10.5197V8.4554C8.31035 8.27737 8.45472 8.133 8.63275 8.133H13.6726C14.8823 8.133 15.863 9.11386 15.863 10.3238Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ── Suffix: upgrade + icons + profile ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Upgrade button */}
        <div style={{ background: "#ffd68a", borderRadius: 999, padding: "0 16px", height: 32, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", flexShrink: 0 }}>
          <Crown size={16} color="#141414" strokeWidth={1.8} />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Upgrade</span>
        </div>

        {/* Help icon */}
        <div
          style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "help" ? "#262626" : "transparent", transition: "background 0.15s" }}
          onMouseEnter={() => setHovBtn("help")} onMouseLeave={() => setHovBtn(null)}
        >
          <HelpCircle size={20} color="#fff" strokeWidth={1.6} />
        </div>

        {/* Support + Notification */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "support" ? "#262626" : "transparent", transition: "background 0.15s" }}
            onMouseEnter={() => setHovBtn("support")} onMouseLeave={() => setHovBtn(null)}
          >
            <Headphones size={20} color="#fff" strokeWidth={1.6} />
          </div>
          <div
            style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: hovBtn === "bell" ? "#262626" : "transparent", transition: "background 0.15s" }}
            onMouseEnter={() => setHovBtn("bell")} onMouseLeave={() => setHovBtn(null)}
          >
            <Bell size={20} color="#fff" strokeWidth={1.6} />
          </div>
        </div>

        {/* Company profile card */}
        <div style={{ background: "#1f1f1f", border: "1px solid #2a2a2a", borderRadius: 8, padding: 4, display: "flex", alignItems: "center", gap: 4, height: 44, cursor: "pointer", flexShrink: 0 }}>
          {/* Avatar */}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fcebf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 400, color: "#8f0941", lineHeight: "16px" }}>FV</span>
          </div>
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0, maxWidth: 120 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#fff", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Fuschia Vine Designs</span>
            <span style={{ fontSize: 12, fontWeight: 400, color: "#888", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rahul Choudhary</span>
          </div>
        </div>
      </div>

      {/* Corner piece — dark notch matching the sidebar rail */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: 0, bottom: -12, pointerEvents: "none" }}>
        <path d="M12 12V0L0 5.24537e-07C6.62742 2.34843e-07 12 5.37258 12 12Z" fill="#141414" />
      </svg>
    </div>
  );
}

export function ProductFlowHeader({
  title,
  tag,
  onBack,
  secondaryLabel = "Save",
  primaryLabel = "Generate 3D",
  onSecondary,
  onPrimary,
  showSecondary = true,
  showPrimary = true,
  secondaryDisabled = false,
  primaryDisabled = false,
}) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      height: 56, background: "#fff", borderBottom: "1px solid #eaeaea",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", flexShrink: 0,
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: 13.5, fontWeight: 500, padding: "6px 10px 6px 0" }}
          onMouseEnter={e => e.currentTarget.style.color = "#141414"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
        <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: "#141414", maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h1>
        {tag && <span style={{ fontSize: 12, color: "#555", background: "#f0f0f0", padding: "3px 12px", borderRadius: 20, fontWeight: 500, flexShrink: 0 }}>{tag}</span>}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {showSecondary && (
          <button
            onClick={onSecondary}
            className="glamar-btn glamar-btn-secondary"
            disabled={secondaryDisabled}
          >
            {secondaryLabel}
          </button>
        )}
        {showPrimary && (
          <button
            onClick={onPrimary}
            className="glamar-btn glamar-btn-primary"
            disabled={primaryDisabled}
          >
            {primaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export function ListingHeader() {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Product inventory</h1>
    </div>
  );
}

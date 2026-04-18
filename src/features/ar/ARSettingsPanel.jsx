import { useState, useEffect, useRef } from "react";
import { Package, ChevronDown } from "lucide-react";
import { fetchPatterns, IcChevronDown20 } from "../../shared/constants.jsx";
import { getARConfig } from "../products/utils";

// ── AR icon components ──
const IcARPalette = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00341 14.6738C7.09008 14.6738 6.23008 14.5005 5.41675 14.1471C4.60341 13.7938 3.89674 13.3205 3.29008 12.7138C2.68341 12.1071 2.20341 11.4005 1.85674 10.5871C1.51008 9.77382 1.33008 8.91382 1.33008 8.00048C1.33008 7.08715 1.51008 6.21382 1.87008 5.40048C2.23008 4.58715 2.72341 3.88048 3.33674 3.28048C3.95008 2.68048 4.67008 2.20715 5.49675 1.85382C6.32341 1.50048 7.19674 1.32715 8.13008 1.32715C9.06341 1.32715 9.85675 1.48048 10.6501 1.78715C11.4434 2.09382 12.1301 2.51382 12.7234 3.05382C13.3167 3.59382 13.7901 4.23381 14.1434 4.97381C14.4967 5.71382 14.6701 6.50715 14.6701 7.36715C14.6701 8.64715 14.2834 9.62715 13.5034 10.3071C12.7234 10.9871 11.7834 11.3338 10.6701 11.3338H9.43674C9.33675 11.3338 9.27008 11.3605 9.23008 11.4205C9.19008 11.4805 9.17008 11.5405 9.17008 11.6071C9.17008 11.7405 9.25675 11.9338 9.42341 12.1805C9.59008 12.4271 9.67675 12.7138 9.67675 13.0405C9.67675 13.5938 9.52341 14.0071 9.21674 14.2738C8.91008 14.5405 8.51008 14.6738 8.01008 14.6738H8.00341ZM4.33675 8.67382C4.62341 8.67382 4.86341 8.58048 5.05675 8.38715C5.25008 8.19382 5.34341 7.96048 5.34341 7.66715C5.34341 7.37382 5.25008 7.14048 5.05675 6.94715C4.86341 6.75382 4.63008 6.66048 4.33675 6.66048C4.04341 6.66048 3.81008 6.75382 3.61674 6.94715C3.42341 7.14048 3.33008 7.37382 3.33008 7.66715C3.33008 7.96048 3.42341 8.19382 3.61674 8.38715C3.81008 8.58048 4.04341 8.67382 4.33675 8.67382ZM6.33675 6.00715C6.62341 6.00715 6.86341 5.91382 7.05675 5.72048C7.25008 5.52715 7.34341 5.29382 7.34341 5.00048C7.34341 4.70715 7.25008 4.47381 7.05675 4.28048C6.86341 4.08715 6.63008 3.99382 6.33675 3.99382C6.04341 3.99382 5.81008 4.08715 5.61674 4.28048C5.42341 4.47381 5.33008 4.70715 5.33008 5.00048C5.33008 5.29382 5.42341 5.52715 5.61674 5.72048C5.81008 5.91382 6.04341 6.00715 6.33675 6.00715ZM9.67008 6.00715C9.95675 6.00715 10.1967 5.91382 10.3901 5.72048C10.5834 5.52715 10.6767 5.29382 10.6767 5.00048C10.6767 4.70715 10.5834 4.47381 10.3901 4.28048C10.1967 4.08715 9.96341 3.99382 9.67008 3.99382C9.37675 3.99382 9.14341 4.08715 8.95008 4.28048C8.75675 4.47381 8.66341 4.70715 8.66341 5.00048C8.66341 5.29382 8.75675 5.52715 8.95008 5.72048C9.14341 5.91382 9.37675 6.00715 9.67008 6.00715ZM11.6701 8.67382C11.9567 8.67382 12.1967 8.58048 12.3901 8.38715C12.5834 8.19382 12.6767 7.96048 12.6767 7.66715C12.6767 7.37382 12.5834 7.14048 12.3901 6.94715C12.1967 6.75382 11.9634 6.66048 11.6701 6.66048C11.3767 6.66048 11.1434 6.75382 10.9501 6.94715C10.7567 7.14048 10.6634 7.37382 10.6634 7.66715C10.6634 7.96048 10.7567 8.19382 10.9501 8.38715C11.1434 8.58048 11.3767 8.67382 11.6701 8.67382Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARGrid = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.98809 13.9961C2.70809 13.9961 2.47609 13.9001 2.28409 13.7081C2.09209 13.5161 1.99609 13.2841 1.99609 13.0041C1.99609 12.7241 2.09209 12.4921 2.28409 12.3081C2.47609 12.1161 2.70809 12.0201 2.98809 12.0201C3.26809 12.0201 3.50009 12.1161 3.68409 12.3081C3.86809 12.5001 3.97209 12.7321 3.97209 13.0121C3.97209 13.2921 3.87609 13.5241 3.68409 13.7161C3.49209 13.9081 3.26009 14.0041 2.98809 14.0041V13.9961ZM6.32409 13.9961C6.04409 13.9961 5.81209 13.9001 5.62809 13.7081C5.43609 13.5161 5.34009 13.2841 5.34009 13.0041C5.34009 12.7241 5.43609 12.4921 5.62809 12.3081C5.82009 12.1161 6.05209 12.0201 6.32409 12.0201C6.60409 12.0201 6.83609 12.1161 7.02809 12.3081C7.22009 12.5001 7.31609 12.7321 7.31609 13.0121C7.31609 13.2921 7.22009 13.5241 7.02809 13.7161C6.83609 13.9081 6.60409 14.0041 6.32409 14.0041V13.9961ZM9.67609 13.9961C9.39609 13.9961 9.16409 13.9001 8.97209 13.7081C8.78009 13.5161 8.68409 13.2841 8.68409 13.0041C8.68409 12.7241 8.78009 12.4921 8.97209 12.3081C9.16409 12.1161 9.39609 12.0201 9.67609 12.0201C9.95609 12.0201 10.1881 12.1161 10.3801 12.3081C10.5721 12.5001 10.6681 12.7321 10.6681 13.0121C10.6681 13.2921 10.5721 13.5241 10.3801 13.7161C10.1881 13.9081 9.95609 14.0041 9.67609 14.0041V13.9961ZM13.0121 13.9961C12.7321 13.9961 12.5001 13.9001 12.3161 13.7081C12.1241 13.5161 12.0281 13.2841 12.0281 13.0041C12.0281 12.7241 12.1241 12.4921 12.3161 12.3081C12.5081 12.1161 12.7401 12.0201 13.0121 12.0201C13.2841 12.0201 13.5241 12.1161 13.7161 12.3081C13.9081 12.5001 14.0041 12.7321 14.0041 13.0041C14.0041 13.2761 13.9081 13.5161 13.7161 13.7081C13.5241 13.9001 13.2921 13.9961 13.0121 13.9961ZM2.98809 10.6601C2.70809 10.6601 2.47609 10.5641 2.28409 10.3721C2.09209 10.1801 1.99609 9.94809 1.99609 9.67609C1.99609 9.40409 2.09209 9.16409 2.28409 8.97209C2.47609 8.78009 2.70809 8.68409 2.98809 8.68409C3.26809 8.68409 3.50009 8.78009 3.68409 8.97209C3.87609 9.16409 3.97209 9.39609 3.97209 9.67609C3.97209 9.95609 3.87609 10.1881 3.68409 10.3721C3.49209 10.5641 3.26009 10.6601 2.98809 10.6601ZM6.32409 10.6601C6.04409 10.6601 5.81209 10.5641 5.62809 10.3721C5.43609 10.1801 5.34009 9.94809 5.34009 9.67609C5.34009 9.40409 5.43609 9.16409 5.62809 8.97209C5.82009 8.78009 6.05209 8.68409 6.32409 8.68409C6.59609 8.68409 6.83609 8.78009 7.02809 8.97209C7.22009 9.16409 7.31609 9.39609 7.31609 9.67609C7.31609 9.95609 7.22009 10.1881 7.02809 10.3721C6.83609 10.5641 6.60409 10.6601 6.32409 10.6601ZM9.67609 10.6601C9.39609 10.6601 9.16409 10.5641 8.97209 10.3721C8.78009 10.1801 8.68409 9.94809 8.68409 9.67609C8.68409 9.40409 8.78009 9.16409 8.97209 8.97209C9.16409 8.78009 9.39609 8.68409 9.67609 8.68409C9.95609 8.68409 10.1881 8.78009 10.3801 8.97209C10.5721 9.16409 10.6681 9.39609 10.6681 9.67609C10.6681 9.95609 10.5721 10.1881 10.3801 10.3721C10.1881 10.5641 9.95609 10.6601 9.67609 10.6601ZM13.0121 10.6601C12.7321 10.6601 12.5001 10.5641 12.3161 10.3721C12.1241 10.1801 12.0281 9.94809 12.0281 9.67609C12.0281 9.40409 12.1241 9.16409 12.3161 8.97209C12.5081 8.78009 12.7401 8.68409 13.0121 8.68409C13.2921 8.68409 13.5241 8.78009 13.7161 8.97209C13.9081 9.16409 14.0041 9.39609 14.0041 9.67609C14.0041 9.95609 13.9081 10.1881 13.7161 10.3721C13.5241 10.5641 13.2921 10.6601 13.0121 10.6601ZM2.98809 7.30809C2.70809 7.30809 2.47609 7.21209 2.28409 7.02009C2.09209 6.82809 1.99609 6.59609 1.99609 6.31609C1.99609 6.03609 2.09209 5.80409 2.28409 5.61209C2.47609 5.42009 2.70809 5.32409 2.98809 5.32409C3.26809 5.32409 3.50009 5.42009 3.68409 5.61209C3.87609 5.80409 3.97209 6.03609 3.97209 6.31609C3.97209 6.59609 3.87609 6.82809 3.68409 7.02009C3.49209 7.21209 3.26009 7.30809 2.98809 7.30809ZM6.32409 7.30809C6.04409 7.30809 5.81209 7.21209 5.62809 7.02009C5.43609 6.82809 5.34009 6.59609 5.34009 6.31609C5.34009 6.03609 5.43609 5.80409 5.62809 5.61209C5.82009 5.42009 6.05209 5.32409 6.32409 5.32409C6.59609 5.32409 6.83609 5.42009 7.02809 5.61209C7.22009 5.80409 7.31609 6.03609 7.31609 6.31609C7.31609 6.59609 7.22009 6.82809 7.02809 7.02009C6.83609 7.21209 6.60409 7.30809 6.32409 7.30809ZM9.67609 7.30809C9.39609 7.30809 9.16409 7.21209 8.97209 7.02009C8.78009 6.82809 8.68409 6.59609 8.68409 6.31609C8.68409 6.03609 8.78009 5.80409 8.97209 5.61209C9.16409 5.42009 9.39609 5.32409 9.67609 5.32409C9.95609 5.32409 10.1881 5.42009 10.3801 5.61209C10.5721 5.80409 10.6681 6.03609 10.6681 6.31609C10.6681 6.59609 10.5721 6.82809 10.3801 7.02009C10.1881 7.21209 9.95609 7.30809 9.67609 7.30809ZM13.0121 7.30809C12.7321 7.30809 12.5001 7.21209 12.3161 7.02009C12.1241 6.82809 12.0281 6.59609 12.0281 6.31609C12.0281 6.03609 12.1241 5.80409 12.3161 5.61209C12.5081 5.42009 12.7401 5.32409 13.0121 5.32409C13.2841 5.32409 13.5241 5.42009 13.7161 5.61209C13.9081 5.80409 14.0041 6.03609 14.0041 6.31609C14.0041 6.59609 13.9081 6.82809 13.7161 7.02009C13.5241 7.21209 13.2921 7.30809 13.0121 7.30809ZM2.98809 3.97209C2.70809 3.97209 2.47609 3.87609 2.28409 3.68409C2.09209 3.49209 1.99609 3.26009 1.99609 2.98809C1.99609 2.71609 2.10009 2.47609 2.29209 2.28409C2.48409 2.09209 2.71609 1.99609 2.99609 1.99609C3.27609 1.99609 3.50809 2.09209 3.69209 2.28409C3.88409 2.47609 3.98009 2.70809 3.98009 2.98809C3.98009 3.26809 3.88409 3.50009 3.69209 3.68409C3.50009 3.87609 3.26809 3.97209 2.99609 3.97209H2.98809ZM6.32409 3.97209C6.04409 3.97209 5.81209 3.87609 5.62809 3.68409C5.43609 3.49209 5.34009 3.26009 5.34009 2.98809C5.34009 2.71609 5.43609 2.47609 5.62809 2.28409C5.82009 2.09209 6.05209 1.99609 6.32409 1.99609C6.59609 1.99609 6.83609 2.09209 7.02809 2.28409C7.22009 2.47609 7.31609 2.70809 7.31609 2.98809C7.31609 3.26809 7.22009 3.50009 7.02809 3.68409C6.83609 3.87609 6.60409 3.97209 6.32409 3.97209ZM9.67609 3.97209C9.39609 3.97209 9.16409 3.87609 8.97209 3.68409C8.78009 3.49209 8.68409 3.26009 8.68409 2.98809C8.68409 2.71609 8.78009 2.47609 8.97209 2.28409C9.16409 2.09209 9.39609 1.99609 9.67609 1.99609C9.95609 1.99609 10.1881 2.09209 10.3801 2.28409C10.5721 2.47609 10.6681 2.70809 10.6681 2.98809C10.6681 3.26809 10.5721 3.50009 10.3801 3.68409C10.1881 3.87609 9.95609 3.97209 9.67609 3.97209ZM13.0121 3.97209C12.7321 3.97209 12.5001 3.87609 12.3161 3.68409C12.1321 3.49209 12.0281 3.26009 12.0281 2.98809C12.0281 2.71609 12.1241 2.47609 12.3161 2.28409C12.5081 2.09209 12.7401 1.99609 13.0121 1.99609C13.2841 1.99609 13.5241 2.09209 13.7161 2.28409C13.9081 2.47609 14.0041 2.70809 14.0041 2.98809C14.0041 3.26809 13.9081 3.50009 13.7161 3.68409C13.5241 3.87609 13.2921 3.97209 13.0121 3.97209Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.30769 8.69231H2.69231C2.49615 8.69231 2.33177 8.62592 2.19915 8.49315C2.06638 8.36038 2 8.19592 2 7.99977C2 7.80346 2.06638 7.63908 2.19915 7.50662C2.33177 7.374 2.49615 7.30769 2.69231 7.30769H7.30769V2.69231C7.30769 2.49615 7.37408 2.33177 7.50685 2.19915C7.63962 2.06638 7.80408 2 8.00023 2C8.19654 2 8.36092 2.06638 8.49339 2.19915C8.626 2.33177 8.69231 2.49615 8.69231 2.69231V7.30769H13.3077C13.5038 7.30769 13.6682 7.37408 13.8008 7.50685C13.9336 7.63962 14 7.80408 14 8.00023C14 8.19654 13.9336 8.36092 13.8008 8.49339C13.6682 8.626 13.5038 8.69231 13.3077 8.69231H8.69231V13.3077C8.69231 13.5038 8.62592 13.6682 8.49315 13.8008C8.36038 13.9336 8.19592 14 7.99977 14C7.80346 14 7.63908 13.9336 7.50662 13.8008C7.374 13.6682 7.30769 13.5038 7.30769 13.3077V8.69231Z" fill="#8f0941" />
  </svg>
);
const IcARClose = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6.7L7.45 8.15C7.54167 8.24167 7.65833 8.2875 7.8 8.2875C7.94167 8.2875 8.05833 8.24167 8.15 8.15C8.24167 8.05833 8.2875 7.94167 8.2875 7.8C8.2875 7.65833 8.24167 7.54167 8.15 7.45L6.7 6L8.15 4.55C8.24167 4.45833 8.2875 4.34167 8.2875 4.2C8.2875 4.05833 8.24167 3.94167 8.15 3.85C8.05833 3.75833 7.94167 3.7125 7.8 3.7125C7.65833 3.7125 7.54167 3.75833 7.45 3.85L6 5.3L4.55 3.85C4.45833 3.75833 4.34167 3.7125 4.2 3.7125C4.05833 3.7125 3.94167 3.75833 3.85 3.85C3.75833 3.94167 3.7125 4.05833 3.7125 4.2C3.7125 4.34167 3.75833 4.45833 3.85 4.55L5.3 6L3.85 7.45C3.75833 7.54167 3.7125 7.65833 3.7125 7.8C3.7125 7.94167 3.75833 8.05833 3.85 8.15C3.94167 8.24167 4.05833 8.2875 4.2 8.2875C4.34167 8.2875 4.45833 8.24167 4.55 8.15L6 6.7Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.016 6.66699C14.791 6.66699 14.5993 6.74199 14.4327 6.90866L10.0077 11.3337L5.58268 6.90866C5.43268 6.75866 5.24102 6.68366 5.00768 6.68366C4.77435 6.68366 4.58268 6.75866 4.41602 6.90866C4.24935 7.07533 4.16602 7.27533 4.16602 7.50033C4.16602 7.72533 4.24935 7.92533 4.41602 8.09199L9.42435 13.1003C9.50768 13.1837 9.59935 13.242 9.69102 13.2753C9.78268 13.3087 9.89102 13.3253 10.0077 13.3253C10.116 13.3253 10.2243 13.3087 10.3243 13.2753C10.4243 13.242 10.5077 13.1837 10.591 13.1003L15.6243 8.07533C15.791 7.90866 15.8743 7.71699 15.866 7.49199C15.866 7.26699 15.7743 7.07533 15.6077 6.90866C15.441 6.75866 15.2493 6.67533 15.0243 6.66699H15.016Z" fill="#5a5a5a" />
  </svg>
);
const IcARChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.34299 10.5689C3.211 10.4369 3.14029 10.2813 3.13086 10.1022C3.13086 9.92307 3.19214 9.7675 3.32414 9.63551L7.53849 5.42115C7.60449 5.35516 7.67991 5.30802 7.75534 5.27973C7.83076 5.25145 7.92033 5.2373 8.00518 5.2373C8.09003 5.2373 8.1796 5.25145 8.25503 5.27973C8.33045 5.30802 8.40588 5.35516 8.47187 5.42115L12.6674 9.61665C12.7994 9.74865 12.8654 9.90892 12.8701 10.0928C12.8748 10.2766 12.8041 10.4322 12.6674 10.5689C12.5354 10.6915 12.3798 10.7527 12.1913 10.7527C12.0027 10.7527 11.8566 10.6915 11.734 10.5689L8.00518 6.84008L4.27637 10.5689C4.14438 10.7009 3.9841 10.7669 3.80968 10.7622C3.63526 10.7575 3.47498 10.6915 3.34299 10.5689Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);
const IcARAddCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.47433 8.52599V10.8067C7.47433 10.9558 7.5248 11.0808 7.62574 11.1816C7.72667 11.2825 7.8517 11.333 8.00083 11.333C8.15007 11.333 8.27504 11.2825 8.37574 11.1816C8.47656 11.0808 8.52697 10.9558 8.52697 10.8067V8.52599H10.8077C10.9568 8.52599 11.0818 8.47552 11.1826 8.37459C11.2835 8.27365 11.334 8.14862 11.334 7.9995C11.334 7.85026 11.2835 7.72529 11.1826 7.62459C11.0818 7.52377 10.9568 7.47336 10.8077 7.47336H8.52697V5.19266C8.52697 5.04353 8.4765 4.91856 8.37556 4.81774C8.27463 4.71681 8.1496 4.66634 8.00048 4.66634C7.85124 4.66634 7.72626 4.71681 7.62556 4.81774C7.52474 4.91856 7.47433 5.04353 7.47433 5.19266V7.47336H5.19363C5.04451 7.47336 4.91954 7.52383 4.81872 7.62476C4.71779 7.7257 4.66732 7.85073 4.66732 7.99985C4.66732 8.14909 4.71779 8.27406 4.81872 8.37476C4.91954 8.47558 5.04451 8.52599 5.19363 8.52599H7.47433ZM8.00188 14.6663C7.07977 14.6663 6.21305 14.4914 5.4017 14.1414C4.59036 13.7915 3.88463 13.3166 3.28451 12.7167C2.68439 12.1168 2.20925 11.4114 1.85907 10.6004C1.50901 9.78938 1.33398 8.92289 1.33398 8.0009C1.33398 7.0788 1.50896 6.21207 1.8589 5.40073C2.20884 4.58938 2.68375 3.88365 3.28363 3.28353C3.88352 2.68342 4.58896 2.20827 5.39995 1.8581C6.21094 1.50804 7.07743 1.33301 7.99942 1.33301C8.92153 1.33301 9.78825 1.50798 10.5996 1.85792C11.4109 2.20786 12.1167 2.68277 12.7168 3.28266C13.3169 3.88254 13.7921 4.58798 14.1422 5.39897C14.4923 6.20997 14.6673 7.07646 14.6673 7.99845C14.6673 8.92055 14.4923 9.78728 14.1424 10.5986C13.7925 11.41 13.3176 12.1157 12.7177 12.7158C12.1178 13.3159 11.4123 13.7911 10.6014 14.1413C9.79036 14.4913 8.92387 14.6663 8.00188 14.6663Z" fill="#5a5a5a" />
  </svg>
);
const IcARTrash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66264 14C4.3091 14 4.00646 13.8742 3.75473 13.6226C3.50299 13.371 3.37713 13.0686 3.37713 12.7152V3.69469H3.19935C3.04824 3.69469 2.9216 3.64358 2.81944 3.54135C2.71716 3.43913 2.66602 3.31251 2.66602 3.16148C2.66602 3.01033 2.71716 2.88377 2.81944 2.78178C2.9216 2.67968 3.04824 2.62862 3.19935 2.62862H5.86602C5.86602 2.45462 5.92735 2.30632 6.05002 2.18372C6.17256 2.06124 6.32089 2 6.49499 2H9.5037C9.67781 2 9.82613 2.06124 9.94868 2.18372C10.0713 2.30632 10.1327 2.45462 10.1327 2.62862H12.7993C12.9505 2.62862 13.0771 2.67974 13.1793 2.78196C13.2815 2.88418 13.3327 3.01081 13.3327 3.16184C13.3327 3.31298 13.2815 3.43955 13.1793 3.54153C13.0771 3.64364 12.9505 3.69469 12.7993 3.69469H12.6216V12.7152C12.6216 13.0686 12.4957 13.371 12.244 13.6226C11.9922 13.8742 11.6896 14 11.3361 14H4.66264ZM6.68682 11.5125C6.83793 11.5125 6.96456 11.4615 7.06673 11.3594C7.16877 11.2571 7.21979 11.1305 7.21979 10.9795V5.64915C7.21979 5.49812 7.16865 5.37149 7.06637 5.26927C6.96421 5.16717 6.83751 5.11611 6.68628 5.11611C6.53517 5.11611 6.40853 5.16717 6.30637 5.26927C6.20433 5.37149 6.1533 5.49812 6.1533 5.64915V10.9795C6.1533 11.1305 6.20439 11.2571 6.30655 11.3594C6.40883 11.4615 6.53559 11.5125 6.68682 11.5125ZM9.31242 11.5125C9.46353 11.5125 9.59016 11.4615 9.69233 11.3594C9.79437 11.2571 9.84539 11.1305 9.84539 10.9795V5.64915C9.84539 5.49812 9.79431 5.37149 9.69215 5.26927C9.58987 5.16717 9.46311 5.11611 9.31188 5.11611C9.16077 5.11611 9.03413 5.16717 8.93197 5.26927C8.82993 5.37149 8.7789 5.49812 8.7789 5.64915V10.9795C8.7789 11.1305 8.83004 11.2571 8.93233 11.3594C9.03449 11.4615 9.16119 11.5125 9.31242 11.5125Z" fill="#000000" fillOpacity="0.65" />
  </svg>
);

// ── Small UI components ──
function ARTextField({ label, value, onChange }) {
  const [draft, setDraft] = useState(null);
  const displayVal = draft !== null ? draft : (parseInt(value) || 0).toString();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
      <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>{label}</div>
      <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "4px 8px", height: 32, display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={displayVal}
          onChange={e => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={() => {
            const num = Math.min(100, Math.max(0, parseInt(displayVal) || 0));
            onChange(num + "%");
            setDraft(null);
          }}
          style={{ border: "none", outline: "none", fontSize: 14, color: "#141414", width: "100%", background: "transparent" }}
        />
        <span style={{ fontSize: 14, color: "#141414", flexShrink: 0 }}>%</span>
      </div>
    </div>
  );
}

function ARColorField({ color, onChange }) {
  return (
    <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: 4, display: "flex", alignItems: "center", gap: 8, alignSelf: "stretch" }}>
      <div style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #e0e0e0", background: color, flexShrink: 0 }} />
      <input
        type="text"
        value={color}
        onChange={e => onChange(e.target.value)}
        style={{ border: "none", outline: "none", fontSize: 14, fontWeight: 400, color: "#141414", width: "100%", background: "transparent" }}
      />
    </div>
  );
}

function ARSlider({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {label && <span style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>{label}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
        <div style={{ flex: 1, position: "relative", height: 18, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#e0e0e0", borderRadius: 8 }} />
          <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 2, background: "#da0e64", borderRadius: 8 }} />
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

// ── Finish icons ──
const IcFinishMatte = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="4" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="4" r="1.2" fill="#5a5a5a"/>
    <circle cx="4" cy="9" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="9" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="9" r="1.2" fill="#5a5a5a"/>
    <circle cx="4" cy="14" r="1.2" fill="#5a5a5a"/><circle cx="9" cy="14" r="1.2" fill="#5a5a5a"/><circle cx="14" cy="14" r="1.2" fill="#5a5a5a"/>
  </svg>
);
const IcFinishGloss = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2L9.8 7H15L10.6 10.2L12.4 15.4L9 12.4L5.6 15.4L7.4 10.2L3 7H8.2L9 2Z" fill="#5a5a5a"/>
  </svg>
);
const IcFinishShimmer = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16L16 2M6 16L16 6M2 12L12 2M10 16L16 10M2 8L8 2M14 16L16 14" stroke="#5a5a5a" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FINISH_ICONS = { Matte: <IcFinishMatte />, Gloss: <IcFinishGloss />, Shimmer: <IcFinishShimmer /> };

// ── Settings helpers ──
export function getDefaultARSettings(subcategory) {
  const config = getARConfig(subcategory);
  const defaultPatternType = config?.patternTypes?.[0] || "Glossy";
  const defaultSubStyle = config?.blushSubStyles?.[0] || null;

  return {
    colorStyle: "Single",
    colors: ["#9999FF", "#9999FF"],
    finish: config?.finishTypes?.[0] || "Matte",
    lipColor: "#9999FF",
    intensity: 50,
    glossValue: 50,
    shimmerColor: "#9999FF",
    shimmerIntensity: 50,
    shimmerDensity: 50,
    shimmerGranularity: 50,
    selectedPattern: config?.patternTypes?.[0] || "",
    patternSliderValues: Object.fromEntries((config?.patternSliders || []).map((label) => [label, 50])),
    eyeshadowPatternColors: [
      { id: "ec1", isMain: true, color: "#9999FF", intensity: 50 },
      { id: "ec2", isMain: false, color: "#9999FF", intensity: 50 },
      { id: "ec3", isMain: false, color: "#9999FF", intensity: 50 },
    ],
    patterns: [
      { id: "pat1", type: defaultPatternType, collapsed: false, intensity: "24%", gloss: "24%", density: "24%", granularity: "24%", color: "#9999FF", subStyle: defaultSubStyle }
    ],
    selectedPatternId: "pat1",
  };
}

export function normalizeARSettings(subcategory, savedSettings) {
  const defaults = getDefaultARSettings(subcategory);
  if (!savedSettings) return defaults;

  const nextPatterns = Array.isArray(savedSettings.patterns) && savedSettings.patterns.length > 0
    ? savedSettings.patterns
    : defaults.patterns;
  const nextEyeshadowPatternColors = Array.isArray(savedSettings.eyeshadowPatternColors) && savedSettings.eyeshadowPatternColors.length > 0
    ? savedSettings.eyeshadowPatternColors
    : defaults.eyeshadowPatternColors;

  return {
    ...defaults,
    ...savedSettings,
    colors: Array.isArray(savedSettings.colors) && savedSettings.colors.length > 0 ? savedSettings.colors : defaults.colors,
    patternSliderValues: { ...defaults.patternSliderValues, ...(savedSettings.patternSliderValues || {}) },
    eyeshadowPatternColors: nextEyeshadowPatternColors,
    patterns: nextPatterns,
    selectedPatternId: savedSettings.selectedPatternId || nextPatterns[0]?.id || defaults.selectedPatternId,
  };
}

export function ARSettingsPanel({ subcategory, initialSettings: savedSettings, onDirtyChange, onSaveSettings, saveVersion = 0, startDirty = false }) {
  const config = getARConfig(subcategory);
  const initialSettings = normalizeARSettings(subcategory, savedSettings);

  const [colorStyle, setColorStyle] = useState(initialSettings.colorStyle);
  const [colors, setColors] = useState(initialSettings.colors);
  const [colorStyleOpen, setColorStyleOpen] = useState(false);

  const [finish, setFinish] = useState(initialSettings.finish);
  const [finishOpen, setFinishOpen] = useState(false);
  const [lipColor, setLipColor] = useState(initialSettings.lipColor);
  const [intensity, setIntensity] = useState(initialSettings.intensity);
  const [glossValue, setGlossValue] = useState(initialSettings.glossValue);
  const [shimmerColor, setShimmerColor] = useState(initialSettings.shimmerColor);
  const [shimmerIntensity, setShimmerIntensity] = useState(initialSettings.shimmerIntensity);
  const [shimmerDensity, setShimmerDensity] = useState(initialSettings.shimmerDensity);
  const [shimmerGranularity, setShimmerGranularity] = useState(initialSettings.shimmerGranularity);

  const [selectedPattern, setSelectedPattern] = useState(initialSettings.selectedPattern);
  const [patternSliderValues, setPatternSliderValues] = useState(initialSettings.patternSliderValues);
  const [apiPatterns, setApiPatterns] = useState(null);
  const [patternsLoading, setPatternsLoading] = useState(false);

  const [eyeshadowPatternColors, setEyeshadowPatternColors] = useState(initialSettings.eyeshadowPatternColors);
  const eyeshadowDragRef = useRef(null);

  useEffect(() => {
    if (!config?.colorAndPatternMode) return;
    setPatternsLoading(true);
    fetchPatterns(subcategory).then(items => {
      setApiPatterns(items);
      if (items?.length && !selectedPattern) setSelectedPattern(items[0].name);
      setPatternsLoading(false);
    });
  }, [subcategory]);

  const [patterns, setPatterns] = useState(initialSettings.patterns);
  const [selectedPatternId, setSelectedPatternId] = useState(initialSettings.selectedPatternId);
  const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(initialSettings));
  const [forceDirty, setForceDirty] = useState(startDirty);
  const saveVersionRef = useRef(saveVersion);

  const [showPatternPicker, setShowPatternPicker] = useState(false);
  const [pickerTargetId, setPickerTargetId] = useState(null);
  const [pickerPos, setPickerPos] = useState({ x: window.innerWidth / 2 - 160, y: window.innerHeight / 2 - 120 });
  const dragRef = useRef(null);

  const PATTERN_TYPES = config?.patternTypes || ["Glossy", "Shimmer", "Matte"];
  const PATTERN_THUMBS = config?.patternThumbs || {
    Glossy: "/pattern-glossy.png",
    Shimmer: "/pattern-shimmer.png",
    Matte: "/pattern-matte.png",
  };
  const styleOptions = config?.styleOptions || ["Single", "Dual", "Ombre"];
  const colorCount = colorStyle === "Dual" ? 2 : 1;

  useEffect(() => {
    const nextInitialSettings = normalizeARSettings(subcategory, savedSettings);
    setColorStyle(nextInitialSettings.colorStyle);
    setColors(nextInitialSettings.colors);
    setFinish(nextInitialSettings.finish);
    setLipColor(nextInitialSettings.lipColor);
    setIntensity(nextInitialSettings.intensity);
    setGlossValue(nextInitialSettings.glossValue);
    setShimmerColor(nextInitialSettings.shimmerColor);
    setShimmerIntensity(nextInitialSettings.shimmerIntensity);
    setShimmerDensity(nextInitialSettings.shimmerDensity);
    setShimmerGranularity(nextInitialSettings.shimmerGranularity);
    setSelectedPattern(nextInitialSettings.selectedPattern);
    setPatternSliderValues(nextInitialSettings.patternSliderValues);
    setEyeshadowPatternColors(nextInitialSettings.eyeshadowPatternColors);
    setPatterns(nextInitialSettings.patterns);
    setSelectedPatternId(nextInitialSettings.selectedPatternId);
    setSavedSnapshot(JSON.stringify(nextInitialSettings));
    setForceDirty(startDirty);
    saveVersionRef.current = saveVersion;
  }, [subcategory, savedSettings, startDirty]);

  const settingsSnapshot = {
    colorStyle, colors, finish, lipColor, intensity, glossValue,
    shimmerColor, shimmerIntensity, shimmerDensity, shimmerGranularity,
    selectedPattern, patternSliderValues, eyeshadowPatternColors, patterns, selectedPatternId,
  };
  const snapshotString = JSON.stringify(settingsSnapshot);

  useEffect(() => {
    onDirtyChange(forceDirty || snapshotString !== savedSnapshot);
  }, [forceDirty, onDirtyChange, savedSnapshot, snapshotString]);

  useEffect(() => {
    if (saveVersion === saveVersionRef.current) return;
    saveVersionRef.current = saveVersion;
    setSavedSnapshot(snapshotString);
    setForceDirty(false);
    onSaveSettings?.(settingsSnapshot);
  }, [onSaveSettings, saveVersion, settingsSnapshot, snapshotString]);

  const selectPattern = (type) => {
    if (pickerTargetId === null) {
      const newId = `pat-${Date.now()}`;
      const newSubStyle = config?.blushSubStyles?.[0] || null;
      setPatterns(ps => [...ps, { id: newId, type, collapsed: false, intensity: "24%", gloss: "24%", density: "24%", granularity: "24%", color: "#9999FF", subStyle: newSubStyle }]);
      setSelectedPatternId(newId);
    } else {
      updatePattern(pickerTargetId, "type", type);
    }
    setShowPatternPicker(false);
    setPickerTargetId(null);
  };

  const addPattern = () => {
    setPickerTargetId(null);
    setPickerPos({ x: window.innerWidth / 2 - 152, y: window.innerHeight / 2 - 120 });
    setShowPatternPicker(true);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragRef.current) return;
      const { startX, startY, origX, origY } = dragRef.current;
      setPickerPos({ x: origX + (e.clientX - startX), y: origY + (e.clientY - startY) });
    };
    const onMouseUp = () => { dragRef.current = null; };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const removePattern = (id) => {
    setPatterns(ps => {
      const next = ps.filter(p => p.id !== id);
      if (selectedPatternId === id && next.length > 0) setSelectedPatternId(next[0].id);
      return next;
    });
  };
  const togglePattern = (id) => setPatterns(ps => ps.map(p => p.id === id ? { ...p, collapsed: !p.collapsed } : p));
  const updatePattern = (id, key, val) => setPatterns(ps => ps.map(p => p.id === id ? { ...p, [key]: val } : p));

  if (!config) return (
    <div style={{ padding: 22, textAlign: "center", color: "#bbb" }}>
      <Package size={32} strokeWidth={1} style={{ marginBottom: 8 }} />
      <p style={{ fontSize: 13 }}>AR not available for {subcategory}</p>
    </div>
  );

  // ── Eyeshadow mode ──
  if (config.eyeshadowMode) {
    const esPatList = (config.patternTypes || []).map(name => ({ id: name, name, thumb: config.patternThumbs?.[name] }));
    const esCurrentPat = esPatList.find(p => p.name === selectedPattern) || esPatList[0];

    const moveEsCard = (fromIdx, toIdx) => {
      setEyeshadowPatternColors(prev => {
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    };

    const onEsPointerUp = () => { eyeshadowDragRef.current = null; };
    const onEsPointerEnter = (idx) => {
      if (eyeshadowDragRef.current !== null && eyeshadowDragRef.current !== idx) {
        moveEsCard(eyeshadowDragRef.current, idx);
        eyeshadowDragRef.current = idx;
      }
    };

    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {showPatternPicker && (
          <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #fff", boxShadow: "0 4px 16px rgba(0,0,0,0.16)", width: 328, overflow: "hidden", userSelect: "none" }}>
            <div onMouseDown={e => { dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y }; e.preventDefault(); }} style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", gap: 4, minHeight: 40, cursor: "grab" }}>
              <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({esPatList.length})</span>
              <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" /></svg>
              </button>
            </div>
            <div style={{ padding: "16px 12px", display: "flex", flexWrap: "wrap", gap: 12 }}>
              {esPatList.map(pt => {
                const isSel = selectedPattern === pt.name;
                return (
                  <div key={pt.id} onClick={() => { setSelectedPattern(pt.name); setShowPatternPicker(false); }} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                    <div style={{ borderRadius: 16, border: `1px solid ${isSel ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                        {pt.thumb ? <img src={pt.thumb} alt={pt.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: isSel ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{pt.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
              <IcARPalette />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
            </div>
            <ARColorField color={lipColor} onChange={c => { setLipColor(c); setEyeshadowPatternColors(prev => prev.map((ec, i) => i === 0 ? { ...ec, color: c } : ec)); }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
              <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><IcFinishShimmer /></span>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>Shimmer</span>
              </div>
            </div>
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                <ARColorField color={shimmerColor} onChange={setShimmerColor} />
              </div>
              <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
              <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
              <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
            </div>
          </div>
          <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            <div style={{ background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "6px 10px", display: "flex", alignItems: "center", gap: 10, height: 48 }}>
              {esCurrentPat?.thumb && (
                <img src={esCurrentPat.thumb} alt={esCurrentPat.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
              )}
              <span style={{ flex: 1, fontSize: 14, color: "#141414", textTransform: "capitalize" }}>{esCurrentPat?.name || "Select pattern"}</span>
              <button onClick={() => { setPickerPos({ x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 180 }); setShowPatternPicker(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 13, fontWeight: 500, padding: "4px 0", flexShrink: 0 }}>Change</button>
            </div>
            <div onPointerUp={onEsPointerUp} onPointerLeave={onEsPointerUp}>
            {eyeshadowPatternColors.map((ec, idx) => (
              <div key={ec.id} onPointerEnter={() => onEsPointerEnter(idx)} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: idx < eyeshadowPatternColors.length - 1 ? 12 : 0 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f5f5f5", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#5a5a5a", flexShrink: 0, marginTop: 4 }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      {ec.isMain ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 36, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "0 10px" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 4, background: lipColor, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#5a5a5a", flex: 1 }}>Main color</span>
                        </div>
                      ) : (
                        <ARColorField color={ec.color} onChange={c => setEyeshadowPatternColors(prev => prev.map((x, i) => i === idx ? { ...x, color: c } : x))} />
                      )}
                    </div>
                    <div onPointerDown={e => { e.preventDefault(); eyeshadowDragRef.current = idx; }} style={{ cursor: "grab", padding: 4, flexShrink: 0, touchAction: "none" }}>
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                        <circle cx="3" cy="3" r="1.5" fill="#bbb" /><circle cx="9" cy="3" r="1.5" fill="#bbb" />
                        <circle cx="3" cy="8" r="1.5" fill="#bbb" /><circle cx="9" cy="8" r="1.5" fill="#bbb" />
                        <circle cx="3" cy="13" r="1.5" fill="#bbb" /><circle cx="9" cy="13" r="1.5" fill="#bbb" />
                      </svg>
                    </div>
                  </div>
                  <ARSlider label="Intensity" value={ec.intensity} onChange={v => setEyeshadowPatternColors(prev => prev.map((x, i) => i === idx ? { ...x, intensity: v } : x))} />
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Color-only mode (Lipstick, Foundation, Nail Polish) ──
  if (config.colorOnlyMode) {
    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
            <IcARPalette />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
          </div>
          <ARColorField color={lipColor} onChange={setLipColor} />
          <ARSlider label="Intensity" value={intensity} onChange={setIntensity} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
            <div style={{ position: "relative" }}>
              <div onClick={() => setFinishOpen(o => !o)} style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{FINISH_ICONS[finish]}</span>
                <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>{finish}</span>
                <ChevronDown size={20} color="#5a5a5a" />
              </div>
              {finishOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                  {(config.finishTypes || ["Matte", "Gloss", "Shimmer"]).map(ft => (
                    <div key={ft} onClick={() => { setFinish(ft); setFinishOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: finish === ft ? "#da0e64" : "#141414", background: finish === ft ? "#fce8f3" : "transparent" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>{FINISH_ICONS[ft]}</span>
                      {ft}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {finish === "Gloss" && (
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <ARSlider label="Gloss" value={glossValue} onChange={setGlossValue} />
            </div>
          )}
          {finish === "Shimmer" && (
            <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                <ARColorField color={shimmerColor} onChange={setShimmerColor} />
              </div>
              <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
              <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
              <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Color + Pattern mode (Eyeliner, Mascara, Eyebrows, Eyelashes) ──
  if (config.colorAndPatternMode) {
    const patList = apiPatterns
      ? apiPatterns.map(p => ({ id: p._id, name: p.name, thumb: p.thumbnailUrl }))
      : (config.patternTypes || []).map(name => ({ id: name, name, thumb: config.patternThumbs?.[name] }));
    const currentPat = patList.find(p => p.name === selectedPattern) || patList[0];
    return (
      <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {showPatternPicker && (
          <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #e0e0e0", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", width: 328, overflow: "hidden", userSelect: "none" }}>
            <div onMouseDown={e => { dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y }; e.preventDefault(); }} style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", minHeight: 40, cursor: "grab" }}>
              <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({patList.length})</span>
              <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" /></svg>
              </button>
            </div>
            <div style={{ padding: "16px 12px", display: "flex", flexWrap: "wrap", gap: 12 }}>
              {patList.map(pt => {
                const isSel = selectedPattern === pt.name;
                return (
                  <div key={pt.id} onClick={() => { setSelectedPattern(pt.name); setShowPatternPicker(false); }} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                    <div style={{ borderRadius: 16, border: `1px solid ${isSel ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                        {pt.thumb ? <img src={pt.thumb} alt={pt.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: isSel ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{pt.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
              <IcARPalette />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414", lineHeight: "20px" }}>Colors adjustments</span>
            </div>
            <ARColorField color={lipColor} onChange={setLipColor} />
            <ARSlider label="Intensity" value={intensity} onChange={setIntensity} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 14, color: "#5a5a5a", lineHeight: "20px" }}>Finish</div>
              {(config.finishTypes || []).length > 1 ? (
                <div style={{ position: "relative" }}>
                  <div onClick={() => setFinishOpen(o => !o)} style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{FINISH_ICONS[finish]}</span>
                    <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>{finish}</span>
                    <ChevronDown size={20} color="#5a5a5a" />
                  </div>
                  {finishOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                      {(config.finishTypes).map(ft => (
                        <div key={ft} onClick={() => { setFinish(ft); setFinishOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: finish === ft ? "#da0e64" : "#141414", background: finish === ft ? "#fce8f3" : "transparent" }}>
                          <span style={{ display: "flex", alignItems: "center" }}>{FINISH_ICONS[ft]}</span>
                          {ft}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><IcFinishMatte /></span>
                  <span style={{ flex: 1, fontSize: 14, color: "#141414", lineHeight: "20px" }}>Matte</span>
                </div>
              )}
            </div>
            {finish === "Shimmer" && (
              <div style={{ background: "#f5f5f5", borderRadius: 12, border: "1px solid #e0e0e0", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                  <ARColorField color={shimmerColor} onChange={setShimmerColor} />
                </div>
                <ARSlider label="Intensity" value={shimmerIntensity} onChange={setShimmerIntensity} />
                <ARSlider label="Density" value={shimmerDensity} onChange={setShimmerDensity} />
                <ARSlider label="Granularity" value={shimmerGranularity} onChange={setShimmerGranularity} />
              </div>
            )}
          </div>
          <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />
          <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            {patternsLoading ? (
              <div style={{ fontSize: 13, color: "#bbb", padding: "8px 0" }}>Loading patterns…</div>
            ) : (
              <div style={{ background: "#fafafa", borderRadius: 8, border: "1px solid #e0e0e0", padding: "6px 10px", display: "flex", alignItems: "center", gap: 10, height: 48 }}>
                {currentPat?.thumb && (
                  <img src={currentPat.thumb} alt={currentPat.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                )}
                <span style={{ flex: 1, fontSize: 14, color: "#141414", textTransform: "capitalize" }}>{currentPat?.name || config.patternLabel}</span>
                <button onClick={() => { setPickerPos({ x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 180 }); setShowPatternPicker(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#8f0941", fontSize: 13, fontWeight: 500, padding: "4px 0", flexShrink: 0 }}>Change</button>
              </div>
            )}
            {config.patternSliders && config.patternSliders.map(sliderLabel => (
              <ARSlider key={sliderLabel} label={sliderLabel} value={patternSliderValues[sliderLabel] ?? 50} onChange={v => setPatternSliderValues(prev => ({ ...prev, [sliderLabel]: v }))} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Default mode (Blush, Contour, Highlighter, etc.) ──
  return (
    <div style={{ background: "#fafafa", borderRadius: 16, padding: 8, display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
      {showPatternPicker && (
        <div style={{ position: "fixed", left: pickerPos.x, top: pickerPos.y, zIndex: 9999, background: "#fff", borderRadius: 12, border: "1px solid #fff", boxShadow: "0 4px 16px rgba(0,0,0,0.16)", width: 328, overflow: "hidden", userSelect: "none" }}>
          <div onMouseDown={(e) => { dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pickerPos.x, origY: pickerPos.y }; e.preventDefault(); }} style={{ background: "#f5f5f5", padding: "8px 12px", display: "flex", alignItems: "center", gap: 4, minHeight: 40, cursor: "grab" }}>
            <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#141414", letterSpacing: -0.2, lineHeight: "24px" }}>Patterns ({PATTERN_TYPES.length})</span>
            <button onClick={() => setShowPatternPicker(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6.66438L2.80151 9.86303C2.71419 9.95024 2.60443 9.9949 2.47224 9.99701C2.34015 9.999 2.2284 9.95434 2.13697 9.86303C2.04566 9.7716 2 9.66085 2 9.53076C2 9.40066 2.04566 9.28991 2.13697 9.19849L5.33562 6L2.13697 2.80151C2.04976 2.71419 2.0051 2.60443 2.00299 2.47224C2.001 2.34015 2.04566 2.2284 2.13697 2.13697C2.2284 2.04566 2.33915 2 2.46924 2C2.59934 2 2.71009 2.04566 2.80151 2.13697L6 5.33562L9.19849 2.13697C9.28581 2.04976 9.39557 2.0051 9.52776 2.00299C9.65985 2.001 9.7716 2.04566 9.86303 2.13697C9.95434 2.2284 10 2.33915 10 2.46924C10 2.59934 9.95434 2.71009 9.86303 2.80151L6.66438 6L9.86303 9.19849C9.95024 9.28581 9.9949 9.39557 9.99701 9.52776C9.999 9.65985 9.95434 9.7716 9.86303 9.86303C9.7716 9.95434 9.66085 10 9.53076 10C9.40066 10 9.28991 9.95434 9.19849 9.86303L6 6.66438Z" fill="#5a5a5a" />
              </svg>
            </button>
          </div>
          <div style={{ padding: "16px 12px", display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PATTERN_TYPES.map(type => {
              const isSelected = pickerTargetId ? patterns.find(p => p.id === pickerTargetId)?.type === type : false;
              return (
                <div key={type} onClick={() => selectPattern(type)} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", cursor: "pointer" }}>
                  <div style={{ borderRadius: 16, border: `1px solid ${isSelected ? "#8f0941" : "#e0e0e0"}`, padding: 4, overflow: "hidden" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f5f5f5", overflow: "hidden" }}>
                      <img src={PATTERN_THUMBS[type]} alt={type} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: isSelected ? "#141414" : "rgba(0,0,0,0.65)", textAlign: "center" }}>{type}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ background: "#fff", borderRadius: 16, padding: "16px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#141414", lineHeight: "24px" }}>General settings</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IcARPalette />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Colors adjustments</span>
          </div>

          {config.hasStyle && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 12, color: "#5a5a5a" }}>Style</div>
              <div style={{ position: "relative" }}>
                <div onClick={() => setColorStyleOpen(o => !o)} style={{ background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "6px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <span style={{ flex: 1, fontSize: 14, color: "#141414" }}>{colorStyle || "Select style"}</span>
                  {colorStyle && (
                    <>
                      <button onClick={e => { e.stopPropagation(); setColorStyle(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%" }}>
                        <IcARClose />
                      </button>
                      <div style={{ width: 1, height: 16, background: "#e0e0e0" }} />
                    </>
                  )}
                  <IcARChevronDown />
                </div>
                {colorStyleOpen && (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6, zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: 2 }}>
                    {styleOptions.map(opt => (
                      <div key={opt} onClick={() => { setColorStyle(opt); setColorStyleOpen(false); }} style={{ padding: "8px 12px", fontSize: 14, cursor: "pointer", color: colorStyle === opt ? "#da0e64" : "#141414", background: colorStyle === opt ? "#fce8f3" : "transparent" }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {Array.from({ length: colorCount }).map((_, i) => (
            <ARColorField key={i} color={colors[i] || "#9999FF"} onChange={v => setColors(cs => { const next = [...cs]; next[i] = v; return next; })} />
          ))}
        </div>

        <div style={{ height: 1, background: "#e0e0e0", margin: "0 12px" }} />

        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <IcARGrid />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#141414" }}>Pattern</span>
            </div>
            <button onClick={addPattern} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 0" }}>
              <IcARPlus />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#8f0941" }}>Add</span>
            </button>
          </div>

          {patterns.map(pat => (
            <div key={pat.id} style={{ background: "#fafafa", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42 }}>
                <div style={{ padding: "2px 0", display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => setSelectedPatternId(pat.id)}>
                  {selectedPatternId === pat.id ? (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#da0e64", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                    </div>
                  ) : (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #5a5a5a", flexShrink: 0, boxSizing: "border-box" }} />
                  )}
                </div>
                <button onClick={() => { setPickerTargetId(pat.id); setPickerPos({ x: window.innerWidth / 2 - 152, y: window.innerHeight / 2 - 120 }); setShowPatternPicker(true); }} style={{ width: 42, height: 42, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", flexShrink: 0, padding: "1.4px", overflow: "hidden", boxSizing: "border-box" }}>
                  <img src={PATTERN_THUMBS[pat.type]} alt={pat.type} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6, display: "block" }} />
                </button>
                <span style={{ flex: 1, fontSize: 14, color: "#141414" }}>{pat.type}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <button onClick={() => removePattern(pat.id)} style={{ width: 20, height: 20, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "content-box" }}>
                    <IcARTrash />
                  </button>
                  <button onClick={() => togglePattern(pat.id)} style={{ width: 20, height: 20, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "content-box" }}>
                    {pat.collapsed ? <IcChevronDown20 /> : <IcARChevronUp />}
                  </button>
                </div>
              </div>

              {!pat.collapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {pat.type === "Glossy" && !config?.patternTypes && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                      <ARTextField label="Gloss" value={pat.gloss} onChange={v => updatePattern(pat.id, "gloss", v)} />
                    </div>
                  )}
                  {pat.type === "Shimmer" && !config?.patternTypes && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <ARColorField color={pat.color} onChange={v => updatePattern(pat.id, "color", v)} />
                      <div style={{ display: "flex", gap: 8 }}>
                        <ARTextField label="Density" value={pat.density} onChange={v => updatePattern(pat.id, "density", v)} />
                        <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                        <ARTextField label="Granularity" value={pat.granularity} onChange={v => updatePattern(pat.id, "granularity", v)} />
                      </div>
                    </div>
                  )}
                  {pat.type === "Matte" && !config?.patternTypes && (
                    <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                  )}
                  {config?.blushSubStyles && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Sub Style</div>
                        <div style={{ position: "relative" }}>
                          <select value={pat.subStyle || config.blushSubStyles[0]} onChange={e => updatePattern(pat.id, "subStyle", e.target.value)} style={{ width: "100%", height: 32, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e0", padding: "0 28px 0 8px", fontSize: 14, color: "#141414", appearance: "none", cursor: "pointer", outline: "none" }}>
                            {config.blushSubStyles.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#5a5a5a" }} />
                        </div>
                      </div>
                      {pat.type === "Matte" && (
                        <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                      )}
                      {pat.type === "Shimmer" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                          <div style={{ fontSize: 12, color: "#5a5a5a", lineHeight: "16px" }}>Shimmer color</div>
                          <ARColorField color={pat.color} onChange={v => updatePattern(pat.id, "color", v)} />
                          <div style={{ display: "flex", gap: 8 }}>
                            <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                            <ARTextField label="Density" value={pat.density} onChange={v => updatePattern(pat.id, "density", v)} />
                            <ARTextField label="Granularity" value={pat.granularity} onChange={v => updatePattern(pat.id, "granularity", v)} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {config?.patternTypes && !config?.blushSubStyles && (
                    <ARTextField label="Intensity" value={pat.intensity} onChange={v => updatePattern(pat.id, "intensity", v)} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
export const isPhone = (v) => /^[0-9]{10}$/.test((v || "").replace(/\s/g, ""));

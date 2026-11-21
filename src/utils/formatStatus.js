// "in_progress" -> "In Progress"  |  "In Progress" stays unchanged
export const humanizeStatus = (s) =>
  s ? String(s).replace(/_/g, " ").replace(/(^|\s)(\w)/g, (_, sp, ch) => sp + ch.toUpperCase()) : "";

export const toCamel = obj => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toCamel);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      toCamel(v),
    ])
  );
};

export const normalizeNulls = (obj, defaults = {}) => {
  if (obj === null || typeof obj !== 'object') return obj ?? defaults ?? obj;
  if (Array.isArray(obj)) return obj.map(x => normalizeNulls(x, defaults));
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v == null ? (defaults[k] ?? null) : normalizeNulls(v, defaults);
  }
  return out;
};

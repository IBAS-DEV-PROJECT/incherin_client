export const normalizeHttpError = err => {
  const status = err?.response?.status ?? 0;
  const code = err?.response?.data?.code ?? 'UNKNOWN';
  const message =
    err?.response?.data?.message ??
    err?.message ??
    'Network error. Please try again.';
  return { status, code, message, raw: err };
};

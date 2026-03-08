export const formatDate = (date, locale = 'ko-KR') => {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const formatDate = (date, locale = 'ko-KR') => {
  if (!date) return '';
  const d = new Date(date);
  d.setHours(d.getHours() + 9); //+ 9시간(한국 표준시)
  return new Intl.DateTimeFormat(locale).format(d);
};

// TextArea 스타일 헬퍼
export const getContainerStyles = () => ({
  position: 'relative',
  width: '100%',
});

export const getTextareaStyles = theme => ({
  width: '100%',
  minHeight: '160px',
  padding: '12px 16px',
  boxSizing: 'border-box',
  border: `1px solid ${theme.colors.black}`,
  borderRadius: '10px',
  backgroundColor: theme.colors.white,
  fontFamily: theme.typography.fontFamily,
  ...(theme.typography?.paragraph?.p1 || {
    fontSize: '16px',
    lineHeight: '24px',
  }),
  color: theme.colors.black,
  resize: 'none',
  outline: 'none',
  '::placeholder': {
    color: theme.colors.darkGray,
  },
});

// SelectBox 스타일 헬퍼
export const getContainerStyles = theme => ({
  position: 'relative',
  width: '360px',
  fontFamily: theme.typography.fontFamily,
  ...theme.typography.paragraph.p2,
  color: theme.colors.black,
});

export const getButtonStyles = theme => ({
  boxSizing: 'border-box',
  height: '48px',
  padding: '0px 18px',
  border: `solid 2px ${theme.colors.blue}`,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  backgroundColor: theme.colors.white,
  ...theme.typography.paragraph.p2,
});

export const getContentStyles = theme => ({
  position: 'absolute',
  top: 'calc(100%)',
  left: 0,
  right: 0,
  backgroundColor: theme.colors.white,
  border: `solid 1px ${theme.colors.darkGray}`,
  borderRadius: '10px',
  zIndex: 10,
  padding: '8px',
});

export const getItemStyles = (theme, isSelected) => ({
  padding: '10px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: theme.colors.white,
  color: isSelected ? theme.colors.blue : theme.colors.black,
  '&:hover': {
    backgroundColor: theme.colors.lightBlue,
  },
});

// Tab 스타일 헬퍼
export const getTabsContainerStyles = theme => ({
  width: '100%',
  borderBottom: `1px solid ${theme.colors.darkGray}`,
});

export const getTabsListStyles = () => ({
  display: 'flex',
  gap: 32,
  paddingLeft: 16,
});

export const getTabStyles = (theme, isActive) => ({
  position: 'relative',
  padding: '12px 0',
  border: 'none',
  background: 'none',
  fontSize: 15,
  fontWeight: isActive ? 600 : 400,
  color: isActive ? theme.colors.blue : theme.colors.darkGray,
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  // 하단 파란 선
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.blue,
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.2s ease',
  },

  '&:hover': {
    color: isActive ? theme.colors.blue : theme.colors.black,
  },
});

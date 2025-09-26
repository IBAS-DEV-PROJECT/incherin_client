// Modal 스타일 헬퍼/상수
export const MODAL_VARIANTS = {
  CONFIRM: 'confirm',
  ALERT: 'alert',
  CUSTOM: 'custom',
};

export const getBackdropStyles = () => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  width: '100vw',
  height: '100vh',
});

export const getModalStyles = theme => ({
  backgroundColor: theme.colors.white,
  borderRadius: '12px',
  padding: '24px',
  minWidth: '300px',
  maxWidth: '400px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  margin: 'auto',
});

export const getTitleStyles = theme => ({
  fontSize: '16px',
  fontWeight: '500',
  color: theme.colors.black,
  marginBottom: '24px',
  textAlign: 'center',
  lineHeight: '1.4',
});

export const getButtonContainerStyles = () => ({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
});

export const getButtonStyles = (theme, variant = 'primary') => {
  const baseStyles = {
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '60px',
    transition: 'all 0.2s ease',
  };

  if (variant === 'primary') {
    return {
      ...baseStyles,
      backgroundColor: theme.colors.blue,
      color: theme.colors.white,
      '&:hover': {
        backgroundColor: '#1e3d7a',
      },
    };
  }

  return {
    ...baseStyles,
    backgroundColor: theme.colors.white,
    color: theme.colors.blue,
    border: `1px solid ${theme.colors.blue}`,
    '&:hover': {
      backgroundColor: theme.colors.gray,
    },
  };
};

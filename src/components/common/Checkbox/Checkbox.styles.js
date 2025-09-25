// Container 스타일
export const getContainerStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  userSelect: 'none',
});

// Hidden input 스타일
export const getHiddenInputStyles = () => ({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

// Checkbox 스타일
export const getCheckboxStyles = (theme, checked, disabled) => ({
  width: '20px',
  height: '20px',
  border: `1px solid ${checked ? theme.colors.blue : theme.colors.darkGray}`,
  borderRadius: '4px',
  backgroundColor: checked ? theme.colors.blue : theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.white,
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  '&:hover': !disabled && {
    borderColor: theme.colors.blue,
    boxShadow: `0 0 0 2px ${theme.colors.lightBlue}`,
  },
  '&:focus-within': !disabled && {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.colors.lightBlue}`,
  },
});

// Label 스타일
export const getLabelStyles = (theme, disabled) => ({
  fontSize: '14px',
  color: disabled ? theme.colors.darkGray : theme.colors.black,
  cursor: disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
});

// 상수 정의
export const CHECKBOX_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export const CHECKBOX_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
};

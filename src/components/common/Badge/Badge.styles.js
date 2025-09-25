// Variant 스타일 정의
export const getVariantStyles = (theme, variant) => {
  const validVariants = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];
  const safeVariant = validVariants.includes(variant) ? variant : 'primary';

  switch (safeVariant) {
    case 'primary':
      return { backgroundColor: theme.colors.blue, color: theme.colors.white };
    case 'secondary':
      return {
        backgroundColor: theme.colors.darkGray,
        color: theme.colors.white,
      };
    case 'success':
      return {
        backgroundColor: theme.colors.success,
        color: theme.colors.white,
      };
    case 'danger':
      return { backgroundColor: theme.colors.red, color: theme.colors.white };
    case 'warning':
      return {
        backgroundColor: theme.colors.warning,
        color: theme.colors.black,
      };
    case 'info':
      return {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.black,
      };
    case 'light':
      return {
        backgroundColor: theme.colors.gray,
        color: theme.colors.lightText,
        border: `1px solid ${theme.colors.lightBorder}`,
      };
    case 'dark':
      return { backgroundColor: theme.colors.black, color: theme.colors.white };
    default:
      return { backgroundColor: theme.colors.gray, color: theme.colors.black };
  }
};

// Size 스타일 정의
export const sizeStyles = {
  small: {
    fontSize: '10px',
    padding: '2px 6px',
    minWidth: '16px',
    height: '16px',
  },
  medium: {
    fontSize: '12px',
    padding: '4px 8px',
    minWidth: '20px',
    height: '20px',
  },
  large: {
    fontSize: '14px',
    padding: '6px 12px',
    minWidth: '24px',
    height: '24px',
  },
};

// 상수 정의
export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
};

export const BADGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

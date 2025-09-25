// Variant 스타일 정의
export const getVariantStyles = (theme, variant, active) => {
  const validVariants = ['subsidiary', 'secondary', 'primary'];
  const safeVariant = validVariants.includes(variant) ? variant : 'primary';

  switch (safeVariant) {
    case 'subsidiary' /*보조 버튼*/:
      return {
        backgroundColor: theme.colors.white,
        color: theme.colors.blue,
        border: `1.5px solid ${theme.colors.blue}`,
        ...(active && {
          borderColor: theme.colors.darkGray,
          backgroundColor: theme.colors.white,
        }),
      };

    case 'secondary' /*부가 버튼*/:
      return {
        backgroundColor: theme.colors.gray,
        color: theme.colors.blue,
        border: 'none',
        ...(active && {
          border: `solid 1.5px ${theme.colors.darkGray}`,
          backgroundColor: theme.colors.white,
          color: theme.colors.darkGray,
        }),
      };

    default: /*기본 버튼 (primary) */
      return {
        ...(active && {
          backgroundColor: theme.colors.lightBlue,
          color: theme.colors.blue,
        }),
      };
  }
};

// 기본 버튼 스타일
export const getBaseStyles = theme => ({
  ...theme.typography.paragraph.p2,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.colors.blue,
  color: theme.colors.white,
  border: 'none',
  padding: '5px 22px',
  borderRadius: '50px',
  cursor: 'pointer',
  transition: 'transform 0.12s ease, box-shadow 0.12s ease, opacity 0.2s ease',
  '&:hover': {
    opacity: 0.95,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.colors.lightBlue}`,
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

// 상수 정의
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SUBSIDIARY: 'subsidiary',
  SECONDARY: 'secondary',
};

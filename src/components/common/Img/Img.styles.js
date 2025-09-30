// Img 컴포넌트 스타일 함수들

// 기본 이미지 스타일
export const getImageStyles = (
  theme,
  width,
  height,
  borderRadius,
  objectFit,
  onClick
) => ({
  width,
  height,
  borderRadius,
  objectFit,
  cursor: onClick ? 'pointer' : 'default',
  transition: 'all 0.3s ease',
  display: 'block',
  maxWidth: '100%',
});

// 로딩 상태 스타일
export const getLoadingStyles = (theme, width, height, borderRadius) => ({
  width,
  height,
  borderRadius,
  backgroundColor: theme.colors.gray,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.darkGray,
  fontSize: '12px',
  fontWeight: '500',
});

// 에러 상태 스타일
export const getErrorStyles = (theme, width, height, borderRadius) => ({
  width,
  height,
  borderRadius,
  backgroundColor: theme.colors.gray,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.darkGray,
  fontSize: '12px',
  fontWeight: '500',
  textAlign: 'center',
  padding: '8px',
});

// 호버 효과 스타일
export const getHoverStyles = onClick => ({
  ...(onClick && {
    '&:hover': {
      opacity: 0.9,
      transform: 'scale(1.02)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  }),
});

// 상수 정의
export const IMG_OBJECT_FIT = {
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
};

export const IMG_LOADING = {
  LAZY: 'lazy',
  EAGER: 'eager',
};

export const IMG_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

// 크기별 스타일 정의
export const getSizeStyles = size => {
  const sizeMap = {
    small: { width: '32px', height: '32px' },
    medium: { width: '64px', height: '64px' },
    large: { width: '128px', height: '128px' },
    xlarge: { width: '256px', height: '256px' },
  };

  return sizeMap[size] || {};
};

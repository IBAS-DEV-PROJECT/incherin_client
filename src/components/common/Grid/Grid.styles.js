// --- 그리드 변형 상수 ---
export const GRID_VARIANTS = {
  AUTO: 'auto',
  RANKING: 'ranking',
  RECOMMEND: 'recommend',
  FEATURE: 'feature',
  CAROUSEL: 'carousel',
};

// --- 변형별 스타일 ---
export const getVariantStyles = (theme, variant, columns) => {
  const variants = {
    [GRID_VARIANTS.AUTO]: {
      gridTemplateColumns: columns
        ? `repeat(${columns}, 1fr)`
        : 'repeat(auto-fit, minmax(220px, 1fr))',
    },
    [GRID_VARIANTS.RANKING]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [GRID_VARIANTS.RECOMMEND]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [GRID_VARIANTS.FEATURE]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      textAlign: 'center',
    },
    [GRID_VARIANTS.CAROUSEL]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  };

  return variants[variant] || variants[GRID_VARIANTS.AUTO];
};

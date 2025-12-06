// --- 카드 변형 상수 ---
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  RECOMMEND: 'recommend',
  RANKING: 'ranking',
  FEATURE: 'feature',
};

// --- 변형별 스타일 ---
export const getVariantStyles = (theme, variant) => {
  const variants = {
    [CARD_VARIANTS.DEFAULT]: {
      display: 'flex',
      flexDirection: 'column',
    },
    [CARD_VARIANTS.RECOMMEND]: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    },
    [CARD_VARIANTS.RANKING]: {
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme?.colors?.black || '#000000',
      fontWeight: 700,
      backgroundColor: theme?.colors?.gray || '#e0e0e0',
    },
    [CARD_VARIANTS.FEATURE]: {
      padding: 16,
      textAlign: 'center',
    },
  };

  return variants[variant] || variants[CARD_VARIANTS.DEFAULT];
};

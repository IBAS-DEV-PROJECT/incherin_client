// Input 스타일 헬퍼 및 상수
export const INPUT_VARIANTS = {
  ID: 'id',
  PASSWORD: 'password',
  EMAIL: 'email',
  TEXT: 'text',
};

export const getVariantStyles = (theme, variant) => {
  const validVariants = Object.values(INPUT_VARIANTS);
  const safeVariant = validVariants.includes(variant)
    ? variant
    : INPUT_VARIANTS.TEXT;

  switch (safeVariant) {
    case INPUT_VARIANTS.ID:
      return {
        styles: {
          backgroundColor: theme.colors.white,
        },
        placeholder: '아이디를 입력하세요',
      };

    case INPUT_VARIANTS.PASSWORD:
      return {
        styles: {
          backgroundColor: theme.colors.white,
        },
        placeholder: '비밀번호를 입력하세요',
      };

    case INPUT_VARIANTS.EMAIL:
      return {
        styles: {
          backgroundColor: theme.colors.white,
        },
        placeholder: '이메일을 입력하세요',
      };

    default:
      return {
        styles: {},
        placeholder: '텍스트를 입력하세요',
      };
  }
};

// AuthForm 컨테이너 스타일
export const getAuthFormStyles = () => ({
  width: '100%',
});

// 소셜 로그인 버튼 스타일
export const getSocialButtonStyles = (theme, provider, disabled) => {
  const baseStyles = {
    width: '100%',
    height: '56px',
    borderRadius: '12px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '12px',
    opacity: disabled ? 0.5 : 1,
    '&:hover': disabled
      ? {}
      : {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        },
    '&:active': {
      transform: disabled ? 'none' : 'translateY(0)',
    },
  };

  const providerStyles = {
    google: {
      backgroundColor: theme.colors.white,
      color: theme.colors.black,
      border: `1px solid ${theme.colors.gray}`,
    },
    kakao: {
      backgroundColor: '#FEE500',
      color: theme.colors.black,
    },
    naver: {
      backgroundColor: '#03C75A',
      color: theme.colors.white,
    },
  };

  return {
    ...baseStyles,
    ...providerStyles[provider],
  };
};

// 아이콘 컨테이너 스타일
export const getIconStyles = () => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// 상수 정의
export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  KAKAO: 'kakao',
  NAVER: 'naver',
};

export const PROVIDER_CONFIG = {
  google: {
    name: '구글 계정으로 로그인',
    icon: 'G',
    enabled: true,
  },
  naver: {
    name: '네이버 계정으로 로그인 (준비 중)',
    icon: 'N',
    enabled: false,
  },
  kakao: {
    name: '카카오 계정으로 로그인 (준비 중)',
    icon: 'K',
    enabled: false,
  },
};

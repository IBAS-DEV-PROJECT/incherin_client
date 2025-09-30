// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

// --- 내부 ---
import { Button } from '../../common';
import { ROUTES } from '../../../routes/routeTable';

// --- 에셋 ---
import { Map01, Clock, Star01, Phone01 } from '@untitledui/icons';

// ============== 스타일 ==============
const StyledSection = styled.section({
  width: '100%',
  margin: 0,
  padding: '48px 0 0',
});

const StyledHero = styled.div(({ theme }) => ({
  position: 'relative',
  borderRadius: 0,
  overflow: 'hidden',
  background: `linear-gradient(180deg, ${theme.colors.lightBlue} 0%, rgba(39,80,155,0.15) 100%)`,
  padding: '56px 24px 80px',
  minHeight: 340,

  // 파란 물결 (시안 하단 곡선)
  '::after': {
    content: '""',
    position: 'absolute',
    left: '-10%',
    right: '-10%',
    bottom: -40,
    height: 180,
    background: theme.colors.blue,
    borderTopLeftRadius: '70% 100%',
    borderTopRightRadius: '70% 100%',
  },

  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,

  '@media (min-width: 992px)': {
    padding: '72px 56px 120px',
    gridTemplateColumns: '1.1fr 0.9fr',
    alignItems: 'end',
    minHeight: 420,
  },
}));

const StyledPillContainer = styled.div(({ theme }) => ({
  zIndex: 1,
  alignSelf: 'start',
  justifySelf: 'center',
  display: 'flex',
  gap: 16,
  background: theme.colors.white,
  borderRadius: 20,
  padding: '14px 18px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  width: 'min(720px, 100%)',
  justifyContent: 'space-between',

  '@media (max-width: 480px)': {
    flexDirection: 'column',
    gap: 10,
  },
}));

const StyledPillItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flex: 1,
  justifyContent: 'center',
  minWidth: 0,
});

const StyledPillText = styled.span(({ theme }) => ({
  color: theme.colors.blue,
  fontWeight: 800,
  whiteSpace: 'nowrap',
}));

const StyledPillDivider = styled.div(() => ({
  width: 1,
  background: '#E5E7EB',
  margin: '0 6px',
  '@media (max-width: 480px)': { display: 'none' },
}));

const StyledPhone = styled.div(({ theme }) => ({
  justifySelf: 'center',
  display: 'flex',
  alignItems: 'flex-end',
  color: theme.colors.blue,
  '@media (min-width: 992px)': {
    justifySelf: 'end',
  },
}));

const StyledCTA = styled.div(({ theme }) => ({
  marginTop: 24,
  background: theme.colors.gray,
  borderRadius: 12,
  padding: 32,
  textAlign: 'center',
}));

// ================== 컴포넌트 ==================
export function PromoSection() {
  const navigate = useNavigate();

  const points = [
    { icon: Star01, label: '가성비 맛집!' },
    { icon: Map01, label: '가까운 맛집!' },
    { icon: Clock, label: '빠른 맛집!' },
  ];

  return (
    <StyledSection>
      {/* 히어로 영역 */}
      <StyledHero>
        {/* 상단 포인트 pill */}
        <StyledPillContainer>
          {points.map((p, i) => (
            <React.Fragment key={i}>
              <StyledPillItem>
                {/* Untitle icons use currentColor; set explicit color via wrapper text color */}
                <span style={{ color: '#27509B', display: 'flex' }}>
                  {React.createElement(p.icon, { size: 28 })}
                </span>
                <StyledPillText>{p.label}</StyledPillText>
              </StyledPillItem>
              {i !== points.length - 1 && <StyledPillDivider />}
            </React.Fragment>
          ))}
        </StyledPillContainer>

        {/* 좌측(데스크탑 기준) 디바이스 일러스트 */}
        <StyledPhone>
          <Phone01 size={220} />
        </StyledPhone>

        {/* 우측(데스크탑 기준) 텍스트 */}
        <div style={{ color: '#2E5FBF', zIndex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 32,
              lineHeight: 1.3,
              fontWeight: 900,
            }}
          >
            핸드폰으로
            <br />
            이용해보세요 !
          </h2>
          <p style={{ margin: '12px 0 0', color: '#1f2937' }}>
            인슐랭은 PC, 태블릿, 모바일 3가지 모드를 지원합니다.
            <br />
            다양한 기기로 더욱 편리하게 이용해보세요 :D
          </p>
        </div>
      </StyledHero>

      {/* 하단 CTA 블록 */}
      <StyledCTA>
        <h3
          style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#2d2d2d' }}
        >
          나만의 맛집을 공유하고
          <br />
          맛잘알이 되고 싶다면?
        </h3>
        <Button
          variant="primary"
          active
          style={{ marginTop: 16, height: 44, borderRadius: 10 }}
          onClick={() => navigate(ROUTES.AUTH)}
        >
          로그인하고 맛집 찾기
        </Button>
      </StyledCTA>
    </StyledSection>
  );
}

import React from 'react';
import { Header } from '@widgets/header';
import { HomeBanner } from '@widgets/home-banner';
import { RouletteSection } from '@widgets/roulette-section';
import { NicknameSpotlight } from '@features/auth/generate-nickname';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
      <Header />
      <HomeBanner />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gap: '40px' }}>
        <NicknameSpotlight />

        <RouletteSection />

        <section
          style={{
            display: 'grid',
            gap: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '32px 36px',
            border: '1px solid #e0e7ff',
            boxShadow: '0 16px 36px rgba(27, 58, 124, 0.08)',
          }}
        >
          <header>
            <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#1b2a55' }}>다가올 프로토타입 로드맵</h2>
            <p style={{ margin: '12px 0 0', fontSize: '15px', color: '#4b5563' }}>
              인덕 & 안뇽이가 준비 중인 신규 기능을 미리 엿보세요.
            </p>
          </header>

          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[{
              title: '룰렛 커스텀',
              description: '내가 고른 카테고리로만 룰렛을 돌리고, 확률도 직접 조절할 수 있도록 준비 중이에요.',
              badge: 'Coming Soon',
            }, {
              title: '챗봇 가이드',
              description: '인덕 & 안뇽이가 챗봇으로 변신! 수업 끝나고 뭐 먹을지 바로 추천해드릴 예정이에요.',
              badge: 'Researching',
            }, {
              title: '리뷰 기반 알고리즘',
              description: '실시간 리뷰와 평점을 분석해 취향 맞춤형 맛집을 자동으로 추천해드릴 거예요.',
              badge: 'Design Stage',
            }].map(feature => (
              <div
                key={feature.title}
                style={{
                  backgroundColor: '#f5f8ff',
                  borderRadius: '18px',
                  padding: '24px',
                  border: '1px solid #d7e0ff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '11px',
                    letterSpacing: '0.6px',
                    fontWeight: 700,
                    color: '#27509B',
                    backgroundColor: '#e3ebff',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                  }}
                >
                  {feature.badge}
                </span>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1f2933' }}>{feature.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '22px' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
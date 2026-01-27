import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchShops } from '@entities/shop/api/shopApi';
import { Button } from '@shared/ui/Button/Button';
import { Card } from '@shared/ui/Card/Card';
import { useRoulette } from '../model/playRoulette';
import { media } from '@shared/config/media';

const RouletteContainer = styled.div`
  position: relative;
  margin: 0 auto 50px;
  width: 400px;
  height: 400px;

  ${media.tablet} {
    width: 320px;
    height: 320px;
    margin-bottom: 40px;
  }

  ${media.mobile} {
    width: 300px;
    height: 300px;
    margin-bottom: 30px;
  }

  ${media.mobileS} {
    width: 260px;
    height: 260px;
  }
`;

// 룰렛 제목
const Title = styled.h3`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 40px;
  color: #1b2a55;
  text-align: center;

  ${media.tablet} {
    font-size: 22px;
    margin-bottom: 36px;
  }

  ${media.mobile} {
    font-size: 22px;
    margin-bottom: 34px;
  }

  ${media.mobileS} {
    font-size: 18px;
  }
`;

const WheelWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  border: 8px solid #1b2a55;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  transition: transform 4s cubic-bezier(0.15, 0, 0.15, 1);
`;

const Pointer = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff4d4f;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 4px solid #1b2a55;
  border-radius: 50%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1b2a55;
`;

// 당첨된 가게 이름 스타일
const ResultTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #0066cc;
  margin-bottom: 8px;
  background-color: #f0f7ff;
  padding: 16px 24px;
  border-radius: 16px;
  display: inline-block;

  white-space: nowrap;

  ${media.tablet} {
    font-size: 18px;
    padding: 12px 20px;
  }

  ${media.mobile} {
    font-size: 16px;
    padding: 10px 16px;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${media.mobileS} {
    font-size: 16px;
    padding: 10px 16px;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ShopDescription = styled.div`
  font-size: 16px;
  color: #666666;
  margin-bottom: 24px;
  word-break: keep-all;

  ${media.tablet} {
    font-size: 14px;
  }

  ${media.mobile} {
    font-size: 14px;
  }

  ${media.mobileS} {
    font-size: 12px;
  }
`;

const DecisionArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  ${media.mobile} {
    /* 모바일에서 버튼이 너무 좁아지면 세로로 배치 */
    flex-direction: column;
    align-items: center;
  }
  ${media.mobileS} {
    /* 모바일에서 버튼이 너무 좁아지면 세로로 배치 */
    flex-direction: column;
    align-items: center;
  }
`;

export function Roulette({ onCategoryChange }) {
  const [shops, setShops] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();

  const {
    isSpinning,
    result,
    error: rouletteError,
    start,
  } = useRoulette(shops, onCategoryChange);

  useEffect(() => {
    fetchShops()
      .then(setShops)
      .catch(() => setLoadError('가게 목록을 불러오지 못했어요.'));
  }, []);

  // 룰렛 판의 색상 테마
  const colors = [
    '#f8fbff',
    '#eef6ff',
    '#e3ebff',
    '#d7e0ff',
    '#cbd5ff',
    '#bfcaff',
  ];

  // 룰렛 세그먼트 생성 (최대 8개까지 시각화)
  const displayShops = useMemo(() => {
    if (shops.length === 0) return [];
    return shops.slice(0, 8);
  }, [shops]);

  const spinWheel = () => {
    if (isSpinning || displayShops.length === 0) return;

    // 최소 5바퀴(1800도) 이상 회전 + 랜덤 각도
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    start();
  };

  const handleLike = () => result && navigate(`/shops/${result.id}`);
  const handleDislike = () => spinWheel();

  const displayError = loadError || rouletteError;

  return (
    <Card
      style={{
        padding: '40px 32px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '28px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}
    >
      <Title>🎰 오늘은 무엇을 먹을까요?</Title>

      <RouletteContainer>
        <Pointer />
        <CenterCircle>GO</CenterCircle>
        <WheelWrapper style={{ transform: `rotate(${rotation}deg)` }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            {displayShops.map((shop, i) => {
              const angle = 360 / displayShops.length;
              const startAngle = i * angle;
              const endAngle = (i + 1) * angle;

              const x1 =
                50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 =
                50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              return (
                <g key={shop.id}>
                  <path
                    d={pathData}
                    fill={colors[i % colors.length]}
                    stroke="#1b2a55"
                    strokeWidth="0.5"
                  />
                </g>
              );
            })}
          </svg>
        </WheelWrapper>
      </RouletteContainer>

      {displayError && (
        <div
          style={{
            color: '#d32f2f',
            margin: '0 0 24px',
            padding: '12px',
            backgroundColor: '#ffebee',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {displayError}
        </div>
      )}

      {result && !isSpinning ? (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <ResultTitle>🎉 {result.name} 당첨!</ResultTitle>
          <ShopDescription>{result.description}</ShopDescription>

          <DecisionArea>
            <Button
              variant="primary"
              onClick={handleLike}
              style={{ padding: '12px 36px', fontWeight: 700 }}
            >
              👍 좋아요! 가볼래요
            </Button>
            <Button
              variant="secondary"
              onClick={handleDislike}
              style={{ padding: '12px 36px', fontWeight: 700 }}
            >
              👎 음.. 다시 돌릴래요
            </Button>
          </DecisionArea>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={spinWheel}
          disabled={isSpinning || displayShops.length === 0}
          style={{
            padding: '16px 60px',
            fontSize: '20px',
            fontWeight: 800,
            borderRadius: '50px',
            boxShadow: '0 8px 20px rgba(0, 102, 204, 0.3)',
            background: 'linear-gradient(135deg, #1b2a55 0%, #27509B 100%)',
          }}
        >
          {isSpinning ? '두구두구...' : '🎰 룰렛 돌리기'}
        </Button>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </Card>
  );
}

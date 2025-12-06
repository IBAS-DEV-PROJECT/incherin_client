import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchShops } from '../../../../entities/shop/api/shopApi';
import { Button } from '../../../../shared/ui/Button/Button';
import { Card } from '../../../../shared/ui/Card/Card';
import { getRandomItem } from '../../../../shared/lib/random';
import { useNavigate } from 'react-router-dom';

const ANIMATION_DURATION = 2000; // 2초
const SPIN_INTERVAL_START = 50; // 시작 간격 (빠름)
const SPIN_INTERVAL_END = 200; // 끝 간격 (느림)

export function Roulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [shops, setShops] = useState([]);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops()
      .then(setShops)
      .catch(() => setError('가게 목록을 불러오지 못했어요.'));
  }, []);

  const startRoulette = useCallback(() => {
    if (isSpinning) return; // 중복 방지
    if (shops.length === 0) {
      setError('가게 목록을 불러오는 중입니다...');
      return;
    }
    setError('');
    setResult(null);
    setIsSpinning(true);
    
    let elapsed = 0;
    let currentInterval = SPIN_INTERVAL_START;
    const finalShop = getRandomItem(shops);
    
    if (!finalShop) {
      setError('추천할 가게가 없어요!');
      setIsSpinning(false);
      return;
    }

    // 룰렛 돌리기 애니메이션
    const spin = () => {
      elapsed += currentInterval;
      
      // 랜덤 가게를 빠르게 표시
      const randomShop = getRandomItem(shops);
      setCurrentShop(randomShop);
      
      // 시간이 지날수록 간격을 늘려서 느려지게
      if (elapsed < ANIMATION_DURATION * 0.7) {
        currentInterval = SPIN_INTERVAL_START + (elapsed / ANIMATION_DURATION) * 50;
      } else {
        currentInterval = SPIN_INTERVAL_START + (ANIMATION_DURATION * 0.7 / ANIMATION_DURATION) * 50 + 
                         ((elapsed - ANIMATION_DURATION * 0.7) / (ANIMATION_DURATION * 0.3)) * (SPIN_INTERVAL_END - SPIN_INTERVAL_START - 50);
      }
      
      if (elapsed < ANIMATION_DURATION) {
        intervalRef.current = setTimeout(spin, currentInterval);
      } else {
        // 최종 결과 표시
        setCurrentShop(finalShop);
        setResult(finalShop);
        setIsSpinning(false);
      }
    };
    
    spin();
  }, [shops, isSpinning]);

  useEffect(() => {
    // shops가 로드된 후에만 룰렛 시작
    if (shops.length > 0 && !result && !isSpinning) {
      startRoulette();
    }
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shops]);

  const handleLike = () => {
    if (!result) return;
    navigate(`/shops/${result.id}`);
  };
  const handleDislike = () => {
    startRoulette();
  };

  return (
    <Card style={{ 
      padding: '40px 32px', 
      textAlign: 'center', 
      minHeight: 300,
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        marginBottom: '32px',
        color: '#333333'
      }}>
        🎰 오늘은 이 가게 어때요?
      </h3>
      
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          margin: '20px 0',
          padding: '12px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      {(isSpinning || currentShop) && (
        <div style={{
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          marginBottom: '24px',
          transition: 'all 0.3s ease',
          transform: isSpinning ? 'scale(1.01)' : 'scale(1)',
        }}>
          {currentShop && (
            <>
              <div style={{ 
                fontSize: '28px', 
                fontWeight: 700, 
                marginBottom: '12px',
                color: '#0066cc',
                animation: isSpinning ? 'pulse 0.3s ease-in-out infinite' : 'none'
              }}>
                {currentShop.name}
              </div>
              <div style={{ 
                fontSize: '16px', 
                color: '#666666',
                marginTop: '8px'
              }}>
                {currentShop.description}
              </div>
              {isSpinning && (
                <div style={{
                  marginTop: '20px',
                  fontSize: '16px',
                  color: '#666666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ animation: 'spin 1s linear infinite' }}>🎡</span>
                  <span>돌리는 중...</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {!isSpinning && result && (
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Button 
              variant="primary" 
              onClick={handleLike}
              style={{
                backgroundColor: '#0066cc',
                color: '#ffffff',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 102, 204, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              👍 좋아요
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleDislike}
              style={{
                backgroundColor: '#f5f5f5',
                color: '#666666',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              👎 싫어요
            </Button>
          </div>
        </div>
      )}
      
      {!isSpinning && !result && !error && shops.length > 0 && (
        <Button 
          variant="primary" 
          onClick={startRoulette}
          style={{
            backgroundColor: '#0066cc',
            color: '#ffffff',
            padding: '14px 40px',
            fontSize: '18px',
            fontWeight: 700,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 102, 204, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          🎰 다시 돌리기
        </Button>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Card>
  );
}

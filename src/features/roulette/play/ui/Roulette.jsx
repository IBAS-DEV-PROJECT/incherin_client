import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchShops } from '@entities/shop/api/shopApi';
import { Button } from '@shared/ui/Button/Button';
import { Card } from '@shared/ui/Card/Card';
import { useRoulette } from '../model/playRoulette';

export function Roulette({ onCategoryChange }) {
  const [shops, setShops] = useState([]);
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  const { isSpinning, currentShop, result, error: rouletteError, start } = useRoulette(shops, onCategoryChange);

  useEffect(() => {
    fetchShops()
      .then(setShops)
      .catch(() => setLoadError('가게 목록을 불러오지 못했어요.'));
  }, []);

  useEffect(() => {
    if (shops.length > 0 && !result && !isSpinning && !rouletteError) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shops]);

  const handleLike = () => result && navigate(`/shops/${result.id}`);
  const handleDislike = () => start();

  const displayError = loadError || rouletteError;

  return (
    <Card style={{ 
      padding: '40px 32px', 
      textAlign: 'center', 
      minHeight: 300,
      backgroundColor: '#ffffff',
      borderRadius: '20px', // 카드를 좀 더 둥글게
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)', // 부드러운 그림자
      border: '1px solid #f0f0f0'
    }}>
      <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#333333' }}>
        🎰 오늘은 이 가게 어때요?
      </h3>
      
      {displayError && (
        <div style={{ 
          color: '#d32f2f', margin: '20px 0', padding: '12px', 
          backgroundColor: '#ffebee', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' 
        }}>
          {displayError}
        </div>
      )}
      
      {(isSpinning || currentShop) && (
        <div style={{
          minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '32px', backgroundColor: '#f8fbff', borderRadius: '16px', marginBottom: '24px',
          border: '2px solid #eef6ff', // 연한 파란 테두리 추가
          transition: 'all 0.3s ease', transform: isSpinning ? 'scale(1.01)' : 'scale(1)',
        }}>
          {currentShop && (
            <>
              <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#0066cc' }}>
                {currentShop.name}
              </div>
              <div style={{ fontSize: '16px', color: '#666666', marginTop: '8px' }}>
                {currentShop.description}
              </div>
              {isSpinning && (
                <div style={{ marginTop: '20px', fontSize: '16px', color: '#666666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ animation: 'spin 1s linear infinite' }}>🎡</span>
                  <span>돌리는 중...</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* 결과 버튼 (좋아요/싫어요) - 테두리와 그림자 추가 */}
      {!isSpinning && result && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Button 
            variant="primary" 
            onClick={handleLike} 
            style={{ 
              padding: '12px 32px',
              border: '2px solid #0056b3', // 진한 파란 테두리
              boxShadow: '0 4px 6px rgba(0, 102, 204, 0.2)', // 파란 그림자
              fontWeight: 'bold'
            }}
          >
            👍 좋아요
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleDislike} 
            style={{ 
              padding: '12px 32px',
              backgroundColor: '#ffffff',
              border: '2px solid #e0e0e0', // 회색 테두리
              color: '#666666',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            👎 싫어요
          </Button>
        </div>
      )}
      
      {/* 다시 돌리기 버튼 - 강조 스타일 */}
      {!isSpinning && !result && !displayError && shops.length > 0 && (
        <Button 
          variant="primary" 
          onClick={start} 
          style={{ 
            padding: '14px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '50px',
            border: '3px solid #004c9e', // 두꺼운 테두리로 강조
            boxShadow: '0 6px 12px rgba(0, 102, 204, 0.3)', // 강한 그림자
            background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' // 그라데이션 (선택사항)
          }}
        >
          🎰 다시 돌리기
        </Button>
      )}
      
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </Card>
  );
}
import React, { useEffect, useState } from 'react';
import { Button } from '@shared/ui/Button/Button';
import { generateNickname } from '../model/generateNickname';

export const NicknameSpotlight = ({ onNicknameChange }) => {
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const current = generateNickname();
    setNickname(current);
    onNicknameChange?.(current);
  }, [onNicknameChange]);

  const handleRefresh = () => {
    const next = generateNickname({ forceNew: true });
    setNickname(next);
    onNicknameChange?.(next);
    setStatusMessage('새 닉네임을 만들었어요!');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleCopy = async () => {
    if (!nickname) return;

    try {
      await navigator.clipboard.writeText(nickname);
      setStatusMessage('클립보드에 복사했어요.');
      setTimeout(() => setStatusMessage(''), 2000);
    } catch (error) {
      console.error('copy nickname error', error);
      setStatusMessage('복사에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1f3f8a 0%, #27509B 40%, #4c6df5 100%)',
        borderRadius: '28px',
        padding: '32px 36px',
        color: '#ffffff',
        boxShadow: '0 20px 40px rgba(20, 50, 120, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 800 }}>오늘의 랜덤 닉네임</h2>
      <p style={{ margin: 0, fontSize: '16px', opacity: 0.85 }}>
        인덕 & 안뇽이가 선물하는 랜덤 닉네임으로 자유롭게 리뷰를 남겨보세요.
      </p>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '18px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '14px', opacity: 0.75 }}>나의 미식 별명</span>
        <strong style={{ fontSize: '28px', fontWeight: 800 }}>{nickname || '생성 중...'}</strong>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Button
          variant="primary"
          onClick={handleCopy}
          style={{
            flex: '1 1 140px',
            minWidth: '140px',
            backgroundColor: '#ffffff',
            color: '#1f3f8a',
            fontWeight: 700,
          }}
        >
          닉네임 복사하기
        </Button>
        <Button
          variant="secondary"
          onClick={handleRefresh}
          style={{
            flex: '1 1 140px',
            minWidth: '140px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.4)',
            fontWeight: 700,
          }}
        >
          새 닉네임 뽑기
        </Button>
      </div>

      {statusMessage && (
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            backgroundColor: 'rgba(255,255,255,0.15)',
            padding: '10px 14px',
            borderRadius: '12px',
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

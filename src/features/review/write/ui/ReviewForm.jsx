import React, { useState } from 'react';
import { Button, BUTTON_VARIANTS } from '@shared/ui/Button';
import { TextArea } from '@shared/ui/TextArea';
import { StarRating } from '@shared/ui/StarRating';

const MAX_LENGTH = 500;

export const ReviewForm = ({
  nickname,
  onSubmit,
  onRefreshNickname,
  isSubmitting = false,
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    if (rating <= 0) {
      setError('평점을 먼저 선택해주세요.');
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) {
      setError('솔직한 한 줄을 남겨주세요!');
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setError('리뷰는 500자 이내로 작성해주세요.');
      return;
    }

    try {
      await onSubmit?.({ rating, content: trimmed });
      setContent('');
      setRating(0);
    } catch (submitError) {
      const message = submitError?.message || '리뷰 등록에 실패했어요.';
      setError(message);
    }
  };

  const remaining = MAX_LENGTH - content.length;
  const nicknameLabel = nickname || '닉네임 생성 중...';

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e0e7ff',
        padding: '28px',
        boxShadow: '0 12px 32px rgba(39, 80, 155, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#1b3a7c' }}>
            내 랜덤 닉네임
          </span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#27509B',
              backgroundColor: '#e6f0ff',
              padding: '8px 14px',
              borderRadius: '999px',
            }}
          >
            {nicknameLabel}
          </span>
          <button
            type="button"
            onClick={onRefreshNickname}
            style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            다른 닉네임 받기
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '15px', color: '#4b5563' }}>
            오늘의 평점
          </span>
          <div style={{ color: '#FFB400', fontSize: '28px', lineHeight: 1 }}>
            <StarRating rating={rating} onRate={setRating} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label
          htmlFor="review-content"
          style={{ fontSize: '15px', fontWeight: 600, color: '#1f2933' }}
        >
          어떤 점이 좋았나요?
        </label>
        <TextArea
          id="review-content"
          value={content}
          onChange={event =>
            setContent(event.target.value.slice(0, MAX_LENGTH))
          }
          placeholder="인덕 & 안뇽이에게 여러분의 솔직한 리뷰를 들려주세요!"
        />
        <div
          style={{
            textAlign: 'right',
            fontSize: '13px',
            color: remaining < 0 ? '#d32f2f' : '#4b5563',
          }}
        >
          {remaining < 0 ? 0 : remaining}자 남음
        </div>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: '#ffe7e7',
            color: '#c62828',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant={BUTTON_VARIANTS.PRIMARY}
        disabled={isSubmitting}
        style={{
          padding: '14px 0',
          fontSize: '18px',
          fontWeight: 700,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #27509B 0%, #1a2a6c 100%)',
        }}
      >
        {isSubmitting ? '등록 중...' : '리뷰 등록하기'}
      </Button>
    </form>
  );
};

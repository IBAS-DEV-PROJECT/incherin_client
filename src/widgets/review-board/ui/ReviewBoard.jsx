import React from 'react';
import { ReviewItem } from '@entities/review';
import { ReviewForm } from '@features/review/write';

export const ReviewBoard = ({
  reviews,
  nickname,
  onSubmitReview,
  onRefreshNickname,
  isSubmitting = false,
}) => {
  return (
    <section style={{ display: 'grid', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#1a2a6c' }}>
          리뷰 보드
        </h2>
        <p style={{ margin: 0, fontSize: '16px', color: '#4b5563' }}>
          로그인 없이 랜덤 닉네임으로 바로 리뷰를 남겨보세요.
        </p>
      </div>

      <ReviewForm
        nickname={nickname}
        onSubmit={onSubmitReview}
        onRefreshNickname={onRefreshNickname}
        isSubmitting={isSubmitting}
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1f2933' }}>
          지금까지의 리뷰
        </h3>

        {reviews && reviews.length > 0 ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            {reviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#f4f6fb',
              borderRadius: '18px',
              padding: '36px 28px',
              textAlign: 'center',
              color: '#5b6474',
              fontSize: '15px',
              border: '1px dashed #d7e0ff',
            }}
          >
            아직 리뷰가 없어요. 첫 번째로 인덕 & 안뇽이에게 맛집 후기를 남겨주세요!
          </div>
        )}
      </div>
    </section>
  );
};

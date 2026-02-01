import React from 'react';
import styled from '@emotion/styled';
import { ReviewItem } from '@entities/review';
import { ReviewForm } from '@features/review/write';
import { media } from '@shared/config/media';

const BoardSection = styled.section`
  display: grid;
  gap: 32px;

  ${media.mobileS} {
    gap: 24px;
  }

  ${media.mobile} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 28px;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BoardTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #1a2a6c;

  ${media.mobileS} {
    font-size: 24px;
  }

  ${media.mobile} {
    font-size: 24px;
  }

  ${media.tablet} {
    font-size: 26px;
  }
`;

const BoardDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: #4b5563;

  ${media.mobileS} {
    font-size: 14px;
  }

  ${media.mobile} {
    font-size: 14px;
  }

  ${media.tablet} {
    font-size: 15px;
  }
`;

const ReviewListWrapper = styled.div`
  display: grid;
  gap: 20px;

  ${media.mobileS} {
    gap: 16px;
  }

  ${media.mobile} {
    gap: 16px;
  }

  ${media.tablet} {
    gap: 18px;
  }
`;

const ReviewListTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1f2933;

  ${media.mobileS} {
    font-size: 18px;
  }

  ${media.mobile} {
    font-size: 18px;
  }

  ${media.tablet} {
    font-size: 20px;
  }
`;

const ReviewListContainer = styled.div`
  display: grid;
  gap: 16px;

  ${media.mobileS} {
    gap: 12px;
  }

  ${media.mobile} {
    gap: 12px;
  }

  ${media.tablet} {
    gap: 14px;
  }
`;

const EmptyReviewBox = styled.div`
  background-color: #f4f6fb;
  border-radius: 18px;
  padding: 36px 28px;
  text-align: center;
  color: #5b6474;
  font-size: 15px;
  border: 1px dashed #d7e0ff;

  ${media.mobileS} {
    border-radius: 12px;
    padding: 24px 16px;
    font-size: 14px;
  }

  ${media.mobile} {
    border-radius: 12px;
    padding: 24px 16px;
    font-size: 14px;
  }

  ${media.tablet} {
    border-radius: 16px;
    padding: 30px 22px;
    font-size: 14px;
  }
`;

export const ReviewBoard = ({
  reviews,
  nickname,
  onSubmitReview,
  onRefreshNickname,
  isSubmitting = false,
}) => {
  return (
    <BoardSection>
      <BoardHeader>
        <BoardTitle>리뷰 보드</BoardTitle>
        <BoardDescription>
          로그인 없이 랜덤 닉네임으로 바로 리뷰를 남겨보세요.
        </BoardDescription>
      </BoardHeader>

      <ReviewForm
        nickname={nickname}
        onSubmit={onSubmitReview}
        onRefreshNickname={onRefreshNickname}
        isSubmitting={isSubmitting}
      />

      <ReviewListWrapper>
        <ReviewListTitle>지금까지의 리뷰</ReviewListTitle>

        {reviews && reviews.length > 0 ? (
          <ReviewListContainer>
            {reviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ReviewListContainer>
        ) : (
          <EmptyReviewBox>
            아직 리뷰가 없어요. 첫 번째로 인덕 & 안뇽이에게 맛집 후기를
            남겨주세요!
          </EmptyReviewBox>
        )}
      </ReviewListWrapper>
    </BoardSection>
  );
};

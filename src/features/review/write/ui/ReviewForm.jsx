import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, BUTTON_VARIANTS } from '@shared/ui/Button';
import { TextArea } from '@shared/ui/TextArea';
import { StarRating } from '@shared/ui/StarRating';
import { ImageUploader } from '@shared/ui/ImageUploader';
import { media } from '@shared/config/media';

const MAX_LENGTH = 500;

const FormContainer = styled.form`
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #e0e7ff;
  padding: 28px;
  box-shadow: 0 12px 32px rgba(39, 80, 155, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${media.mobileS} {
    border-radius: 16px;
    padding: 20px;
    gap: 16px;
  }

  ${media.mobile} {
    border-radius: 16px;
    padding: 20px;
    gap: 16px;
  }

  ${media.tablet} {
    border-radius: 18px;
    padding: 24px;
    gap: 18px;
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  ${media.mobileS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  ${media.tablet} {
    flex-direction: row;
    gap: 12px;
  }
`;

const NicknameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  ${media.mobileS} {
    gap: 8px;
  }

  ${media.mobile} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 10px;
  }
`;

const NicknameLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1b3a7c;

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

const NicknameBadge = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #27509b;
  background-color: #e6f0ff;
  padding: 8px 14px;
  border-radius: 999px;

  ${media.mobileS} {
    font-size: 14px;
    padding: 6px 12px;
  }

  ${media.mobile} {
    font-size: 14px;
    padding: 6px 12px;
  }

  ${media.tablet} {
    font-size: 14px;
    padding: 7px 13px;
  }
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;

  ${media.mobileS} {
    font-size: 14px;
  }

  ${media.mobile} {
    font-size: 14px;
  }

  ${media.tablet} {
    font-size: 14px;
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${media.mobileS} {
    gap: 8px;
  }

  ${media.mobile} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 9px;
  }
`;

const RatingLabel = styled.span`
  font-size: 15px;
  color: #4b5563;

  ${media.mobileS} {
    font-size: 14px;
  }

  ${media.mobile} {
    font-size: 14px;
  }

  ${media.tablet} {
    font-size: 14px;
  }
`;

const RatingStars = styled.div`
  color: #ffb400;
  font-size: 28px;
  line-height: 1;

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

const TextAreaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TextAreaLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #1f2933;

  ${media.mobileS} {
    font-size: 14px;
  }

  ${media.mobile} {
    font-size: 14px;
  }

  ${media.tablet} {
    font-size: 14px;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 13px;
  color: ${props => (props.isOver ? '#d32f2f' : '#4b5563')};

  ${media.mobileS} {
    font-size: 12px;
  }

  ${media.mobile} {
    font-size: 12px;
  }

  ${media.tablet} {
    font-size: 12px;
  }
`;

const ErrorBox = styled.div`
  background-color: #ffe7e7;
  color: #c62828;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  ${media.mobileS} {
    font-size: 13px;
    padding: 10px 14px;
  }

  ${media.mobile} {
    font-size: 13px;
    padding: 10px 14px;
  }

  ${media.tablet} {
    font-size: 13px;
    padding: 11px 15px;
  }
`;

const SubmitButton = styled(Button)`
  padding: 14px 0;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  background: linear-gradient(135deg, #27509b 0%, #1a2a6c 100%);

  ${media.mobileS} {
    padding: 12px 0;
    font-size: 16px;
  }

  ${media.mobile} {
    padding: 12px 0;
    font-size: 16px;
  }

  ${media.tablet} {
    padding: 13px 0;
    font-size: 17px;
  }
`;

export const ReviewForm = ({
  nickname,
  onSubmit,
  onRefreshNickname,
  isSubmitting = false,
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
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
      console.log('ReviewForm - submitting images:', images); // 디버깅
      await onSubmit?.({ rating, content: trimmed, images });
      setContent('');
      setRating(0);
      setImages([]);
    } catch (submitError) {
      const message = submitError?.message || '리뷰 등록에 실패했어요.';
      setError(message);
    }
  };

  const remaining = MAX_LENGTH - content.length;
  const nicknameLabel = nickname || '닉네임 생성 중...';

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <NicknameSection>
          <NicknameLabel>내 랜덤 닉네임</NicknameLabel>
          <NicknameBadge>{nicknameLabel}</NicknameBadge>
          <RefreshButton type="button" onClick={onRefreshNickname}>
            다른 닉네임 받기
          </RefreshButton>
        </NicknameSection>
        <RatingSection>
          <RatingLabel>오늘의 평점</RatingLabel>
          <RatingStars>
            <StarRating rating={rating} onRate={setRating} />
          </RatingStars>
        </RatingSection>
      </FormHeader>

      <TextAreaSection>
        <TextAreaLabel htmlFor="review-content">
          어떤 점이 좋았나요?
        </TextAreaLabel>
        <TextArea
          id="review-content"
          value={content}
          onChange={event =>
            setContent(event.target.value.slice(0, MAX_LENGTH))
          }
          placeholder="인덕 & 안뇽이에게 여러분의 솔직한 리뷰를 들려주세요!"
        />
        <CharCount isOver={remaining < 0}>
          {remaining < 0 ? 0 : remaining}자 남음
        </CharCount>
      </TextAreaSection>

      <ImageUploader images={images} onChange={setImages} maxImages={5} />

      {error && <ErrorBox>{error}</ErrorBox>}

      <SubmitButton
        type="submit"
        variant={BUTTON_VARIANTS.PRIMARY}
        disabled={isSubmitting}
      >
        {isSubmitting ? '등록 중...' : '리뷰 등록하기'}
      </SubmitButton>
    </FormContainer>
  );
};

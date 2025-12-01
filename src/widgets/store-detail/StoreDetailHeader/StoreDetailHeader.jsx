// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Phone,
  Heart,
  Share01,
  Star01,
  MarkerPin01,
  XClose,
} from '@untitledui/icons';

// --- 내부 (부모) ---
import { Button } from '@shared/ui';
import FoodImg from '@shared/assets/image/food.webp';

// --- 스타일 ---
const Section = styled.section(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.blue,
  padding: '35px 24px',
  color: theme.colors.white,
  boxSizing: 'border-box',
}));
const Container = styled.div`
  max-width: 890px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  align-items: center;
`;
const ImageWrapper = styled.div`
  flex-shrink: 0;
`;
const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;
const Name = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`;
const Category = styled.span`
  font-size: 18px;
`;
const Description = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 16px;
`;
const Tags = styled.div`
  margin-top: -8px;
  opacity: 0.9;
  font-size: 17px;
  font-weight: 500;
`;
const AiSummary = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.white,
  color: theme.colors.black,
  padding: '11px 16px',
  borderRadius: '8px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  strong: {
    color: theme.colors.blue,
    fontSize: '16px',
    fontWeight: 600,
    flexShrink: 0,
  },
  p: {
    margin: 0,
    fontSize: '15px',
    lineHeight: 1.6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 17px;
`;
const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  & > svg {
    transform: translateY(1px);
  }
`;
const UnderlinedMetaItem = styled(MetaItem)`
  text-decoration: underline;
  font-size: 15px;
`;
const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;
const ActionButton = styled(Button)`
  font-size: 17px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 17px;
  font-weight: 590;
`;

// --- 전화번호 모달 스타일 ---
const PhoneNumberModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PhoneNumberModalContent = styled.div(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.colors.white,
  padding: '32px 48px',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
}));

const PhoneNumberModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 7px;
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
`;

const PhoneNumberModalText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 580;
  color: #333;
`;

const PhoneNumberModalCopyLink = styled.button(({ theme }) => ({
  background: 'none',
  border: 'none',
  color: theme.colors.blue,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '16px',
}));

// --- 기본 더미 데이터 ---
const defaultStoreData = {
  imageUrl: FoodImg,
  name: '백소정 인하대후문점',
  category: '일식당',
  description: '백번 먹어도 정성스럽고 푸짐한 음식을 즐겁게 맛볼 수 있는 곳',
  tags: ['#메밀소바맛집', '#인하대일식'],
  rating: 4.9,
  reviewCount: 21,
  likeCount: 231,
  distance: '451m',
  isDelivery: true,
  aiSummary:
    '이 가게는 바삭한 돈까스와 시원한 메밀소바가 인기 메뉴입니다. 학생들이 가성비 좋게 즐길 수 있어 인기가 많습니다.',
  phone: '010-1234-5678',
};

/**
 * @param {object} props
 * @param {object} props.store - 가게 데이터 객체
 */
export function StoreDetailHeader({ store = defaultStoreData }) {
  const MAX_LENGTH = 34;
  const summaryText =
    store.aiSummary.length > MAX_LENGTH
      ? `${store.aiSummary.substring(0, MAX_LENGTH)}...`
      : store.aiSummary;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCopyPhoneNumber = () => {
    navigator.clipboard
      .writeText(store.phone)
      .then(() => {
        alert('전화번호가 복사되었습니다.');
        handleCloseModal();
      })
      .catch(err => {
        console.error('복사 실패:', err);
        alert('전화번호 복사에 실패했습니다.');
      });
  };

  return (
    <>
      <Section>
        <Container>
          <ImageWrapper>
            <StyledImage src={store.imageUrl} alt={store.name} />
          </ImageWrapper>

          <InfoWrapper>
            <TitleRow>
              <Name>{store.name}</Name>
              <Category>{store.category}</Category>
            </TitleRow>

            <Description>{store.description}</Description>
            <Tags>{store.tags.join(' ')}</Tags>

            <AiSummary>
              <strong>AI 요약</strong>
              <p>{summaryText}</p>
            </AiSummary>

            <MetaRow>
              <MetaItem>
                <Star01 size={19} fill="currentColor" /> {store.rating}
              </MetaItem>
              <MetaItem>리뷰 {store.reviewCount}</MetaItem>
              <MetaItem>
                <Heart size={19} /> {store.likeCount}
              </MetaItem>
              <MetaItem>
                <MarkerPin01 size={19} /> {store.distance}
              </MetaItem>
              {store.isDelivery && (
                <UnderlinedMetaItem>배달 가능</UnderlinedMetaItem>
              )}
            </MetaRow>

            <ActionRow>
              <ActionButton variant="subsidiary" onClick={handleOpenModal}>
                <Phone size={17} />
                전화
              </ActionButton>
              <ActionButton variant="subsidiary">
                <Heart size={17} />찜
              </ActionButton>
              <ActionButton variant="subsidiary">
                <Share01 size={17} />
                공유
              </ActionButton>
            </ActionRow>
          </InfoWrapper>
        </Container>
      </Section>

      {isModalOpen && (
        <PhoneNumberModalBackdrop>
          <PhoneNumberModalContent>
            <PhoneNumberModalCloseButton onClick={handleCloseModal}>
              <XClose size={18} />
            </PhoneNumberModalCloseButton>
            <PhoneNumberModalText>
              전화번호 : {store.phone}
            </PhoneNumberModalText>
            <PhoneNumberModalCopyLink onClick={handleCopyPhoneNumber}>
              복사
            </PhoneNumberModalCopyLink>
          </PhoneNumberModalContent>
        </PhoneNumberModalBackdrop>
      )}
    </>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';
import { Card } from '@shared/ui/Card/Card';
import { Badge } from '@shared/ui/Badge/Badge';
import { Button } from '@shared/ui/Button/Button';
import { Phone, Map01, Clock } from '@untitledui/icons';

/* ShopCard (리스트용) */

const CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid #dce4ff;
  border-radius: 20px;
  background: #ffffff;

  ${media.mobile} {
    border-radius: 16px;
  }

  ${media.mobileS} {
    border-radius: 12px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  ${media.tablet} {
    height: 160px;
  }

  ${media.mobile} {
    height: 140px;
  }

  ${media.mobileS} {
    height: 120px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.92);
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  font-size: 13px;
  color: #ffffff;
  background-color: rgba(39, 80, 155, 0.85);
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;

  ${media.mobile} {
    font-size: 12px;
    padding: 5px 10px;
  }

  ${media.mobileS} {
    font-size: 11px;
    padding: 4px 8px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 24px 20px;

  ${media.mobile} {
    padding: 18px 20px;
  }

  ${media.mobileS} {
    padding: 14px 16px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1b2a55;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 20px;
  }

  ${media.mobileS} {
    font-size: 18px;
  }
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 22px;
  color: #4b5563;

  min-height: calc(22px * 2);

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 14px;
    line-height: 20px;
    min-height: calc(20px * 2);
  }

  ${media.mobileS} {
    font-size: 13px;
    line-height: 18px;
    min-height: calc(18px * 2);
  }
`;

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DetailButton = styled(Button)`
  margin-top: auto;
  padding: 12px 0;
  border-radius: 12px;
  font-weight: 700;
  background: linear-gradient(135deg, #27509b 0%, #1a2a6c 100%);

  ${media.mobile} {
    padding: 10px 0;
    font-size: 14px;
  }

  ${media.mobileS} {
    padding: 8px 0;
    font-size: 13px;
  }
`;

export const ShopCard = ({ shop, onSelect }) => {
  if (!shop) return null;

  return (
    <CardWrapper padding="0">
      {shop.image && (
        <ImageWrapper>
          <img src={shop.image} alt={shop.name} />
          <CategoryTag>{shop.category}</CategoryTag>
        </ImageWrapper>
      )}

      <Content>
        <div>
          <Title>{shop.name}</Title>
          <Description>{shop.description}</Description>
        </div>

        {Array.isArray(shop.highlights) && shop.highlights.length > 0 && (
          <Highlights>
            {shop.highlights.map(h => (
              <Badge key={h} variant="secondary" size="small" backgroundColor="#eaf2ff" color="#27509B">
                #{h}
              </Badge>
            ))}
          </Highlights>
        )}

        <DetailButton variant="primary" onClick={() => onSelect?.(shop)}>
          자세히 보기
        </DetailButton>
      </Content>
    </CardWrapper>
  );
};

/* ShopDetailInfo (상세정보) */

const InfoWrapper = styled.section`
  display: grid;
  gap: 16px;

  ${media.mobile} {
    gap: 12px;
  }

  ${media.mobileS} {
    gap: 10px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;

  ${media.mobileS} {
    gap: 8px;
  }
`;

const InfoLabel = styled.div`
  font-size: 13px;
  color: #6b7280;

  ${media.tablet} {
    font-size: 12px;
  }

  ${media.mobile} {
    font-size: 12px;
  }

  ${media.mobileS} {
    font-size: 11px;
  }
`;

const InfoValue = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1f2933;
  line-height: 22px;

  ${media.tablet} {
    font-size: 14px;
    line-height: 20px;
  }

  ${media.mobile} {
    font-size: 13px;
    line-height: 18px;
  }

  ${media.mobileS} {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const ShopDetailInfo = ({ shop }) => {
  if (!shop) return null;

  const infoRows = [
    { label: '전화번호', value: shop.phone || '정보 준비 중', Icon: Phone },
    { label: '주소', value: shop.address || '정보 준비 중', Icon: Map01 },
    { label: '영업시간', value: shop.hours || '정보 준비 중', Icon: Clock },
  ];

  return (
    <InfoWrapper>
      {infoRows.map(({ label, value, Icon }) => (
        <InfoRow key={label}>
          <Icon size={18} color="#27509B" aria-hidden />
          <div>
            <InfoLabel>{label}</InfoLabel>
            <InfoValue>{value}</InfoValue>
          </div>
        </InfoRow>
      ))}
    </InfoWrapper>
  );
};

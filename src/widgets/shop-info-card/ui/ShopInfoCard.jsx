import React from 'react';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';
import { Card } from '@shared/ui/Card/Card';
import { Badge } from '@shared/ui/Badge/Badge';
import { ShopDetailInfo } from '@entities/shop';


const CardWrapper = styled(Card)`
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid #d7e0ff;
  box-shadow: 0 16px 40px rgba(26, 63, 148, 0.15);
  background-color: #ffffff;

  ${media.mobile} {
    border-radius: 20px;
  }

  ${media.mobileS} {
    border-radius: 16px;
  }
`;

/* ---------------- Image ---------------- */
const ImageWrapper = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;

  ${media.tablet} {
    height: 240px;
  }

  ${media.mobile} {
    height: 200px;
  }

  ${media.mobileS} {
    height: 160px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.93);
  }
`;

const CategoryBadge = styled(Badge)`
  position: absolute;
  left: 24px;
  top: 24px;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;

  ${media.mobile} {
    left: 16px;
    top: 16px;
    padding: 8px 14px;
    font-size: 13px;
  }

  ${media.mobileS} {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const Content = styled.div`
  padding: 32px 36px;
  display: grid;
  gap: 28px;

  ${media.tablet} {
    padding: 28px 30px;
    gap: 24px;
  }

  ${media.mobile} {
    padding: 22px 20px;
    gap: 20px;
  }

  ${media.mobileS} {
    padding: 18px 16px;
    gap: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 800;
  color: #1a2a6c;
  font-size: 34px;

  ${media.tablet} {
    font-size: 30px;
  }

  ${media.mobile} {
    font-size: 24px;
  }

  ${media.mobileS} {
    font-size: 22px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 26px;
  color: #3f4a5e;

  ${media.mobile} {
    font-size: 15px;
    line-height: 22px;
  }

  ${media.mobileS} {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MenuSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f2933;

  ${media.mobileS} {
    font-size: 16px;
  }
`;

const MenuList = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 15px;
  line-height: 24px;
  color: #374151;

  ${media.mobileS} {
    font-size: 14px;
    line-height: 22px;
  }
`;

export const ShopInfoCard = ({ shop }) => {
  if (!shop) return null;

  return (
    <CardWrapper padding="0">
      {shop.image && (
        <ImageWrapper>
          <img src={shop.image} alt={shop.name} />
          <CategoryBadge
            variant="primary"
            size="large"
            backgroundColor="rgba(25, 55, 109, 0.85)"
          >
            {shop.category}
          </CategoryBadge>
        </ImageWrapper>
      )}

      <Content>
        <Header>
          <Title>{shop.name}</Title>
          <Description>{shop.description}</Description>

          {Array.isArray(shop.highlights) && shop.highlights.length > 0 && (
            <Highlights>
              {shop.highlights.map(item => (
                <Badge
                  key={item}
                  variant="secondary"
                  size="small"
                  backgroundColor="#eaf0ff"
                  color="#1f3f8a"
                >
                  #{item}
                </Badge>
              ))}
            </Highlights>
          )}
        </Header>

        <ShopDetailInfo shop={shop} />

        {Array.isArray(shop.menu) && shop.menu.length > 0 && (
          <MenuSection>
            <MenuTitle>추천 메뉴</MenuTitle>
            <MenuList>
              {shop.menu.map(menuItem => (
                <li key={menuItem}>{menuItem}</li>
              ))}
            </MenuList>
          </MenuSection>
        )}
      </Content>
    </CardWrapper>
  );
};

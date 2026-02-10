import styled from '@emotion/styled';
import { media } from '@shared/config/media';

// 홈 화면 카테고리
export const HomeCategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  min-height: 100px;
  max-width: 480px;
  margin: 0 auto;

  ${media.tablet} {
    min-height: 130px;
    gap: 12px;
  }

  ${media.mobile} {
    gap: 10px;
  }

  ${media.mobileS} {
    gap: 10px;
  }
`;

// 가게 목록 카테고리
export const ShopListCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 8px;
  width: 100%;

  ${media.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.mobileS} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

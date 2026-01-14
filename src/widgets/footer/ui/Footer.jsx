import React from 'react';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  background-color: #ffffff;
  padding: 40px 24px;
  border-top: 1px solid #e0e7ff;
  color: #6b7280;
  font-size: 14px;
`;

const FooterContent = styled.div`
  maxWidth: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <div>
          <strong>INCHELIN (인슐랭)</strong> - 인하대/인하공전 미식 가이드
        </div>
        <div>
          © 2026 INCHELIN. All rights reserved.
        </div>
        <div style={{ opacity: 0.8 }}>
          본 사이트는 인하대/인하공전 학생들의 솔직한 리뷰를 기반으로 운영됩니다.
        </div>
      </FooterContent>
    </StyledFooter>
  );
};


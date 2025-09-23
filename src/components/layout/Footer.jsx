import React from "react";
import styled from "@emotion/styled";

//Footer 전체를 감싸는 부분
const FooterContainer = styled.footer`
  background-color: #121212;
  width: 100%;
  padding: 40px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

//각 섹션 들어갈 그리드
const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
`;

// 각 섹션
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 섹션 제목
const SectionTitle = styled.h4`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

// 섹션 내용
const FooterLink = styled.a`
  color: #FFFFFF;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #B1B1B1;
    text-decoration: underline;
  }
`;

// 인스타 아이콘
const InstargramIcon = styled.div`
display: flex;

  &:hover {
    filter: grayscale(100%) brightness(0.7);
  }
`;

// 저작권 문구
const FooterBottom = styled.div`
  display: flex;
  justify-content: start;
  gap: 800px;
  font-size: 10px;
  color: #FFFFFF;
`;

export default function Footer() {
    return (
      <FooterContainer>
        <FooterTop>
          <Section>
            <SectionTitle>Team</SectionTitle>
            <FooterLink href="/about">About us</FooterLink>
            <FooterLink href="https://www.inhabas.com/">IBAS</FooterLink>
          </Section>
  
          <Section>
            <SectionTitle>Contact</SectionTitle>
            <FooterLink href="/help">도움말</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
            <FooterLink href="/apply">사장님 신청</FooterLink>
          </Section>
  
          <Section>
            <SectionTitle>Legal</SectionTitle>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="/refund">Refund & Cancellation</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/cookie">Cookie Policy</FooterLink>
          </Section>
  
          <Section>
            <SectionTitle>FOLLOW US</SectionTitle>
            <InstargramIcon>
              <a href="https://www.instagram.com/inha_ibas.official/" target="_blank" rel="noreferrer">
              <img src="/image/InstagramIcon.png" alt="Instagram" width={28} />
              </a>
            </InstargramIcon>
          </Section>
        </FooterTop>
        <FooterBottom>
          <span>All rights Reserved © Inchelin, 2025</span>
          <span>
            Based on a template by Themewagon.{" "}
          <a>Licensed under CC BY 4.0</a>
          </span>
        </FooterBottom>
      </FooterContainer>
    );
  }
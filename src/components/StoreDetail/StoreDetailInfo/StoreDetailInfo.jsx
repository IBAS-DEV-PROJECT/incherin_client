// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown } from '@untitledui/icons';

// --- 내부 (부모) ---
import { Card } from '../../common';

// --- 스타일 ---
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 340px; 
  background-color: #f9fafb;
`;

const InfoCard = styled(Card)`
  /* 상하 여백은 18px, 좌우 여백은 24px로 조정합니다. */
  padding: 18px 24px; 
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 19px;
  color: ${({ theme }) => theme.colors.blue};
`;

const Content = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const HoursToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const HoursDetail = styled.div`
  padding-left: 71px;
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  margin-top: 8px;
`;

// --- 더미 데이터 ---
const dummyInfo = {
  address: '인천 미추홀구 인하로 73-1 1층',
  hours: {
    summary: '영업 종료 - 21:00에 영업 종료',
    detail: {
      '월요일': '11:00 - 21:00',
      '화요일': '11:00 - 21:00',
      '수요일': '11:00 - 21:00',
      '목요일': '11:00 - 21:00',
      '금요일': '11:00 - 21:00',
      '토요일': '11:00 - 21:00',
      '일요일': '11:00 - 21:00',
    }
  },
  additional: {
    '홈페이지': 'example.com',
    '포장': '가능',
    '배달': '가능',
  }
};

export function StoreDetailInfo() {
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  return (
    <InfoContainer>
      <InfoCard>
        <Title>주소</Title>
        <Content>{dummyInfo.address}</Content>
      </InfoCard>

      <InfoCard>
        <Title>영업시간</Title>
        <HoursToggle onClick={() => setIsHoursOpen(prev => !prev)}>
          <Content>{dummyInfo.hours.summary}</Content>
          <ChevronDown size={16} style={{ transform: isHoursOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </HoursToggle>
        {isHoursOpen && (
          <HoursDetail>
            {Object.entries(dummyInfo.hours.detail).map(([day, time]) => (
              <div key={day}>{day}: {time}</div>
            ))}
          </HoursDetail>
        )}
      </InfoCard>

      <InfoCard>
        <Title>부가정보</Title>
        {Object.entries(dummyInfo.additional).map(([key, value]) => (
          <Content key={key} style={{ marginTop: '4px' }}>{key}: {value}</Content>
        ))}
      </InfoCard>
    </InfoContainer>
  );
}
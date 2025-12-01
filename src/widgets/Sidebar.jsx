import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import mapIcon from '@shared/assets/image/map-01.png';
import menuIcon from '@shared/assets/image/layout.png';
import heartIcon from '@shared/assets/image/heart.png';
import reviewIcon from '@shared/assets/image/review.png';
import userIcon from '@shared/assets/image/user-circle.png';
import announcementIcon from '@shared/assets/image/announcement.png';
import questionIcon from '@shared/assets/image/question.png';
import alertIcon from '@shared/assets/image/alert.png';
import settingsIcon from '@shared/assets/image/settings.png';
import logoIcon from '@shared/assets/image/logo1.png';
import blueIcon from '@shared/assets/image/blue.png';

// 전체 Wrapper
const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

// Sidebar 컨테이너
const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? '180px' : '68px')};
  transition: width 0.3s ease;
  background-color: #ffffff;
  height: 100vh;
  border-right: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 사이드바 토글 버튼
const ToggleButton = styled.button`
  position: absolute;
  top: 30px;
  left: ${({ isOpen }) => (isOpen ? '180px' : '68px')};
  z-index: 2;

  width: 28px;
  height: 28px;
  background: #fff;
  border: 1px solid #e9e9e9;
  cursor: pointer;
  font-size: 16px;
  color: #b1b1b1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;

  &:hover {
    background-color: #f4f4f4;
  }
`;

// 프로필 사진, 닉네임 들어가는 영역
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  padding-top: 30px;
  font-weight: bold;
`;

const Profile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

// Admin, Menu, System 구분
const Section = styled.div`
  margin-top: 20px;
`;

// Section 제목 (클릭 시 접기/펼치기)
const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
  color: #121212;
  cursor: pointer;

  &:hover {
    color: #27509b;
  }
`;

// 섹션 내부 메뉴 리스트 (expanded 여부에 따라 표시/숨김)
const MenuList = styled.div`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

const SectionItem = styled(Link, {
  shouldForwardProp: prop => prop !== 'isActive',
})`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#121212' : '#b1b1b1')};
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  font-weight: ${({ isActive }) => (isActive ? '500' : '400')};

  &:hover {
    color: ${({ isActive }) => (isActive ? '#27509B' : '#b1b1b1')};
    background-color: ${({ isActive }) =>
      isActive ? '#e9e9e9' : 'transparent'};
  }
`;

const IconWrapper = styled.div`
  width: 28px;
  display: flex;
  justify-content: center;
  margin-right: ${({ isOpen }) => (isOpen ? '8px' : '0')};
`;

// SectionItem에 들어갈 아이콘
const IconImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 30%;
`;

// 하위 상세 메뉴 (My 페이지, 문의하기의 상세)
const ItemDetail = styled(Link)`
  display: block;
  padding: 4px 32px;
  font-size: 13px;
  color: #121212;
  text-decoration: none;

  &:hover {
    color: #27509b;
  }
`;

export default function Sidebar({
  userType = 'guest',
  nickname = 'User Name',
  profileImage = logoIcon,
}) {
  // 사이드바 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);

  // 각 섹션 확장 여부 상태
  const [expandedState, setExpandedState] = useState({
    menu: true,
    system: true,
    myPage: false,
    inquiry: false,
    admin: true,
  });

  // 섹션 확장/축소 핸들러
  const handleExpandedToggle = key => {
    setExpandedState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 유저 타입별 메뉴 구성
  const sidebarConfigMap = {
    guest: {
      menu: [
        { name: '지도 탐색', isActive: true, icon: mapIcon, path: '/map' },
        { name: '메뉴 탐색', isActive: true, icon: menuIcon, path: '/menu' },
        { name: '찜한 가게', isActive: false, icon: heartIcon, path: '#' },
        { name: '리뷰 탐색', isActive: false, icon: reviewIcon, path: '#' },
        { name: 'MY 페이지', isActive: false, icon: userIcon, path: '#' },
      ],
      system: [
        {
          name: '공지사항',
          isActive: true,
          icon: announcementIcon,
          path: '/notice',
        },
        {
          name: '문의하기',
          isActive: false,
          icon: questionIcon,
          path: '/question',
        },
        { name: '신고하기', isActive: false, icon: alertIcon, path: '#' },
        { name: '설정', isActive: true, icon: settingsIcon, path: '/setting' },
      ],
    },
    user: {
      menu: [
        { name: '지도 탐색', isActive: true, icon: mapIcon, path: '/map' },
        { name: '메뉴 탐색', isActive: true, icon: menuIcon, path: '/menu' },
        {
          name: '찜한 가게',
          isActive: true,
          icon: heartIcon,
          path: '/favorites',
        },
        {
          name: '리뷰 탐색',
          isActive: true,
          icon: reviewIcon,
          path: '/reviews',
        },
        {
          name: 'MY 페이지',
          isActive: true,
          icon: userIcon,
          path: '/my',
          hasDetail: true,
          details: [
            { name: '내 정보', path: '/my/info' },
            { name: '내가 쓴 리뷰', path: '/my/review' },
            { name: '내 리스트 관리', path: '/my/lists' },
          ],
        },
      ],
      system: [
        {
          name: '공지사항',
          isActive: true,
          icon: announcementIcon,
          path: '/notice',
        },
        {
          name: '문의하기',
          isActive: true,
          icon: questionIcon,
          path: '/inquiry',
          hasDetail: true,
          details: [
            { name: '새 문의하기', path: '/inquiry/new' },
            { name: '내가 남긴 문의', path: '/inquiry/my' },
          ],
        },
        { name: '신고하기', isActive: true, icon: alertIcon, path: '/report' },
        { name: '설정', isActive: true, icon: settingsIcon, path: '/setting' },
      ],
    },
  };

  // Admin 전용 메뉴 (userType === "admin"일 때만 표시)
  const adminExtra = [
    {
      name: 'Dashboard',
      isActive: true,
      icon: blueIcon,
      path: '/admin/dashboard',
    },
    {
      name: 'Notification',
      isActive: true,
      icon: blueIcon,
      path: '/admin/notification',
    },
    { name: 'FAQ', isActive: true, icon: blueIcon, path: '/admin/faq' },
    { name: 'Report', isActive: true, icon: blueIcon, path: '/admin/report' },
    { name: 'Members', isActive: true, icon: blueIcon, path: '/admin/members' },
  ];

  const sidebarConfig =
    userType === 'guest' ? sidebarConfigMap.guest : sidebarConfigMap.user;
  const showAdmin = userType === 'admin';

  return (
    <Wrapper>
      <SidebarContainer isOpen={isOpen}>
        {/* Header */}
        <Header>
          <HeaderLeft>
            <Profile src={profileImage} alt="profile" />
            {isOpen && <span>{userType === 'guest' ? 'Guest' : nickname}</span>}
          </HeaderLeft>
        </Header>

        {/* Admin Section */}
        {showAdmin && (
          <Section>
            <SectionTitle onClick={() => handleExpandedToggle('admin')}>
              Admin
            </SectionTitle>
            <MenuList expanded={expandedState.admin}>
              {adminExtra.map((item, i) => (
                <SectionItem key={i} to={item.path} isActive={item.isActive}>
                  <IconWrapper isOpen={isOpen}>
                    <IconImg src={item.icon} alt={item.name} />
                  </IconWrapper>
                  {isOpen && item.name}
                </SectionItem>
              ))}
            </MenuList>
          </Section>
        )}

        {/* Menu Section */}
        <Section>
          <SectionTitle onClick={() => handleExpandedToggle('menu')}>
            Menu
          </SectionTitle>
          <MenuList expanded={expandedState.menu}>
            {sidebarConfig.menu.map((item, i) => (
              <div key={i}>
                <SectionItem
                  to={item.path}
                  isActive={item.isActive}
                  onClick={e => {
                    if (item.hasDetail) {
                      e.preventDefault();
                      handleExpandedToggle('myPage');
                    }
                    if (!item.isActive) e.preventDefault();
                  }}
                >
                  <IconWrapper isOpen={isOpen}>
                    <IconImg src={item.icon} alt={item.name} />
                  </IconWrapper>
                  {isOpen && item.name}
                </SectionItem>

                {item.hasDetail &&
                  expandedState.myPage &&
                  item.details &&
                  isOpen && (
                    <div>
                      {item.details.map((detail, j) => (
                        <ItemDetail key={j} to={detail.path}>
                          • {detail.name}
                        </ItemDetail>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </MenuList>
        </Section>

        {/* System Section */}
        <Section>
          <SectionTitle onClick={() => handleExpandedToggle('system')}>
            System
          </SectionTitle>
          <MenuList expanded={expandedState.system}>
            {sidebarConfig.system.map((item, i) => (
              <div key={i}>
                <SectionItem
                  to={item.path}
                  isActive={item.isActive}
                  onClick={e => {
                    if (item.hasDetail) {
                      e.preventDefault();
                      handleExpandedToggle('inquiry');
                    }
                    if (!item.isActive) e.preventDefault();
                  }}
                >
                  <IconWrapper isOpen={isOpen}>
                    <IconImg src={item.icon} alt={item.name} />
                  </IconWrapper>
                  {isOpen && item.name}
                </SectionItem>

                {item.hasDetail &&
                  expandedState.inquiry &&
                  item.details &&
                  isOpen && (
                    <div>
                      {item.details.map((detail, j) => (
                        <ItemDetail key={j} to={detail.path}>
                          • {detail.name}
                        </ItemDetail>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </MenuList>
        </Section>
      </SidebarContainer>

      {/* Toggle Button */}
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </ToggleButton>
    </Wrapper>
  );
}

import React, {useState} from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

//Header 컨테이너
const HeaderContainer = styled.header`
  width: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
`;

//로고 영역
const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    transform: scale(0.8);
  }
`;

//사용자 유형
const UserType = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #B1B1B1;
  padding-left: 22px;
  word-spacing: 2px;
  letter-spacing: 2px;

  span {
    font-size: 16px;
    color: #27509B;
    margin: 0 10px;
  }
`;

//오른쪽 요소들 컨테이너
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 18px;
  gap: 18px;
`;

//search 컨테이너
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  border: 1px solid #B1B1B1;
  border-radius: 6px;
`;

//검색 입력 받는 부분
const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  width: 80px;
`;

//로그인or로그아웃 버튼
const Button = styled.button`
  display: flex;
  align-items: center;
  width: 114px;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #FFFFFF;
  border: 1px solid ${({ isLoggedIn }) => (isLoggedIn ? "#B1B1B1" : "#27509B")};
  color: ${({ isLoggedIn }) => (isLoggedIn ? "#B1B1B1" : "#27509B")};

  img {
    transform: scale(0.7);
    margin: 0px;
  }

  &:hover {
    background: ${({ isLoggedIn }) => (isLoggedIn ? "#FFFFFF" : "#27509B")};
    color: ${({ isLoggedIn }) => (isLoggedIn ? "#121212" : "#FFFFFF")}
  }
`;

export default function Header() {
    const [userType, setUserType] = useState("게스트");
    const isLoggedIn = userType !== "게스트";
    
    const handleLoginToggle = () => {
      if (isLoggedIn) {
        setUserType("게스트");
      } else {
        setUserType("이용자");
      }
    };
  
    return (
      <HeaderContainer>
        <Logo>
          <img src="/image/logo2.png" alt="Logo"/>
        </Logo>
  
        <UserType>
          당신은 현재 <span>{userType}</span> 입니다
        </UserType>
  
        <RightContainer>
          <Search>
            <img src="/image/search.png" alt="Search" width={16} />
          <SearchInput type="text" placeholder="통합검색" />
          </Search>

          <Button isLoggedIn={isLoggedIn} onClick={handleLoginToggle}>
            <img src="/image/user.png" alt="User"/>
            {isLoggedIn ? "로그아웃" : "로그인"}
          </Button>
        </RightContainer>
      </HeaderContainer>
    );
  }
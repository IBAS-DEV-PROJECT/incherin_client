// --- 라이브러리 ---
import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

// --- 내부 ---
import { Button } from "../../common/Button";

// --- 스타일 ---
const Container = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 500px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #27509B;
  margin-bottom: 24px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 12px;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 40px;
  margin-left: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #121212;
`;

const Stats = styled.div`
  display: flex;
  gap: 40px;
  font-size: 14px;
  color: #121212;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  width: 95%;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  ${({ readOnly }) =>
    readOnly &&
    `
    background: #f9f9f9;
    color: #b1b1b1;
  `}
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

// --- 모달 ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtonRow>
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            취소
          </Button>
        </ModalButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}

// --- 메인 컴포넌트 ---
export default function UserInfoSection({
  initialData = {
    intro: "인슐랭 화이팅!",
    name: "김지후",
    nickname: "김지후",
    id: "incherin",
    password: "********",
    followers: 0,
    following: 0,
    profileImage: null,
  },
}) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialData);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    if (editMode) {
      console.log("저장된 데이터:", user);
    }
    setEditMode(!editMode);
  };

  const handleLogout = () => {
    console.log("로그아웃 실행");
    setShowLogoutModal(false);
  };

  const handleDelete = () => {
    console.log("회원 탈퇴 실행");
    setShowDeleteModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profileImage: imageUrl });
    }
  };

  const handleImageDelete = () => {
    setUser({ ...user, profileImage: null });
  };

  return (
    <Container>
      <Card>
        <Title>내 정보</Title>

        {/* 프로필 */}
        <ProfileRow>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar>
              {user.profileImage ? (
                <img src={user.profileImage} alt="프로필" />
              ) : (
                "^ㅡ^"
              )}
            </Avatar>

            {/* 숨겨진 파일 input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <ProfileInfo>
            <TopRow>
              <Nickname>{user.nickname}</Nickname>
              <Stats>
                <span>팔로워 {user.followers}</span>
                <span>팔로잉 {user.following}</span>
              </Stats>
            </TopRow>
          </ProfileInfo>
        </ProfileRow>

        {/* 사진 변경 / 삭제 버튼 */}
        <ProfileButtonRow>
          <Button
            variant="subsidiary"
            style={{ fontSize: 12, padding: "6px 10px", height: "auto" }}
            onClick={() => fileInputRef.current.click()}
            >
            사진 변경
            </Button>
            <Button
              variant="secondary"
              style={{ fontSize: 12, padding: "6px 10px", height: "auto" }}
              onClick={handleImageDelete}
              >
              사진 삭제
            </Button>
        </ProfileButtonRow>

        {/* 한 줄 소개 */}
        <FormGroup>
          <Label>한 줄 소개</Label>
          <Input
            name="intro"
            value={user.intro}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </FormGroup>

        {/* 이름 */}
        <FormGroup>
          <Label>이름</Label>
          <Input
            name="name"
            value={user.name}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </FormGroup>

        {/* 닉네임 */}
        <FormGroup>
          <Label>닉네임</Label>
          <Input
            name="nickname"
            value={user.nickname}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </FormGroup>

        {/* 아이디 */}
        <FormGroup>
          <Label>아이디</Label>
          <Input name="id" value={user.id} readOnly />
        </FormGroup>

        {/* 비밀번호 */}
        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </FormGroup>

        {/* 버튼 */}
        <ButtonRow>
          <LeftButtons>
            <Button variant="primary" onClick={handleToggle}>
              {editMode ? "저장" : "수정하기"}
            </Button>
          </LeftButtons>

          <RightButtons>
            <Button variant="subsidiary" onClick={() => setShowLogoutModal(true)}>
              로그아웃
            </Button>
            <Button
              variant="secondary"
              style={{
              border: "1px solid #ac182d",
              color: "#ac182d",
              backgroundColor: "#ffffff",
              }}
              onClick={() => setShowDeleteModal(true)}>
              회원 탈퇴
            </Button> 
          </RightButtons>
        </ButtonRow>
      </Card>

      {/* 모달 */}
      {showLogoutModal && (
        <ConfirmModal
          message="정말 로그아웃하시겠습니까?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
      {showDeleteModal && (
        <ConfirmModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </Container>
  );
}
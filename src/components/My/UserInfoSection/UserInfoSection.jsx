// --- 라이브러리 ---
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

// --- 컴포넌트 ---
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

// --- 스타일 ---
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

const Card = styled.div`
  width: 65%;
  max-width: 500px;
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #27509b;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #27509b;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 28px;
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 28px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  padding-left: 16px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ActionButtonsLeft = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled(Button)`
  font-size: 12px;
  padding: 6px 10px;
  height: auto;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  gap: 8px;
`;

const Label = styled.div`
  width: 110px;
  font-size: 14px;
  font-weight: 600;
`;

const SmallInputWrapper = styled.div`
  flex: 1;
  width: 100%;

  input {
    height: 38px !important;
    padding: 4px 10px !important;
    font-size: 14px !important;
  }
`;

const EditButton = styled.div`
  display: flex;
  justify-content: right;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  gap: 5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: #ffffff;
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

export default function UserInfoSection({
  initialData = {
    intro: '인슐랭 파이팅!!',
    name: '김인하',
    nickname: '인하대학생47',
    id: 'inha2025',
    password: '12345678',
    followers: 40,
    following: 40,
    profileImage: null,
  },
}) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialData);
  const fileInputRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (field, value) => setUser({ ...user, [field]: value });

  const handleImageDelete = () => setUser({ ...user, profileImage: null });

  const handleLogout = () => {
    console.log('로그아웃 실행');
    setShowLogoutModal(false);
  };

  const handleDelete = () => {
    console.log('회원탈퇴 실행');
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <Card>
        <Title>내 정보</Title>

        <UserInfoWrapper>
          <Avatar>
            {user.profileImage ? <img src={user.profileImage} /> : ' '}
          </Avatar>
          <NicknameBox>{user.nickname}</NicknameBox>
        </UserInfoWrapper>
        <ButtonBox>
          <ActionButtonsLeft>
            <SmallButton
              variant="subsidiary"
              onClick={() => fileInputRef.current.click()}
            >
              사진 추가
            </SmallButton>
            <SmallButton variant="secondary" onClick={handleImageDelete}>
              사진 삭제
            </SmallButton>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={e =>
                handleChange(
                  'profileImage',
                  URL.createObjectURL(e.target.files[0])
                )
              }
            />
          </ActionButtonsLeft>
        </ButtonBox>

        <InputWrapper>
          {[
            ['한 줄 소개', 'intro'],
            ['이름', 'name'],
            ['닉네임', 'nickname'],
            ['아이디', 'id'],
            ['비밀번호', 'password', 'password'],
          ].map(([label, field, type]) => (
            <InputRow key={field}>
              <Label>{label}</Label>

              <SmallInputWrapper>
                <Input
                  type={type || 'text'}
                  value={user[field]}
                  inactive={!editMode || field === 'id'}
                  onChange={e => handleChange(field, e.target.value)}
                  width="100%"
                />
              </SmallInputWrapper>
            </InputRow>
          ))}
        </InputWrapper>

        <EditButton>
          <Button variant="primary" onClick={() => setEditMode(!editMode)}>
            {editMode ? '저장' : '수정하기'}
          </Button>
        </EditButton>
        <ButtonGroup>
          <Button
            variant="subsidiary"
            style={{ border: '1px solid #ac182d', color: '#ac182d' }}
            onClick={() => setShowDeleteModal(true)}
          >
            회원탈퇴
          </Button>

          <Button variant="subsidiary" onClick={() => setShowLogoutModal(true)}>
            로그아웃
          </Button>
        </ButtonGroup>

        {/*모달*/}
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
      </Card>
    </Container>
  );
}
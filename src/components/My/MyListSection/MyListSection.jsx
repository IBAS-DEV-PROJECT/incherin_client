// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// --- 내부 공용 컴포넌트 ---
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

// --- 스타일 ---
const StyledContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCardWrapper = styled.div`
  width: 700px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  padding: 32px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #27509b;
  margin-bottom: 24px;
  border-bottom: 1px solid #27509b;
  padding-bottom: 12px;
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
`;

const StyledListCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
`;

const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $color }) => $color || '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const StyledName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const StyledCount = styled.div`
  font-size: 13px;
  color: #b1b1b1;
`;

const StyledAddListButton = styled(StyledListCard)`
  justify-content: center;
  color: #121212;
  font-weight: 300;
  font-size: 15px;
  align-items: center;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #ac182d;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledModalTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const StyledColorOptions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: left;
`;

const StyledColorCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid
    ${({ $selected }) => ($selected ? '#ffffff' : 'transparent')};
  cursor: pointer;
`;

const StyledModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export default function MyListSection() {
  // --- 내부 상태/훅 ---
  const [listsState, setListsState] = useState(initialLists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListNameState, setNewListNameState] = useState('');
  const [newListColorState, setNewListColorState] = useState(colorPalette[0]);

  const navigate = useNavigate();

  // --- 핸들러 ---
  const handleOpenModal = () => {
    setNewListNameState('');
    setNewListColorState(colorPalette[0]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (!newListNameState.trim()) return;
    const newId = listsState.length + 1;
    const newList = {
      id: newId,
      name: newListNameState,
      count: 0,
      color: newListColorState,
    };
    setListsState([...listsState, newList]);
    handleCloseModal();
  };

  const handleDelete = id => {
    setListsState(listsState.filter(list => list.id !== id));
  };

  // --- 렌더링 ---
  return (
    <StyledContainer>
      <StyledCardWrapper>
        <StyledTitle>내 리스트 관리</StyledTitle>

        <StyledListContainer>
          {listsState.map(list => (
            <StyledListCard
              key={list.id}
              onClick={() => navigate(`/my/lists/${list.id}`)}
            >
              <StyledLeftSection>
                <StyledIcon $color={list.color}>♥</StyledIcon>
                <div>
                  <StyledName>{list.name}</StyledName>
                  <StyledCount>개수 {list.count}</StyledCount>
                </div>
              </StyledLeftSection>
              <StyledDeleteButton
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(list.id);
                }}
              >
                삭제
              </StyledDeleteButton>
            </StyledListCard>
          ))}

          <StyledAddListButton onClick={handleOpenModal}>
            새 리스트 추가 +
          </StyledAddListButton>
        </StyledListContainer>
      </StyledCardWrapper>

      {/* 모달 */}
      {isModalOpen && (
        <StyledModalOverlay>
          <StyledModalContent>
            <StyledModalTitle>새 리스트 추가</StyledModalTitle>

            <Input
              variant="text"
              placeholder="리스트 이름을 입력하세요"
              value={newListNameState}
              onChange={e => setNewListNameState(e.target.value)}
              width="100%"
            />

            <StyledColorOptions>
              {colorPalette.map(color => (
                <StyledColorCircle
                  key={color}
                  $color={color}
                  $selected={newListColorState === color}
                  onClick={() => setNewListColorState(color)}
                />
              ))}
            </StyledColorOptions>

            <StyledModalButtons>
              <Button variant="secondary" onClick={handleCloseModal}>
                취소
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                추가
              </Button>
            </StyledModalButtons>
          </StyledModalContent>
        </StyledModalOverlay>
      )}
    </StyledContainer>
  );
}

// --- 초기 더미 데이터 ---
const initialLists = [
  { id: 1, name: '가고 싶은 한식 맛집!', count: 26, color: '#ac182d' },
  { id: 2, name: '가고 싶은 양식 맛집!', count: 26, color: '#27509b' },
  { id: 3, name: '가고 싶은 중식 맛집!', count: 26, color: '#d4e7fa' },
];

const colorPalette = ['#ac182d', '#27509b', '#d4e7fa', '#b1b1b1', '#121212'];

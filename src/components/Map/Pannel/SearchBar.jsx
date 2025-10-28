import React from 'react';
import styled from '@emotion/styled';

import searchIcon from '../../../assets/image/search.png';
import micIcon from '../../../assets/image/microphone-01.png';

function SearchBar() {
  const preventDragHandler = e => {
    e.preventDefault();
  };

  return (
    <SearchBarContainer
      onDragOver={preventDragHandler}
      onDrop={preventDragHandler}
    >
      <Icon src={searchIcon} alt="검색" />
      <SearchInput type="text" placeholder="가게 검색" />
      <Icon src={micIcon} alt="음성 검색" />
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  width: 328px;
  height: 48px;
  padding: 0 16px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  margin: 0 12px;
  border: none;
  outline: none;
  background-color: transparent;

  /* placeholder 스타일 */
  &::placeholder {
    color: #80868b;
    font-size: 13px;
  }
`;

const Icon = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  mask-image: url(${({ src }) => src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

export default SearchBar;

// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (부모) ---
import SearchIcon from '../../../assets/image/search.png';

// --- 스타일 ---
// 가게 검색 컨테이너
const StyleStoreSearch = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    border: `1px solid ${theme.colors.darkGray}`,
    borderRadius: '4px',
}));

// 검색 입력 
const StyleStoreSearchInput = styled.input(() => ({
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 300,
    width: '100%'
}))


export function StoreSearch() {
    return ( 
        <StyleStoreSearch>
            <StyleStoreSearchInput type="text" placeholder="메뉴 or 가게 이름 or 키워드 태그 검색" />
            <img src={SearchIcon} alt="Search" width={16} />
        </StyleStoreSearch>
    )
}
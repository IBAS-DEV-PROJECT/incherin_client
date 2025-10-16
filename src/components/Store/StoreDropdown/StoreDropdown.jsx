// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useState, useRef, useEffect } from "react";

// --- 내부 ---
import { filterTypeAtom } from '../../../stores/filterStore';

// --- 스타일 ---
// 드롭다운 컴포넌트
const StyledDropdownContainer = styled.div({
    position: 'relative',
    width: 160,
})

// 드롭다운 버튼
const StyledDropdownButton = styled.button(({ theme, $isOpen }) => ({
    width: '100%',
    padding: '8px 16px',
    backgroundColor: theme.colors.white,
    border: `2px solid ${theme.colors.blue}`,
    borderRadius: '12px',
    fontSize: 14,
    fontWeight: 400,
    color: theme.colors.black,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s ease',
}));

// 드롭다운 화살표
const StyledDropdownIcon = styled.span(({ $isOpen }) => ({
    fontSize: 14,
    transition: 'transform 0.2s ease',
    transform: $isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
}));

// 드롭다운 메뉴
const StyledDropdownMenu = styled.ul(({ theme, $isOpen }) => ({
    position: 'absolute',
    width: 144,
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.gray}`,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    listStyle: 'none',
    margin: 0,
    padding: '8px',
    visibility: $isOpen ? 'visible' : 'hidden',
    transform: $isOpen ? 'translateY(0)' : 'translateY(-10px)',
    zIndex: 1000,
}));

// 드롭다운 메뉴 아이템들
const StyledDropdownItem = styled.li(({ theme, $isSelected, $isHovered }) => ({
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 400,
    color: $isSelected ? theme.colors.blue : theme.colors.black,
    backgroundColor: $isSelected || $isHovered ? theme.colors.lightBlue : 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
}));

// 클릭 시 체크 아이콘
const StyledCheckIcon = styled.span(({ theme }) => ({
    color: theme.colors.blue,
    fontSize: 14,
    fontWeight: 700,
    marginRight: 8,
}));

// --- 컴포넌트 ---
export function StoreDropdown({ options = [], placeholder = '정렬 선택' }) {
    const [filterType, setFilterType] = useAtom(filterTypeAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const dropdownRef = useRef(null);

    // 드롭다운이 열린 상태에서 외부를 클릭하면 드롭다운 닫기
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 0);
        
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue) => {
        setFilterType(optionValue);
        setIsOpen(false);
    }

    // 드롭다운 버튼에 선택한 항목을 보여주기
    const selectedLabel = options.find(opt => opt.value === filterType)?.label || placeholder;
    
    return (
        <StyledDropdownContainer ref={dropdownRef}>
            <StyledDropdownButton
                onClick={() => setIsOpen(!isOpen)}
                $isOpen={isOpen}
            >
                {selectedLabel}
                <StyledDropdownIcon $isOpen={isOpen}>▼</StyledDropdownIcon>
            </StyledDropdownButton>

            <StyledDropdownMenu $isOpen={isOpen}>
                {options.map((option) => (
                    <StyledDropdownItem
                        key={option.value}
                        $isSelected={filterType === option.value}
                        $isHovered={hoveredItem === option.value}
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => setHoveredItem(option.value)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {filterType === option.value && <StyledCheckIcon>✓</StyledCheckIcon>}
                        {option.label}
                    </StyledDropdownItem>
                ))}
            </StyledDropdownMenu>
        </StyledDropdownContainer>
    )
}
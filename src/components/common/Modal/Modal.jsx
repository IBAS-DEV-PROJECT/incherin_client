// --- 라이브러리 ---
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
// 스타일/상수 분리 import
import {
  MODAL_VARIANTS,
  getBackdropStyles,
  getModalStyles,
  getTitleStyles,
  getButtonContainerStyles,
  getButtonStyles,
} from './Modal.styles';

// Styled 컴포넌트들
const Backdrop = styled.div(() => ({
  ...getBackdropStyles(),
}));

const ModalContainer = styled.div(({ theme }) => ({
  ...getModalStyles(theme),
}));

const Title = styled.div(({ theme }) => ({
  ...getTitleStyles(theme),
}));

const ButtonContainer = styled.div(() => ({
  ...getButtonContainerStyles(),
}));

const Button = styled.button(({ theme, $variant }) => ({
  ...getButtonStyles(theme, $variant),
}));

/**
 * Modal 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {function} props.onClose - 닫기 핸들러
 * @param {string} [props.title] - 모달 제목
 * @param {function} [props.onConfirm] - 확인 핸들러
 * @param {string} [props.confirmText='확인'] - 확인 버튼 텍스트
 * @param {string} [props.cancelText='취소'] - 취소 버튼 텍스트
 * @param {string} [props.variant='confirm'] - 모달 타입 (confirm, alert, custom)
 * @param {boolean} [props.showCancel=true] - 취소 버튼 표시 여부
 * @returns {JSX.Element}
 */
export function Modal({
  isOpen,
  onClose,
  title,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  variant = MODAL_VARIANTS.CONFIRM,
  showCancel = true,
}) {
  // --- 내부 상태/훅 ---
  const theme = useTheme();

  // --- 방어적 코딩 ---
  const validVariants = Object.values(MODAL_VARIANTS);
  const safeVariant = validVariants.includes(variant)
    ? variant
    : MODAL_VARIANTS.CONFIRM;

  // --- 핸들러 ---
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      alert('확인 버튼이 클릭되었습니다');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // --- 렌더링 ---
  if (!isOpen) return null;

  return (
    <Backdrop
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContainer>
        {title && <Title id="modal-title">{title}</Title>}

        <ButtonContainer>
          <Button $variant="primary" onClick={handleConfirm} aria-label="확인">
            {confirmText}
          </Button>

          {showCancel && (
            <Button
              $variant="secondary"
              onClick={handleCancel}
              aria-label="취소"
            >
              {cancelText}
            </Button>
          )}
        </ButtonContainer>
      </ModalContainer>
    </Backdrop>
  );
}

import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  onConfirm, 
  confirmText = "확인", 
  cancelText = "취소" 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
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
    console.log('취소 버튼이 클릭되었습니다');
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // 화면 중앙 정렬을 위한 추가 스타일
        width: '100vw',
        height: '100vh'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          minWidth: '300px',
          maxWidth: '400px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // 화면 중앙 고정을 위한 추가 스타일
          position: 'relative',
          margin: 'auto'
        }}
      >
        {/* 제목 */}
        <div 
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center',
            lineHeight: '1.4'
          }}
        >
          {title}
        </div>

        {/* 버튼 영역 */}
        <div 
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}
        >
          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: '#27509B',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '60px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1e3d7a';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#27509B';
            }}
          >
            {confirmText}
          </button>

          {/* 취소 버튼 */}
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: 'white',
              color: '#27509B',
              border: '1px solid #27509B',
              borderRadius: '6px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '60px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
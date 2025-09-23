import React from 'react';

const Spinner = ({
  size = 40,
  color = '#27509B',
  message = '로딩중...',
  showMessage = true,
  overlay = false
}) => {
  // 스피너 애니메이션 스타일
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `3px solid #f3f3f3`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  };

  // 메시지 스타일
  const messageStyle = {
    marginTop: '12px',
    fontSize: '14px',
    color: '#666',
    textAlign: 'center'
  };

  // 컨테이너 스타일
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  // 오버레이 스타일 (전체 화면 덮기)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    width: '100vw',
    height: '100vh'
  };

  // CSS 애니메이션을 위한 스타일 태그
  const animationCSS = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const spinnerElement = (
    <>
      <style>{animationCSS}</style>
      <div style={overlay ? overlayStyle : containerStyle}>
        <div style={spinnerStyle}></div>
        {showMessage && (
          <div style={messageStyle}>
            {message}
          </div>
        )}
      </div>
    </>
  );

  return spinnerElement;
};

export default Spinner;
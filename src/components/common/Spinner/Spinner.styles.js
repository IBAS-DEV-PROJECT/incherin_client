// Spinner 스타일 헬퍼
export const getContainerStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const getOverlayStyles = () => ({
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
  height: '100vh',
});

export const getSpinnerStyles = (size, color) => ({
  width: `${size}px`,
  height: `${size}px`,
  border: `3px solid #f3f3f3`,
  borderTop: `3px solid ${color}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  display: 'inline-block',
});

export const getMessageStyles = () => ({
  marginTop: '12px',
  fontSize: '14px',
  color: '#666',
  textAlign: 'center',
});

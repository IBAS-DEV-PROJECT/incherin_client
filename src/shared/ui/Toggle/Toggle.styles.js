// Toggle 스타일 헬퍼
export const getSwitchWrapperStyles = () => ({
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '28px',
});

export const getHiddenCheckboxStyles = () => ({
  opacity: 0,
  width: 0,
  height: 0,
});

export const getSwitchSliderStyles = isOn => ({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: isOn ? '#27509B' : '#B1B1B1',
  borderRadius: '34px',
  transition: '0.2s',
  display: 'flex',
  alignItems: 'center',
  padding: '4px',
});

export const getSwitchCircleStyles = isOn => ({
  width: '20px',
  height: '20px',
  background: '#ffffff',
  borderRadius: '50%',
  transition: '0.2s',
  transform: isOn ? 'translateX(22px)' : 'translateX(0)',
});

export const getOptionWrapperStyles = () => ({
  position: 'relative',
  display: 'flex',
  border: '2px solid #d4e7fa',
  borderRadius: '30px',
  width: '200px',
  height: '40px',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
});

export const getOptionSliderStyles = selectedOption => ({
  position: 'absolute',
  top: 0,
  left: selectedOption === 'left' ? '0' : '50%',
  width: '50%',
  height: '100%',
  backgroundColor: '#27509b',
  borderRadius: '30px',
  transition: 'left 0.3s',
});

export const getOptionItemStyles = active => ({
  flex: 1,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  cursor: 'pointer',
  color: active ? '#FFFFFF' : '#B1B1B1',
  transition: 'color 0.3s',
});

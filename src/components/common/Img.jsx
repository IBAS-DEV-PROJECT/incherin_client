import React from 'react';

const Img = ({
  src,
  alt = '',
  width,
  height,
  size,
  borderRadius = '0px',
  objectFit = 'cover',
  loading = 'lazy',
  placeholder = '/placeholder.png',
  fallback = '/no-image.png',
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  // React.useState로 사용
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  // size prop이 있으면 width, height에 적용
  const imageWidth = size || width;
  const imageHeight = size || height;

  // 기본 스타일 설정
  const imageStyle = {
    width: imageWidth,
    height: imageHeight,
    borderRadius,
    objectFit,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    ...style
  };

  // 로딩 중일 때 스타일
  const loadingStyle = {
    ...imageStyle,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '12px'
  };

  // 이미지 로드 에러 핸들러
  const handleError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // 이미지 로드 완료 핸들러
  const handleLoad = () => {
    setImageLoading(false);
  };

  // 클릭 핸들러
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // 로딩 중이면 플레이스홀더 표시
  if (imageLoading && !imageError) {
    return (
      <div style={loadingStyle} className={className}>
        Loading...
      </div>
    );
  }

  // 에러가 발생하면 fallback 이미지 또는 에러 표시
  if (imageError) {
    if (fallback) {
      return (
        <img
          src={fallback}
          alt={alt || 'Image not found'}
          style={imageStyle}
          className={className}
          onClick={handleClick}
          {...props}
        />
      );
    }
    
    return (
      <div style={{...loadingStyle, backgroundColor: '#f8f8f8'}} className={className}>
        이미지를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={imageStyle}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      onClick={handleClick}
      {...props}
    />
  );
};

export default Img;
// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
import {
  getImageStyles,
  getLoadingStyles,
  getErrorStyles,
  getHoverStyles,
  getSizeStyles,
  IMG_OBJECT_FIT,
  IMG_LOADING,
  IMG_SIZES,
} from './Img.styles';

// Styled 컴포넌트들
const StyledImageContainer = styled.div(
  ({ theme, $width, $height, $borderRadius, $onClick }) => ({
    ...getImageStyles(theme, $width, $height, $borderRadius, 'cover', $onClick),
    ...getHoverStyles($onClick),
  })
);

const StyledLoadingContainer = styled.div(
  ({ theme, $width, $height, $borderRadius }) => ({
    ...getLoadingStyles(theme, $width, $height, $borderRadius),
  })
);

const StyledErrorContainer = styled.div(
  ({ theme, $width, $height, $borderRadius }) => ({
    ...getErrorStyles(theme, $width, $height, $borderRadius),
  })
);

const StyledImage = styled.img(({ theme, $onClick }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
  ...getHoverStyles($onClick),
}));

/**
 * Img 컴포넌트
 * @param {Object} props
 * @param {string} props.src - 이미지 소스 URL
 * @param {string} [props.alt=''] - 이미지 대체 텍스트
 * @param {string|number} [props.width] - 이미지 너비
 * @param {string|number} [props.height] - 이미지 높이
 * @param {string} [props.size] - 이미지 크기 (small, medium, large, xlarge)
 * @param {string} [props.borderRadius='0px'] - 이미지 모서리 둥글기
 * @param {string} [props.objectFit='cover'] - 이미지 맞춤 방식
 * @param {string} [props.loading='lazy'] - 이미지 로딩 방식
 * @param {string} [props.placeholder='/placeholder.png'] - 로딩 중 표시할 이미지
 * @param {string} [props.fallback='/no-image.png'] - 에러 시 표시할 이미지
 * @param {function} [props.onClick] - 클릭 핸들러
 * @param {string} [props.className=''] - CSS 클래스명
 * @param {Object} [props.style={}] - 인라인 스타일
 * @returns {JSX.Element}
 */
export function Img({
  src,
  alt = '',
  width,
  height,
  size,
  borderRadius = '0px',
  objectFit = IMG_OBJECT_FIT.COVER,
  loading = IMG_LOADING.LAZY,
  placeholder = '/placeholder.png',
  fallback = '/no-image.png',
  onClick,
  className = '',
  style = {},
  ...props
}) {
  // --- 내부 상태/훅 ---
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // --- 방어적 코딩 ---
  const validObjectFits = Object.values(IMG_OBJECT_FIT);
  const validLoadings = Object.values(IMG_LOADING);
  const validSizes = Object.values(IMG_SIZES);

  const safeObjectFit = validObjectFits.includes(objectFit)
    ? objectFit
    : IMG_OBJECT_FIT.COVER;
  const safeLoading = validLoadings.includes(loading)
    ? loading
    : IMG_LOADING.LAZY;
  const safeSize = validSizes.includes(size) ? size : null;

  // size prop이 있으면 width, height에 적용
  const sizeStyles = safeSize ? getSizeStyles(safeSize) : {};
  const imageWidth = sizeStyles.width || width;
  const imageHeight = sizeStyles.height || height;

  // --- 핸들러 ---
  const handleError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  const handleClick = e => {
    if (onClick) {
      onClick(e);
    }
  };

  // --- 렌더링 ---
  // 로딩 중이면 플레이스홀더 표시
  if (imageLoading && !imageError) {
    return (
      <StyledLoadingContainer
        $width={imageWidth}
        $height={imageHeight}
        $borderRadius={borderRadius}
        className={className}
        style={style}
        role="img"
        aria-label="이미지 로딩 중"
      >
        Loading...
      </StyledLoadingContainer>
    );
  }

  // 에러가 발생하면 fallback 이미지 또는 에러 표시
  if (imageError) {
    if (fallback) {
      return (
        <StyledImageContainer
          $width={imageWidth}
          $height={imageHeight}
          $borderRadius={borderRadius}
          $onClick={onClick}
          className={className}
          style={style}
          onClick={handleClick}
          role="img"
          aria-label={alt || '대체 이미지'}
          tabIndex={onClick ? 0 : undefined}
        >
          <StyledImage
            src={fallback}
            alt={alt || 'Image not found'}
            $onClick={onClick}
            {...props}
          />
        </StyledImageContainer>
      );
    }

    return (
      <StyledErrorContainer
        $width={imageWidth}
        $height={imageHeight}
        $borderRadius={borderRadius}
        className={className}
        style={style}
        role="img"
        aria-label="이미지를 불러올 수 없습니다"
      >
        이미지를 불러올 수 없습니다
      </StyledErrorContainer>
    );
  }

  return (
    <StyledImageContainer
      $width={imageWidth}
      $height={imageHeight}
      $borderRadius={borderRadius}
      $onClick={onClick}
      className={className}
      style={style}
      onClick={handleClick}
      role="img"
      aria-label={alt}
      tabIndex={onClick ? 0 : undefined}
    >
      <StyledImage
        src={src}
        alt={alt}
        loading={safeLoading}
        onError={handleError}
        onLoad={handleLoad}
        $onClick={onClick}
        style={{ objectFit: safeObjectFit }}
        {...props}
      />
    </StyledImageContainer>
  );
}

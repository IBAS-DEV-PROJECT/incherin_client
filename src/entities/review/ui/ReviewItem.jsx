import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { formatDate } from '@shared/lib/date';
import { StarRating } from '@shared/ui/StarRating';
import { media } from '@shared/config/media';

const Article = styled.article`
  background-color: #f7f9fc;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e3e8f5;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  ${media.mobileS} {
    padding: 16px;
    gap: 10px;
  }
  
  ${media.mobile} {
    padding: 16px;
    gap: 10px;
  }
  
  ${media.tablet} {
    padding: 18px;
    gap: 11px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Nickname = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #1b3a7c;
  
  ${media.mobileS} {
    font-size: 14px;
  }
  
  ${media.mobile} {
    font-size: 14px;
  }
  
  ${media.tablet} {
    font-size: 15px;
  }
`;

const Date = styled.span`
  font-size: 12px;
  color: #6b7280;
  
  ${media.mobileS} {
    font-size: 11px;
  }
  
  ${media.mobile} {
    font-size: 11px;
  }
  
  ${media.tablet} {
    font-size: 11px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RatingStars = styled.div`
  color: #FFB400;
  font-size: 20px;
  line-height: 1;
  
  ${media.mobileS} {
    font-size: 18px;
  }
  
  ${media.mobile} {
    font-size: 18px;
  }
  
  ${media.tablet} {
    font-size: 19px;
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #4b5563;
  font-weight: 600;
  
  ${media.mobileS} {
    font-size: 13px;
  }
  
  ${media.mobile} {
    font-size: 13px;
  }
  
  ${media.tablet} {
    font-size: 13px;
  }
`;

const Content = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  color: #1f2933;
  white-space: pre-wrap;
  
  ${media.mobileS} {
    font-size: 14px;
    line-height: 20px;
  }
  
  ${media.mobile} {
    font-size: 14px;
    line-height: 20px;
  }
  
  ${media.tablet} {
    font-size: 14px;
    line-height: 21px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-top: 4px;
  
  ${media.mobileS} {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 6px;
  }
  
  ${media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 6px;
  }
  
  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 7px;
  }
`;

const ImageItem = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e3e8f5;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  ${media.mobileS} {
    border-radius: 8px;
  }
  
  ${media.mobile} {
    border-radius: 8px;
  }
  
  ${media.tablet} {
    border-radius: 10px;
  }
`;

const ImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  padding: 20px;
`;

const LargeImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10001;
  
  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
  
  ${media.mobileS} {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  ${media.mobile} {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  ${media.tablet} {
    width: 38px;
    height: 38px;
    font-size: 22px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  transition: all 0.2s;
  z-index: 10001;
  
  &:hover:not(:disabled) {
    background-color: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  ${media.mobileS} {
    width: 40px;
    height: 40px;
    font-size: 22px;
    padding-bottom: 4px;
  }
  
  ${media.mobile} {
    width: 40px;
    height: 40px;
    font-size: 22px;
    padding-bottom: 4px;
  }
  
  ${media.tablet} {
    width: 45px;
    height: 45px;
    font-size: 25px;
    padding-bottom: 4px;
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
  
  ${media.mobileS} {
    left: 10px;
  }
  
  ${media.mobile} {
    left: 10px;
  }
  
  ${media.tablet} {
    left: 15px;
  }
`;

const NextButton = styled(NavButton)`
  right: 20px;
  
  ${media.mobileS} {
    right: 10px;
  }
  
  ${media.mobile} {
    right: 10px;
  }
  
  ${media.tablet} {
    right: 15px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  z-index: 10001;
  
  ${media.mobileS} {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  ${media.mobile} {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  ${media.tablet} {
    font-size: 13px;
    padding: 7px 14px;
  }
`;

export const ReviewItem = ({ review }) => {
  if (!review) return null;

  const { nickname, createdAt, content, rating, images } = review;
  const displayDate = formatDate(createdAt);
  const numericRating = Number(rating);
  const ratingValue = Number.isFinite(numericRating) ? numericRating : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => Math.min((images?.length || 1) - 1, prev + 1));
  };

  // 키보드 방향키로 넘기기
  React.useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => Math.min((images?.length || 1) - 1, prev + 1));
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, images]);

  return (
    <>
      <Article>
        <Header>
          <Nickname>{nickname}</Nickname>
          <Date>{displayDate}</Date>
        </Header>
        <RatingContainer>
          <RatingStars>
            <StarRating rating={ratingValue} />
          </RatingStars>
          <RatingText>{ratingValue.toFixed(1)} / 5</RatingText>
        </RatingContainer>
        <Content>{content}</Content>
        {images && images.length > 0 && (
          <ImageGrid>
            {images.map((image, index) => {
              const imageUrl = typeof image === 'string' ? image : image?.preview;
              return (
                <ImageItem
                  key={index}
                  src={imageUrl}
                  alt={`리뷰 이미지 ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  onError={(e) => {
                    console.error('이미지 로드 실패:', imageUrl);
                    e.target.style.display = 'none';
                  }}
                />
              );
            })}
          </ImageGrid>
        )}
      </Article>

      {isModalOpen && images && images.length > 0 && (
        <ImageOverlay onClick={handleCloseModal}>
          <CloseButton onClick={handleCloseModal}>
            ×
          </CloseButton>
          
          {images.length > 1 && (
            <>
              <PrevButton
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                ‹
              </PrevButton>
              <NextButton
                onClick={handleNextImage}
                disabled={currentImageIndex === images.length - 1}
              >
                ›
              </NextButton>
              <ImageCounter>
                {currentImageIndex + 1} / {images.length}
              </ImageCounter>
            </>
          )}
          
          <LargeImage
            src={typeof images[currentImageIndex] === 'string' 
              ? images[currentImageIndex] 
              : images[currentImageIndex]?.preview}
            alt={`이미지 ${currentImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </ImageOverlay>
      )}
    </>
  );
};

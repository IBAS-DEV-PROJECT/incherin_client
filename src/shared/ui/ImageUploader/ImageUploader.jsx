// --- 라이브러리 ---
import React from 'react';

// --- 내부 (현재) ---
import {
  Container,
  Label,
  HiddenInput,
  PreviewContainer,
  PreviewItem,
  PreviewImage,
  RemoveButton,
} from './ImageUploader.styles';

/**
 * ImageUploader 컴포넌트
 * @param {Object} props
 * @param {Array} props.images - 업로드된 이미지 배열
 * @param {function} props.onChange - 이미지 변경 핸들러
 * @param {number} [props.maxImages=5] - 최대 업로드 가능한 이미지 수
 * @returns {JSX.Element}
 */
export const ImageUploader = ({ images = [], onChange, maxImages = 5 }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    
    if (images.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드할 수 있어요.`);
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    onChange?.([...images, ...newImages]);
  };
  
  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    
    // 메모리 해제
    if (images[index]?.preview) {
      URL.revokeObjectURL(images[index].preview);
    }
    
    onChange?.(newImages);
  };
  
  return (
    <Container>
      <Label>
        📷 사진 추가 ({images.length}/{maxImages})
        <HiddenInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={images.length >= maxImages}
        />
      </Label>
      
      {images.length > 0 && (
        <PreviewContainer>
          {images.map((image, index) => (
            <PreviewItem key={index}>
              <PreviewImage src={image.preview} alt={`미리보기 ${index + 1}`} />
              <RemoveButton onClick={() => handleRemove(index)} type="button">
                ×
              </RemoveButton>
            </PreviewItem>
          ))}
        </PreviewContainer>
      )}
    </Container>
  );
};

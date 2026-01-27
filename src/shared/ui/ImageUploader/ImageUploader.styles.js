import styled from '@emotion/styled';
import { media } from '@shared/config/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  ${media.mobileS} {
    gap: 10px;
  }
  
  ${media.mobile} {
    gap: 10px;
  }
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: #e6f0ff;
  color: #27509B;
  border: 2px dashed #27509B;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background-color: #d4e5ff;
    border-color: #1a3a7c;
  }
  
  ${media.mobileS} {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 10px;
  }
  
  ${media.mobile} {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 10px;
  }
  
  ${media.tablet} {
    padding: 11px 18px;
    font-size: 15px;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  
  ${media.mobileS} {
    gap: 8px;
  }
  
  ${media.mobile} {
    gap: 8px;
  }
  
  ${media.tablet} {
    gap: 10px;
  }
`;

export const PreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e3e8f5;
  
  ${media.mobileS} {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  
  ${media.mobile} {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  
  ${media.tablet} {
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  ${media.mobileS} {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
  
  ${media.mobile} {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
  
  ${media.tablet} {
    width: 22px;
    height: 22px;
    font-size: 15px;
  }
`;

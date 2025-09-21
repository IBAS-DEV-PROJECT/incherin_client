/** @jsxImportSource @emotion/react */
import React from "react";
import { css, useTheme } from "@emotion/react";
import { Placeholder } from "@untitledui/icons";

// 각 Variant 스타일
const getVariantStyles = (theme, variant) => {
  switch (variant) {

    case "id": /*아이디 입력 칸*/
      return {
        styles: css`
          background-color: ${theme.colors.white};
        `,
        placeholder: "아이디를 입력하세요", 
      };


    case "password": /*비밀번호 입력 칸*/
      return {
        styles : css`
        background-color: ${theme.colors.white};
      `,
        placeholder:"비밀번호를 입력하세요"
      }

    default:
      return {
        styles: css`
    `,
      placeholder: "텍스트를 입력하세요"
    }
  }
};

// 기본 입력 칸 스타일
const Input = ({ variant,inactive,value, onChange, isError,...rest }) => {
  const theme = useTheme();

  const variantProps = getVariantStyles(theme, variant);

  const inputStyles = css`
    ${theme.typography.paragraph.p1}
    font-family: ${theme.typography.fontFamily};  
    box-sizing: border-box;
    width:300px;
    height:44px;
    padding: 4px 5px 4px 18px;
    border-radius: 10px;
    border: solid 1px ${theme.colors.darkGray};
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    ${inactive && /*비활성화 상태*/
      css`
        background-color: ${theme.colors.gray};
        color: ${theme.colors.darkGray}
    `}

    ${isError &&
      css`
        border-color: ${theme.colors.red}
    `}

    &:focus {
    outline: none;
    border: 1px solid ${isError ? theme.colors.red : theme.colors.blue};

    ${variantProps.styles}

    &::placeholder {
    color: ${theme.colors.darkGray};
    };
  `;

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input 
        css={css` ${inputStyles} padding-right: 40px; `}
        placeholder={variantProps.placeholder}{...rest}
      />
      {isError && (
      <div style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#AC182D'
      }}>
        ※
      </div>
    )}
    </div>
  );
};

export default Input;
/** @jsxImportSource @emotion/react */
import React from "react";
import { css, useTheme } from "@emotion/react";

// 각 Variant와 active=true 일 때 스타일
const getVariantStyles = (theme, variant, active) => {
  switch (variant) {

    case "subsidiary": /*보조 버튼*/
      return css`
        background-color: ${theme.colors.white};
        color: ${theme.colors.blue};
        border: 1.5px solid ${theme.colors.blue};

        ${active && /*보조 버튼 (active=true) */
        css`
          border-color: ${theme.colors.darkGray};
          background-color: ${theme.colors.white};
        `}
      `;

    case "secondary": /*부가 버튼*/
      return css`
        background-color: ${theme.colors.gray};
        color: ${theme.colors.blue};
        border: none;

        ${active && /*부가 버튼 (active=true) */
        css`
          border: solid 1.5px ${theme.colors.darkGray};
          background-color: ${theme.colors.white};
          color: ${theme.colors.darkGray}
        `}
      `;

    default: /*기본 버튼 (active=true) */
      return css`
      ${active &&
        css`
          background-color: ${theme.colors.lightBlue};
          color: ${theme.colors.blue};
      `}
    `;
  }
};

// 기본 버튼 스타일
const Button = ({ children, variant, active, ...rest }) => {
  const theme = useTheme();

  const buttonStyles = css`
    ${theme.typography.paragraph.p2}
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    border: none;
    padding: 5px 22px;
    border-radius: 50px;
    cursor: pointer;

    ${getVariantStyles(theme, variant, active)} 
  `;

  return (
    <button css={buttonStyles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
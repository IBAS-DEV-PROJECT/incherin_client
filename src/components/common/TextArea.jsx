/** @jsxImportSource @emotion/react */
import React from "react";
import { css, useTheme } from "@emotion/react";

const TextArea = ({
  value,
  onChange, /*글자가 바뀌었는지 확인*/
  placeholder,
  ...rest 
}) => {
  const theme = useTheme();

  const containerStyles = css`
    position: relative;
    width: 100%;
  `;

  const textareaStyles = css`
    width: 100%;
    min-height: 160px;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid ${theme.colors.black};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    font-family: ${theme.typography.fontFamily};
    ${theme.typography.paragraph.p3}
    color: ${theme.colors.black};
    resize: none;
    outline: none;

    &::placeholder {
      color: ${theme.colors.darkGray};
    }
  `;

  return (
    <div css={containerStyles}>
      <textarea
        css={textareaStyles}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
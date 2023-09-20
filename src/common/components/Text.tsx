import React from "react";
import { SerializedStyles, Theme, css } from "@emotion/react";
import { TEXT_SIZE, TEXT_TYPE } from "../constants/text";

type TextType = {
  color?: "primary" | "secondary";
  type?: "normal" | "medium" | "bold";
  size?: "small" | "medium" | "large";
  text: string;
  margin?: string;
  padding?: string;
  className?: string;
  css?: Partial<SerializedStyles>;
};

const Text: React.FC<TextType> = ({ text, type = "normal", ...rest }) => {
  const textStyle = (theme: Theme) => {
    return css({
      color:
        rest.color === "primary"
          ? theme.colors.primaryColor
          : theme.colors.secondaryColor,
      fontFamily: TEXT_TYPE[type],
      fontSize: TEXT_SIZE[rest.size || "small"],
      margin: rest.margin,

      "@media (min-width: 576px)": {
        fontSize: TEXT_SIZE[rest.size || "medium"],
      },

      ...rest.css,
    });
  };

  return (
    <div className={rest.className} css={textStyle}>
      {text}
    </div>
  );
};

Text.defaultProps = {
  className: "",
  size: undefined,
  color: "primary",
  type: "normal",
  margin: "0px",
  padding: "0px",
  css: undefined,
};

export default Text;

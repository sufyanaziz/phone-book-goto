import { Theme, css } from "@emotion/react";
import React from "react";

type TButton = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "primary" | "default" | "warning" | "important";
};

const Button: React.FC<TButton> = ({ label, onClick, disabled, type }) => {
  const buttonStyle = (theme: Theme) => {
    return css({
      border: "none",
      fontSize: "12px",
      padding: theme.padding[1],
      borderRadius: "4px",
      width: "100%",
      height: "100%",
      "&:disabled": {
        background: "#B4B4B3 !important",
        color: "white !important",
      },
      "&.primary": {
        background: theme.colors.primaryColor,
        color: theme.colors.secondaryColor,
      },
      "&.default": {
        background: "#F1EFEF",
        color: "black",
      },
      "&.warning": {
        background: "#FFC436",
        color: "black",
      },
      "&.important": {
        background: "#D80032",
        color: "white",
      },

      "@media (min-width: 576px)": {
        fontSize: "16px",
        padding: theme.padding[2],
      },
    });
  };
  return (
    <button
      className={`${type}`}
      css={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: "primary",
};

export default Button;

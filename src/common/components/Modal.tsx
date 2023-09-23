import React from "react";
import { Theme, css } from "@emotion/react";
import Text from "./Text";

type TModal = {
  header: string | React.ReactElement;
  isVisible: boolean;
  size?: "sm" | "md";
  content?: React.ReactElement;
  footer?: React.ReactElement;
  onClose: () => void;
};
const Modal: React.FC<TModal> = ({
  header,
  size = "sm",
  content,
  footer,
  isVisible,
  onClose,
}) => {
  const getWidth = () => {
    if (size === "md") return "500px";
    return "400px";
  };

  const modalStyle = (theme: Theme) => {
    return css({
      position: "absolute",
      zIndex: 1000,
      height: "100vh",
      width: "100vw",
      top: 0,
      display: isVisible ? "flex" : "none",
      justifyContent: "center",
      ".modal-mask": {
        background: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
      },
      ".modal-content": {
        position: "absolute",
        zIndex: 1200,
        background: "white",
        top: 100,
        width: "calc(100vw - 80px)",
        borderRadius: "4px",

        ".header": {
          display: "flex",
          padding: "16px",
          borderBottom: `1px solid ${theme.colors.primaryColor}`,
          justifyContent: "space-between",
          alignItems: "center",
          ".close-icon": {
            cursor: "pointer",
          },
        },

        ".content": {
          padding: "0 16px",
        },

        "@media (min-width: 576px)": {
          width: getWidth(),
        },
      },
    });
  };
  return (
    <div css={modalStyle}>
      <div className="modal-mask" onClick={onClose} />
      <div className="modal-content">
        <div className="header">
          {typeof header === "string" ? (
            <Text text={header} size="medium" type="medium" />
          ) : (
            header
          )}
          <div className="close-icon" onClick={onClose}>
            <Text text="X" size="medium" type="bold" />
          </div>
        </div>
        <div className="content">{content}</div>
        <div className="footer">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;

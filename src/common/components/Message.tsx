import React, { useContext, useMemo } from "react";
import { Theme, css } from "@emotion/react";
import { MessageStore } from "@common/store/useMessageStore";
import useSimpleMessage from "@common/hooks/useSimpleMessage";
import MessageConstant from "@common/constants/message";
import Text from "./Text";

const MessageComponent = () => {
  const { activeId, setShowMessage, showMessage } = useContext(MessageStore);

  useSimpleMessage({ id: activeId });

  const memoizedMsg = useMemo(() => {
    const msg = MessageConstant[activeId];
    return {
      message: msg?.message || "",
      type: msg?.type || "success",
    };
  }, [activeId]);

  const messageStyle = (theme: Theme) => {
    return css({
      background: theme.colors.primaryColor,
      marginBottom: "16px",
      padding: "8px 12px",
      borderRadius: "4px",
      display: showMessage ? "flex" : "none",
      justifyContent: "space-between",
      alignItems: "center",
    });
  };

  return (
    <div css={messageStyle}>
      <Text text={memoizedMsg.message} css={{ color: "white" }} type="normal" />
      <div onClick={() => setShowMessage("", false)}>
        <Text
          text={"x"}
          css={{ color: "white", cursor: "pointer" }}
          type="bold"
        />
      </div>
    </div>
  );
};

export default MessageComponent;

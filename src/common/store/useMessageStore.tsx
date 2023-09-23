import { TMessageId } from "@common/types/message";
import { createContext, useState } from "react";

type TMessageStore = {
  showMessage: boolean;
  activeId: TMessageId;
  setShowMessage: (activeId: TMessageId, showMessage: boolean) => void;
};

const MessageStore = createContext<TMessageStore>({
  showMessage: false,
  activeId: "",
  setShowMessage: () => {},
});

type TMessageProvider = {
  children?: React.ReactNode;
};

const MessageProvider = ({ children }: TMessageProvider) => {
  const [message, setMessage] = useState<{
    showMessage: boolean;
    activeId: TMessageId;
  }>({
    showMessage: false,
    activeId: "",
  });

  return (
    <MessageStore.Provider
      value={{
        showMessage: message.showMessage,
        activeId: message.activeId,
        setShowMessage: (activeId, showMessage) => {
          setMessage({
            activeId,
            showMessage,
          });
        },
      }}
    >
      {children}
    </MessageStore.Provider>
  );
};

const ContactConsumer = MessageStore.Consumer;

export { MessageStore, MessageProvider, ContactConsumer };

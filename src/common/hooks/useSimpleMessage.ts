import { useEffect, useContext } from "react";
import { MessageStore } from "@common/store/useMessageStore";

type TSimpleMessage = {
  delay?: number;
  id?: string;
};

const useSimpleMessage = ({ delay = 2000, id = "" }: TSimpleMessage) => {
  const { activeId, setShowMessage, showMessage } = useContext(MessageStore);

  useEffect(() => {
    let timer: any = null;
    if (showMessage && activeId === id) {
      timer = setTimeout(() => {
        setShowMessage("", false);
      }, delay);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showMessage, id]);
};

export default useSimpleMessage;

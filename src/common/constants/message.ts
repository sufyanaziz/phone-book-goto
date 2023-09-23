import { TMessageId } from "@common/types/message";

const Message: {
  [x: string]: {
    type: string;
    id: TMessageId;
    message: string;
  };
} = {
  successAddContact: {
    type: "success",
    id: "successAddContact",
    message: "Successfully added contact",
  },
  successEditContact: {
    type: "success",
    id: "successEditContact",
    message: "Successfully edit contact",
  },
  successRemoveContact: {
    type: "success",
    id: "successRemoveContact",
    message: "Successfully remove contact",
  },
};

export default Message;

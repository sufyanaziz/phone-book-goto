import { createContext, useState } from "react";

type TContactStore = {
  contact: { [x: string]: unknown };
  search: string;
  offset: number;
  modal: {
    name: string;
    data: { [key: string]: any };
  };
  onSetContact: (contact: { [x: string]: unknown }) => void;
  onSetSearch: (search: string) => void;
  onSetOffset: (offset: number) => void;
  closeModal: () => void;
  openModal: (modalName: string, modalData: any) => void;
};

const ContactStore = createContext<TContactStore>({
  contact: {},
  search: "",
  offset: 0,
  modal: {
    name: "",
    data: {},
  },
  onSetContact: () => {},
  onSetSearch: () => {},
  onSetOffset: () => {},
  closeModal: () => {},
  openModal: () => {},
});

type TContactProvider = {
  children?: React.ReactNode;
};

const ContactProvider = ({ children }: TContactProvider) => {
  const [contact, setContact] = useState({});
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [modal, setModal] = useState({ name: "", data: {} });
  return (
    <ContactStore.Provider
      value={{
        contact,
        onSetContact: setContact,
        search,
        onSetSearch: (search) => {
          setSearch(search);
          setOffset(0);
        },
        offset,
        onSetOffset: setOffset,
        modal,
        openModal: (modalName, modalData) => {
          setModal({ name: modalName, data: modalData });
        },
        closeModal: () => {
          setModal({ name: "", data: {} });
        },
      }}
    >
      {children}
    </ContactStore.Provider>
  );
};

const ContactConsumer = ContactStore.Consumer;

export { ContactStore, ContactProvider, ContactConsumer };

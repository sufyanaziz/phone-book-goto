import { createContext, useState } from "react";

type TContactStore = {
  contact: { [x: string]: unknown };
  search: string;
  offset: number;
  onSetContact: (contact: { [x: string]: unknown }) => void;
  onSetSearch: (search: string) => void;
  onSetOffset: (offset: number) => void;
};

const ContactStore = createContext<TContactStore>({
  contact: {},
  search: "",
  offset: 0,
  onSetContact: () => {},
  onSetSearch: () => {},
  onSetOffset: () => {},
});

type TContactProvider = {
  children?: React.ReactNode;
};

const ContactProvider = ({ children }: TContactProvider) => {
  const [contact, setContact] = useState({});
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
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
      }}
    >
      {children}
    </ContactStore.Provider>
  );
};

const ContactConsumer = ContactStore.Consumer;

export { ContactStore, ContactProvider, ContactConsumer };

import React from "react";
import renderer from "react-test-renderer";
import ModalAddContact from "@pages/Contacts/components/ModalAddContact";
import { ContactStore } from "@common/store/useContactStore";
import { mockStoreData } from "../mock/mockStore";

jest.mock("@assets/icon", () => {
  return {
    ...jest.requireActual("@assets/icon"),
  };
});

describe("Component ModalAddContact", () => {
  it("should render ModalAddContact component correctly", () => {
    const component = renderer.create(
      <ContactStore.Provider
        value={{
          ...mockStoreData,
          modal: {
            name: "modal-add-contact",
            data: {},
          },
        }}
      >
        <ModalAddContact
          isComplete
          loading
          onClose={jest.fn()}
          onAddNewContact={jest.fn()}
        />
      </ContactStore.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

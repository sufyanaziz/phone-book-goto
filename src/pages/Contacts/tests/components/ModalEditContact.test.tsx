import React from "react";
import renderer from "react-test-renderer";
import ModalEditContact from "@pages/Contacts/components/ModalEditContact";
import { ContactStore } from "@common/store/useContactStore";
import { mockStoreData } from "../mock/mockStore";

describe("Component ModalEditContact", () => {
  it("should render ModalEditContact component correctly", () => {
    const component = renderer.create(
      <ContactStore.Provider
        value={{
          ...mockStoreData,
          modal: {
            name: "modal-edit-contact",
            data: {
              id: 9,
              first_name: "first name",
              last_name: "dummy last name",
              phones: [{ number: "6785421" }],
            },
          },
        }}
      >
        <ModalEditContact
          isComplete
          loading
          onClose={jest.fn()}
          onEditContact={jest.fn()}
        />
      </ContactStore.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

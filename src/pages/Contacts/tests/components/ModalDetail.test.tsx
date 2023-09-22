import React from "react";
import renderer from "react-test-renderer";
import ModalDetail from "@pages/Contacts/components/ModalDetail";
import { ContactStore } from "@common/store/useContactStore";
import { mockStoreData } from "../mock/mockStore";

describe("Component ModalDetail", () => {
  it("should render ModalDetail component correctly", () => {
    const component = renderer.create(
      <ContactStore.Provider
        value={{
          ...mockStoreData,
          modal: {
            name: "modal-detail-contact",
            data: {
              first_name: "test 123",
              last_name: "last 1234",
              phones: [{ number: "6785421" }],
            },
          },
        }}
      >
        <ModalDetail />
      </ContactStore.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

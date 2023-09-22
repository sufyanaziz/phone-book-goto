import React from "react";
import renderer from "react-test-renderer";
import CardContact from "@pages/Contacts/components/CardContact";

describe("Component CardContact", () => {
  it("should render CardContact component correctly", () => {
    const component = renderer.create(
      <CardContact
        data={{
          id: 123,
          first_name: "dummy first name",
          last_name: "dummy last name",
          phones: [{ number: "8767322" }],
        }}
        onDelete={jest.fn()}
        onDetail={jest.fn()}
        onEdit={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

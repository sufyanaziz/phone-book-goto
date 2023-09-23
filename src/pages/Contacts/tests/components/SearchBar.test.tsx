import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "@pages/Contacts/components/SearchBar";

describe("Component SearchBar", () => {
  it("should render SearchBar component correctly", () => {
    const component = renderer.create(<SearchBar />);
    expect(component).toMatchSnapshot();
  });
});

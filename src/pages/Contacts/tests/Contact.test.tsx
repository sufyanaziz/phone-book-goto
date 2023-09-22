import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Contacts from "@pages/Contacts";

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
});

describe("Component Contacts", () => {
  it("should render Contacts component correctly", () => {
    const component = renderer.create(
      <ApolloProvider client={client}>
        <Router>
          <Contacts />
        </Router>
      </ApolloProvider>
    );
    expect(component).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FormContact from "@pages/FormContact";

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
});

describe("Component FormContact", () => {
  it("should render FormContact component correctly", () => {
    const component = renderer.create(
      <ApolloProvider client={client}>
        <Router>
          <FormContact />
        </Router>
      </ApolloProvider>
    );
    expect(component).toMatchSnapshot();
  });
});

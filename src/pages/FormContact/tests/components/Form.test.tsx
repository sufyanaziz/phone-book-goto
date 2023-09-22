import React from "react";
import renderer from "react-test-renderer";
import Form from "@pages/FormContact/components/Form";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
});

describe("Component FormContact", () => {
  it("should render FormContact component correctly", () => {
    const component = renderer.create(
      <ApolloProvider client={client}>
        <Router>
          <Form />
        </Router>
      </ApolloProvider>
    );
    expect(component).toMatchSnapshot();
  });
});

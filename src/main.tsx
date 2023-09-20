import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

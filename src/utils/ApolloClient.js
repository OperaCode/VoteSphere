import { ApolloClient, InMemoryCache } from "@apollo/client";


// Note; Apollo client is used as a web3 UI provider that ...

// initialise apollo client
const client = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

export default client;

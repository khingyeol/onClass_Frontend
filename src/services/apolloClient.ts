import { split, HttpLink, ApolloLink, ApolloClient, InMemoryCache, concat } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { queryUrl, websocketUrl } from "./constants";
import { server } from "./constants";

const httpLink = new HttpLink({
  uri: queryUrl,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const userToken = localStorage.getItem(server.TOKEN_KEY)
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${userToken}`
    }
  }));

  return forward(operation);
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: websocketUrl,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  concat(authMiddleware, httpLink),
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
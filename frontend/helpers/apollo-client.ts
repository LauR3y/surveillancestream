import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.GQL_HOST,
    cache: new InMemoryCache(),
});


export default client;
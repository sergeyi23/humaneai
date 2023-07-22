import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/sergeyi23/humane-ai-dev",
    cache: new InMemoryCache(),
  });

  const dataSetItemsQuery = `
  query {
    dataSetItems {
        id
        contentIpfsHash
        author
        rating
    }
  }`;

export const getDataSetItems = async () => {
    const items = await client.query({
        query: gql(dataSetItemsQuery)
    });
    return items?.data.dataSetItems;
};
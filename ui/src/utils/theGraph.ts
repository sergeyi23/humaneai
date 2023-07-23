import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/sergeyi23/humane-ai",
    cache: new InMemoryCache(),
  });

  const dataSetItemsQuery = `
  query {
    dataSetItems {
        id
        contentIpfsHash
        author
        rating
        format
        tags
    }
  }`;

export const getDataSetItems = async () => {
    const items = await client.query({
        query: gql(dataSetItemsQuery)
    });
    return items?.data.dataSetItems;
};

const creatorsQuery = `
  query {
    creators {
        id
        owner
        reputation
        isActive
      }
  }`;

export const getCreators = async () => {
    const items = await client.query({
        query: gql(creatorsQuery)
    });
    return items?.data.creators;
};

const verifiersQuery = `
  query {
    verifiers {
        id
        owner
        reputation
        isActive
      }
  }`;

export const getVerifiers = async () => {
    const items = await client.query({
        query: gql(verifiersQuery)
    });
    return items?.data.verifiers;
};
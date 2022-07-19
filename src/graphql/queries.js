/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLightningTalksPoll = /* GraphQL */ `
  query GetLightningTalksPoll($id: ID!, $numberOfVotes: String!) {
    getLightningTalksPoll(id: $id, numberOfVotes: $numberOfVotes) {
      id
      title
      description
      username
      numberOfVotes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLightningTalksPolls = /* GraphQL */ `
  query ListLightningTalksPolls(
    $id: ID
    $numberOfVotes: ModelStringKeyConditionInput
    $filter: ModelLightningTalksPollFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLightningTalksPolls(
      id: $id
      numberOfVotes: $numberOfVotes
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        description
        username
        numberOfVotes
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

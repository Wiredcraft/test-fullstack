/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLightningTalksPoll = /* GraphQL */ `
  query GetLightningTalksPoll($id: ID!) {
    getLightningTalksPoll(id: $id) {
      id
      type
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
    $filter: ModelLightningTalksPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLightningTalksPolls(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
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
export const getLightningTalksByType = /* GraphQL */ `
  query GetLightningTalksByType(
    $type: String!
    $numberOfVotes: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLightningTalksPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getLightningTalksByType(
      type: $type
      numberOfVotes: $numberOfVotes
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
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

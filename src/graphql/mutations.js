/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateNumberOfVotesCountAtomicallyResolver = /* GraphQL */ `
  mutation UpdateNumberOfVotesCountAtomicallyResolver($id: ID!) {
    updateNumberOfVotesCountAtomicallyResolver(id: $id)
  }
`;
export const createLightningTalksPoll = /* GraphQL */ `
  mutation CreateLightningTalksPoll(
    $input: CreateLightningTalksPollInput!
    $condition: ModelLightningTalksPollConditionInput
  ) {
    createLightningTalksPoll(input: $input, condition: $condition) {
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
export const updateLightningTalksPoll = /* GraphQL */ `
  mutation UpdateLightningTalksPoll(
    $input: UpdateLightningTalksPollInput!
    $condition: ModelLightningTalksPollConditionInput
  ) {
    updateLightningTalksPoll(input: $input, condition: $condition) {
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
export const deleteLightningTalksPoll = /* GraphQL */ `
  mutation DeleteLightningTalksPoll(
    $input: DeleteLightningTalksPollInput!
    $condition: ModelLightningTalksPollConditionInput
  ) {
    deleteLightningTalksPoll(input: $input, condition: $condition) {
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

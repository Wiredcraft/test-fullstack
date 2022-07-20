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
export const createVotingRecord = /* GraphQL */ `
  mutation CreateVotingRecord(
    $input: CreateVotingRecordInput!
    $condition: ModelVotingRecordConditionInput
  ) {
    createVotingRecord(input: $input, condition: $condition) {
      id
      lightningTalksPollID
      creatorUsername
      voterUsername
      hasVoted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateVotingRecord = /* GraphQL */ `
  mutation UpdateVotingRecord(
    $input: UpdateVotingRecordInput!
    $condition: ModelVotingRecordConditionInput
  ) {
    updateVotingRecord(input: $input, condition: $condition) {
      id
      lightningTalksPollID
      creatorUsername
      voterUsername
      hasVoted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteVotingRecord = /* GraphQL */ `
  mutation DeleteVotingRecord(
    $input: DeleteVotingRecordInput!
    $condition: ModelVotingRecordConditionInput
  ) {
    deleteVotingRecord(input: $input, condition: $condition) {
      id
      lightningTalksPollID
      creatorUsername
      voterUsername
      hasVoted
      createdAt
      updatedAt
      owner
    }
  }
`;

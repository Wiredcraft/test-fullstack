/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLightningTalksPoll = /* GraphQL */ `
  subscription OnCreateLightningTalksPoll($owner: String) {
    onCreateLightningTalksPoll(owner: $owner) {
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
export const onUpdateLightningTalksPoll = /* GraphQL */ `
  subscription OnUpdateLightningTalksPoll($owner: String) {
    onUpdateLightningTalksPoll(owner: $owner) {
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
export const onDeleteLightningTalksPoll = /* GraphQL */ `
  subscription OnDeleteLightningTalksPoll($owner: String) {
    onDeleteLightningTalksPoll(owner: $owner) {
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
export const onCreateVotingRecord = /* GraphQL */ `
  subscription OnCreateVotingRecord($owner: String) {
    onCreateVotingRecord(owner: $owner) {
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
export const onUpdateVotingRecord = /* GraphQL */ `
  subscription OnUpdateVotingRecord($owner: String) {
    onUpdateVotingRecord(owner: $owner) {
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
export const onDeleteVotingRecord = /* GraphQL */ `
  subscription OnDeleteVotingRecord($owner: String) {
    onDeleteVotingRecord(owner: $owner) {
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

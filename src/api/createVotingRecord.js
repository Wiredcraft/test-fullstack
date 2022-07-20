import { API } from 'aws-amplify'
import { l } from 'utility'
import { mutations } from 'api'

export default async function createVotingRecord(votingRecord) {
  try {
    const { data } = await API.graphql({
      query: mutations.createVotingRecord,
      variables: {
        input: { ...votingRecord },
      },
    })

    return { ...data?.createVotingRecord }
  } catch (error) {
    l(error?.errors[0], 'createVotingRecord', false, 'error')
    return false
  }
}

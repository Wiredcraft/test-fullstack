import { API } from 'aws-amplify'
import { l } from 'utility'
import { mutations } from 'api'

export default async function updateVotingRecord(votingRecord) {
  try {
    const { data } = await API.graphql({
      query: mutations.updateVotingRecord,
      variables: {
        input: {
          ...votingRecord,
        },
      },
    })

    return data
  } catch (error) {
    l(error?.errors[0]?.message, 'updateVotingRecord', false, 'error')
    return false
  }
}

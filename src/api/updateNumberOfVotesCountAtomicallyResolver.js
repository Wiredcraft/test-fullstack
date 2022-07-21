import {
  checkIfUserHasVotedBefore,
  createVotingRecord,
  mutations,
  updateVotingRecord,
} from 'api'
import { getCurrentAuthenticatedUser, l } from 'utility'

import { API } from 'aws-amplify'
import { isEmpty } from 'lodash'

export default async function updateNumberOfVotesCountAtomicallyResolver(
  lightningTalkPollID,
) {
  try {
    let undulation = 1
    let params = {}
    const { username } = await getCurrentAuthenticatedUser()
    const votingRecord = await hasUserVotedBefore(lightningTalkPollID)

    if (votingRecord) {
      const upvote = !votingRecord?.upvote
      params = { id: votingRecord?.id, upvote }
      undulation = upvote ? 1 : -1

      await updateVotingRecord(params)
    } else {
      params = { lightningTalkPollID, username }
      await createVotingRecord(params)
    }

    const { data } = await API.graphql({
      query: mutations.updateNumberOfVotesCountAtomicallyResolver,
      variables: {
        lightningTalkPollID,
        undulation,
      },
    })

    return data
  } catch (error) {
    l(
      error?.errors[0]?.message,
      'updateNumberOfVotesCountAtomicallyResolver',
      false,
      'error',
    )
    return false
  }
}

async function hasUserVotedBefore(lightningTalkPollID) {
  const response = await checkIfUserHasVotedBefore(lightningTalkPollID)
  if (isEmpty(response)) return false

  return response[0]
}

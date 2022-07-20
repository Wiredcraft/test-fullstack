import { queries } from 'api'
import { API } from 'aws-amplify'
import { getCurrentAuthenticatedUser, l } from 'utility'

export default async function checkIfUserHasVotedBefore(lightningTalkPollID) {
  const { username } = await getCurrentAuthenticatedUser()

  if (!username) return false

  try {
    const { data } = await API.graphql({
      query: queries.listVotingRecords,
      variables: {
        filter: {
          username: { eq: username },
          lightningTalkPollID: { eq: lightningTalkPollID },
        },
      },
    })

    return { ...data?.listVotingRecords?.items }
  } catch (error) {
    l(error?.errors[0]?.message, 'checkIfUserHasVotedBefore', false, 'error')
    return false
  }
}

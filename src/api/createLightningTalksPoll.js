import { API } from 'aws-amplify'
import { l, getCurrentAuthenticatedUser } from 'utility'
import { mutations } from 'api'

export default async function createLightningTalksPoll(post) {
  const { username } = await getCurrentAuthenticatedUser()

  l(username)

  try {
    const { data } = await API.graphql({
      query: mutations.createLightningTalksPoll,
      variables: { input: { username, numberOfVotes: '0', ...post } },
    })

    return { ...data?.createLightningTalksPoll }
  } catch (error) {
    l(error?.errors[0], 'createLightningTalksPoll', false, 'error')
    return false
  }
}

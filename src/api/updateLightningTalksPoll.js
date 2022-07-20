import { API } from 'aws-amplify'
import { l } from 'utility'
import { mutations } from 'api'

export default async function updateLightningTalksPoll(id) {
  try {
    const { data } = await API.graphql({
      query: mutations.updateLightningTalksPoll,
      variables: {
        input: {
          id,
        },
      },
    })

    return data
  } catch (error) {
    l(error?.errors[0]?.message, 'updateLightningTalksPoll', false, 'error')
    return false
  }
}

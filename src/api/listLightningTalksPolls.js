import { API } from 'aws-amplify'
import { l } from 'utility'
import { queries } from 'api'

export default async function listLightningTalksPolls(nextToken, limit = 100) {
  try {
    const { data } = await API.graphql({
      query: queries.listLightningTalksPolls,
      variables: {
        limit,
        nextToken,
      },
    })

    return data
    // return { ...data?.listLightningTalksPolls?.items }
  } catch (error) {
    l(error?.errors[0]?.message, 'listLightningTalksPolls', false, 'error')
    return false
  }
}

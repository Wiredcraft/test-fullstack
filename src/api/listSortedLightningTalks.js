import { API } from 'aws-amplify'
import { l } from 'utility'
import { queries } from 'api'

export default async function getLightningTalksByType(nextToken, limit = 100) {
  try {
    const { data } = await API.graphql({
      query: queries.getLightningTalksByType,
      variables: {
        type: 'Poll',
        sortDirection: 'DESC',
        limit,
        nextToken,
      },
    })

    return [...data?.getLightningTalksByType?.items]
  } catch (error) {
    l(error?.errors[0]?.message, 'listSortedLightningTalks', false, 'error')
    return false
  }
}

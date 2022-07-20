import { API } from 'aws-amplify'
import { l } from 'utility'
import { mutations } from 'api'

export default async function updateNumberOfVotesCountAtomicallyResolver(id) {
  try {
    const { data } = await API.graphql({
      query: mutations.updateNumberOfVotesCountAtomicallyResolver,
      variables: {
        id,
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

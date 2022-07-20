import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'
import * as api from 'api'
import { EmptyListView, LightningTalkCard } from 'components'
import { getCurrentAuthenticatedUser } from 'utility'
import CONSTANTS from 'constants'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getLightningTalksPolls()
  }, [])

  async function getLightningTalksPolls() {
    try {
      setIsLoading(true)
      const response = await api.listSortedLightningTalks()

      if (response === false) throw new Error('API Error')

      setData(response)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  async function submitNewVote(id) {
    const user = await getCurrentAuthenticatedUser()

    if (user) {
      await api.updateNumberOfVotesCountAtomicallyResolver(id)
      getLightningTalksPolls()
    } else {
      navigate(CONSTANTS?.ROUTES_NAMES?.SIGN_IN)
    }
  }

  function renderLightningTalksPollsList() {
    return data.map((item) => (
      <LightningTalkCard
        key={item.id}
        title={item?.title}
        description={item?.description}
        numberOfVotes={item?.numberOfVotes}
        speaker={item?.username}
        date={item?.createdAt}
        onVote={() => submitNewVote(item.id)}
        isLoading={isLoading}
      />
    ))
  }

  return (
    <div className="page">
      {isEmpty(data) ? <EmptyListView /> : renderLightningTalksPollsList()}
    </div>
  )
}

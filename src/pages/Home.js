import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import * as api from 'api'
import { EmptyListView, LightningTalkCard } from 'components'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

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

  async function submitNewVote(lightningTalksPollID) {
    const response = await api.updateNumberOfVotesCountAtomicallyResolver(
      lightningTalksPollID,
    )
    getLightningTalksPolls()

    return response
  }

  function renderLightningTalksPollsList() {
    return data.map((item) => (
      <LightningTalkCard
        key={item?.id}
        lightningTalkPollID={item?.id}
        title={item?.title}
        description={item?.description}
        numberOfVotes={item?.numberOfVotes}
        speaker={item?.username}
        date={item?.createdAt}
        onVote={() => submitNewVote(item?.id)}
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

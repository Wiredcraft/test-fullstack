import React, { useEffect, useState } from 'react'
import * as api from 'api'
import { l } from 'utility'
import { EmptyListView, LightningTalkCard } from 'components'
import { isEmpty } from 'lodash'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    getLightningTalksPolls()
  }, [])

  async function getLightningTalksPolls() {
    try {
      setIsLoading(true)
      const response = await api.listSortedLightningTalks()

      l(response, 'response')

      if (response === false) throw new Error('API Error')

      setData(response)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  async function submitNewVote(id) {
    await api.updateNumberOfVotesCountAtomicallyResolver(id)
    getLightningTalksPolls()
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

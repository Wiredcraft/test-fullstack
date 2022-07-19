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
    setIsLoading(true)
    const response = await api.listLightningTalksPolls()
    setData(response)
    setIsLoading(false)
  }

  /**
   * TODO:
   * - Add a loading indicator
   * - Update the count of vote atomically on the backend
   * - Fetch the new list with getLightningTalksPolls()
   */
  function submitNewVote(id) {}

  function renderLightningTalksPollsList() {
    data.map((item) => (
      <LightningTalkCard
        key={item.id}
        title={item?.title}
        description={item?.description}
        numberOfVotes={item?.description}
        speaker={item?.description}
        date={item?.description}
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

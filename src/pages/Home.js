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
      const response = await api.listLightningTalksPolls()

      if (response === false) throw new Error('API Error')

      setData(response)
      setIsLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong. Please refresh the page and try again.')
    }
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

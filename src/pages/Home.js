import React, { useEffect, useState } from 'react'
import * as api from 'api'
import { l } from 'utility'
import { EmptyListView } from 'components'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(false)

  useEffect(() => {
    async function getLightningTalksPolls() {
      const response = await api.listLightningTalksPolls()
      setData(response)
      l(response, 'response')
    }

    getLightningTalksPolls()
  }, [])

  return (
    <div className="page">
      <EmptyListView />
    </div>
  )
}

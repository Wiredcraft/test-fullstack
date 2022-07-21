import { Paragraph } from 'components'
import React from 'react'

export default function EmptyListView() {
  const emptyListMessage =
    'No lightning talks polls have been created yet. Be the first to publish the first one 😃'

  return (
    <div className="empty-list-iew-container">
      <Paragraph text={emptyListMessage} />
    </div>
  )
}

import React from 'react'

import styles from 'index.css'

class Component extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <input className={styles['title']} />
        <input className={styles['description']} />
      </div>
    )
  }
}

export default Component

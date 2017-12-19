import React, { Component } from 'react'
import LightingTalkItem from '../components/LightingTalkItem'
import '../assets/css/index.css'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      data: null
    }
    this.voteHandler = this.voteHandler.bind(this)
  }

  componentDidMount() {
    fetch('/api/lightingTalks', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  voteHandler (id) {
    const formData = new FormData()
    formData.append('id', id)
    console.log(formData)
    fetch('/api/vote', { method: 'PUT', body: {"id": id}})
      .then(res => res.json())
      .then(data => {
        this.setState({ data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h1 className='title'>lighting talks</h1>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default Home
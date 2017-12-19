import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LightingTalkItem from '../components/LightingTalkItem'
import { vote } from '../actions'
import '../assets/css/index.css'

class List extends Component {
  constructor () {
    super()
    this.state = {
      data: null
    }
    this.voteHandler = this.voteHandler.bind(this)
  }

  componentDidMount() {
    // fetch('/api/lightingTalks', { method: 'GET' })
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ data })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  voteHandler (id) {
    // const formData = new FormData()
    // formData.append('id', id)
    // console.log(formData)
    // fetch('/api/vote', { method: 'PUT', body: {"id": id}})
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ data })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    this.props.voteHandler(id)
  }

  render() {
    const { LightingTalks } = this.props
    LightingTalks.sort((pre, next) => {
      return pre.voteCount -  next.voteCount
    })
    return (
      <div>
        <div className='new-btn'><Link to='/new'>Submit a lighting talk</Link></div>
        {
          LightingTalks.length
            ? LightingTalks.map((talk, index)=> <LightingTalkItem index={index} voteHandler={this.voteHandler} key={talk.id} data={talk} />)
            : <div className='placeholder'>Click the button to submit a lighting talk</div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  voteHandler: index => dispatch(vote(index)),
})

const mapStateToProps = state => ({
  LightingTalks: state.LightingTalks,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
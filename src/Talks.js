import React, {Component} from 'react'
import {connect} from 'react-redux'
import TalkBox from './components/TalkBox'
import TalkList from './components/TalkList'
import * as actions from './redux/actions'

const mapStateToProps = state => {
  return {
    talks: state.talks.sort((talkA, talkB) => talkB.votes - talkA.votes),
  }
}

class Talks extends Component {
  state = {
  }

  componentDidMount() {
    this.fetchTalks()
  }

  fetchTalks = () => {
    this.props.fetchTalks()
  }

  addTalk = data => {
    this.props.addTalk(data)
  }

  voteForTalk = talkId => {
    this.props.voteForTalk(talkId)
  }

  render() {
    const {talks} = this.props

    return (
      <div className="Talks">
        <TalkList
          talks={talks}
          onVoteForTalk={this.voteForTalk}
        />
        <TalkBox onAddTalk={this.addTalk} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Talks)

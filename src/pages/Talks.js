import React, {Component} from 'react'
import {connect} from 'react-redux'
import TalkBox from '../components/TalkBox'
import TalkList from '../components/TalkList'
import {fetchTalks, voteForTalk} from '../redux/talks'
import {changeField, submitBox} from '../redux/talkBox'

const mapStateToProps = state => {
  return {
    talks: state.talks.sort((talkA, talkB) => talkB.votes - talkA.votes),
    talkBox: state.talkBox,
  }
}

class Talks extends Component {
  componentDidMount() {
    this.props.fetchTalks()
  }

  render() {
    const {talks, talkBox, voteForTalk, submitBox, changeField} = this.props

    return (
      <div className="Talks">
        <TalkList
          talks={talks}
          onVoteForTalk={voteForTalk}
        />
        <TalkBox
          talkBox={talkBox}
          onChangeField={changeField}
          onSubmitBox={submitBox}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  fetchTalks,
  voteForTalk,
  submitBox,
  changeField,
})(Talks)

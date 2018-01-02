import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import TalkListCard from './TalkListCard'
import {
    fetchTalks,
    upvoteTalk,
} from '@store/action-creators'

class TalkList extends Component {
    componentWillMount() {
        this.props.fetchTalks()
    }

    render() {
        return (
            <FlipMove
                enterAnimation='fade'
                leaveAnimation='fade'
            >
                {
                    this.props.talks.list &&
                    [...this.props.talks.list]
                        .sort((a, b) => a.vote <= b.vote)
                        .map((data) =>
                            <TalkListCard
                                key={data._id}
                                vote={data.vote}
                                title={data.title}
                                username={data.username}
                                description={data.description}
                                onUpvote={() => this.props.upvoteTalk(data._id)}
                            />
                        )
                }
            </FlipMove>
        )
    }
}

const mapStateToProps = ({ talks } = {}) => {
    return {
        talks,
    }
}

const mapDispatchToProps = {
    fetchTalks,
    upvoteTalk,
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkList)

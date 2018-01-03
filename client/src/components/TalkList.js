import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TalkListCard from './TalkListCard'
import {
    fetchTalks,
    upvoteTalk,
} from '@store/action-creators'

const mapStateToProps = ({ talks: { list } } = {}) => {
    return {
        list,
    }
}

const mapDispatchToProps = {
    fetchTalks,
    upvoteTalk,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TalkList extends Component {

    static propTypes = {
        list: PropTypes.array,
        fetchTalks: PropTypes.func,
        upvoteTalk: PropTypes.func,
    }

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
                    this.props.list &&
                    [...this.props.list]
                        .sort((a, b) => a.vote < b.vote)
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

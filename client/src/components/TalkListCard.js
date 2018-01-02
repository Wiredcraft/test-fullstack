import React, { Component } from 'react'
import {
    Card,
    CardText,
    CardTitle,
} from 'material-ui/Card'
import {
    indigo500,
    teal500,
} from 'material-ui/styles/colors'

const Title = ({ title, onUpvote } = {}) => (
    <div>
        <i
            className='fa fa-thumbs-o-up'
            aria-hidden='true'
            style={{
                color: indigo500,
                cursor: 'pointer',
                marginRight: '0.5em',
            }}
            onClick={onUpvote}
        />
        {title}
    </div>
)

const Subtitle = ({ vote, username } = {}) => (
    <div>
        <b
            style={{
                fontSize: '1.5em',
                color: teal500,
            }}
        >{vote}</b> upvotes by <i>{username}</i>
    </div>
)

const Content = ({ description } = {}) => (
    <CardText>{description}</CardText>
)

class TalkListCard extends Component {
    render() {
        const {
            title,
            username,
            description,
            vote,
            onUpvote,
        } = this.props

        return (
            <Card style={{ marginBottom: '1em' }}>
                <CardTitle
                    title={<Title title={title} onUpvote={onUpvote} />}
                    subtitle={<Subtitle vote={vote} username={username} />}
                />
                <Content description={description} />
            </Card>
        )
    }
}

export default TalkListCard

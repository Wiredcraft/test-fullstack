import React from 'react'
import {
    Card,
    CardText,
    CardTitle,
} from 'material-ui/Card'
import {
    indigo500,
    teal500,
} from 'material-ui/styles/colors'

const TalkListCard = ({ title, username, description, vote, onUpvote } = {}) => {

    const Title = () => (
        <div>
            <i
                className="fa fa-thumbs-o-up"
                aria-hidden="true"
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

    const Subtitle = () => (
        <div>
            <b
                style={{
                    fontSize: '1.5em',
                    color: teal500,
                }}
            >{vote}</b> upvotes by <i>{username}</i>
        </div>
    )

    return (
        <Card style={{ marginBottom: '1em' }}>
            <CardTitle
                title={<Title />}
                subtitle={<Subtitle />}
            />
            <CardText>{description}</CardText>
        </Card>
    )
}

export default TalkListCard

import React from 'react'
import {
    Card,
    CardText,
    CardTitle,
} from 'material-ui/Card'

const TalkListCard = ({ title, username, description, vote } = {}) => {
    return (
        <Card style={{ marginBottom: '2em' }}>
            <CardTitle
                title={title}
                subtitle={
                    <div>
                        <b style={{ fontSize: '1.3em' }}>{vote}</b> upvotes by <i>{username}</i>
                    </div>
                }
            />
            <CardText>{description}</CardText>
        </Card>
    )
}

export default TalkListCard

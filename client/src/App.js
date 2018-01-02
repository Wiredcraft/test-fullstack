import React, { Component } from 'react'
import TalkList from '@components/TalkList'

export default class extends Component {
    state = {
        text: 'app',
    }

    render() {
        return (
            <div>
                <TalkList />
            </div>
        )
    }
}

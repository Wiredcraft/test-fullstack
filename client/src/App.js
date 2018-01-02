import React, { Component } from 'react'
import Title from '@components/Title'
import TalkList from '@components/TalkList'

export default class extends Component {
    render() {
        return (
            <div>
                <Title />
                <TalkList />
            </div>
        )
    }
}

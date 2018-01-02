import React, { Component } from 'react'
import Title from '@components/Title'
import TalkList from '@components/TalkList'
import SubmitForm from '@components/SubmitForm'

export default class extends Component {
    state = {
        modalVisible: false,
    }

    render() {
        return (
            <div>
                <Title onOpenModal={() => this.setState({ modalVisible: true })} />
                <TalkList />
                <SubmitForm
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                />
            </div>
        )
    }
}

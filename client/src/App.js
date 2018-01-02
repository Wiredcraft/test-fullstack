import React, { Component } from 'react'

export default class extends Component {
    state = {
        text: 'app',
    }

    render() {
        return (
            <div>{this.state.text}</div>
        )
    }
}

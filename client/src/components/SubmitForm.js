import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createTalk } from '@store/action-creators'

const initState = {
    title: '',
    username: '',
    description: '',
    titleError: false,
}
Object.freeze(initState)


class SubmitForm extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        onRequestClose: PropTypes.func,
        createTalk: PropTypes.func,
    }

    state = { ...initState }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible)
            this.setState({ ...initState })
    }

    onChange = (key, evt) =>
        this.setState({ [key]: evt.target.value })

    onSubmit = () => {
        const {
            title,
            username,
            description,
        } = this.state

        if (!title) {
            this.setState({ titleError: true })
            return
        }

        this.props.createTalk({ title, username, description })
        this.props.onRequestClose()
    }

    render () {
        const {
            visible,
            onRequestClose,
        } = this.props

        const actions = [
            <FlatButton
                label='submit'
                primary={true}
                keyboardFocused={true}
                onClick={this.onSubmit}
                icon={<i className='fa fa-paper-plane' aria-hidden='true' />}
            />,
        ]

        return (
            <Dialog
                title='Submit a new talk'
                actions={actions}
                open={visible}
                onRequestClose={onRequestClose}
            >
                <TextField
                    fullWidth
                    hintText='Title'
                    value={this.state.title}
                    onChange={this.onChange.bind(this, 'title')}
                    errorText={this.state.titleError && 'Title field can\'t be empty.'}
                />
                <TextField
                    fullWidth
                    hintText='Username'
                    value={this.state.username}
                    onChange={this.onChange.bind(this, 'username')}
                />
                <TextField
                    fullWidth
                    multiLine
                    hintText='description'
                    value={this.state.description}
                    onChange={this.onChange.bind(this, 'description')}
                />
            </Dialog>
        )
    }
}

const mapDispatchToProps = {
    createTalk,
}

export default connect(null, mapDispatchToProps)(SubmitForm)

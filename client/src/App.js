import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Title from '@components/Title'
import TalkList from '@components/TalkList'
import SubmitForm from '@components/SubmitForm'
import Loading from '@components/Loading'


class App extends Component {

    static propTypes = {
        loading: PropTypes.bool,
    }

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
                {this.props.loading && <Loading />}
            </div>
        )
    }
}

const mapStateToProps = ({ talks: { loading } }) => {
    return {
        loading,
    }
}

export default connect(mapStateToProps)(App)

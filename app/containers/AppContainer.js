import React from 'react';
import { connect } from 'react-redux';

// actions
import RootActions from '../actions/RootActions';
import BusySpinner from '../components/common/BusySpinner';

class AppContainer extends React.Component {

    initializeApp() {
        this.props.dispatch(RootActions.Actions.InitializeApp({status: 'Initializing'}));
    }

    componentDidMount() {
        this.initializeApp();
    }

    render() {
        return (
            <div>
                {this.props.children}
                <BusySpinner busy={this.props.root.getIn(['ui', 'busy'])}/>
            </div>
        );
    }
}

let componentState = (state) => (state);

module.exports = connect(componentState)(AppContainer);
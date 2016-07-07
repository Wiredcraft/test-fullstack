import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// actions
import RootActions from '../actions/RootActions';
import BusySpinner from '../components/common/BusySpinner';

class AppContainer extends React.Component {

    componentDidMount() {
        this.initializeApp();
    }

    initializeApp() {
        this.props.dispatch(RootActions.Actions.initializeApp());
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

AppContainer.propTypes = {
    dispatch:PropTypes.func,
    children: PropTypes.object,
    root: PropTypes.object
}

const componentState = (state) => (state);

module.exports = connect(componentState)(AppContainer);

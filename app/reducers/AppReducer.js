import Immutable from 'immutable';
import _ from 'lodash';
import RootActions from '../actions/RootActions';

const DEFAULT_APP_STATE = {
    loggedStatus: 'Sign In',
    loggedUser: '',
    talks: Immutable.List(),
    myTalks: Immutable.List()
};

function app(state, action) {
    const currentState = state || Immutable.Map(DEFAULT_APP_STATE);
    switch (action.type) {
        case RootActions.Keys.initializeApp:
            return currentState.merge(action.args);
        case RootActions.Keys.initializeAppCompleted:
            return currentState.merge(action.args);
        case RootActions.Keys.fetchTalkListCompleted:
            const talks = _.sortBy(action.args.talks, (o) => -o.voteCount);
            return currentState.merge({
                talks: talks
            });
        case RootActions.Keys.fetchTalkListFailed:
            alert(action.args.message);
            return currentState;
        case RootActions.Keys.fetchMyTalkListCompleted:
            return currentState.merge({
                myTalks: action.args.talks
            });
        case RootActions.Keys.fetchMyTalkListFailed:
            alert(action.args.message);
        case RootActions.Keys.submitRegisterDataCompleted:
            alert('Create a account successfully.');
            return currentState.merge({
                loggedStatus: 'Hi, ' + action.args.username,
                loggedUser: action.args.username
            });
        case RootActions.Keys.submitRegisterDataFailed:
            alert(action.args.message);
            return currentState;
        case RootActions.Keys.submitLoginDataCompleted:
            return currentState.merge({
                loggedStatus: 'Hi, ' + action.args.username,
                loggedUser: action.args.username
            });
        case RootActions.Keys.submitLoginDataFailed:
            alert(action.args.message);
            return currentState;
        case RootActions.Keys.submitPublishDataCompleted:
            alert('Published successfully!');
            return currentState;
        case RootActions.Keys.submitPublishDataFailed:
            alert(action.args.message);
            return currentState;
        case RootActions.Keys.voteToTalkFailed:
            alert(action.args.message);
            return currentState;
        default:
            return currentState;
    }
}

module.exports = app;

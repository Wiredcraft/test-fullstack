import {createActions} from '../utils/ActionBuilder';
import NetworkUtility from '../utils/NetworkUtility';
import CommonActions from './CommonActions';
import { push } from 'react-router-redux';

module.exports = createActions({

    initializeApp(args) {
        return this.dispatchMe(args);
    },

    fetchTalkList(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.get(NetworkUtility.baseURL() + '/talks', args)
                    .done((response) => {
                        return this.dispatch(this.Actions.fetchTalkListCompleted(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.fetchTalkListFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    },

    fetchMyTalkList(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.get(NetworkUtility.baseURL() + '/user/' + args, {})
                    .done((response) => {
                        return this.dispatch(this.Actions.fetchMyTalkListCompleted(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.fetchMyTalkListFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    },

    submitRegisterData(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.post(NetworkUtility.baseURL() + '/user', args)
                    .done((response) => {
                        if (response.success) {
                            return this.dispatch(this.Actions.submitRegisterDataCompleted(response))
                                .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                                .then(() => this.dispatch(push(NetworkUtility.baseURI() + '/home')));
                        }
                        return this.dispatch(this.Actions.submitRegisterDataFailed(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.submitRegisterDataFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    },

    submitLoginData(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.post(NetworkUtility.baseURL() + '/verify', args)
                    .done((response) => {
                        if (response.success) {
                            return this.dispatch(this.Actions.submitLoginDataCompleted(response))
                                .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                                .then(() => this.dispatch(push(NetworkUtility.baseURI() + '/home')));
                        }
                        return this.dispatch(this.Actions.submitLoginDataFailed(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.submitLoginDataFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    },

    submitPublishData(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.post(NetworkUtility.baseURL() + '/talk', args)
                    .done((response) => {
                        if (response.success) {
                            return this.dispatch(this.Actions.submitPublishDataCompleted(response))
                                .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                                .then(() => this.dispatch(push(NetworkUtility.baseURI() + '/home')));
                        }
                        return this.dispatch(this.Actions.submitPublishDataFailed(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.submitPublishDataFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    },

    voteToTalk(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.busy()))
            .then(() => {
                NetworkUtility.post(NetworkUtility.baseURL() + '/talk/' + args.talkId + '/vote', {username: args.username})
                    .done((response) => {
                        if (response.success) {
                            return this.dispatch(this.Actions.voteToTalkCompleted(response))
                                .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                                .then(() => this.dispatch(this.Actions.fetchTalkList()));
                        }
                        return this.dispatch(this.Actions.voteToTalkFailed(response))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()));
                    })
                    .fail(() =>
                        this.dispatch(this.Actions.voteToTalkFailed({message: 'Server Error, Please try again.'}))
                            .then(() => this.dispatch(CommonActions.Actions.busyCompleted()))
                    );
            });
    }
})


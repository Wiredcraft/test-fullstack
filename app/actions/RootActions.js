import React from 'react';
import {createActions} from '../utils/ActionBuilder';
import NetworkUtility from '../utils/NetworkUtility';
import CommonActions from './CommonActions';
import { push } from 'react-router-redux';

import _ from 'lodash';

function initializeApp() {
    // delay for 5 seconds
    return new Promise((resolve) => {
        _.delay(() => {
            resolve();
        }, 5000);
    });
}

module.exports = createActions({

    InitializeApp(args) {
        return this.dispatchMe(args)
            .then(() => this.dispatch(CommonActions.Actions.Busy()))
            .then(() => initializeApp(args)
                .then(() =>
                    this.dispatch(
                        this.Actions.InitializeAppCompleted({status: 'Initialized'})
                    ))
                .then(() => this.dispatch(push(NetworkUtility.baseURI() + '/app')))
                .then(() => this.dispatch(CommonActions.Actions.BusyCompleted()))
            );
    }
})


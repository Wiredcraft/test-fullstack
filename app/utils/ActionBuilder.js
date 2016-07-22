require('es6-promise').polyfill();
import _ from 'lodash';

function createHandler(holder, key, handler) {
    return function (args) {
        return (dispatch, state) => {
            if (handler == PureAction) {
                return dispatch({type: key, args: args});
            } else {
                return new Promise((resolve, reject) => {
                    let dispatchFunc = (action) => {
                        return new Promise((resolve, reject) => {
                            let result = dispatch(action);
                            if (result && typeof(result.then) === 'function' && typeof(result.catch) === 'function') {
                                result.then(resolve).catch(reject); //chain the promise
                            } else {
                                resolve();
                            }
                        });
                    };
                    //dispatch current action
                    let dispatchMeFunc = (args) => {
                        return dispatchFunc({
                            type: key,
                            args: args
                        });
                    };

                    let result = handler.call({
                        Actions: holder.Actions,
                        Keys: holder.Keys,
                        dispatch: dispatchFunc,
                        getCurrentState: state,
                        dispatchMe: dispatchMeFunc
                    }, args);

                    if (result && typeof(result.then) === 'function' && typeof(result.catch) === 'function') {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve();
                    }
                });
            }
        };
    }
}

export function createActions(actions) {
    let holder = {
        Actions: {},
        Keys: {}
    };
    _(actions).keys().each((key) => {
        holder.Keys[key] = key;
        holder.Actions[key] = createHandler(holder, key, actions[key]);
        // create 'Completed' auto-action if not defined.
        let completedActionName = key + "Completed";
        if (_(actions).keys().indexOf(completedActionName) < 0) {
            holder.Keys[completedActionName] = completedActionName;
            holder.Actions[completedActionName] = createHandler(holder, completedActionName, PureAction);
        }
        // create 'Failed' auto-action if not defined.
        let failedActionName = key + "Failed";
        if (_(actions).keys().indexOf(failedActionName) < 0) {
            holder.Keys[failedActionName] = failedActionName;
            holder.Actions[failedActionName] = createHandler(holder, failedActionName, PureAction);
        }
    }).value();
    return holder;
}

export function PureAction(data) {
    return {type: this.key, ...data};
}
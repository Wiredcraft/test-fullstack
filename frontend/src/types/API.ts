export type APIFailureAction =
'API_LOGIN_USER_FAILURE' |
 'API_REGISTER_USER_FAILURE';

export type APIResetAction =
 'API_LOGIN_USER_RESET' |
 'API_REGISTER_USER_RESET';

export type APIStartedAction =
'API_LOGIN_USER_STARTED' |
 'API_REGISTER_USER_STARTED';

export type APISuccessAction =
 'API_LOGIN_USER_SUCCESS' |
 'API_REGISTER_USER_SUCCESS';

export type APIReducerParameters = [
    APIStartedAction,
    APISuccessAction,
    APIFailureAction,
    APIResetAction,
]

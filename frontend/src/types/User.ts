
export type UserAction = 'USER_INIT'| 'USER_REGISTERED'
                        | 'USER_LOGGED_IN' | 'USER_LOGGED_OUT';

export type UserReducerParameters = [
    UserAction,
    UserAction,
    UserAction,
    UserAction,
]

import {UserAction} from 'src/types/User';

export interface IUserPayload {
    isLoggedIn: boolean;
    token: string | null;
    username: string | null;
    id: string | null;
}

export interface IUserRequest {
    payload: IUserState;
    type: UserAction;
}

export interface IUserState extends IUserPayload {}

export interface IUserAction extends IUserPayload, IUserRequest {}


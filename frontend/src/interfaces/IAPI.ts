import {
  APIFailureAction,
  APIResetAction,
  APIStartedAction,
  APISuccessAction,
} from 'src/types/API';

export interface IAPIAuthResponse {
    username?: string;
    token?: string;
    id?: string;
}

export interface IAPIError {
    type?: string;
    message?: string;
}

export interface IAPIAuthPayload {
    username: string;
    password: string;
}

export interface IAPIRequest {
    payload?: IAPIAuthPayload;
    type?: string;
    token?: string;
    id?: string;
}

export interface IAPIAuthState {
    loading?: boolean;
    response?: IAPIAuthResponse;
    error?: IAPIError;
}

export interface IAPIActions {
    type: APIFailureAction | APIResetAction |
    APIStartedAction | APISuccessAction;
    payload?: IAPIAuthPayload;
}

export interface IAPIAction extends IAPIAuthState, IAPIRequest {}

export interface IAPIResponse {
    username?: string;
    token?: string;
    id?: string;
}

export interface IAPIError {
    type?: string;
    message?: string;
}

export interface IAPIPayload {
    username: string;
    password: string;
}

export interface IAPIRequest {
    payload?: IAPIPayload;
    type?: string;
}

export interface IAPIState {
    loading?: boolean;
    response?: IAPIResponse;
    error?: IAPIError;
}

export interface IAPIAction extends IAPIState, IAPIRequest {}

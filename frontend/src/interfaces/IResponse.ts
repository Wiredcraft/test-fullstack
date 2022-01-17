export interface IError {
    message: string;
}

export interface IResponse {
    token: string;
}

export interface IData {
    loading?: boolean,
    response: IResponse,
    error?: IError,
}

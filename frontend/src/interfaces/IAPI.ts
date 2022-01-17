export interface IAPIResponse {
    username?: string;
    token?: string;
    id?: string;
}

export interface IAPIError {
    type?: string;
    message?: string;
}

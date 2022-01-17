
export interface IPayload {
    username: string;
    password: string;
}

export interface IRequest {
    payload: IPayload;
    type: string;
}

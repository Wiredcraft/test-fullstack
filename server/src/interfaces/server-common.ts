export interface IServerResponse {
	status: number;
	message: string;
	stringifiedBody: string;
}

export enum HttpMethod {
	POST = "post",
	GET = "get",
	PUT = "put"
}

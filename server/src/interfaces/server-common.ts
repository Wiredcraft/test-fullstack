export enum HttpMethod {
	POST = "post",
	GET = "get",
	PUT = "put"
}

export interface ICustomError {
	statusCode: number;
	message: string;
	errDev?: string;
	functionName: string;
}
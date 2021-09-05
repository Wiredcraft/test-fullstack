import { ICustomError } from "../interfaces";

export class ErrorHandler extends Error {
	public functionName: string;
	public message: string;
	public errDev: unknown;
	public statusCode: number;

	constructor(input: ICustomError) {
		super();
		const { functionName, message, statusCode, errDev } = input;
		this.functionName = functionName;
		this.message = message;
		this.statusCode = statusCode;
		this.errDev = errDev;
	}
}

import { ICustomError } from "../interfaces";

export class ErrorHandler extends Error {
	public functonName: string;
	public message: string;
	public errDev: string;
	public statusCode: number;

	constructor(input: ICustomError) {
		super();
		const { functionName, message, statusCode, errDev } = input;
		this.functonName = functionName;
		this.message = message;
		this.statusCode = statusCode;
		this.errDev = errDev || '';
	}
}

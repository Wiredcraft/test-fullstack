import axios from "axios";
import { Request } from "express";
import { IGitEmail, ServerResponse } from "../interfaces";
import { ErrorHandler, withServiceLayer } from "../utils";
import { createToken } from "../utils/token";

const {
	GITHUB_URL,
	GITHUB_GET_EMAIL_URL,
	GITHUB_CLIENT_ID: CLIENT_ID,
	GITHUB_CLIENT_SECRET: CLIENT_SECRET
} = process.env;

const getAuthUserFunction = async (req: Request): Promise<ServerResponse> => {
	const { code: token } = req.query;

	const accessToken = await authenticateUser(token as string);

	const email = await getUserValidEmail(accessToken);

	const internalToken = createToken(email);

	return {
		internalToken,
		email,
		message: 'User Authenticated',
		statusCode: 200
	};
}

const authenticateUser = async (token: string): Promise<string> => {
	const requestUrl =
		`${GITHUB_URL}/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${token}`;

	const response = await axios.post(requestUrl, null, {
		headers: {
			accept: 'application/json',
			'X-OAuth-Scopes': 'user',
			'X-Accepted-OAuth-Scopes': 'user'
		}
	}
	).catch(err => {
		throw new ErrorHandler({
			message: 'Error trying to get Github Access Token',
			statusCode: 400,
			errDev: JSON.stringify(err),
			functionName: 'authenticateUser'
		});
	});

	const { access_token: accessToken } = response.data;

	return accessToken;
}

const getUserValidEmail = async (accessToken: string): Promise<string> => {
	const emailListRawData = await axios.get(GITHUB_GET_EMAIL_URL || '', {
		headers: {
			accept: 'application/json',
			Authorization: `bearer ${accessToken}`
		}
	}).catch(err => {
		throw new ErrorHandler({
			message: 'Error trying to get Github Email',
			statusCode: 400,
			errDev: JSON.stringify(err),
			functionName: 'getUserValidEmail'
		});
	});

	const emailList: IGitEmail[] = emailListRawData.data;

	const selectedEmailData = emailList.filter(({ primary, verified }) => primary && verified)[0];

	if (!selectedEmailData) {
		throw new ErrorHandler({
			message: 'Error trying to find valid Github Email',
			statusCode: 400,
			functionName: 'getUserValidEmail'
		});
	}

	return selectedEmailData.email;
}

export const getAuthenticatedUserEmail = withServiceLayer(getAuthUserFunction);
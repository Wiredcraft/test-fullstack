import axios from "axios";
import { Response, Request } from "express";

const {
	GITHUB_URL,
	GITHUB_GET_EMAIL_URL,
	GITHUB_CLIENT_ID: CLIENT_ID,
	GITHUB_CLIENT_SECRET: CLIENT_SECRET
} = process.env;

export const getAuthenticatedUserEmail = async (req: Request, res: Response) => {
	const { code: token } = req.query;

	const accessToken = await authenticateUser(token as string);

	const email = await getUserValidEmail(accessToken);

	res.send(email)
}

const authenticateUser = async (token: string): Promise<string> => {
	const response = await axios({
		method: 'post',
		url: `${GITHUB_URL}/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${token}`, headers: {
			accept: 'application/json',
			'X-OAuth-Scopes': 'user',
			'X-Accepted-OAuth-Scopes': 'user'
		}
	});

	const { access_token: accessToken } = response.data;

	return accessToken;
}

const getUserValidEmail = async (accessToken: string): Promise<string> => {
	const emailListRawData = await axios({
		method: 'get',
		url: GITHUB_GET_EMAIL_URL,
		headers: {
			accept: 'application/json',
			Authorization: `bearer ${accessToken}`
		}
	});

	const emailList: { primary: boolean, verified: boolean, email: string }[] = emailListRawData.data;

	const selectedEmailData = emailList.filter(({ primary, verified }) => primary && verified)[0];

	return selectedEmailData.email;
}

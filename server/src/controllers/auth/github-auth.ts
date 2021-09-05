import axios from "axios";
import { Request } from "express";
import { ServerResponse } from "../../interfaces";
import { ErrorHandler, withServiceLayer } from "../../utils";
import { createToken } from "../../utils/token";

const {
  GITHUB_URL,
  GITHUB_GET_EMAIL_URL,
  GITHUB_CLIENT_ID: CLIENT_ID,
  GITHUB_CLIENT_SECRET: CLIENT_SECRET,
  CLIENT_URL
} = process.env;

export const getAuthUserFunction = async (req: Request): Promise<ServerResponse> => {
  const { code: token } = req.query;

  const accessToken = await authenticateUser(token as string);

  const email = await getUserValidLogin(accessToken);

  const internalToken = createToken(email);

  return {
    internalToken,
    email,
    redirect: `http://${CLIENT_URL}?token=${internalToken}`,
    message: 'User Authenticated',
    statusCode: 200
  };
};

const authenticateUser = async (token: string): Promise<string> => {
  const requestUrl =
    `${GITHUB_URL}/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${token}&scope=user`;

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
};

const getUserValidLogin = async (accessToken: string): Promise<string> => {
  const userRawData = await axios.get(GITHUB_GET_EMAIL_URL || '', {
    headers: {
      accept: 'application/json',
      Authorization: `bearer ${accessToken}`
    }
  }).catch(err => {
    throw new ErrorHandler({
      message: 'Error trying to get Github Login',
      statusCode: 400,
      errDev: JSON.stringify(err),
      functionName: 'getUserValidEmail'
    });
  });

  const login: string = userRawData.data.login;

  if (!login) {
    throw new ErrorHandler({
      message: 'Error trying to find valid Github Login',
      statusCode: 400,
      functionName: 'getUserValidEmail'
    });
  }

  return login;
};

export const gitHubCallback = withServiceLayer(getAuthUserFunction);

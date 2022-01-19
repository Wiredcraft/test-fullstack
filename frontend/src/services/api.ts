/* eslint-disable @typescript-eslint/explicit-function-return-type */
import HTTPMethod from '../types/HTTPMethod';
import {IAPIRequest} from '../interfaces/IAPI';
import IParameters from '../interfaces/IParameters';

const fetchService = (endpoint: string, method: HTTPMethod) => {
  return async function service(request: IAPIRequest) {
    const parameters: IParameters = {method};

    const hasID = request.id === undefined ? false : true;

    if (request.token) {
      parameters.headers = {
        ...parameters.headers,
        Authorization: `Bearer ${request.token}`,
      };
    }

    if (method === 'POST' || method === 'PATCH') {
      parameters.headers = {
        ...parameters.headers,
        'Content-Type': 'application/json',
      };

      parameters.body = JSON.stringify(request.payload);
    }

    const response = await fetch(
      hasID ? endpoint + `/${request.id}` : endpoint, parameters,
    );
    const json = await response.json();
    if (json.error) {
      throw json.error;
    }
    return json;
  };
};

export const loginUser = fetchService(
    `${process.env.API_ENDPOINT}/auth/login`,
    'POST',
);

export const registerUser = fetchService(
    `${process.env.API_ENDPOINT}/auth/register`,
    'POST',
);

export const deleteTalks = fetchService(
    `${process.env.API_ENDPOINT}/talks`,
    'DELETE',
);

export const getTalks = fetchService(
    `${process.env.API_ENDPOINT}/talks`,
    'GET',
);

export const listTalks = fetchService(
    `${process.env.API_ENDPOINT}/talks/list`,
    'GET',
);

export const patchTalks = fetchService(
    `${process.env.API_ENDPOINT}/talks`,
    'PATCH',
);

export const postTalks = fetchService(
    `${process.env.API_ENDPOINT}/talks`,
    'POST',
);

export const postVote = fetchService(
    `${process.env.API_ENDPOINT}/vote`,
    'POST',
);


import IParameters from 'src/interfaces/IParameters';
import {IRequest} from 'src/interfaces/IRequest';
import HTTPMethod from 'src/types/HTTPMethod';

const fetchService = (endpoint: string, method: HTTPMethod) => {
  return async function service(request: IRequest) {
    const parameters: IParameters = {method};

    if (method === 'POST' || method === 'PATCH') {
      parameters.headers = {'Content-Type': 'application/json'};
      parameters.body = JSON.stringify(request.payload);
    }

    const response = await fetch(endpoint, parameters);
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

import IParameters from 'src/interface/IParameters';
import {IRequest} from 'src/interface/IRequest';
import HTTPMethod from 'src/types/HTTPMethod';

const fetchService = (endpoint: string, method: HTTPMethod) => {
  return async function service(request: IRequest) {
    const parameters: IParameters = {method};

    if (method === 'POST' || method === 'PATCH') {
      parameters.headers = {'Content-Type': 'application/json'};
      parameters.body = JSON.stringify(request.payload);
    }


    console.log({
      endpoint,
      parameters,
    });

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

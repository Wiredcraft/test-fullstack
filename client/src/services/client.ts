/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import { Client } from '@/utils/client';
import { ClientError } from '@/utils/client-error';

interface ResponseData<D = any> {
  data: D;
}

interface ResponseError {
  error: {
    status: number;
    message: string;
    details?: {
      code: string;
      path: string[];
      message: string;
    }[];
  };
}

const REQUEST_TIMEOUT = 30000;
const BASE_URL = '/api';
const NO_AUTH_CODE = 401;

function onFulfilled<R extends ResponseData<D>, D>(response: AxiosResponse<R>): D {
  return response.data.data;
}

// Reference: https://axios-http.com/docs/handling_errors
function onRejected(error: any) {
  return Promise.reject(
    new ClientError<ResponseError, ResponseError['error']>(error, {
      onNetwork: () => {
        // notificateError('Network Error', error.message);
        console.warn('Network Error');
      },
      onInternal: () => {
        // notificateError('Internal Error', error.message);
        console.warn('Internal Error');
      },
      onRequest: () => {
        // notificateError('Request Error', error.message);
        console.warn('Request Error');
      },
      onResponse: (response) => response.data.error,
      onFinal: (clientError) => {
        if (clientError.response == null) return;

        switch (clientError.response.status) {
          case NO_AUTH_CODE:
            //   goLogin();
            break;
          default:
            // notificateError(clientError.original.message, clientError.message);
            console.warn('Uncatched Error');
            break;
        }
      },
    }),
  );
}

export const client = new Client<ResponseData<any>, Error>(
  {
    timeout: REQUEST_TIMEOUT,
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    // transformRequest: [
    //   (data, headers) => {
    //     console.debug(data);

    //     const accessToken = getAccessToken();
    //     if (accessToken) headers.authorization = `Bearer ${accessToken}`;

    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //     return data;
    //   },
    // ],
  },
  onFulfilled,
  onRejected,
);

client.instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    if (config.headers == null) config.headers = {};
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/*****************************************************************************
 * JWT Token handlers
 *****************************************************************************/
const ACCESS_TOKEN = 'at';
const REFRESH_TOKEN = 'rt';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN) ?? '';
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN) ?? '';
}

export function setRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN, token);
}

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN);
}

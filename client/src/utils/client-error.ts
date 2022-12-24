/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';

export interface Callbacks<T = any, R = any> {
  onInternal?: (error: Error) => void;
  onResponse?: (response: AxiosResponse<T>, error: AxiosError<T>) => R;
  onNetwork?: (request: XMLHttpRequest, error: AxiosError<T>) => void;
  onRequest?: (error: AxiosError<T>) => void;
  onFinal?: (error: ClientError<T, R>) => void;
}

export class ClientError<T = any, R = any> {
  private defaultAllowed = true;

  readonly origin: unknown;
  readonly response?: R;

  constructor(error: unknown, callbacks: Callbacks<T, R>) {
    this.origin = error;

    if (isAxiosError<T>(error)) {
      if (error.response != null) {
        this.response = callbacks.onResponse?.(error.response, error);
      } else if (error.request != null) {
        callbacks.onNetwork?.(error.request as XMLHttpRequest, error);
      } else {
        callbacks.onRequest?.(error);
      }
    } else if (error instanceof Error) {
      callbacks.onInternal?.(error);
    } else {
      callbacks.onInternal?.(new Error(String(error)));
    }

    // Swtich next loop to let page handler error first
    setTimeout(() => {
      // The arrow function bind current `this` into setTimeout callback
      if (this.defaultAllowed) callbacks.onFinal?.(this);
    });
  }
}

export function isClientError(error: unknown): error is ClientError {
  return error instanceof ClientError;
}

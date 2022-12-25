/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class Client<T = any, E = any> {
  readonly instance: AxiosInstance;

  constructor(
    config?: AxiosRequestConfig,
    // private responseInterceptors: readonly [
    private onFulfilled?: (<R>(respose: AxiosResponse<T>) => Promise<R>) | null,
    private onRejected?: ((error: E) => Promise<never>) | null, // ] = [],
  ) {
    this.instance = axios.create(config);
  }

  get<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
    return this.instance
      .get<R, AxiosResponse<T>>(url, { ...config, params })
      .then<R>(this.onFulfilled)
      .catch(this.onRejected);
  }

  delete<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
    return this.instance
      .delete<R, AxiosResponse<T>>(url, { ...config, params })
      .then<R>(this.onFulfilled)
      .catch(this.onRejected);
  }

  post<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance
      .post<R, AxiosResponse<T, D>, D>(url, data, config)
      .then<R>(this.onFulfilled)
      .catch(this.onRejected);
  }

  put<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance
      .put<R, AxiosResponse<T, D>, D>(url, data, config)
      .then<R>(this.onFulfilled)
      .catch(this.onRejected);
  }

  patch<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance
      .patch<R, AxiosResponse<T, D>, D>(url, data, config)
      .then<R>(this.onFulfilled)
      .catch(this.onRejected);
  }
}

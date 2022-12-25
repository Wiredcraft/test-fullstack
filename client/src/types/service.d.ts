/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Service<R, P = undefined> = P extends undefined
  ? () => Promise<R>
  : (params: Readonly<P>) => Promise<R>;

declare type ServiceResponse<T extends Service<any, any>> = T extends Service<infer R, any>
  ? R
  : never;

declare type ServiceParams<T extends Service<any, any>> = T extends Service<any, infer P>
  ? P extends undefined
    ? undefined
    : Readonly<P>
  : never;

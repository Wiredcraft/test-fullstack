import { isFunctionNode14 } from './utils';

type ParseEnvCb<T> = (v: string) => T;

/**
 * Module scope config value parser
 *
 * @export
 */
export function parseEnv(propertyPath: string): string;
export function parseEnv<T>(propertyPath: string, cb?: ParseEnvCb<T>): T;
export function parseEnv<T>(propertyPath: string, defaultValue?: T): T;
export function parseEnv<T>(
  propertyPath: string,
  cb?: ParseEnvCb<T>,
  defaultValue?: T,
): T;
export function parseEnv(propertyPath: string, y?: any, z?: any) {
  let cb = (v: string) => v;
  let defaultValue = z;

  if (isFunctionNode14(y)) cb = y;
  else defaultValue = y;

  const res = cb(process.env[propertyPath]);
  if (res === undefined || res === null) return defaultValue;
  return res;
}

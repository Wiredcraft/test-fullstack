export function isTruthyString(v: string) {
  return v === 'true';
}

export function toStrArray(v: string) {
  return v.split(',');
}

export function isFunctionNode14(v: any) {
  return typeof v === 'function';
}
export function isObjectNode14(v: any) {
  return v !== null && typeof v === 'object';
}
export function isStringNode14(v: any) {
  return typeof v === 'string';
}

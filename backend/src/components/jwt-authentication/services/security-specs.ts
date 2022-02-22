import {ReferenceObject, SecuritySchemeObject, OperationObject} from '@loopback/openapi-v3';

export const OPERATION_SECURITY_SPEC = [{bearerAuth: []}];
export type SecuritySchemeObjects = {
  [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
};
export function secureSpec(spec: OperationObject): OperationObject {
  return {
    ...spec,
    security: OPERATION_SECURITY_SPEC,
  }
}

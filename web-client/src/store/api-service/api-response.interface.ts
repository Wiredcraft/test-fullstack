import { ApiActionResult } from "./actions";

export enum GeneralApiResponseType {
  TIMEOUT = "TIMEOUT",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  REJECTED = "REJECTED",
  UNKNOWN = "UNKNOWN",
  BAD_REQUEST = "BAD_REQUEST",
  OK = "OK",
}

export type GeneralApiResponse<T extends ApiActionResult> = {
  kind: GeneralApiResponseType;
  temporary?: boolean;
  data?: T;
} | null;

export const generalApiProblemStore: Record<
  GeneralApiResponseType,
  GeneralApiResponse<null>
> = {
  OK: { kind: GeneralApiResponseType.OK, data: null }, // never
  TIMEOUT: { kind: GeneralApiResponseType.TIMEOUT, temporary: true },
  CONNECTION_ERROR: {
    kind: GeneralApiResponseType.CONNECTION_ERROR,
    temporary: true,
  },
  SERVER_ERROR: { kind: GeneralApiResponseType.SERVER_ERROR },
  UNAUTHORIZED: { kind: GeneralApiResponseType.UNAUTHORIZED },
  FORBIDDEN: { kind: GeneralApiResponseType.FORBIDDEN },
  NOT_FOUND: { kind: GeneralApiResponseType.NOT_FOUND },
  REJECTED: { kind: GeneralApiResponseType.REJECTED },
  UNKNOWN: { kind: GeneralApiResponseType.UNKNOWN, temporary: true },
  BAD_REQUEST: { kind: GeneralApiResponseType.BAD_REQUEST },
};

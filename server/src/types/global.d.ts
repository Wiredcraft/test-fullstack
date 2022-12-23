/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  export interface Request {
    user?: { id: number; username: string };
  }

  export interface Response {
    success: (data: any, status?: number) => this;
    error: (error: any, status?: number) => this;
  }
}

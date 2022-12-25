declare namespace Express {
  export interface Request {
    user?: { id: number; username: string };
  }

  export interface Response {
    success: (data?: unknown, status?: number) => this;
    error: (error: object, status?: number) => this;
  }
}

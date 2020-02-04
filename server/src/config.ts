import * as dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT: any = process.env.PORT;
export const SOCKET_PORT: any = process.env.SOCKET_PORT;
export const APIS_PATH: any = 'api/v1/';
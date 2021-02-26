import 'express-session';
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    at: string;
    rt: string;
  }
}

declare type SessionWithData = Partial<SessionData> & Session;

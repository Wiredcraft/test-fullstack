import { Injectable, InternalServerErrorException } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { isTruthyString, toStrArray } from 'src/common/utils/utils';
import { AbstractEntryProvider } from './abstract-entry';
import LevelSession = require('level-session-store');

@Injectable()
export class Security extends AbstractEntryProvider {
  public setup() {
    super._setup();

    this._useHelmet();
    this._enableCors();
    this._setupRateLimit();
    this._enableSession();
  }

  private _useHelmet() {
    this.app.use(helmet());
  }

  private _enableCors() {
    this.app.use(
      cors({
        origin: this.getConfig('CORS_ALLOWED_ORIGINS', toStrArray),
        methods: this.getConfig('CORS_ALLOWED_METHODS', toStrArray),
        allowedHeaders: this.getConfig('CORS_ALLOWED_HEADERS', toStrArray),
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
      }),
    );
  }

  private _setupRateLimit() {
    this.app.use(
      rateLimit({
        windowMs: this.getConfig('RATE_LIMIT_WINDOW_MS', parseInt),
        max: this.getConfig('RATE_LIMIT_MAX', parseInt),
      }),
    );
  }

  private _enableSession() {
    const LevelSessionStore = LevelSession(session);
    this.app.use(
      session({
        store: new LevelSessionStore(path.join(__dirname, '.sess_tore')),
        secret: this.getConfig('SESSION_SECRET'),
        resave: this.getConfig('SESSION_RESAVE', isTruthyString),
        saveUninitialized: this.getConfig(
          'SESSION_SAVE_UNINIT',
          isTruthyString,
        ),
        rolling: this.getConfig('SESSION_ROLLING', isTruthyString),
        name: this.getConfig('SESSION_NAME'),
        cookie: {
          domain: this.getConfig('SESSION_COOKIE_DOMAIN'),
          maxAge: this.getConfig('SESSION_COOKIE_MAX_AGE', parseInt),
          httpOnly: this.getConfig('SESSION_COOKIE_HTTP_ONLY', isTruthyString),
          secure: this.getConfig('SESSION_COOKIE_SECURE', isTruthyString),
          sameSite: this.getConfig('SESSION_COOKIE_SAME_SITE', (v) => {
            const allowedStrings = ['none', 'scrict', 'lax'];
            if (!v) return 'lax';
            if (v === 'true') return true;
            if (v === 'false') return false;
            if (allowedStrings.includes(v)) return v in allowedStrings;
            else
              throw new InternalServerErrorException(
                'mis-configured cookie.sameSite',
              );
          }),
        },
      }),
    );

    // this.app.use(
    //   csurf({
    //     cookie: true,
    //     sessionKey: getConfig('SESSION_NAME'),
    //   }),
    // );
  }
}

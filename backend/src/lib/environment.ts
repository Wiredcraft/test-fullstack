import {
  cleanEnv,
  port,
  str,
} from 'envalid';
import {Env} from '../interfaces/env';

/**
 * Class which handle the environment logic.
 */
class Environment {
  environment: Env;

  /**
   * Validate and sanitate the environment variables.
   */
  constructor() {
    this.environment = cleanEnv(process.env, {
      HOST: str({default: 'localhost'}),
      JWT_SECRET: str(),
      LOG_LEVEL: str({default: 'info'}),
      MONGO_DB: str(),
      MONGO_HOST: str(),
      MONGO_PASSWORD: str(),
      MONGO_PORT: port({default: 27017}),
      MONGO_USER: str(),
      NODE_ENV: str({choices: ['development', 'testing', 'production']}),
      PORT: port({default: 8080}),
    });
  }

  /**
   * Validate and sanitate the environment variables.
   * @return {Env} Environment object.
   */
  getEnvironment(): Env {
    return this.environment;
  }
}

const currentEnvironment: Environment = new Environment();

export default currentEnvironment;


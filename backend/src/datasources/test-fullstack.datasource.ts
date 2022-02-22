import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'test_fullstack',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test_fullstack'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TestFullstackDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'test_fullstack';
  static readonly defaultConfig = config;
  
  constructor(
    @inject('datasources.config.test_fullstack', {optional: true})
    dsConfig: object = config,
  ) {
    super({
      ...dsConfig,
      url: process.env.DB_URL,
      password: process.env.DB_PASSWORD,
    });
  }

  start(): ValueOrPromise<void> {}

  stop(): ValueOrPromise<void> {
    super.disconnect()
  }
}
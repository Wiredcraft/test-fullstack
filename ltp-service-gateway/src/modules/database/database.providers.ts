import * as mongoose from 'mongoose'
import config from '../../configs'
import { DbConnectionToken } from '../../constants'

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    userFactory: async () => {
      // (mongoose as any).Promise = global.Promise
      // const conn = await mongoose.connect(config['mongodbUrl'], { useMongoClient: true })
      // return conn as mongoose.Connection
    }
  }
]
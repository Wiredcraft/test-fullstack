import { UserSchema } from './user.schema'
import * as mongoose from 'mongoose'
import config from '../../configs'
import { DbConnectionToken } from '../../constants'

export const usersProviders = [
  {
    provide: 'UserModelToken',
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise
      await mongoose.connect(config['mongodbUrl'], { useMongoClient: true })
      return mongoose.model('User', UserSchema)
    }
    // inject: [DbConnectionToken]
  }
]
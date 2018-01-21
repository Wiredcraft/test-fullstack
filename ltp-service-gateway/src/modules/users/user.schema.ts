import * as mongoose from 'mongoose'
import * as md5 from 'md5'
import config from '../../configs'
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
})

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  if (this.isModified('password')) {
    this.password = md5(this.password + config['passwordSalt'])
  }
  next()
})

UserSchema.methods.comparePassword = function (password) {
  return this.password === md5(password + config['passwordSalt'])
}

export { UserSchema }
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.encrypt = async (data, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds)

  // encryption
  return bcrypt.hash(data, salt)
}

exports.decrypt = async (data, encryption) => {
  return bcrypt.compare(data, encryption)
}

exports.genToken = async (obj, expire = '12h') => {
  return jwt.sign(obj, process.env.secret, { expiresIn: expire })
}

exports.sendData = (data, res) => {
  res.status(200).json(data)
}

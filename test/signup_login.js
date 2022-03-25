import axios from "axios";
const random = require('random')

const backendUrl = 'http://localhost:3000'

async function signup(a, b) {
  const resutl = await axios.post(`${backendUrl}/api/user/reg`,{
    username:("1234"+random.int(0, 10000)),
    password:"1234"
  })
  return resutl.data.data
}

async function login(username, password) {
  const resutl = await axios.post(`${backendUrl}/api/auth`,{
    username,password
  })
  return resutl.data.data
}


module.exports = {signup,login};
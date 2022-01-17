import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

const userModel = User.getInstance()

export const signin = async (req, res)=> {
    const { username, password } = req.body //Coming from formData
    const existingUser = userModel.get(username)
    if(!existingUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

    req.session.user = existingUser;

    res.status(200).json({ result: existingUser })
}

export const signup = async (req, res)=> {
    const { username, password } = req.body
    const user = await userModel.get({username: username});
    console.log('user', user)
    if(user) return res.status(400).json({message: "User already exist"})

    const hashedPassword = await bcrypt.hash(password, 12)
    await userModel.create({username: username, password: hashedPassword})
    res.status(200).json({ result: 'ok' })
}

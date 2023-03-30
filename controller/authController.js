import userModel from '../modals/userModel.js'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).json({ message: 'User Already Exist' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({ username, email, password: hashedPassword })
        return res.status(201).json({ success: true, message: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while registring user' })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: 'Email and Password must be provided' })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: 'invalid login details' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(200).json({ message: 'invalid login Details' })
        }
        const token = JWT.sign({ user }, process.env.JWT_SECRET)
        return res.status(201).json({ success: true, message: 'User Login successfully', token })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while login user' })
    }
}

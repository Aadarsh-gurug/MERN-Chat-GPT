import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [4, 'password length must be 4 character long']
    },
    customerID: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model('ChatGptUser', userSchema)

export default User;
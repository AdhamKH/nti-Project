const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlenght: 6,
        maxlength: 25,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        minlenght: 6,
        maxlength: 25,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email")
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 21) throw new Error('Age must be older than 21')
        }
    },
    phone: {
        type: Number,
        // required:true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("phone no is not Corect")
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlenght: 6,
        maxlength: 100

    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female'],
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String, //1 admin 0 user
        enum: ["admin", "user"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    let user = this
    if (user.isModified("password")) user.password = await bcrypt.hash(user.password, 12)

})

// LoginIN
userSchema.statics.loginuser = async (email, password) => {
    let user = await User.findOne({
        email: email
    })
    if (!user) throw new Error("email not found")
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error("password is wrong  ")

    return user


}
//generate token
userSchema.methods.generateToken = async function () {
    let user = this
    const token = jwt.sign({ _id: user._id }, process.env.tokenkey)
    // user.tokens=  user.tokens.push({token:token})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User
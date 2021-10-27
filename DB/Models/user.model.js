const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,

    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email")
        }
    }, 
    password:{
        type:String,
        trim:true,
        //match:,
        required:true,
        minlength:6,
        maxlength:100 
    }, 
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone number")
        }
    }, 
    gender:{
        type:String,
        trim:true,
        enum:["male", "female"]
    }, 
    image:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
        min:21
    },
    image:{
        type:String,
        trim:true
    },
    tokens: [ { token: { type:String, required: true } } ]
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
    console.log(user.tokens)
    // user.tokens=  user.tokens.push({token:token})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User
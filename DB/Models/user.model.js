const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,

    },
    type:{
        type:String,
        trim:true,
        enum:['Men','Woman','Kids']
    },
    quantity:{
        type:Number
    },
    color:{
        type:String,
        trim:true
    }, 
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
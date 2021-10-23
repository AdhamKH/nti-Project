const mongoose = require('mongoose')
const validator = require('validator')


const addToCartSchema = new mongoose.Schema({
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
    image:{
        type:String,
        
    },
},
 {
    
    timestamps: true
})




//generate token


const addToCart = mongoose.model('addToCart', addToCartSchema)
module.exports = addToCart
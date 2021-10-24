const mongoose = require('mongoose')
const validator = require('validator')


const addToCartSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,

    },
    quantity:{
        type:Number
    },
    products:[
        {
      product:  {type:Number, trim:true, unique:true}
    }
    ]
},
 {
    
    timestamps: true
})




//generate token


const addToCart = mongoose.model('addToCart', addToCartSchema)
module.exports = addToCart
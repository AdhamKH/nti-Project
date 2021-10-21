const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

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
    colors:[
        { 
            name : {type:String, trim:true } 
        }
    ], 
    image:{
        type:String,
        
    }


})



const Category = mongoose.model('Category', categorySchema)

module.exports = Category
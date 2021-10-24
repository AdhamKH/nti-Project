const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
    },
    products:[
        {
      product:  {type:Number, trim:true, unique:true}
    }
    ],
    date:{
         type:String
        
    },



},
{    timestamps: true})



const Invoic = mongoose.model('Invoic', invoiceSchema)

module.exports = Invoic
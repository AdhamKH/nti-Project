const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        trim:true
    }, 
    total:{
        type:Number,
        trim:true
    },
    date:{
         type:String
        
    },



},
{    timestamps: true})



const Invoic = mongoose.model('Invoic', invoiceSchema)

module.exports = Invoic
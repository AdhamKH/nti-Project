var jwt = require('jsonwebtoken')
const User=require('../DB/Models/user.model')
const auth=async(req,res,next)=>{
    try{
    const token=req.header("Authorization").replace("Bearer","")
    var decoded= jwt.verify(token,process.env.tokenkey)
    res.send(decoded)
    }

    catch(e){

    }
    next()
}



module.exports=auth
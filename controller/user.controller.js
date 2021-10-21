const User = require("../DB/Models/user.model")

class Usercontroller{
    // Resgister User
    static register=async(req,res)=>{
        try{
            let user=new User(req.body)
            await user.save()
            res.status(200).send({apisatus:true, data:user, message:"Registered"})
        }
        catch(e){
            res.status(500).send({apisatus:false, data:e.message, message:"error Adding User"})
        }
    }
    // LogIn
    static login =async(req,res)=>{
        try{
           const user=await User.loginuser(req.body.email,req.body.password)
            const token= await user.generateToken()
            res.status(200).send({apistatus:true,data:{user,token}, message:" Login Successfully"})
        }
        catch(e){
            res.status(500).send({apistatus:false,data:e.message, message:"Invalid Login"})
        }
    }
    // profile
    static profile=async (req,res)=>{
        res.status(200).send({
            apistatus:true,
            // data:req.user ,
            message:"user loaded"
           })
    }
}


module.exports=Usercontroller
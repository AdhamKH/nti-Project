const User = require("../DB/Models/user.model")
const Category= require("../DB/Models/category.model")
const addToCart=require("../DB/Models/addToCart.model")
const Invoice=require("../DB/Models/invoice.model")
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
    // Add to cart
    static addToCart= async (req,res)=>{
        let category_id=req.params.id
        let  enteredquantity=req.body.quantity
        // console.log(quantity)
        try{
            
            const category=await Category.findOneAndUpdate({_id:category_id},{ $inc: { quantity: -enteredquantity } })
            console.log(category.quantity)
            res.send({apistatus:true,data:category,message:"Added To Cart"})
            // const Invoice=await new invoice(req.body)
            // await Invoice .save()
            

            
        }
        catch(e){
            res.status(500).send({apistatus:false,data:e.message,message:"Error"})
        }
    }
}


module.exports=Usercontroller
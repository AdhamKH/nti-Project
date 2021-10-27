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
            data:req.user ,
            message:"user loaded"
           })
    }
    // Add to cart
    static addToCart= async (req,res)=>{
        let addproduct= req.body.product
        try{
        let newcart=new addToCart (req.body)
          newcart.products.push(addproduct)
        await newcart.save()
        res.status(200).send({apistatus:true,data:newcart,message:"Added to Cart"})
    }
    catch(e){
        res.status(500).send({apistatus:false,data:e.message,message:"Error"})
    }

     }
    // add to existing cart 
    static addtoexistingcart=async(req,res)=>{
        let addproduct=req.body.product
        try{
          let cart= await addToCart.findById(req.params.id)
            cart.products.push(addproduct)
           await cart.save()
           res.send({data:cart})
        }
        catch(e)
        {
            res.status(500).send({apistatus:false,data:e.message,message:"Error"})
        }
    }
    static addImg = async(req, res)=>{
        try{
            if(!req.file) throw new Error ("file not found")
            req.user.image = req.file.path //.replaceAll("\\", "/")    // \\  /
            await req.user.save()
            res.status(200).send({apiStatus:true, data: req.user, message:"profile image updated"})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error add image" })
        }
    }
}


module.exports=Usercontroller
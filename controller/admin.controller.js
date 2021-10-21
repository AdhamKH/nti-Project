const User = require("../DB/Models/user.model")
const Category= require("../DB/Models/category.model")
class adminController{
        // show all users
        static showall=async (req,res)=>{
            try{
                let user= await User.find()
                 res.status(200).send({apisatus:true, data:user, message:"all Users"})
            }
            catch(e){
                res.status(500).send({apisatus:false, data:e.message, message:"No Users"})
            }
        }
        // Delete User 
        static del=async(req,res)=>{
            try{
                let user=await User.findByIdAndDelete(req.params.id)
                res.status(200).send({apisatus:true, data:"Deleted", message:"deleted"})
            }
            catch(e){
                res.status(500).send({apisatus:false, data:e.message, message:"User not Found"})
            }
        }
        // show Single User
        static showSingle=async(req,res)=>{
            try{
                let user=await User.findById(req.params.id)
                res.status(200).send({apisatus:true, data:user, message:"deleted"})
            }
            catch(e){
                res.status(500).send({apisatus:false, data:e.message, message:"User not Found"})
            }
        }
        // add product
        static addproduct=async(req,res)=>{
            try{
            let category= new Category(req.body)
            req.category.colors.push(req.body)
            await category.save()
            await req.category.save()
            res.status(200).send({apistatus:true,data:category,message:"Added"})
        }
        catch(e){
            res.status(500).send({apistatus:false,data:e.message,message:"Error"})
        }
        }
}

module.exports=adminController
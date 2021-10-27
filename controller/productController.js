const Category= require('../DB/Models/category.model')
class categoryController{
    static getAll=async (req,res)=>{
        try{
        const allproducts= await Category.find()
        res.status(200).send({apistatus:true,data:allproducts,message:'All Products'})        
        }
        catch(e){
            res.status(500).send({apistatus:false,data:e.message,message:'Error'})        
  
        }

}
}
module.exports=categoryController





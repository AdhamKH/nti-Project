const router= require('express').Router()
const productController=require('../controller/productController')

router.get('/allproducts',productController.getAll)

module.exports=router
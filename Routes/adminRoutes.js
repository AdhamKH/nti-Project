const router = require('express').Router()
const adminController=require('../controller/admin.controller')

router.get("/all",adminController.showall)
router.delete("/delete/:id",adminController.del)
router.get("/single/:id",adminController.showSingle)
router.post("/Addproduct",adminController.addproduct)
router.put("/addsameproduct/:id",adminController.addsameproduct)


module.exports = router
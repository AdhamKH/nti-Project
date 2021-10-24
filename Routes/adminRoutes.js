const router = require('express').Router()
const adminController=require('../controller/admin.controller')
const auth=require('../middleware/auth')

router.get("/all",adminController.showall)
router.delete("/delete/:id",adminController.del)
router.get("/single/:id",adminController.showSingle)
router.post("/Addproduct",adminController.addproduct)
router.put("/addsameproduct/:id",auth,adminController.addsameproduct)
router.post("/confirmOrder/:id",adminController.confirmOrder)


module.exports = router
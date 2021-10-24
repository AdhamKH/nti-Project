const router = require('express').Router()

const userController=require('../controller/user.controller')
const auth=require('../middleware/auth')

router.post("/register",userController.register)

router.post("/login",userController.login)
router.get("/profile",auth,userController.profile)
router.post("/addToCart",userController.addToCart)
router.post("/addtoexistingcart/:id",userController.addtoexistingcart)
module.exports = router
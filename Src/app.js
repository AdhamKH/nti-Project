// MODULES
const exppress = require('express')
require('dotenv').config()
require('../DB/connection')
const cors=require('cors')



const app = exppress()
// Use Json Middleware
app.use(exppress.json())
app.use(exppress.urlencoded({extended: true}))


// Routes
const userRoutes = require('../Routes/userRoutes')
const adminRoutes = require('../Routes/adminRoutes')

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

app.get("/*",(req,res)=>{
    res.status(404).send({message:"page Not found"})
})

module.exports = app
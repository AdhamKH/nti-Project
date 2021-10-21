// MODULES
const exppress = require('express')
require('dotenv').config()
require('../DB/connection')



const app = exppress()
// Use Json Middleware
app.use(exppress.json())
app.use(exppress.urlencoded({extended: true}))


// Routes
const userRoutes = require('../Routes/userRoutes')
const adminRoutes = require('../Routes/adminRoutes')

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)



module.exports = app
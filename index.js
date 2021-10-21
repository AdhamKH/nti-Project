const app=require('./Src/app')
const PORT=process.env.PORT

app.listen(PORT,()=>{console.log(`server on Port ${PORT}`)})
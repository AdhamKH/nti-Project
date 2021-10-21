
const mongoose = require("mongoose")
try{mongoose.connect(process.env.dbURL,{})
console.log("connected To DB")
}
catch(e){
    console.log(e)
}



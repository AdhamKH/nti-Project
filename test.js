const bcrypt=require('bcryptjs') 

const encode=async (txt)=>{
  const d= await bcrypt.hash(txt,12)
  console.log(d) 
  const isValid= await bcrypt.compare("123",d)
  console.log(isValid)
}
encode("123")
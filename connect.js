var mongoose=require('mongoose');
var connect=mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
 }).then(()=>{
    console.log("you are connected")
 })
 .catch((err)=>{
     console.log(`not connected ${err}`)
 })
 module.exports = { connect }

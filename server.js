var express=require('express')
var mongoose=require('mongoose');
var hbs=require('hbs');
var {connect} =require('./connect')
var path=require('path');
require('dotenv').config();
var app=express();
app.set('view engine','hbs');
var port=process.env.PORT || 1337 ||5000 ||2000;
mongoose.connect(process.env.MONGO_URL,{
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
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var table=mongoose.model('newtable',mongoose.Schema({
    name:String
}))

app.get('/showitem',async(req,res)=>{
    var s=await table.find({});
    res.status(202).send(s);
})


app.get('/additem',async(req,res)=>{
console.log('item is call');
 var x=req.headers.name;
 var tab=new table({
     name:String(x)
 })


  tab.save((err)=>{
     err ? console.log(err) :console.log("insert successufully");
  });
  res.send(JSON.stringify({msg:"successfully add"}));
})


app.get('/deleteitem',async(req,res)=>{
   var name1=req.headers.name;
   table.deleteOne({name:name1})   .then()   .catch(err=>console.log(err))  
   res.send(JSON.stringify({msg:"successfully deleted"}));
})

app.get('/insert',(req,res)=>{
  res.render('show');
})
    

app.listen(port);







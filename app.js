const func=require('./functions') 
const express=require("express")
var morgan = require("morgan")
const app=  express();

const members=[
    {
        id:1,
        name:'Hachem'
    },
    {
        id:2,
        name:'Ahmed'
    },
    {
        id:3,
        name:'Dhafer'
    }
]
app.use(morgan("dev"));


//http://localhost:8080/Api/v1/members/1
app.get('/api/v1/members/:id',(req,res)=>{

    res.json(func.sucess(members[(req.params.id)-1]) );
});

//http://localhost:8080/Api/v1/members or //http://localhost:8080/Api/v1/members?max=:max
app.get('/api/v1/members',(req,res)=>{
    if(req.query.max!=undefined && req.query.max>0) {
        res.json(func.success(members.slice(0,req.query.max)) );
    }else if(req.query.max!=undefined){
        res.json(func.error('Wrong max value') );
    }else{
        res.json(func.success(members) );
    }
    
});


app.get('/api/v1/members/',(req,res)=>{

    res.json(func.success(members) );
});


app.listen(8080,()=>{
    console.log("Started on port 8080");
})





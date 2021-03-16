const {success,error}=require('./functions')   // c'eest la meme chose func=require('./functions') 
const bodyParse=require('body-parser') 
const express=require("express")
var morgan = require("morgan");
const bodyParser = require('body-parser');
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//http://localhost:8080/Api/v1/members/1
app.get('/api/v1/members/:id',(req,res)=>{
    let index=getIndex(req.params.id);
    if(typeof index =='string'){
        res.json(error(index))
    }else{
        res.json(sucess(members[index]) );
    }
    
});

//http://localhost:8080/Api/v1/members or //http://localhost:8080/Api/v1/members?max=:max
app.get('/api/v1/members',(req,res)=>{
    if(req.query.max!=undefined && req.query.max>0) {
        res.json(success(members.slice(0,req.query.max)) );
    }else if(req.query.max!=undefined){
        res.json(error('Wrong max value') );
    }else{
        res.json(success(members) );
    }
    
});


app.get('/api/v1/members/',(req,res)=>{

    res.json(success(members) );
});


app.post('/api/v1/members',(req,res)=>{
    let name_ok=true;
   if(req.body.name){
        for(let i=0;i<members.length;i++){
            if(members[i].name==req.body.name){
                name_ok=false;
                res.json(error('Name already taken'))
            }
        }     

        if(name_ok){
             let new_member={
                        name:req.body.name,
                        id:members.length+1
                    };
            members.push(new_member)
            res.json(success(new_member));
        }
      
   }else{
       res.json(console.error('Na name value!'))
   }
})


app.listen(8080,()=>{
    console.log("Started on port 8080");
})


function getIndex(id){
    for (let i = 0; i < members.length; i++) {
        const element = members[i];

        if(element.id==id){
            return i;
        }else{
            return 'Wrong Id';
        }
        
    }
}


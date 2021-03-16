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

let MembersRouter=express.Router();


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


MembersRouter.route('/:id')
    //http://localhost:8080/Api/v1/members/1
    .get((req,res)=>{
        let index=getIndex(req.params.id);
        if(typeof index =='string'){
            res.json(error(index))
        }else{
            res.json(success(members[index]) );
        }
        
    })

    .put((req,res)=>{
        let index=getIndex(req.params.id);
        if(typeof index =='string'){
            res.json(error(index))
        }else{
            let member=members[index];
            let same=false;
            for (let i = 0; i < members.length; i++) {
                const element = members[i];
                if(element.name==req.body.name && req.params.id!=element.id){
                    same=true;
                    break;
                }   
            }

            if(same){
                res.json(error('Name already exists'))
            }else{
                members[index].name=req.body.name;
                res.json(success(members[index]));
            }


            res.json(success(true) );
        }

    })



    .delete((req,res)=>{
        let index=getIndex(req.params.id);
        if(typeof index =='string'){
            res.json(error(index))
        }else{

            members.splice(index,1)
        }



    })


MembersRouter.route('/')

    //http://localhost:8080/Api/v1/members or //http://localhost:8080/Api/v1/members?max=:max
    .get((req,res)=>{
        if(req.query.max!=undefined && req.query.max>0) {
            res.json(success(members.slice(0,req.query.max)) );
        }else if(req.query.max!=undefined){
            res.json(error('Wrong max value') );
        }else{
            res.json(success(members) );
        }
        
    })


    .get((req,res)=>{

        res.json(success(members) );
    })


    .post((req,res)=>{
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
                            id:createID()
                        };
                members.push(new_member)
                res.json(success(new_member));
            }
        
    }else{
        res.json(console.error('Na name value!'))
    }
    })


app.use('/api/v1/members',MembersRouter);

app.listen(8080,()=>{
    console.log("Started on port 8080");
})


function getIndex(id){
    for (let i = 0; i < members.length; i++) {
        const element = members[i];

        if(element.id==id){
            return i;
        }

        
    }
    return 'Wrong Id';
}


function createID(){
    let lastMember=members[members.length-1].id+1;
    return lastMember;
}

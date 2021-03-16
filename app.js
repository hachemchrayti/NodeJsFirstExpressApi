const {success,error}=require('./functions')   // c'eest la meme chose func=require('./functions') 
const bodyParse=require('body-parser') 
const express=require("express")
var morgan = require("morgan");
const bodyParser = require('body-parser');
const config=require('./config.json')

const mysql=require('mysql')

const db=mysql.createConnection({
    host:'localhost',
    database:'nodejsapis',
    user:'root',
    password:'RealMadrid.13'
})


const app=  express();



let MembersRouter=express.Router();


db.connect((err)=>{

    if(err)
        console.log(err.message);
    else{

        console.log("Connected"); 
        app.use(morgan("dev"));
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}))


        MembersRouter.route('/:id')
            //http://localhost:8080/Api/v1/members/1
            .get((req,res)=>{

                db.query('SELECT * FROM members WHERE id= ?',[req.params.id],(err,result)=>{
                    if(err)
                         res.json(error(err.message)) 
                    else {
                        if(result[0]!=undefined){
                            res.json(success(result) )
                        }else{
                            res.json(error('ID does not exist')) 
                        }
                    }
                        
                    })
                
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

                    db.query('SELECT * FROM members LIMIT 0, ?',[req.query.max],(err,result)=>{
                        if(err)
                        res.json(error(err.message) ); 
                        else 
                        res.json(success(result));  
                    })


                    
                }else if(req.query.max!=undefined){
                    res.json(error('Wrong max value') );
                }else{
                    db.query('SELECT * FROM members',(err,result)=>{
                        if(err)
                        res.json(error(err.message) ); 
                        else 
                        res.json(success(result));  
                    })


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


        app.use(config.rootAPI+'members',MembersRouter);

        app.listen(config.port,()=>{
            console.log("Started on port 8080");
        })






    }
           

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

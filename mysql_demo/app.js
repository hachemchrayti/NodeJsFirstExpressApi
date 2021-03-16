const mysql=require('mysql')

const db=mysql.createConnection({
    host:'localhost',
    database:'nodejsapis',
    user:'root',
    password:'RealMadrid.13'
})


db.connect((err)=>{

    if(err)
        console.log(err.message);
    else{
        console.log("Connected"); 
        db.query('SELECT * FROM members',(err,result)=>{
            if(err)
                console.log(err.message);
            else 
                console.log(result);  
        })

    }
           

})


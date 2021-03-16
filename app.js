const express=require("express")
const app=  express();

app.use((req,res,next)=>{
    console.log('URL : '+req.url);
    next();
})



app.get('/api',(req,res)=>{
    res.send('Root API');

});


app.get('/api/v1',(req,res)=>{
    res.send('Root API v1');

});

//http://localhost:8080/Api/v1/books/1/hachem  => {"id":"1","name":"hachem"}
app.get('/api/v1/books/:id/:name',(req,res)=>{
    res.send(req.params);

});



app.listen(8080,()=>{
    console.log("Started on port 8080");
})






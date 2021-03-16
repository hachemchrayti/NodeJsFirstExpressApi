/******************************************************Async using Promises*************************************************/ 

// console.log("Début");
// let p= new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('All good')
//         reject(new Error('Error druing....'))
//     }, 1500);

// }).then((message)=>{
//     console.log(message);
// }).catch((err)=>{
//     console.log(err.message);
// })


// console.log("Fin");


/******************************************************Async using Callbacks*************************************************/ 


// console.log("Début");
// getMember((member)=>{
//     console.log(member);
//     getArticles(member,(articles)=>{
//         console.log(articles);
//     })
// })


// function getMember(next){
//     setTimeout(() => {
//         next('Member 1')
//     }, 1500);
// }


// function getArticles(member,next){
//     setTimeout(() => {
//         next([1,2,3])
//     }, 1500);
// }
// console.log('Fin');
/******************************************************Same code using using Promises (how to transfom Callbacks to Promises)*************************************************/ 


// console.log("Début");

// getMember()
//     .then((member)=>getArticles(member))
//     .then((articles)=>console.log(articles))
//     .catch((err)=>console.log(err.message))

// function getMember(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//                 console.log('Member 1');
//                 resolve('Member 1')
                
//             }, 1500);

//     })  
// }


// function getArticles(member){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log("okii");
//             resolve([1,2,3])
//         }, 1500);
//     })
// }

// console.log('Fin');


/******************************************************PARALLEL PROMISES*************************************************/

console.log("Début");

let p1=  new Promise((resolve,reject)=>{

    setTimeout(() => {
        resolve('Promise 1');
    }, 1500);
})

let p2=  new Promise((resolve,reject)=>{

    setTimeout(() => {
        resolve('Promise 2');
    }, 3000);
})


Promise.all([p1,p2])   //all permet d'attendre qu tous les promises finissent
        .then(result=>console.log(result))


Promise.race([p1,p2])   //race fait le retour dès que l'un des Promises finit
        .then(result=>console.log(result))

console.log('Fin');
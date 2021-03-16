/*
Using Promise
*/
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



/*
Using Callbacks
*/

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
//====> same code using Promises

console.log("Début");

getMember()
    .then((member)=>getArticles(member))
    .then((articles)=>console.log(articles))
    .catch((err)=>console.log(err.message))

function getMember(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
                console.log('Member 1');
                resolve('Member 1')
                
            }, 1500);

    })  
}


function getArticles(member){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("okii");
            resolve([1,2,3])
        }, 1500);
    })
}

console.log('Fin');

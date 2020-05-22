function a(){
    console.log('a')
}

function b(){
    console.log('b')
}


a()
b()
//a -> b

function a(){
    setTimeout(function(){
        console.log('a')
    },1000)
}

function b(){
    console.log('b')
}

a()
b()
//b->a



function a (cb){ //callback function
    setTimeout(function(){
        console.log('a')
        cb()
    },1000)
}

function b(){
    console.log('b')
}


a(function(){
    b()
})

//a->b
// callback 지옥 무한루프에 빠질수있음

function a (cb){ //callback function
    setTimeout(function(){
        console.log('a')
        cb()
    },1000)
}

function b (cb){ //callback function
    setTimeout(function(){
        console.log('b')
        cb()
    },1000)
}
function c (cb){ //callback function
    setTimeout(function(){
        console.log('c')
        cb()
    },1000)
}
function d (cb){ //callback function
    setTimeout(function(){
        console.log('d')
        cb()
    },1000)
}

//코랩ㄱ의 코랩ㄱ의 코랩ㄱ 콜백지옥으로 빠짐
a(function(){
    b(function (){
        c(function (){
            d()
        })
    })
})




// promise 객체

function a(){
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('a')
            resolve()
        },1000)
    })
}

function b(){
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('b')
            resolve()
        },1000)
    })
}

function c(){
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('c')
            resolve()
        },1000)
    })
}

function d(){
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('d')
            resolve()
        },1000)
    })
}
//a실행 이후 b 실행을 보장 해준다.
a().then(() => {
    return b()
}).then(() => {
    c()
}) .then(() => {
    d()
})

//위 코드 단순화

a()
    .then(() => b())
    .then(() => c())
    .then(() => d())

//a가 실해되는동안 아래는 기달려라 단, then 이란걸 붙일수 있는 함수에 es8 await 명령어
await a()
await b()
await c()
d()

// async 함수안에 await가 존재해야한다.
async function asyncFunc(){
    await a()
    await b()
    await c()
    await d()
    console.log('done')
}








// error 가 발생시 reject 실행가능
// 아래코드 다 무시되고 reject 실행됨
// catch 부분이 실행됨 -> 여기서 에러 메세지 또는 로직 실행
function a(){
    return new Promise((resolve, reject)=>{
        if(isError){
            reject('Error message!')  //reject() 안에 전달가능 즉 서버에서 넘어온 에러를 담아줄수있음
        }
        setTimeout(()=> {
            console.log('a')
            resolve('done')
        },1000)
    })
}

a()
    .then((res)=>{
        console.log(res)
    })
    .catch((error)=>{
        console.log(error)
        console.log('error')
    })
    .finally(()=>{
        //위에 모두 완료되면 무조건 실행되는 함수 실행
    })

//await 의 캐취 및 파이널리 적용법
async function asyncFunc(){
    try{
        const res = await a()
        console.log(res)
    }catch (e) {
        console.log(e)
        console.log('error')
    }finally {
        console.log('done')
    }
}

asyncFunc()
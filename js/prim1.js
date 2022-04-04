/*function CookPie(type, radius,slice){
    console.log('#CookePie',type, radius, slice );
};

function sendStatus(func){
    return function(...arg){
        console.log('#status:',...arg);
        return func(...arg);
    }
}

CookPie = sendStatus(CookPie);
CookPie('orange',15,false);
console.log(CookPie);
*/
function CookPie(type,radius,slice){
    console.log('#CodePie',type,radius,slice);
    console.log (`Пирог -${type} радиусом: ${radius} ${ slice?"режется":"не режется"}`)
}

function memoization(func) {
    return function(...args){
        const key = JSON.stringify(args);
        func.memory = func.memory || {};
        if (key in func.memory) {
            return func.memory[key];
        }
        return func.memory[key] = func(...args);        
    }
}

let mem = memoization(CookPie);
mem('apple',35,true);  
mem('lemon',5,false);
mem('apple',35,true);  
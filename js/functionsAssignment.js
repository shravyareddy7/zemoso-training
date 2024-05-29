//function passed as a parameter
function add(x,y)
{
    return x+y;
}
function sub(x,y)
{
    return x-y;
}
function mainfunc(subfunc,a,b)
{
    return subfunc(a,b);
}
console.log(mainfunc(add,1,2));
console.log(mainfunc(sub,9,2));


//arrow function to display first letters of two strings

const func=(first,second)=>{
    if(first.length>0 && second.length>0){
        return `${first[0]}${second[0]}`;
    }
    else{
        return "The length of the string should be more than 1";
    }
}

console.log(func("Rogers","Waters"));
console.log(func("","Waters"));
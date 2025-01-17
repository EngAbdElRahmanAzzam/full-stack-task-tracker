export const stringValidation = (str:string, min:number, max:number)=>{
    str = str.trim()
    if(str.length < min || str.length > max){
        return `The lenght must be between ${min} and ${max}`
    }
    else{
        return true
    }
}
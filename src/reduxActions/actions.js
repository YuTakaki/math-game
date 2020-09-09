export const randomQuestion = () =>{
    return{
        type : 'RANDOM_QUESTION',
    }
}
export const addScore = () =>{
    return{
        type : 'ADD_SCORE',
    }
}
export const reset = () =>{
    return{
        type : 'RESET',
    }
}
export const timer = () =>{
    return{
        type : 'TIMER',
    }
}
export const timerAdd = () =>{
    return{
        type : 'TIMER_ADD',
    }
}
export const timerSubtract = () =>{
    return{
        type : 'TIMER_SUBTRACT',
    }
}
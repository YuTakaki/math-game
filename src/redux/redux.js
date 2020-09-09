const initState = {
    score: 0,
    highestScore: 0,
    minutes: 1,
    seconds: '00',
    operation: '',
    number1: 0,
    number2: 0,
    answer: 0,
    choices: [],
    inplay: false,
};
function random(num){
    return Math.floor(Math.random() * num);
}
function random2(num){
    let randomNum = (Math.random() * num)
    return Number(randomNum.toFixed(2));
}
function randomizeChoices(ans){
    let x = random2(ans*5);
    let y = random2(ans*5);
    let z = random2(ans*5);
    let arr = [Number(ans), x, y, z];
    for(let i = 0; i < arr.length; i++){
        let index = Math.floor(random(arr.length));
        let temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
    console.log(arr)
    return arr;
}
const reducer = (state = initState, action) =>{
    switch(action.type){
        case 'RANDOM_QUESTION':
            const operations = ['+', '-', '/', '*'];
            let num1 = random2(100);
            let num2 = random2(num1);
            let o =  operations[random(operations.length)];
            let ans = '';
            if(o === '+'){
                ans = (num1) + (num2);
            }else if(o === '-'){
                ans = (num1) - (num2);
            }else if(o === '/'){
                ans = (num1) / (num2);
            }else if(o === '*'){
                ans = (num1) * (num2);
            }
            return{
                ...state,
                number1 : num1,
                number2 : num2,
                operation : o,
                answer: Number(ans.toFixed(2)),
                choices: randomizeChoices(ans.toFixed(2)),
                inplay: true,
            }
        case 'ADD_SCORE':
            let addedScore = state.score + 1;
            let highScore = state.highestScore < addedScore ? addedScore : state.highestScore;
            return {
                ...state,
                score: addedScore,
                highestScore: highScore
            }
        case 'RESET':
            return{
                ...state,
                score: 0,
                minutes: 1,
                seconds: '00',
                operation: '',
                number1: 0,
                number2: 0,
                answer: 0,
                choices: [],
                inplay: false,
            }
        case 'TIMER':
            let secs = Number(state.seconds);
            let minute = state.minutes;
            let game = true;
            if(secs === 0){
                secs = 59;
                minute -= 1;
            }else{
                secs -= 1;
            }
            if(secs <= 9 && secs >= 0){
                secs = '0' + secs;
            }
            if(minute <= -1 &&  secs === 59){
                secs = 0 + '0';
                minute = 0;
                game = false;
            }
            return{
                ...state,
                seconds: secs,
                minutes: minute,
                inplay: game
            }
        case 'TIMER_ADD':
            let add_secs = Number(state.seconds) + 5;
            let add_minute = state.minutes;
            if(add_secs > 60){
                add_secs -= 60;
                add_minute += 1;
            }
            if(add_secs <= 9 && add_secs >= 0){
                add_secs = '0' + add_secs;
            }
            return{
                ...state,
                seconds: add_secs,
                minutes: add_minute,
            }
        case 'TIMER_SUBTRACT':
            let sub_secs = Number(state.seconds) - 5;
            let sub_minute = state.minutes;
            let sub_game = true;
            if(sub_secs < 0){
                sub_secs = 60 + sub_secs;
                sub_minute -= 1;
            }
            if(sub_secs <= 9 && sub_secs >= 0){
                sub_secs = '0' + sub_secs;
            }
            if(sub_minute < 0){
                sub_secs = 0 + '0';
                sub_minute = 0;
                sub_game = false;
            }

            return{
                ...state,
                seconds: sub_secs,
                minutes: sub_minute,
                inplay: sub_game
            }
        default:
            return state
    }
}

export default reducer;
import React from 'react';

function ChoicesBtn({choices, checkAnswer, answer}){
    const clickEvent = (e) => {
        let val = e.target.innerText;
        if(Number(val) === answer){
            e.target.classList.add('correct');
        }else{
            e.target.classList.add('wrong');
        }
        console.log(e.target);
        setTimeout(() => {
            
            checkAnswer(val);
        }, 500);
    }

    return(
        <div className="choices">
            <ul>
                <li onClick = {clickEvent}>{choices[0]}</li>
                <li onClick = {clickEvent}>{choices[1]}</li>
                <li onClick = {clickEvent}>{choices[2]}</li>
                <li onClick = {clickEvent}>{choices[3]}</li>
            </ul>
        </div>
    )
}
export default ChoicesBtn

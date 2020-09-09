import React, {Suspense} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {randomQuestion, addScore, reset, timer, timerAdd, timerSubtract} from '../reduxActions/actions'

const Choices = React.lazy(()=> import('./choicesBtn'));

class Game extends React.Component{

    checkAnswer = (val) => {
        let btn = document.querySelectorAll('.choices li');
        btn.forEach(btn => btn.classList.remove('wrong'));
        btn.forEach(btn => btn.classList.remove('correct'));
  
        let userAns = val;
        const {answer} = this.props.state;
        if(Number(userAns) === answer){
            this.props.addScore();
            this.props.timerAdd();
        }else{
            this.props.timerSubtract();
            if(!this.props.state.inplay){
                clearInterval(this.timer);
            }
        }
        this.randomQuest();
    }
    componentDidMount(){
        this.randomQuest();
        this.timerReady();
    }
    componentDidUpdate(){
        if(!this.props.state.inplay){
            
            let gameover = document.querySelector('.gameover');
            let btn = document.querySelectorAll('.choices li');
            btn.forEach(btn => btn.classList.add('disable'));
            gameover.classList.add('gameisover')
            return clearInterval(this.timer);
        }
        return this.timer;
    }
    randomQuest(){
        return this.props.randomQuestion();
    }
    restart = () =>{
        let btn = document.querySelectorAll('.choices li');
        let gameover = document.querySelector('.gameover');
        btn.forEach(btn => btn.classList.remove('disable'));
        gameover.classList.remove('gameisover');
        this.props.reset();
        this.randomQuest();
    }
    timerReady(){
        this.timer = setInterval(() => {
            if(this.props.state.inplay){
                this.props.timer();
            }
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.props.reset();
    }
    render(){
        const {minutes, seconds, number1, number2, operation, choices, score, answer} = this.props.state;
        return(
            <Suspense fallback={<div>wait...</div>}>
                <div className='game'>
                    <h3>{minutes}:{seconds}</h3>
                    {score}
                    <div className='gameover'>
                        Game Over
                    </div>
                    <div className='question'>
                        <p>{number1} {operation} {number2} = ?</p>
                    </div>
                    <Choices choices={choices} checkAnswer={this.checkAnswer} answer={answer}/>
                    <div className='game-button'>
                        <button onClick={this.restart}>Restart</button>
                        <Link to='/'><button>Menu</button></Link>
                    </div>
                    
                </div>
                
            </Suspense>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        state: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        randomQuestion: () =>{
            dispatch(randomQuestion());
        },
        addScore: () => {
            dispatch(addScore());
        },
        reset: () => {
            dispatch(reset());
        },
        timer: () => {
            dispatch(timer());
        },
        timerAdd: () => {
            dispatch(timerAdd());
        },
        timerSubtract: () => {
            dispatch(timerSubtract())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
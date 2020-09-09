import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ScoreList extends React.Component{
    render(){
        const {highestScore} = this.props.state
        return(
            <div className='score'>
                <h2>High Score</h2>
                <p>{highestScore}</p>
                <Link to='/'><button>back</button></Link>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        state: state
    }
}
export default connect(mapStateToProps)(ScoreList);
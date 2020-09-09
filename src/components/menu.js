import React from 'react'
import {Link} from 'react-router-dom'
function Menu(){
    return(
        <div className='menu'>
            <Link to='/game'><button>Start</button></Link>
            <Link to='/scoreList'><button>Highest Score</button></Link>
        </div>
    )
}
export default Menu;
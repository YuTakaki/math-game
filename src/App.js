import React, {Suspense} from 'react';
import './styles/css/main.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const ScoreList = React.lazy(()=>import('./components/scoreList'));
const Game = React.lazy(()=>import('./components/game'))
const Menu = React.lazy(() => import('./components/menu'));
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      screen: null,
    }
  }
  render(){
    return (
      <Router>
        <div className="App">
          <h1>Math Game</h1>
          <Suspense fallback={<div>Wait...</div>}>
            <Route exact path='/' component={Menu}/>
            <Route path='/game' component={Game}/>
            <Route path='/scoreList' component={ScoreList}/>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;

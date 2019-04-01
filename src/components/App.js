import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';
import { Cities } from './Cities';


class App extends Component {
  
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div className="App">
        <TopBar />
        <Cities />
        <Main className="Main"/>
      </div>
    );
  }
}

export default App;

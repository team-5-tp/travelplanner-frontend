import React, { Component } from 'react';
import {TopBar} from './TopBar';
import {Main} from './Main';
import {Cities} from './Cities';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar /> 
        <Cities />
        <Main/>
      </div>
    );
  }
}

export default App;

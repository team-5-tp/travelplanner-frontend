import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import { Cities } from './Cities';
import Container from './Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Cities />
        <Container className="Container" />
        <Main />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { AppLayout } from './AppLayout';
import { TOKEN_KEY } from '../constants';


class App extends Component {
state = {
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
  //isPlaned: false
}
handleLogin = (token) => {
  this.setState ({ isLoggedIn: true});
  localStorage.setItem(TOKEN_KEY, token);
}
handleLogout = () => {
  this.setState ({ isLoggedIn: false});
  localStorage.removeItem(TOKEN_KEY);
}

  
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div className="App">
        <TopBar 
        isLoggedIn={this.state.isLoggedIn}
        handleLogout={this.handleLogout}
        />
        <AppLayout 
        isLoggedIn={this.state.isLoggedIn} 
        handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default App;


// APP ---> TopBar
//     ---> AppLayout
//             \-----> Login
//             \-----> Register
//             \-----> Main
//     ----> 
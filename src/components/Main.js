import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { Map } from './Map';
import { Switch, Route, Redirect } from 'react-router-dom';



export class Main extends Component {
  getHome = () => {
    return this.props.isLoggedIn ? 
    <Home/> : 
    <Redirect to="/login" />;
  }
 
  getLogin = () => {
    return this.props.isLoggedIn ? 
    <Redirect to="/home"/> : 
    <Login handleLogin={this.props.handleLogin} />;
  }

  render() {
    return (
      <div className='container'>

  
      <div className='main'>
          
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' render={this.getLogin} />
            <Route path='/home'  render={this.getHome} />
            <Route path='/map' render={ Map }  />
            <Route render={this.getLogin} />
          </Switch>
      </div>
      </div>
    );
  }
}

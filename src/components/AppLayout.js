import React, { Component } from "react";
import { Layout } from "antd";
import { Login } from "./Login";
import { Main } from "./Main";
import { Register } from "./Register";
import { Switch, Route, Redirect } from "react-router-dom";

const { Sider, Content } = Layout;

export class AppLayout extends Component {
  getLogin = () => {
    return this.props.isLoggedIn ? (
      <Redirect to="/main" />
    ) : (
      <Login handleLogin={this.handleLogin} />
    );
  };

  handleLogin = (token) => {
    this.props.handleLogin(token);
  }

  getMain = () => {
    return this.props.isLoggedIn ? (
      <Main className="main" />
    ) : (
      <Login handleLogin={this.handleLogin} />
    );
  };

  render() {
    return (
      <div>
        <Layout className="sider">
          <Content>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" render={this.getLogin} />
              <Route path="/main" render={this.getMain} />
              <Route render={this.getLogin} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

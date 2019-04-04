import React, { Component } from 'react'
import {
  Layout, Menu, Icon,
} from 'antd';
import { Main } from './Main';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';

const {
  Header, Footer, Sider, Content,
} = Layout;

export class AppLayout extends React.Component {

  render() {
    return (
      <div>
        <Layout className="layout">
          <Sider>
            Sider
          </Sider>
          <Content>
            Content</Content>
          
        </Layout>

        
      </div>
    );

  }

}

import React from 'react';
import {
    Menu, Dropdown, Icon, message,
  } from 'antd';
  
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  
  export class Cities extends React.Component{
    render(){
          return (
            <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
                Choose an Alpha City to visit :)<Icon type="down" />
            </a>
            </Dropdown>
           // mountNode
        );
    }
  }
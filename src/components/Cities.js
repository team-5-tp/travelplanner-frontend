import React from 'react';
import {
    Menu, Dropdown, Icon, message,
  } from 'antd';
  
  const onClick = ({ key }) => {
    message.info(`Chosen City: ${key}`);
  };
  
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="London">London</Menu.Item>
      <Menu.Item key="New York City">New York City</Menu.Item>
      <Menu.Item key="Hong Kong">Hong Kong</Menu.Item>
      <Menu.Item key="Singapore">Singapore</Menu.Item>
      <Menu.Item key="Sydney">Sydney</Menu.Item>
      <Menu.Item key="Paris">Paris</Menu.Item>
      <Menu.Item key="Beijing">Beijing</Menu.Item>
      <Menu.Item key="Shanghai"> Shanghai</Menu.Item>
      <Menu.Item key="Dubai"> Dubai</Menu.Item>
      <Menu.Item key="Tokyo"> Tokyo</Menu.Item>
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
import React from 'react';
import {
  Menu, Dropdown, Icon, message,
} from 'antd';


export class Cities extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      menu: 
        <Menu onClick={this.onClick}>
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
    });
  }
  
  onClick = ({ key }) => {
    message.info(`Chosen City: ${key}`);
    console.log("here: ", key);
    this.props.onCity(key);
    this.props.onShow();
  };
  
  render() {
    return (
      <Dropdown overlay={this.state.menu}>
        <a className="ant-dropdown-link" href="#">
          Choose an Alpha City to visit :)<Icon type="down" />
        </a>
      </Dropdown>
      // mountNode
    );
  }
}
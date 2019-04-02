import React from "react";
import { Select } from "antd";

const Option = Select.Option;

export class SelectCity extends React.Component {
  handleChange = value => {
    console.log(`selected ${value}`);
    this.props.onCity(value);
    this.props.onShow();
  };

  handleBlur = () => {
    console.log("blur");
  };

  handleFocus = () => {
    console.log("focus");
  };

  render() {
    return (
      <Select
        showSearch
        style={{ width: 200 , height: 0}}
        placeholder="Select an Alpha City"
        optionFilterProp="children"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="London">London</Option>
        <Option value="New York City">New York City</Option>
        <Option value="Hong Kong">Hong Kong</Option>
        <Option value="Singapore">Singapore</Option>
        <Option value="Sydney">Sydney</Option>
        <Option value="Paris">Paris</Option>
        <Option value="Beijing">Beijing</Option>
        <Option value="Shanghai">Shanghai</Option>
        <Option value="Dubai">Dubai</Option>
        <Option value="Tokyo">Tokyo</Option>
      </Select>
    );
  }
}

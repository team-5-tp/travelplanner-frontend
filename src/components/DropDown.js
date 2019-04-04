import React from "react";
import { Select } from "antd";

const cities = [
  "London",
  "New York City",
  "Hong Kong",
  "Singapore",
  "Sydney",
  "Paris",
  "Beijing",
  "Shanghai",
  "Dubai",
  "Tokyo"
];

const sections = [
  "food",
  "drinks",
  "coffee",
  "shops",
  "arts",
  "outdoors",
  "sights",
  "trending",
  "topPicks"
];

const Option = Select.Option;
export class DropDown extends React.Component {
    state = {
        disabled: true,
    };

  handleCitySelect = (key) => {
    console.log(key);
    this.setState({
      disabled: false,
    });
    this.props.onCity(key);
    this.props.onShow();
  };

  onSectionChange = (key) => {
      this.props.onSection(key);
  };

  render() {
    return (
      <div>
        <Select
          placeholder="Cities"
          style={{ width: 120 }}
          onChange={this.handleCitySelect}
        >
          {cities.map(city => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
        <Select
          placeholder="Sections"
          style={{ width: 120 }}
          value={this.state.sections}
          onChange={this.onSectionChange}
        >
          {sections.map(section => (
            <Option disabled={this.state.disabled} key={section}>{section}</Option>
          ))}
        </Select>
      </div>
    );
  }
}

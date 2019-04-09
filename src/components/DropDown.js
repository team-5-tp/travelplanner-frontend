import React from "react";
import {
  Select,
  message,
} from "antd";
import reqwest from "reqwest";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
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
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  state = {
    disabled: true
  };

  handleCitySelect = key => {
    console.log("Selected City in DropDown.js: ", key);
    this.setState({
      disabled: false
    });
    this.props.onCity(key);
    this.props.onShow();
  };

  onSectionChange = key => {
    this.props.onSection(key);
  };

  render() {
    return (
      <div>
        <Select
          placeholder="Cities"
          style={{ width: 110 }}
          onChange={this.handleCitySelect}
        >
          {cities.map(city => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
        <Select
          placeholder="Sections"
          style={{ width: 110 }}
          value={this.state.sections}
          onChange={this.onSectionChange}
        >
          {sections.map(section => (
            <Option disabled={this.state.disabled} key={section}>
              {section}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

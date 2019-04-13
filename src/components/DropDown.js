import React from "react";
import { Select, message } from "antd";
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
    hasMore: true,
    cityDisable: false,
    disabled: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

   componentDidUpdate(prevProps){
     console.log("$$$$$$$$$$$$   ", this.props.cityName)
     if(this.props.planId !== undefined && this.props.planId !== prevProps.planId){
      console.log("pass to here if a new plan") 
      this.setState({
         cityDisable: this.props.cityName !== "Please choose a city" ? true : false
         
       }, console.log("cityDisable is change to $$$$$$$$$$$$: ", this.state.cityDisable))
     }
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


  handleCitySelect = key => {
    console.log("Selected City in DropDown.js: ", key);
    this.setState({
      disabled: false
    });
    this.props.onCity(key);
    this.props.onShow();
  };

  handleSectionSelect = key => {
    this.props.onSection(key);
  };

  render() {
    return (
      <div>
        <Select className='select1'
                placeholder="Cities"
                onChange={this.handleCitySelect}
        >
          {cities.map(city => (
            <Option key={city} disabled={this.state.cityDisable}>{city} 
            </Option>
          ))}
        </Select>
        <Select className='select2'
          placeholder="Sections"
          // value={this.state.sections}
          onChange={this.handleSectionSelect}
        >
          {sections.map(section => (
            <Option  key={section} disabled={this.state.disabled}>
              {section}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

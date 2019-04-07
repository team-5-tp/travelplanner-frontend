import React from "react";
import { Select,Button,Icon,List, Avatar,Menu,Spin,message,Carousel,Input } from "antd";
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const plan1 = 'USC-UCLA-CMU-NYU-NEU-BU-UCD-UCI-UCSD';
//const plan2 = 'USC-vdsvfdsvdfsbvdsbI-UCSD';
const plans = [plan1];
const listItems = plans.map((plans) =>
  <li>{plans}</li>
);
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
  }

  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }


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

//palnClick() {
  // this.setState(prevState => ({ done: !prevState.done }));
 //}

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button
          onClick={this.plusplan}
          style={{ width: 130 }}
          >
          Create a plan<Icon type="plus" />
          </Button>
        </ButtonGroup>
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
            <Option disabled={this.state.disabled} key={section}>{section}</Option>
          ))}
        </Select>


            <div className="demo-infinite-container">
                    <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      loadMore={this.handleInfiniteOnLoad}
                      hasMore={!this.state.loading && this.state.hasMore}
                      useWindow={false}
                    >
                      <List
                        dataSource={this.state.data}
                        renderItem={item => (
                          <List.Item key={item.id}>
                            <List.Item.Meta
                              title={<Input
                              style={{ width: 100 }}
                              placeholder="Plan name" />}
                              description={listItems}
                            />
                            <Button
                            style={{ width: 70 }}
                            >Delete</Button>
                          </List.Item>
                        )}
                      >
                        {this.state.loading && this.state.hasMore && (
                          <div className="demo-loading-container">
                            <Spin />
                          </div>
                        )}
                      </List>
                    </InfiniteScroll>
                  </div>
      </div>
    );
  }
}

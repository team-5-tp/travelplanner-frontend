import React from "react";
import {
  Select,
  Button,
  Icon,
  List,
  Avatar,
  Menu,
  Spin,
  message,
  Carousel,
  Input
} from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const plan1 = "USC-UCLA-CMU-NYU-NEU-BU-UCD-UCI-UCSD";
const plans = [plan1];
const listItems = plans.map(plans => <li>{plans}</li>);

export class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  state = {
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
      url: "",
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let data = this.props.places;
    this.setState({
      loading: false
    });
    // if (data.length > 44) {
    //   message.warning('Infinite List loaded all');
    //   this.setState({
    //     hasMore: false,
    //     loading: false,
    //   });
    //   return;
    // }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  handleAdd = name => {
    this.props.onHandleAdd(name);
  };

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.plusplan} style={{ width: 130 }}>
            Create a plan
            <Icon type="plus" />
          </Button>
        </ButtonGroup>

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
                    title={
                      <Input style={{ width: 100 }} placeholder="Plan name" />
                    }
                    description={listItems}
                  />
                  <Button style={{ width: 70 }}>Delete</Button>
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

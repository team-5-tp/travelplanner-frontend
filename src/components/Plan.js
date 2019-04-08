import React from "react";
import {
  Button,
  List,
  Menu,
  Spin,
} from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
import { CreatePlan } from "./CreatePlan";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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

  // handleAdd = name => {
  //   this.props.onHandleAdd(name);
  // };

  handleAddPlan = name => {
    this.setState({
      list: [...this.state.list, name]
    }, () => {console.log("after: ", this.state.list);});
    this.props.onHandleShowMap(name);
  }

  render() {
    return (
      <div>
        <CreatePlan onPlanCreated={this.handleAddPlan.bind(this)}/>
        <div className="demo-infinite-container-plan">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.list}
              renderItem={item => (
                <List.Item key={item}>
                  <List.Item.Meta
                    title={item}
                    description={"temp"}
                  />
                  <Button style={{ width: 70 }}>Delete</Button>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container-plan">
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

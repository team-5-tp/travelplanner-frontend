import React from "react";
import { Button, List, Spin, message } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { CreatePlan } from "./CreatePlan";
import { API_ROOT, TOKEN_KEY, AUTH_HEADER } from "../constants";

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
    this.loadPlans();
  }

  loadPlans = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`${API_ROOT}/plan`, {
      method: 'GET',
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`,
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log("zk:loadPlans");
        // console.log(data)
        //   this.setState({
        //    list: data ? data : []
        // }, () => {console.log("done with fetching plans")});
      })
      .catch((err) => {
        message.error("Failed to create the plan.");
      });
  }
  handleInfiniteOnLoad = () => {
    let data = this.props.places;
    this.setState({
      loading: false
    });
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  handleAddPlan = (name) => {
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`${API_ROOT}/plan`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        city: name
      }),
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(() => {
        message.success("Plan created successfully!");
      })
      .catch((err) => {
        message.error("Failed to create the plan.");
      });
    this.setState(
      {
        list: [...this.state.list, name]
      },
      () => {
        console.log("after: ", this.state.list);
      }
    );
    this.props.onHandleShowMap(name);
  };

  render() {
    return (
      <div className="plan">
        <CreatePlan onPlanCreated={this.handleAddPlan.bind(this)} />
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
                  <List.Item.Meta title={item} />
                  <Button style={{ width: 70 }}>Select</Button>
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

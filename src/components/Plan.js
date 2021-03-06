import React from "react";
import { Icon, List, Spin, message } from "antd";
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
    this.setState({
      whatever: 1
    }, () =>  {this.loadPlans()})
  }

  componentDidUpdate(prevProps) {
    console.log("@@@@@@@@@@@@@@@ this.props: ", this.props.reRenderPlan)
    console.log("@@@@@@@@@@@@@@@ prev.props: ", prevProps.reRenderPlan)
    if (this.props.reRenderPlan !== 0 && this.props.reRenderPlan > prevProps.reRenderPlan) {
      this.loadPlans();
    }
  }

  loadPlans = () => {
    console.log("()()()())())()()(: ");
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("()()()())())()()(: ", token);
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
        this.setState({
          list: data ? data : []
        }, () => {
          console.log(this.state.list);
        });
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
  };

  handleAddPlan = (name) => {
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`${API_ROOT}/plan`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        city: "Please choose a city"
      }),
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {

          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log("handleAddPlan then");
        console.log(data);
        this.props.onReturnPlanId(data.id);
        this.props.onReturnPlanName(data.name);
        this.props.onInitPage();
        this.setState({
          list: [data, ...this.state.list]
        })
        message.success("Plan created successfully!");
      })
      .catch((err) => {
        message.error("Failed to create the plan.");
      });
  };

  handleDeletePlan = (id) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(`${API_ROOT}/plan?id=${id}`)
    fetch(`${API_ROOT}/plan?id=${id}`, {
      method: 'DELETE',
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
        var arr = this.state.list;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id === id)
            break;
        }
        arr.splice(i, 1);
        this.setState(
          {
            list: arr
          }
        );
        message.success("Plan deleted successfully!");
      })
      .catch((err) => {
        message.error("Failed to delete the plan.");
      });
  };

  handleSelectPlan = (planId, cityName, planName) => {
    this.props.onPlanSelected(planId, cityName, planName);
  }

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
                <List.Item key={item.id}>
                  <List.Item.Meta
                    className='pointer'
                    onClick={() => this.handleSelectPlan(item.id, item.city, item.name)}
                    title={item.name}
                    description={item.city}
                  />
                  <Icon
                    theme="filled"
                    type="close-circle"
                    className="button-delete-poi"
                    onClick={this.handleDeletePlan.bind(this, item.id)}
                  />
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
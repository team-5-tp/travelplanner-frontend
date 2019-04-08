import React from "react";

import { List, message, Avatar, Spin, Button } from "antd";
import reqwest from "reqwest";

import InfiniteScroll from "react-infinite-scroller";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export class POI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      hasMore: true
    };
  }

  /*
    Method for add functionality 
  */
  handleAddClick(item) {
    this.setState({
      data: [...this.state.data, item]
    });
  }

  /*
    Method for Delete functinality
  */
  handleDeleteClick(index) {
    this.props.onDelete(index);
  }

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

  render() {
    return (
      <div className="demo-infinite-container2">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List>
            {this.props.data === undefined
              ? null
              : this.props.data.map((item, index) => {
                  return (
                    <List.Item key={index}>
                      {item}
                      {
                        <Button
                          onClick={this.handleDeleteClick.bind(this, index)}
                        >
                          Delete
                        </Button>
                      }
                    </List.Item>
                  );
                })}
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container2">
                <Spin />
              </div>
            )}
            {/* {this.props.data.map((item, index) => {
              return (
                <List.Item key={index}>
                  {item}
                  {
                    <Button onClick={this.handleDeleteClick.bind(this, index)}>
                      Delete
                    </Button>
                  }
                </List.Item>
              );
            })}
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container2">
                <Spin />
              </div>
            )} */}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

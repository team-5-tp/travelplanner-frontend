import React from "react";

import { List, message, Spin, Button } from "antd";
import reqwest from "reqwest";

import InfiniteScroll from "react-infinite-scroller";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export class POI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      loading: false,
      hasMore: true
    };
  }

  /*
    Method for Delete functinality
  */
  handleDeleteClick(index) {
    this.props.onDelete(index);
  }

    componentDidMount() {
      // this.fetchData(res => {
        this.setState({
          data: this.props.data
        });
      // });
    }

  handleInfiniteOnLoad = () => {
    let data = this.props.data;
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
  }

  render() {
    console.log("planName", this.props.planName);
    return (
      <div className="demo-infinite-container-poi">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List>
            {console.log("this.props.data: ", this.props.data)}
              {this.props.data === undefined
              ? null
              : this.props.data.map((item, index) => {
                  return (
                    <List.Item key={index}>
                      {item.venue.name}
                      {
                        <Button className="button-delete-poi"
                          onClick={this.handleDeleteClick.bind(this, index)}
                        >
                          Delete
                        </Button>
                      }
                    </List.Item>
                  );
                })}
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container-poi">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

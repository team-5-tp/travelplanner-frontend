import React from "react";
import { List, Spin, Button } from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";

export class Rec extends React.Component {
  /**
   * Generate a list for add/delete
   */
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
      <div className="demo-infinite-container-rec">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.props.places}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.venue.name}
                  description={item.venue.categories[0].name}
                />
                <Button onClick={this.handleAdd.bind(this, item.venue.name)}>
                  Add
                </Button>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container-rec">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

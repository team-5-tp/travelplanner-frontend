import React from "react";
import { List, Avatar } from "antd";


export class RecommendedVenues extends React.Component {

  render() {
    return (
      (
        <List
          itemLayout="horizontal"
          dataSource={this.props.recommendedInit}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.venue.name}
                description={item.venue.categories[0].name}
              />
            </List.Item>
          )}
        />
      )
    );
  }
}

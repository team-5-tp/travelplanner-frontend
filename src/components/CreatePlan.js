import React from "react";
import { Input } from "antd";

const Search = Input.Search;

export class CreatePlan extends React.Component {
  render() {
    return (
        <div>
          <Search
            placeholder="Create a New Plan"
            enterButton="Create"
            size="large"
            onSearch={value => this.props.onPlanCreated(value)}
          />
        </div>
    );
  }
}

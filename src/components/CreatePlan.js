import React from "react";
import { Input } from "antd";

const Search = Input.Search;

export class CreatePlan extends React.Component {
  state = {
    disabled: true
  }

  handleChange = () => {
    this.setState({
      disabled: false
    })
  }
  render() {
    return (
      <div>
        <Search
          defaultValue='New Plan'
          placeholder="Create a New Plan"
          enterButton="Create" 
          // disabled={this.state.disabled}
          size="large"
          onSearch={value => this.props.onPlanCreated(value)}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import { Rec } from "./Rec";
import { POI } from "./POI";

export class RecNPOI extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd = name => {
    this.props.onHandleAdd(name);
  };

  handleDelete = index => {
    this.props.onHandleDelete(index);
  };

  handlePOIMoveTop = (index) => {
    this.props.onPOIMoveTop(index);
  }

  handlePOIMoveBottom = (index) => {
    this.props.onPOIMoveBottom(index);
  }
  
  render() {
    return (
      <div>
        <Rec
          city={this.props.chosenCityName}
          places={this.props.places}
          onHandleAdd={this.handleAdd}
        />
        <POI
          data={this.props.POIs}
          onDelete={this.handleDelete}
          planName={this.props.planName}
          onPOIMoveTop={this.handlePOIMoveTop.bind(this)}
          onPOIMoveBottom={this.handlePOIMoveBottom.bind(this)}
        />
      </div>
    );
  }
}

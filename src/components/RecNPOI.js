import React, { Component } from "react";
import { Rec } from "./Rec";
import { POI } from "./POI";
import { Button, message } from "antd";
import { API_ROOT, TOKEN_KEY, AUTH_HEADER } from "../constants";

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

  handleSavePOIs = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    // console.log("#####################");
    // console.log("handleSavePOIs: ", this.props.planId);
    // console.log("#####################");
    const planId = this.props.planId;

    fetch(`${API_ROOT}/poi`, {
      method: 'DELETE',
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`,
        contentType: "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        plan_id: planId
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("#####################");
          console.log("handleSavePOIs: ", planId);
          console.log("#####################");
          message.success("Plan successfully cleared!");
          return response;
        }
        throw new Error(response.statusText);
      })
      // .then(() => {
      //   console.log("The second POI then");
      // })
      .catch((err) => {
        message.error("Failed to delete the POI.");
      });

    this.props.POIs.map(
      (POI, index) => {
        fetch(`${API_ROOT}/poi`, {
          method: 'POST',
          body: JSON.stringify({
            name: POI.venue.name,
            venue_id: POI.venue.id,
            visiting_order: index + 1,
            plan_id: this.props.planId
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
            console.log("then(data)", data);
            message.success("POI created successfully!");
          })
          .catch((err) => {
            message.error("Failed to populate the plan.");
          });
      });
    console.log("RecNPOI");
    console.log(this.props.POIs);
  }

  render() {
    return (
      <div className='POIcontainer'>
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
         <Button type="primary" onClick={this.handleSavePOIs}>
          Save Plan
        </Button>
      </div>
    );
  }
}
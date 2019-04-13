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
    const planId = this.props.planId;

    // Delete the current pois of this plan
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
          message.success("Plan successfully cleared!");
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(() => {
        console.log("The second POI then");
      })
      .catch((err) => {
        message.error("Failed to delete the POI.");
      })
      .then(() => {
        // Add all current pois to the plan
        this.props.POIs.map(
          (POI, index) => {
            console.log("Before fetch ===============> ", POI);
            fetch(`${API_ROOT}/poi`, {
              method: 'POST',
              body: JSON.stringify({
                name: POI.name,
                venue_id: POI.venue_id,
                visiting_order: index + 1,
                plan_id: planId
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
                message.success("POI created successfully!");
              })
              .catch((err) => {
                message.error("Failed to populate the plan.");
              })
          })
      })
      .then(() => {
        // Add all current pois to the plan
        fetch(`${API_ROOT}/plan`, {
          method: 'PUT',
          body: JSON.stringify({
            id: planId,
            name: this.props.planName,
            city: this.props.cityName,
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
            this.props.onReRenderPlan();
            message.success("Plan updated successfully!");
          })
          .catch((err) => {
            message.error("Failed to update the plan.");
          })
      })
  }

  render() {
    return (
      <div className='POIcontainer'>
        <Rec
          city={this.props.cityName}
          places={this.props.places}
          onHandleAdd={this.handleAdd}
        />
        <Button type="primary" onClick={this.handleSavePOIs}>
          Save Plan
        </Button>
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
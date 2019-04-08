import React, { Component } from 'react';
import { Rec } from './Rec';
import { POI } from './POI';
import axios from "axios";

export class RecNPOI extends React.Component{
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            POIs: [],
        }

    }

    handleAdd = (name) => {
        
        console.log("name:", name);
        this.setState({
            POIs: [...this.state.POIs, name]
          });
    }

    // handleAdd = (toAdd) => {
    //     console.log("section now: ", this.state.section);
    //     const endPoint = "GET https://api.foursquare.com/v2/venues/" + toAdd;
    //     // const parameters = {
    //     //   client_id: "CTSQGNHXWZYRLBY3FNJBIDAJFZIRYBHB1T5TWCD5GPDKJDAX",
    //     //   client_secret: "PBR2A350JUGUPZABPF5U011IQ3MBXX3Q1VUZHTQGGIOKSUUJ",
    //     //   name: toAdd,
    //     //   v: "20180323"
    //     // };
    
    //     axios
    //       .get(endPoint + new URLSearchParams(parameters))
    //       .then(response => {
    //         this.setState(
    //           {
    //             POIs: [...this.state.POIs, response.data.response.groups[0].items.response.venue]
    //           },
    //           () => {console.log("first place now: ", this.state.POIs)}
    //         );
    //       })
    //       .catch(error => {
    //         console.log("ERROR!! " + error);
    //       });
    //   };

    handleDelete = (index) => {
        const data = [...this.state.POIs];
        data.splice(index, 1);
        this.setState({
          POIs: data
        });
    }

    

    render(){
        return(
            <div>
                <Rec city={this.props.chosenCityName} places={this.props.places} onHandleAdd={this.handleAdd}/>
                <POI data={this.state.POIs} onDelete={this.handleDelete}/>
            </div>
        );
    }
}
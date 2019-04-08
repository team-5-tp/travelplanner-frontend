import React, { Component } from 'react';
import { Rec } from './Rec';
import { POI } from './POI';
import axios from "axios";

export class RecNPOI extends React.Component{
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleAdd = (name) => {
        this.props.onHandleAdd(name);
        // this.setState({
        //     POIs: [...this.state.POIs, name]
        //   });
    }

    handleDelete = (index) => {
        this.props.onHandleDelete(index);
    }
    

    render(){
        return(
            <div>
                <Rec city={this.props.chosenCityName} places={this.props.places} onHandleAdd={this.handleAdd}/>
                <POI data={this.props.POIs} onDelete={this.handleDelete} planName={this.props.planName}/>
            </div>
        );
    }
}
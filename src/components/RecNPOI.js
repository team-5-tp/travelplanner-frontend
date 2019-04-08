import React, { Component } from 'react';
import { Rec } from './Rec';
import { POI } from './POI';

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
        this.setState({
            POIs: [...this.state.POIs, name]
          });
    }

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
import React from "react";
import Map from "./Map";
import { Rec } from "./Rec";
import {SelectCity} from './SelectCity';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleCity = this.handleCity.bind(this);
    this.handleCityZoom = this.handleCityZoom.bind(this);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.state = {
      places: [],
      showMap: false,
      cityChange: 0,
    };
  }

  handleCity = (cityName) => {
    this.setState ({
      chosenCityName: cityName,
      cityChange: !this.state.cityChange,
        }, () => {console.log("here cityName passed in: ", cityName);
        console.log("here cityName in state : ", this.state.chosenCityName);
    });
  };

  handleMap = () => {
      this.setState({
          showMap: true
      });
  }

  handleCityZoom = (city) => {
    this.setState(city => ({
      chosenCity: city
    }, () => {console.log("here city passed in: ", city);
        console.log("here city in state: ", this.state.chosenCity);
    }));
  };


  handlePlaces= (venues) => {
      console.log("the venues that is passed in from map.js: ", venues);
    this.setState({
      places: venues
        }, () => { console.log("here: ", this.state.places);
    });
  };
  render() {
      console.log("this state before: ", this.state);
    return (
        <div>
            <div>
            <SelectCity onCity={this.handleCity} onShow={this.handleMap}/>
        </div>
      <div className="main">
        <Rec city={this.state.chosenCityName} places={this.state.places}/>
        <Map show={this.state.showMap} city={this.state.chosenCityName} cityChange={this.state.cityChange}
            onCityZoom={this.handleCityZoom} onPlaces={this.handlePlaces}/>
      </div>
        </div>
    );
  }
}


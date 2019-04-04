import React from "react";
import Map from "./Map";
import { Rec } from "./Rec";
import { DropDown } from "./DropDown";
import axios from "axios";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleCity = this.handleCity.bind(this);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.changeVenues = this.changeVenues.bind(this);
    this.state = {
      places: [],
      showMap: false,
      cityChange: 0
    };
  }

  handleCity = cityName => {
    this.setState({
      chosenCityName: cityName,
      cityChange: !this.state.cityChange
      // }, () => {console.log("here cityName passed in: ", cityName);
      // console.log("here cityName in state : ", this.state.chosenCityName);
    });
  };

  handleMap = () => {
    this.setState({
      showMap: true
    });
  };

  handlePlaces = venues => {
    //   console.log("the venues that is passed in from map.js: ", venues);
    this.setState(
      {
        places: venues
      },
      () => {
        console.log("here: ", this.state.places);
      }
    );
  };

  handleSection = key => {
    this.setState({
      section: key
    }, () => {this.changeVenues();}
    );
  };


  changeVenues = () => {
    console.log("section now: ", this.state.section);
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "CTSQGNHXWZYRLBY3FNJBIDAJFZIRYBHB1T5TWCD5GPDKJDAX",
      client_secret: "PBR2A350JUGUPZABPF5U011IQ3MBXX3Q1VUZHTQGGIOKSUUJ",
      section: this.state.section,
      near: this.state.chosenCityName,
      v: "20180323"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            places: response.data.response.groups[0].items
          },
          () => {console.log("first place now: ", this.state.places[0])}
        );
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  render() {
    //   console.log("this state before: ", this.state);
    return (
      <div className="main">
        <div>
          <Map
            show={this.state.showMap}
            city={this.state.chosenCityName}
            cityChange={this.state.cityChange}
            onPlaces={this.handlePlaces}
            section={this.state.section}
          />
        </div>
        <div>
          <DropDown onCity={this.handleCity} onShow={this.handleMap} onSection={this.handleSection}/>
          <Rec city={this.state.chosenCityName} places={this.state.places} />
        </div>
      </div>
    );
  }
}

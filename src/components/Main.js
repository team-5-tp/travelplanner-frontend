import React from "react";
import Map from "./Map";
import { DropDown } from "./DropDown";
import axios from "axios";
import { RecNPOI } from "./RecNPOI";
import { Plan } from "./Plan";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleCity = this.handleCity.bind(this);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.changeVenues = this.changeVenues.bind(this);
    this.state = {
      places: [],
      POIs: [],
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
    this.setState(
      {
        section: key
      },
      () => {
        this.changeVenues();
      }
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
          () => {
            console.log("first place now: ", this.state.places[0]);
          }
        );
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  handleAdd = (name) => {
    this.state.places.map( (place) => {
        if(place.venue.name === name){
          this.setState({
            POIs: [...this.state.POIs, place]
          }, () => {console.log("POIs now: ", this.state.POIs)});
        }
      }
    );
  }

  render() {
    //   console.log("this state before: ", this.state);
    return (
      <div className="main">
        <Plan />
        <Map
          show={this.state.showMap}
          city={this.state.chosenCityName}
          cityChange={this.state.cityChange}
          onPlaces={this.handlePlaces}
          section={this.state.section}
          POIs={this.state.POIs}
        />
        <div className="dropdown-and-recnpoi">
          <DropDown
            onCity={this.handleCity}
            onShow={this.handleMap}
            onSection={this.handleSection}
          />
          <RecNPOI
            city={this.state.chosenCityName}
            places={this.state.places}
            onHandleAdd={this.handleAdd}
          />
        </div>
      </div>
    );
  }
}

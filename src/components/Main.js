import React from "react";
import Map from "./Map";
import { DropDown } from "./DropDown";
import axios from "axios";
import { RecNPOI } from "./RecNPOI";
import { Plan } from "./Plan";
import { Switch, message } from "antd";
import { API_ROOT, TOKEN_KEY, AUTH_HEADER } from '../constants'

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
      cityChange: 0,
      TravelMode: "DRIVING",
      jump: true,
      currentPlanName: undefined,
      currentPlanId: undefined,
      chosenCityName: undefined
    };
  }

  // componentDidUpdate(prevState) {
  // if (this.state.currentPlanId !== undefined &&
  //     this.state.currentPlanId !== prevState.currentPlanId) {
  //   this.fetchPOIs();
  // }
  // }

  fetchPOIs = () => {
    const token = localStorage.getItem(TOKEN_KEY);

    fetch(`${API_ROOT}/poi?plan_id=${this.state.currentPlanId}`, {
      method: 'GET',
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`,
        // contentType: "application/json; charset=utf-8",
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        this.setState({
          cityChange: this.state.cityChange ? this.state.cityChange : !this.state.chosenChange,
          POIs: data,
          showMap: true,
        }, () => {
          console.log(".then() ========> ", data);
        });
      })
      .catch((err) => {
        message.error("Failed to load POIs.");
      })
  }

  handleCity = cityName => {
    this.setState({
      chosenCityName: cityName,
      cityChange: !this.state.cityChange
    });
  };

  handleMap = () => {
    this.setState({
      showMap: true
    });
  };

  handlePlaces = venues => {
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

  handleAdd = name => {
    // const temp = [];
    var temp = undefined;
    var found = this.state.places.filter(place => {
      return place.venue.name === name;
    });
    found.map((place) => {
      // temp.push(place.venue);
      temp = place.venue;
    })
    console.log("Main handleAdd: ===========> ", temp);
    console.log("before add one: this.state.POIs: ", this.state.POIs);
    this.setState(
      {
        POIs: [...this.state.POIs, temp]
        // POIs: [...this.state.POIs, found[0]]
      },
      () => {
        console.log("after add one: this.state.POIs: ", this.state.POIs);
      }
    );
  };

  handleDelete = index => {
    const data = [...this.state.POIs];
    data.splice(index, 1);
    this.setState(
      {
        POIs: data
      },
      () => {
        console.log("done with poi changes: ", this.state.POIs);
      }
    );
  };

  handlePOIMoveTop = index => {
    var data = [...this.state.POIs];
    const toMove = data[index];
    data.splice(index, 1);
    data = [toMove, ...data];
    this.setState({
      POIs: data,
    }, () => { console.log("after move top, the POIs now: ", this.state.POIs); });
  }

  handlePOIMoveBottom = index => {
    var data = [...this.state.POIs];
    const toMove = data[index];
    data.splice(index, 1);
    data = [...data, toMove];
    this.setState({
      POIs: data,
    }, () => { console.log("after move bottom, the POIs now: ", this.state.POIs); });
  }


  handleShowMap = name => {
    this.setState(
      {
        POIs: [],
        planName: name
      },
      () => {
        console.log("done with creating new map");
      }
    );
  };

  handleTravelModeChange = (e) => {
    this.setState({
      TravelMode: e ? "DRIVING" : "WALKING"
    }, () => { console.log("travel mode in main.js: ", this.state.TravelMode); });
  }

  handleAnimationChange = (e) => {
    this.setState({
      jump: e ? true : false,
    }, () => { console.log("jumping animation changed") });
  }

  handleReturnPlanId = (id) => {
    this.setState({ currentPlanId: id }, () => { console.log("handleReturnPlanId", this.state.currentPlanId) });
  }

  handleReturnPlanName = (name) => {
    this.setState({ currentPlanName: name }, () => { console.log("handleReturnPlanName", this.state.currentPlanName) });
  }

  handleSelectPlan = (planId, cityName, planName) => {
    this.setState({
      currentPlanId: planId,
      chosenCityName: cityName,
      currentPlanName: planName
    }, () => {
      this.fetchPOIs();
    });
  }

  render() {
    return (
      <div className="main">
        <Plan
          onHandleShowMap={this.handleShowMap}
          onReturnPlanName={this.handleReturnPlanName}
          onReturnPlanId={this.handleReturnPlanId}
          onPlanSelected={this.handleSelectPlan}
        />
        <div>
          <Switch className="switch"
            className="travelmode"
            checkedChildren="DRIVING"
            unCheckedChildren="WALKING"
            defaultChecked
            onChange={this.handleTravelModeChange.bind(this)}
          />
          <Switch className="switch"
            className="animation"
            checkedChildren="JUMP JUMP"
            unCheckedChildren="STOP"
            defaultChecked
            onChange={this.handleAnimationChange.bind(this)}
          />
          <Map
            jump={this.state.jump}
            TravelMode={this.state.TravelMode}
            show={this.state.showMap}
            city={this.state.chosenCityName}
            cityChange={this.state.cityChange}
            onPlaces={this.handlePlaces}
            section={this.state.section}
            POIs={this.state.POIs}
          />
        </div>
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
            onHandleDelete={this.handleDelete}
            POIs={this.state.POIs}
            onPOIMoveTop={this.handlePOIMoveTop.bind(this)}
            onPOIMoveBottom={this.handlePOIMoveBottom.bind(this)}
            planName={this.state.currentPlanName}
            planId={this.state.currentPlanId}
            cityName={this.state.chosenCityName}
          />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "../styles/Map.css";
import axios from "axios";

// const map = undefined;
var directionsService;
var directionsDisplay;
var waypts = [];

class Map extends Component {
  constructor(props) {
    super(props);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.initMap = this.initMap.bind(this);
    this.getVenues = this.getVenues.bind(this);
  }

  state = {
    venues: [],
    map: undefined
  };

  componentDidUpdate(prevProps) {
    if (this.props.show && this.props.cityChange !== prevProps.cityChange) {
      this.getVenues();
    }
    if (this.props.POIs === undefined || this.props.POIs.length === 0) {
      return;
    }
    if (this.props.TravelMode !== prevProps.TravelMode || this.props.jump !== prevProps.jump ||
      (this.props.POIs.length !== 0 && this.props.POIs !== prevProps.POIs)) {
      // this.rerenderMarkers();
      if (directionsDisplay !== undefined) {
        directionsDisplay.setMap(null);
      }
      waypts = [];

      this.props.POIs.slice(1, this.props.POIs.length - 1).map(place => {
        waypts.push({
          location: place.name,
          // location: {lat: place.location.lat, lng: place.location.lng},
          stopover: true
        });
      });
      this.calcRoute();
    }
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-C_Bqizgupalj3JSChpKAf6th71wD0CM&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  // rerenderMarkers = () => {
  //   // Create An InfoWindow

  //   var infowindow = new window.google.maps.InfoWindow();

  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(null);
  //   }
  //   markers.length = 0;

  //   // Display Dynamic Markers
  //   this.props.POIs.map(poi => {
  //     console.log("in Map.js poi.venue.name: ", poi);
  //     var contentString = `${poi.venue.name}`;

  //     // Create A Marker
  //     var marker = new window.google.maps.Marker({
  //       position: {
  //         lat: poi.venue.location.lat,
  //         lng: poi.venue.location.lng
  //       },
  //       map: this.state.map,
  //       title: poi.venue.name
  //     });
  //     // Click on A Marker!
  //     marker.addListener("click", () => {
  //       // Change the content
  //       infowindow.setContent(contentString);

  //       // Open An InfoWindow
  //       infowindow.open(this.state.map, marker);
  //     });
  //     markers.push(marker);
  //   });
  // };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "CTSQGNHXWZYRLBY3FNJBIDAJFZIRYBHB1T5TWCD5GPDKJDAX",
      client_secret: "PBR2A350JUGUPZABPF5U011IQ3MBXX3Q1VUZHTQGGIOKSUUJ",
      section: this.props.section,
      near: this.props.city,
      v: "20180323"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .then(() => {
        this.handlePlaces();
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  calcRoute = () => {
    console.log("Travel mode now: ", this.props.TravelMode);
    console.log("current waypts: ", waypts);
    console.log("this.props.POIs[0]: ", this.props.POIs[0]);
    console.log(
      "this.props.POIs[this.props.POIs.length - 1]: ",
      this.props.POIs[this.props.POIs.length - 1]
    );
    var markerOptions = {
      animation: this.props.jump ? window.google.maps.Animation.BOUNCE
        : window.google.maps.Animation.DROP
    }
    directionsService = new window.google.maps.DirectionsService();
    directionsDisplay = new window.google.maps.DirectionsRenderer({ markerOptions });
    directionsDisplay.setMap(this.state.map);
    var start = this.props.POIs[0].name;
    // var start = {lat: this.props.POIs[0].location.lat, lng: this.props.POIs[0].location.lng};
    // var end = {lat: this.props.POIs[this.props.POIs.length - 1].location.lat, 
    // lng: this.props.POIs[this.props.POIs.length - 1].location.lng};
    var end = this.props.POIs[this.props.POIs.length - 1].name;
    var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: this.props.TravelMode
    };
    directionsService.route(request, function (result, status) {
      console.log("result: ", result);
      if (status === "OK") {
        console.log("here in if loop");
        directionsDisplay.set("directions", null);
        directionsDisplay.setDirections(result);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
    console.log("done");
  };

  initMap = () => {
    // Create A Map
    this.setState(
      {
        map: new window.google.maps.Map(document.getElementById("map"), {
          center: {
            lat: this.state.venues[0].venue.location.lat,
            lng: this.state.venues[0].venue.location.lng
          },
          zoom: 12
        })
      },
      () => {
        console.log("done");
      }
    );
    if (this.props.POIs.length > 0) {
      this.calcRoute();
    }
  };

  handlePlaces() {
    this.props.onPlaces(this.state.venues);
  }

  render() {
    return (
      <div id="map">
      </div>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Map;

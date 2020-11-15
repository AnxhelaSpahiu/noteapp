/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";
class Map extends Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = {
      lat: this.props.currentLocation.lat,
      lng: this.props.currentLocation.lng,
    };
    const destination = {
      lat: this.props.destination.lat,
      lng: this.props.destination.lng,
    };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{
          lat: props.currentLocation.lat,
          lng: props.currentLocation.lng,
        }}
        defaultZoom={15}
      >
        {props.isMarkerShown && (
          <Marker
            position={{
              lat: props.currentLocation.lat,
              lng: props.currentLocation.lng,
            }}
          />
        )}
        {props.markers.map((marker) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            key={marker.id}
          />
        ))}
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;

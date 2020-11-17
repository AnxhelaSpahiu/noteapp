import { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_API_KEY } from "../../helpers/config";

import "./index.scss";

const Marker = ({ text }) => {
  const [helpBoxActive, toggleHelpBox] = useState(false);
  return (
    <>
      <div
        onMouseLeave={() => toggleHelpBox(false)}
        onMouseEnter={() => toggleHelpBox(true)}
        className="marker"
      ></div>
      {helpBoxActive && text && (
        <div className="info-box">
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default class Map extends Component {
  static defaultProps = {
    center: {
      lat: 41.3309769,
      lng: 19.7828038,
    },
    zoom: 11,
  };

  state = {
    marker: null,
  };

  handleMapClick = (e) => {
    if (this.props.insertMode) {
      this.setState({
        marker: { lat: e.lat, lng: e.lng },
      });
      this.props.dropMarker({ lat: e.lat, lng: e.lng });
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="map" style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.handleMapClick}
        >
          {this.state.marker ? (
            <Marker
              lat={this.state.marker.lat}
              lng={this.state.marker.lng}
              text={this.props.note.input}
            />
          ) : null}

          {this.props.customMarker ? (
            <Marker
              lat={this.props.customMarker.lat}
              lng={this.props.customMarker.lng}
              text={this.props.customMarker.text}
            />
          ) : null}
        </GoogleMapReact>
      </div>
    );
  }
}

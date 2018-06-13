import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom}
    center={props.coordinates}
  >{console.log(props)}
    {props.isMarkerShown && <Marker position={props.coordinates} />}
  </GoogleMap>
))

export default MyMapComponent;
/*
<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
*/

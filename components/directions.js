import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin }) => (
  
  <MapViewDirections
    destination={destination}
    origin={origin}
    apikey= "AIzaSyC2h3IetGHDZbtiNNscnGHusuYOHuqGD1o"
    strokeWidth={4}
    strokeColor="#083678"
  />
  
);

export default Directions;

// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

// Create  dark map layer.
let darkMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  });

// Create a base layer that holds both maps.
let baseMaps = {
  Light: lightMap,
  Dark: darkMap,
};

// Create the map object with center, zoom level and default layer.
let Toronto = [44.0, -80.0];

let map = L.map('mapid', {
  center: Toronto,
  zoom: 2,
  layers: [lightMap],
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/jereediv/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
};

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
    },
  }).addTo(map);
});
import React, { Component } from 'react'
import axios from 'axios'

loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCdU03TvjRBVim4B5U3qa95CuwbVJN4Q2E&callback=initMap");
    window.initMap = this.initMap;
    // Shows alert when problem with auth, from: https://developers.google.com/maps/documentation/javascript/events#auth-errors
    window.gm_authFailure = function() {
      alert('Cannot load Google Maps! Please ensure that you have a valid Google Maps API key! Please go to https://developers.google.com/maps/documentation/javascript/get-api-key')
      }
  }

  loadPlaces = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?";
      const parameters = {
        client_id: "GVJY0ASSIKQZXNLSH3SUTUP0QHJPIX4HXNW4SH2NNAHTEJP2",
        client_secret: "5A3ANB4RL11MWKHBA2W0KYGKDIRHERLL1XRZE3JEH1BUS4V5",
        v: "20180323",
        query: "coffee",
        near: "Leicester, UK",
        limit: 5
      }

      // Get data for coffee places from Foursquare
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          this.setState({
            places: response.data.response.groups[0].items
          }, this.loadMap())
        })
        .catch(error => {
          alert("An error occurred fetching data from Foursquare: " + error);
        })
    }

class Map extends Component {

  render() {
    return(
      <div id="map"></div>
    )
  }
}

export default Map;

function loadScript(url) {
  // https://stackoverflow.com/questions/34779489/rendering-a-google-map-without-react-google-map
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);

  script.onerror = function () {
    document.write('Load error: Google Maps')
  };
}

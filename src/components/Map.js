import React, { Component } from 'react'

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  loadMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCdU03TvjRBVim4B5U3qa95CuwbVJN4Q2E&callback=initMap");
      window.initMap = this.initMap;
      // Shows alert when problem with auth, from: https://developers.google.com/maps/documentation/javascript/events#auth-errors
      window.gm_authFailure = function() {
        alert('Cannot load Google Maps! Please ensure that you have a valid Google Maps API key! Please go to https://developers.google.com/maps/documentation/javascript/get-api-key')
        }
    }

    initMap = () => {
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.637106, lng: -1.139771},
        zoom: 15
      });
    }

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

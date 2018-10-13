import React, { Component } from 'react'

class Map extends Component {

  constructor(props) {
    super(props)
    this.markers = [];
    this.map = '';
    this.infoWindow = null;
  }

  componentDidMount() {
    this.loadMap()
    this.props.mapMarkersUpdate(this.markers)
  }

  /*
  shouldComponentUpdate(nextProps) {
    if (prevProps.places !== this.props.places) {
      this.createMarkers();
      return true;
    } else {
      return false;
    }
    if (nextProps.selectedItem !== this.props.selectedItem) {
      let selectedMarker = this.markers.find(m => {
        return m.id === this.props.selectedItem.venue.id;
      });
      this.showInfoWindow(selectedMarker);
    }

  }
  */

  componentDidUpdate(nextProps) {
    if (nextProps.selectedItem !== this.props.selectedItem) {
      let selectedMarker = this.markers.find(m => {
        return m.id === this.props.selectedItem.venue.id;
      });
      this.showInfoWindow(selectedMarker);
    }
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
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.637106, lng: -1.139771},
        zoom: 15
      });
      this.createMarkers()
    }

    showInfoWindow(marker) {
      this.infoWindow.setContent(marker.title);
      this.infoWindow.open(marker.map, marker);
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 750);
      }
    }

    createMarkers = () => {
      this.infoWindow = new window.google.maps.InfoWindow({});
      let bounds = new window.google.maps.LatLngBounds();
      this.props.places.forEach(place => {
        // Creates a marker for each place
        const marker = new window.google.maps.Marker({
          position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
          map: this.map,
          title: place.venue.name,
          animation: window.google.maps.Animation.DROP,
          id: place.venue.id
        });
        marker.addListener('click', () => {
          this.showInfoWindow(marker);
        });
        bounds.extend(marker.getPosition());
        // Pushes markers to marker array before it sends it to App state
        this.markers.push(marker);
      });
      this.map.fitBounds(bounds);
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

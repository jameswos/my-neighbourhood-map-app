import React, { Component } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import Map from './components/Map'
import axios from 'axios'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      places: []
    }
  }

  componentDidMount() {
    this.loadPlaces()
  }

  /* Could the CDU part help me here?

  componentDidUpdate() {
    this.visibleMarkers()
  }

  visibleMarkers() {
    const { mapMarkers } = this.state;
    const { filterPlaces } = this;
    let placesId = filterPlaces.map(place => {
      return filterPlaces.venue.id
    })
    const helloMarkers = mapMarkers.some(marker => {
      if (placesId.indexOf(marker) >= 0) {
        marker.setVisible(true)
      } else {
        marker.setVisible(false)
      }
    })
  }
  */

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
        })
      })
      .catch(error => {
        alert("An error occurred fetching data from Foursquare: " + error);
      })
  }

  // help from simonswiss: https://www.youtube.com/watch?v=A590QnMxsYM
  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  // help from simonswiss: https://www.youtube.com/watch?v=A590QnMxsYM
  mapMarkersUpdate(value) {
    this.setState({
      mapMarkers: value
    })
  }

  render() {


    const { places, filterText, mapMarkers } = this.state;

    const filterPlaces = places
      .filter(place => {
        return place.venue.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      })

    /* Set marker visibility here? Could something like this work?

    const filterPlacesId = this.filterPlaces.map(place => {
      return place.venue.id
    });

    const visibleMarkers = () => {
      if (mapMarkers.id.some(markerId => filterPlacesId.indexOf(markerId) <= 0) {
         markerId.setVisible(true)
      } else {
        markerId.setVisible(false)
      }
    }
    */

    return (
      <div className="App">
        <Filter
          filterText={filterText}
          filterUpdate={this.filterUpdate.bind(this)}
        />
        <main>
          <List
            places={filterPlaces}
            mapMarkers={mapMarkers}
          />
          <Map
            places={filterPlaces}
          />
        </main>
      </div>
    );
  }
}

export default App;

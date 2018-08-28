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

  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  componentDidMount() {
    this.loadPlaces()
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
        })
      })
      .catch(error => {
        alert("An error occurred fetching data from Foursquare: " + error);
      })
  }

  render() {

    const { places, filterText } = this.state;

    const filterPlaces = places
      .filter(place => {
        return place.venue.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      })

    return (
      <div className="App">
        <Filter
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate.bind(this)}
        />
        <main>
          <List
            places={filterPlaces}
            filterText={this.state.filterText}
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

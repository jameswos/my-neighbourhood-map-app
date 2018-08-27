import React, { Component } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import Map from './components/Map'
import axios from 'axios'


class App extends Component {

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

  render() {
    return (
      <div className="App">
        <Filter />
        <List />
        <Map />
      </div>
    );
  }
}

export default App;

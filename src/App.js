import React, { Component } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import Map from './components/Map'
import axios from 'axios'


class App extends Component {



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

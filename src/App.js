import React, { Component } from 'react';
import Filter from '.components/Filter';
import List from '.components/List';
import Map from '.components/Map';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;

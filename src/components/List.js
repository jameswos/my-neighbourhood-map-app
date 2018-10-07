import React, { Component } from 'react';

class List extends Component {

  render() {

    const { places, mapMarkers } = this.props;

    const placeList = places
      .map(place => {
        return (
          // Could I set up some sort of filter / 'if else' condition here
          // to change the visibility of the markers to true if they have
          // the same id as the key? then set the visibility of the others to false to hide them?
          <li
            key={place.venue.id}
          >
            <p>{place.venue.name}</p>
            <p>{place.venue.location.address}</p>
          </li>
        )
      })

    return(
      <div className="list">
        <ul>
          {placeList}
        </ul>
      </div>
    )
  }
}

export default List;

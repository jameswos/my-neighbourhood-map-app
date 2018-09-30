import React, { Component } from 'react';

class List extends Component {

  render() {

    const { places } = this.props;


    const placeList = places
    .map(place => {
      return (
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

import React, { Component } from 'react';

class List extends Component {

  render() {

    const { places, filterText } = this.props;

    const placeList = places
    /*.filter(place => {
      // remove places that do not match current filter text
      return place.venue.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
    })
    */
    .map(place => {
      return (
        <li key={place.venue.id}>
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

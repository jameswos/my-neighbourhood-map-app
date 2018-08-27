import React, { Component } from 'react';

class Filter extends Component {

  render() {
    return(
      <form>
        <input
          type='text'
          placeholder='Type to filter...'
        />
      </form>
    )
  }
}

export default Filter;

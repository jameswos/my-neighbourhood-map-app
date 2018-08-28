import React, { Component } from 'react';

class Filter extends Component {

  render() {
    return(
      <header>
        <form>
          <input
            type='text'
            placeholder='Type to filter...'
          />
        </form>
      </header>
    )
  }
}

export default Filter;

import React, { Component } from 'react';

class Filter extends Component {

  filterUpdate() {
    const val = this.refs.myValue.value
  }

  render() {
    return(
      <header>
        <form>
          <input
            type='text'
            ref="myValue"
            placeholder='Type to filter...'
            onChange={this.filterUpdate.bind(this)}
          />
        </form>
      </header>
    )
  }
}

export default Filter;

import React, { Component } from 'react';

class Filter extends Component {

  filterUpdate() {
    const val = this.refs.myValue.value
    this.props.filterUpdate(val)
  }

  render() {
    return(
      <header>
        <form>
          <input
            type='text'
            ref={ (value) => { this.myValue = value } }
            placeholder='Type to filter...'
            onChange={this.filterUpdate.bind(this)}
          />
        </form>
      </header>
    )
  }
}

export default Filter;

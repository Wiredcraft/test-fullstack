import React from 'react';

import './FilterBar.scss';

export default class FilterBar extends React.Component {
  render() {
    return (
      <div className='filter-bar'>
        <div className="select">
          <select>
            <option>Newest</option>
            <option>Most Popular</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
    );
  }
}

import React from 'react';
import { useAppDispatch } from '../../store';
import { fetchTalks } from '../../store/modules/talks/talks.api';

import './FilterBar.scss';

export default function FilterBar() {
  const dispatch = useAppDispatch()

  const changeFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    await dispatch(fetchTalks({sort: event.target.value, page: 1}))
  }

  return (
    <div className="filter-bar">
      <div className="select">
        <select onChange={changeFilter}>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

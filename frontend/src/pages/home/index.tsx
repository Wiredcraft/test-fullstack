import React, { useEffect } from 'react';
import FilterBar from '../../components/ui/FilterBar';
import LightningCard from '../../components/ui/LightningCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { getRecords, mapRecords } from '../../store/core';
import { fetchTalks } from '../../store/modules/talks/talks.api';
import { ITalk } from '../../store/modules/talks/talks.types';
import Loading from '../common/loading';

export default function HomeIndex() {
  const dispatch = useAppDispatch();
  const talks = useAppSelector((state) => mapRecords<ITalk>(state.talks));
  const talksLoading = useAppSelector((state) => state.talks.status);

  useEffect(() => {
    dispatch(fetchTalks({ sort: 'popular', page: 1 }));
  }, []);

  let pageElements;

  // if (talksLoading === "loading") {
  //   pageElements = <Loading />;
  // } else if (talksLoading === 'succeeded') {
  //   pageElements = talks.map((talk, index) => <LightningCard key={talk.id} {...talk} />);
  // } else if (talksLoading === 'failed') {
  //   pageElements = <div>Error.</div>
  // }
  pageElements = talks.map((talk, index) => <LightningCard key={talk.id} {...talk} />);

  return (
    <div className="w-full">
      <FilterBar />
      {pageElements}
    </div>
  );
}

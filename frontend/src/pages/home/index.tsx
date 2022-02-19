import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import FilterBar from '../../components/ui/FilterBar';
import LightningCard from '../../components/ui/LightningCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { mapRecords } from '../../store/core';
import { fetchTalks } from '../../store/modules/talks/talks.api';
import { ITalk } from '../../store/modules/talks/talks.types';

import './index.scss';

export default function HomeIndex() {
  const dispatch = useAppDispatch();
  const talks = useAppSelector((state) => mapRecords<ITalk>(state.talks));
  const talksLoading = useAppSelector((state) => state.talks.status);
  const [moreLoading, setMoreLoading] = useState(false);

  const currentSort = useAppSelector((state) => state.talks.sortType);

  const paginationMeta = useAppSelector((state) => state.talks.meta);

  useEffect(() => {
    dispatch(fetchTalks({ sort: 'popular', page: 1 }));
  }, []);

  const loadFunc = (page: number) => {
    console.log('loading page:', page);
    setMoreLoading(true);

    dispatch(fetchTalks({ sort: currentSort, page })).then(() => {
      setMoreLoading(false);
    });
  };

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
    <div className="w-full talks-container">
      <FilterBar />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadFunc}
        hasMore={!moreLoading && paginationMeta.currentPage < paginationMeta.totalPages}
        initialLoad={false}
        loader={
          <div className="w-full flex items-center justify-center text-gray text-md" key={0}>
            Loading
          </div>
        }>
        {pageElements}
      </InfiniteScroll>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';

import FilterBar from '../../components/ui/FilterBar';
import LightningCard from '../../components/ui/LightningCard';
import Spinner from '../../components/ui/Spinner';
import { useAppDispatch, useAppSelector } from '../../store';
import { mapRecords } from '../../store/core';
import { fetchTalks } from '../../store/modules/talks/talks.api';
import { ITalk } from '../../store/modules/talks/talks.types';

import './index.scss';

export default function HomeIndex() {
  const dispatch = useAppDispatch();
  const talks = useAppSelector((state) => mapRecords<ITalk>(state.talks));
  const talksLoading = useAppSelector((state) => state.talks.status);
  const currentSort = useAppSelector((state) => state.talks.sortType);
  const paginationMeta = useAppSelector((state) => state.talks.meta);

  const navigate = useNavigate();

  const [moreLoading, setMoreLoading] = useState(false);

  const initLoadTalks = () => {
    dispatch(fetchTalks({ sort: 'popular', page: 1 }))
  };

  useEffect(() => {
    initLoadTalks();
  }, []);

  const loadFunc = (page: number) => {
    setMoreLoading(true);

    dispatch(fetchTalks({ sort: currentSort, page })).then(() => {
      setMoreLoading(false);
    });
  };

  let pageElements;

  if (talksLoading === 'failed') {
    pageElements = (
      <div className="flex flex-col items-center justify-center p-8 bg-pure-white my-8">
        <span className="p-8">
          There was an error fetching the talks from the server, please try again.
        </span>
        <button onClick={initLoadTalks} type="button" className="bg-blue px-6 py-3 text-white">
          Reload
        </button>
      </div>
    );
  } else if (talksLoading === 'loading') {
    pageElements = (
      <div className="flex flex-col items-center justify-center p-8 my-8">
        <span className="p-8 mt-10">
          <Spinner large />
        </span>
      </div>
    );
  } else if (talksLoading === 'succeeded' && talks.length < 1) {
    pageElements = (
      <div className="flex flex-col items-center justify-center p-8 bg-pure-white my-8">
        <span className="p-8">There have been no talks submitted. Add one for yourself!</span>
        <button
          onClick={() => navigate('/add')}
          type="button"
          className="bg-blue px-6 py-3 text-white">
          Add Talk
        </button>
      </div>
    );
  } else {
    pageElements = talks.map((talk) => <LightningCard key={talk.id} {...talk} />);
  }

  return (
    <div className="w-full talks-container">
      <FilterBar />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadFunc}
        hasMore={!moreLoading && paginationMeta.currentPage < paginationMeta.totalPages}
        initialLoad={false}
        // loader={
        //   <div className="w-full flex items-center justify-center text-gray text-md" key={0}>
        //     Loading...
        //   </div>
        // }
        >
        {pageElements}
      </InfiniteScroll>
    </div>
  );
}

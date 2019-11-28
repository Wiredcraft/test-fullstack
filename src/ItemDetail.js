import React, {useState, useEffect} from 'react';
import './App.css';
// import {Link} from 'react-router-dom';

function Item() {

  useEffect(() => {
    fetchItem();
  },[]);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=e6744cfd24904c71b60b673f94f673e2')
    const item = await fetchItem.json();

    console.log(item.articles);
  }

  return (
    <div>
      <h1>Item</h1>
    </div>
  );
}

export default Item;

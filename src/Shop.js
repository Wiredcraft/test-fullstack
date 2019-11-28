import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Shop() {

  useEffect(() => {
    fetchItems()

  },[]);
  const newsStyle = {
    color: 'black'
  };

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=e6744cfd24904c71b60b673f94f673e2');

    const items = await data.json();
    console.log(items.articles);
    setItems(items.articles);
  }

  return (
    <div>
      {items.map(item => (
        <p className="news-title" key={item.url}>
        <p> 1.↑
        <Link style={newsStyle} to={`/shop/${item.url}`}>{item.title}</Link>
          |  {item.source.name} by {item.author} | 2 hours ago </p>
        </p>

        ))}
    </div>
  );
}

export default Shop;

const fetch = require('node-fetch');

const { db, writeTalk } = require('./db');

fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=100&rnnamespace=0')
.then(async res => {

  const json = await res.json();

  const ids = json.query.random.map(el => el.id);

  ids.forEach(async id => {
    const res2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext=true&exlimit=1&exchars=225&pageids=${id}`);
    const json2 = await res2.json();

    const { title, extract: abstract } = json2.query.pages[`${id}`];

    console.log(title.slice(0, 50), abstract.slice(0, 250));

    writeTalk({
      title: title.slice(0, 50),
      abstract: abstract.slice(0, 250),
      userId: '0001'
    });
  });

});

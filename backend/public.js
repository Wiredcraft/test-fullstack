const fs = require('fs');
const path = require('path');

function contentType(file){
  switch(path.extname(file)){
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
  }
}

module.exports = function(path, res){
  if(path === '/'){
    path = '/index.html';
  }

  const file = './public' + path;

  if(fs.existsSync(file)){
    res.setHeader('Content-Type', contentType(file));
    res.write(fs.readFileSync(file));
  }else{
    res.statusCode = 404;
  }
}
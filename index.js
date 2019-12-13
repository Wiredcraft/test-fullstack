const http = require('http');
const url = require('url');

const public = require('./backend/public');
const api = require('./backend/api');

http.createServer(async (req, res) => {
  let body = '';

  req.on('readable', function () {
    body += req.read() || '';
  });

  req.on('end', async () => {
    const request = url.parse(req.url);

    try {
      if(request.path.startsWith('/api')){
        api({
          path: request.path,
          method: req.method,
          headers: req.headers,
          body
        }, res)
      }else if(/^\/([a-z]+\.(css|js))?$/.test(request.path)){
        public(request.path, res);
      }else{
        res.statusCode = 404;
      }
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.write(JSON.stringify({
        error: error.message
      }));
    }

    res.end();

    console.log(`${req.method} ${request.path} ${res.statusCode}`);
  });
}).listen(3000);

console.log('Ready at http://127.0.0.1:3000');

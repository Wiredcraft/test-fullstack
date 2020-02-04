const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.use("/",express.static(path.resolve('build')));
app.use(function(req,res,next){
  //如果是这两个路径前缀，就不是渲染文件相关的请求，直接next
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next
  }
  //反之，如果不是，就手动渲染index.html文件
  return res.sendFile(path.resolve('build/index.html'))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const app = express()
const bodyParser = require('body-parser');//用于req.body获取值的
const db = require('./models');
const Talk = db.sequelize.models.talk;
app.use(bodyParser.json());
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  })
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/talks', async (req, res) => {
    const list = await Talk.findAll({raw: true});
    // .spread((item, created) => {
    //     return item.get({plain: true});
    // });
    res.send(list);
    // console.log(1, list.toJson());
});

app.get('/talks/:id', async (req, res) => {
    const list = await Talk.findAll(
        {   
            where:{
                id: req.params.id
            }, 
            raw: true
        }
    );
    await Talk.update({voteCount: list[0].voteCount + 1}, { where: { id: req.params.id }});
    res.send(list);
});

app.post('/talks', async (req, res) => {
    await Talk.create({
        'title': req.body.title,
        'content': req.body.content,
        'authorName': req.body.author,
    });
    res.end();
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
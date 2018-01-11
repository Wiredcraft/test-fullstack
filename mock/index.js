const express = require('express')
const faker = require('faker')

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(express.json())

const makeTalk = () => {
  return {
    author: faker.internet.userName(),
    title: faker.hacker.phrase(),
    description: faker.lorem.paragraphs(),
    id: faker.random.uuid(),
    created: new Date(faker.date.past()).getTime(),
    votes: faker.random.number(1000),
    voted: faker.random.boolean(),
  }
}

app.get('/api/talks', (req, res) => {
  const talkList = []
  let i = Math.random() * 20
  while (i > 0) {
    talkList.push(makeTalk())
    i = i - 1
  }
  res.json(talkList)
})

app.post('/api/talks', (req, res) => {
  if (Math.random() > 0.5) {
    res.status(201).json(req.body)
  } else {
    res.status(400).json({
      violations: {
        title: 'Title exists.',
      },
    })
  }
})

app.post('/api/talks/:id/vote', (req, res) => {
  if (Math.random() > 0.1) {
    res.status(204).send()
  } else {
    res.status(500).send()
  }
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})

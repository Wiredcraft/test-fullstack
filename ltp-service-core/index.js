const Promise = require('bluebird')
const seneca = require('seneca')()
const actAsync = Promise.promisify(seneca.act, {context: seneca})

// services
seneca.add({role: 'math', cmd: 'sum'}, (msg, reply) => {
  reply(null, {answer: (msg.left + msg.right)})
})

seneca.add({role: 'math', cmd: 'product', integer: true}, (msg, reply) => {
  reply(null, {answer: (msg.left * msg.right)})
})

// call services
seneca.act({role: 'math', cmd: 'sum'}, {left: 1, right: 2});

(async () => {
  const result = await actAsync({role: 'math', cmd: 'product', integer: true}, {left: 5.5, right: 5})
  console.log('await result', result)
})()

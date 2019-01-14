const ampq = require('amqplib/callback_api')
const QUEUE_NAME = 'logstash'

let timeouted = false
let timeoutHandler = setTimeout(() => { timeouted = true }, 1000 * 60 * 2)

const connect = () => {
  ampq.connect('amqp://rabbitmq:5672', (error, connection) => {
    if (timeouted) {
      return
    }
    if (error) {
      console.error(`Couldn't connect to RabbitMQ. Will attempt to reconnect...`)
      setTimeout(connect.bind(this), 2000)
      return
    }
    console.log('Connected succesfully to RabbitMQ!')
    clearTimeout(timeoutHandler)
    timeoutHandler = null
    connection.createChannel((err, channel) => {
      if (err) {
        throw Error(err)
      }
      console.log('Created channel succesfully')
      channel.assertQueue(QUEUE_NAME, { durable: true })
      const message = { status: 200, message: 'Ok' }
      setInterval(() => {
        // console.log(`Sending message to queue: ${JSON.stringify(message)}`)
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)))
      }, 1000)
    })
  })
}

connect()

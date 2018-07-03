const redisClient = require('redis').createClient(process.env.REDIS_URL)

redisClient.on('ready', function() {
  console.log('Redis is ready')
})

redisClient.on('error', function(err) {
  console.log(
    'error event - ' + redisClient.host + ':' + redisClient.port + ' - ' + err
  )
})

if (process.env.NODE_ENV === 'test') {
  after('close redis connection', () => redisClient.quit())
}

module.exports = {redisClient}

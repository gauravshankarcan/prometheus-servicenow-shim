const fastify = require('fastify')({ logger: {level: 'debug'} })


// Declare a route
fastify.get('/health', async (request, reply) => {
    return { healthcheck: true }
  })


// Declare a route
fastify.post('/', async (request, reply) => {
    fastify.log.debug("Hook received")
    fastify.log.debug("Body: "+request.body)

    
    
    return { request: true }
  })

















// Run the server!
const start = async () => {
    try {
      await fastify.listen(8080,'0.0.0.0')
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()  
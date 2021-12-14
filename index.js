const env = require('dotenv').config()
var jp = require('jsonpath');

const fastify = require('fastify')({ logger: {level: 'debug'} })

// Declare a route
fastify.get('/health', async (request, reply) => {
    return { healthcheck: true }
  })


// Declare a route
fastify.post('/', async (request, reply) => {
    fastify.log.debug(JSON.stringify(request.body, null, '\t'));   
    var response = await process(request.body)
    //var createOrUpdate = await search(request.body,response.u_fingerprint)
    fastify.log.debug(response);
    return { request: response }
})

async function process(body,fingerprint) {
  
  var search = await axios({
                        method: 'get',
                        url: env.parsed.OUTBOUND_URL+'?u_fingerprint='+fingerprint
                      })           

  return true;
}

async function process(body) {
  var response = {};
  var keylist = Object.keys(env.parsed)
  for (var i = 0; i < keylist.length; i++) {
      var validkey = keylist[i].split("ESSBODY_")
      if(validkey[0]=="PROC") {
        console.log(env.parsed[keylist[i]])
        response[validkey[1].toLowerCase()]=jp.query(body,'$.'+env.parsed[keylist[i]])[0]
      }
  } 
  return response 
};













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
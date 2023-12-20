
import Fastify from 'fastify'
import gitApiRoute from './routes/gitApiWrapper.js' // this is our API routes
/**
 * @type {import('fastify').FastifyInstance} 
 */
const fastify = Fastify({
  logger: true
})

//Register new routes
fastify.register(gitApiRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
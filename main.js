// @ts-check

const { fastify } = require('fastify')

if (process.env.FAIL === 'true') {
  throw new Error('Simulated failure')
}

console.log(`::warning title=Release tag::${process.env.RELEASE_TAG}`)
console.log('::error ::oh no!')

const server = fastify({
  logger: true,
})

server.get('/', (_req, res) => {
  res.send({
    release: process.env.RELEASE_TAG,
  })
})

server.listen(process.env.PORT ?? '8080', '0.0.0.0')

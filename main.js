// @ts-check

const { fastify } = require('fastify')

const server = fastify({
  logger: true,
})

server.get('/', (_req, res) => {
  res.send({
    release: process.env.RELEASE_TAG,
  })
})

server.listen(process.env.PORT, '0.0.0.0')

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

server.listen(process.env.PORT, () => {
  setTimeout(() => server.close(), 10000)
})

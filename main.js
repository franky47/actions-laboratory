// @ts-check

const { fastify } = require('fastify')

if (process.env.FAIL === 'true') {
  throw new Error('Simulated failure')
}

console.log(`::warning title=Release tag::${process.env.RELEASE_TAG}`)
console.log('::error ::oh no!')

// Deliberately hang the deployment to exercise the action's `timeout` handling
// (see 47ng/actions-clever-cloud#227): never bind the port, so Clever Cloud
// keeps waiting for the app to come up and `clever deploy` never returns. The
// action's timeout must then fire (in seconds, not ms) and kill the child.
if (process.env.INFINITE_LOOP === 'true') {
  let elapsed = 0
  setInterval(() => {
    elapsed += 5
    console.log(`Still "starting up" after ${elapsed}s — never binding on purpose.`)
  }, 5000)
} else {
  const server = fastify({
    logger: true,
  })

  server.get('/', (_req, res) => {
    res.send({
      release: process.env.RELEASE_TAG,
    })
  })

  server.listen(process.env.PORT ?? '8080', '0.0.0.0')
}

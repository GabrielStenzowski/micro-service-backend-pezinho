import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP server running, listening on port ${env.PORT}`)
  })

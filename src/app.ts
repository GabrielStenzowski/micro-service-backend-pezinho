import fastify from 'fastify'
import { userRoutes } from './routes/users.routes'
import { healthRoute } from './routes/test-health.routes'
import { authenticateUserRoutes } from './routes/authenticate-user.routes'
import fastifyJwt from '@fastify/jwt'
import { env } from 'process'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(healthRoute)
app.register(authenticateUserRoutes)

export { app }

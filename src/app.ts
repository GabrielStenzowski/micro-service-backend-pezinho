import fastify from 'fastify'
import { userRoutes } from './routes/users.routes'
import { healthRoute } from './routes/test-health.routes'

const app = fastify()

app.register(userRoutes)
app.register(healthRoute)

export { app }

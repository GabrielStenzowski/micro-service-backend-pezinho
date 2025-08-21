import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './routes/users.routes'
import { healthRoute } from './routes/test-health.routes'
import { authenticateUserRoutes } from './routes/authenticate-user.routes'

import { bankAccountRoutes } from './routes/bank-account.routes'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { env } from './env'
import { cardRoutes } from './routes/card.routes'
import { goalRoutes } from './routes/goal.routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.EXPIRES_IN_TOKEN,
  },
})

app.register(userRoutes)
app.register(healthRoute)
app.register(authenticateUserRoutes)

app.register(async (protectedRoutes) => {
  protectedRoutes.addHook('preHandler', ensureAuthenticated)
  protectedRoutes.register(bankAccountRoutes)
  protectedRoutes.register(cardRoutes)
  protectedRoutes.register(goalRoutes)
})

export { app }

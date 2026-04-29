import fastify from 'fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(cookie)

app.register(usersRoutes, {
  prefix: 'users',
})

app.register(mealsRoutes, {
  prefix: 'meals',
})

app.get('/', async () => {
  return { hello: 'Welcome to Daily Diet API!' }
})

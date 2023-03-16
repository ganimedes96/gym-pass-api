import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { checkInRoutes } from './http/controllers/check-ins/routes'
import { gymRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/user/routes'

export const app = fastify()

app.register(fastifyJwt, {
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    }
})


app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)
app.register(fastifyCookie)

app.setErrorHandler((error, _, replay) => {
    if (error instanceof ZodError) {
        return replay
            .status(400)
            .send({ message: "Validation error", issues: error.format() })
    }
    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {

    }
    return replay.status(500).send({ message: 'Internal server error.' })
})
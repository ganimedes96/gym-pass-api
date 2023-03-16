import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeLoginService } from '@/services/factories/login/make-login-service';

export class LoginController {

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        const loginBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = loginBodySchema.parse(request.body)
        try {

            const loginService = makeLoginService()
            const { user } = await loginService.login({
                email,
                password
            })

            const token = await reply.jwtSign(
                {
                    role: user.role
                },

                {
                    sign: {
                        sub: user.id,

                    }
                })

            const refreshToken = await reply.jwtSign(
                {
                    role: user.role
                }, {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            })

            return reply
                .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                .status(200)
                .send({ token })

        } catch (err) {
            if (err instanceof InvalidCredentialsError) {
                return reply.status(400).send({ message: err.message })
            }
            return err
        }

    }
}

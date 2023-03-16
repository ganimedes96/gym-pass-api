import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { makeRegisterService } from '@/services/factories/user/make-register-service';

export class RegisterController {

    register = async (request: FastifyRequest, reply: FastifyReply) => {
        const registerBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = registerBodySchema.parse(request.body)
        try {
            const registerService = makeRegisterService()
            await registerService.register({
                name,
                email,
                password
            })
        } catch (err) {
            if (err instanceof UserAlreadyExistsError) {
                return reply.status(409).send({ message: err.message })
            }
            return err
        }

        return reply.status(201).send()
    }
}

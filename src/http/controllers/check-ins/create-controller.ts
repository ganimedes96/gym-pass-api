import { makeCreateGymService } from './../../../services/factories/gym/make-create-gym-service';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/check-in/make-chech-in-service';

export class CreateCheckInsController {

    create = async (request: FastifyRequest, reply: FastifyReply) => {

        const createCheckInParamsSchema = z.object({
            gymId: z.string().cuid()
        })

        const createCheckInBodySchema = z.object({

            latitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 90
            }),
            longitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 180
            }),

        })
        const { gymId } = createCheckInParamsSchema.parse(request.params)
        const { latitude, longitude } =
            createCheckInBodySchema.parse(request.body)

        const createCheckInService = makeCheckInService()
        await createCheckInService.execute({
            gymId,
            userId: request.user.sub,
            userLatitude: latitude,
            userLongitude: longitude
        })

        return reply.status(201).send()
    }
}

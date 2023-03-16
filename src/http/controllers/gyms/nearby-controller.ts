import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/gym/make-fetch-nearby-gyms-service';

export class NearbyGymController {

    nearby = async (request: FastifyRequest, reply: FastifyReply) => {
        const nearbyGymQuerySchema = z.object({
            latitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 90
            }),
            longitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 180
            }),

        })

        const { latitude, longitude } =
            nearbyGymQuerySchema.parse(request.query)

        const nearbyGymService = makeFetchNearbyGymsService()
        const { gyms } = await nearbyGymService.execute({
            userLatitude: latitude,
            userLongitude: longitude
        })

        return reply.status(200).send({ gyms })
    }
}

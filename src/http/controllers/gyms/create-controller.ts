import { makeCreateGymService } from './../../../services/factories/gym/make-create-gym-service';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class CreateGymsController {

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        const createGymBodySchema = z.object({
            title: z.string(),
            description: z.string().nullable(),
            phone: z.string().nullable(),
            latitude: z.number().refine(value => {
                return Math.abs(value) <= 90
            }),
            longitude: z.number().refine(value => {
                return Math.abs(value) <= 180
            }),

        })

        const { title, phone, description, latitude, longitude } =
            createGymBodySchema.parse(request.body)

        const createGymService = makeCreateGymService()
        await createGymService.execute({
            title,
            phone,
            description,
            latitude,
            longitude
        })

        return reply.status(201).send()
    }
}

import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/gym/make-search-gyms-service';

export class SearchGymController {

    search = async (request: FastifyRequest, reply: FastifyReply) => {
        const searchGymQuerySchema = z.object({
            q: z.string(),
            page: z.coerce.number().min(1).default(1)

        })

        const { q, page } =
            searchGymQuerySchema.parse(request.query)

        const searchGymService = makeSearchGymsService()
        const { gyms } = await searchGymService.execute({
            query: q,
            page
        })

        return reply.status(200).send({ gyms })
    }
}

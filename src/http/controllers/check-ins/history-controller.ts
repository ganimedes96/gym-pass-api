import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/check-in/make-fetch-user-check-ins-history-service';

export class HistoryCheckInController {

    history = async (request: FastifyRequest, reply: FastifyReply) => {
        const historyCheckInQuerySchema = z.object({

            page: z.coerce.number().min(1).default(1)

        })

        const { page } = historyCheckInQuerySchema.parse(request.query)

        const historyCheckInService = makeFetchUserCheckInsHistoryService()
        const { checkIns } = await historyCheckInService.execute({
            userId: request.user.sub,
            page
        })

        return reply.status(200).send({ checkIns })
    }
}

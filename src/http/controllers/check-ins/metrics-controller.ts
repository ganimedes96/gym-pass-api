import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsService } from '@/services/factories/check-in/make-get-user-metrics-service';

export class MetricsCheckInController {

    metrics = async (request: FastifyRequest, reply: FastifyReply) => {

        const getUserMetricsService = makeGetUserMetricsService()
        const { checkInsCount } = await getUserMetricsService.execute({
            userId: request.user.sub
        })

        return reply.status(200).send({ checkInsCount })
    }
}

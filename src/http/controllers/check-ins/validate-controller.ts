import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInsService } from '@/services/factories/check-in/make-validate-check-in-service';

export class ValidateCheckInController {

    validate = async (request: FastifyRequest, reply: FastifyReply) => {

        const validateCheckInParamsSchema = z.object({
            checkInId: z.string().cuid()
        })

        const { checkInId } = validateCheckInParamsSchema.parse(request.params)

        const validateCheckInService = makeValidateCheckInsService()
        await validateCheckInService.execute({
            checkInId
        })

        return reply.status(204).send()
    }
}

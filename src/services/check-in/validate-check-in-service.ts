import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"
import dayjs from "dayjs"
import { lateCheckInValidateError } from "../errors/late-check-in-validate-error"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface ValidateCheckInServiceRequest {
    checkInId: string

}

interface ValidateCheckInServiceResponse {
    checkIn: CheckIn
}

export class ValidateCheckInService {
    constructor(
        private checkInRepository: CheckInsRepository,

    ) { }

    async execute(
        {
            checkInId
        }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {

        const checkIn = await this.checkInRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new lateCheckInValidateError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}
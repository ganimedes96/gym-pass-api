import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "@/services/check-in/validate-check-in-service"

export const makeValidateCheckInsService = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const service = new ValidateCheckInService(checkInsRepository)

    return service
}
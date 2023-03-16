import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsService } from "@/services/check-in/get-user-metrics-service"

export const makeGetUserMetricsService = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const service = new GetUserMetricsService(checkInsRepository)

    return service
}
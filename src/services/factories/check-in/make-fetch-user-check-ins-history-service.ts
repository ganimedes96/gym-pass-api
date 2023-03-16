import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistory } from "@/services/check-in/fetch-user-check-ins-history"


export const makeFetchUserCheckInsHistoryService = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const service = new FetchUserCheckInsHistory(checkInsRepository)

    return service
}
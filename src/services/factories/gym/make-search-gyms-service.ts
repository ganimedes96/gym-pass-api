import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsService } from "@/services/gym/search-gyms-service"

export const makeSearchGymsService = () => {
    const gymsRepository = new PrismaGymsRepository()
    const service = new SearchGymsService(gymsRepository)

    return service
}
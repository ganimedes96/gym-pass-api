import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsService } from "@/services/gym/fetch-nearby-gyms-service"


export const makeFetchNearbyGymsService = () => {
    const gymsRepository = new PrismaGymsRepository()
    const service = new FetchNearbyGymsService(gymsRepository)

    return service
}
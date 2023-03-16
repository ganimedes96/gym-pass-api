import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymService } from "@/services/gym/create-gym-service"

export const makeCreateGymService = () => {
    const gymsRepository = new PrismaGymsRepository()
    const service = new CreateGymService(gymsRepository)

    return service
}
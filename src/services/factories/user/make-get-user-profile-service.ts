import { PrismaRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "@/services/user/get-user-profile-service"

export const makeGetUserProfileService = () => {
    const usersRepository = new PrismaRepository()
    const service = new GetUserProfileService(usersRepository)

    return service
}
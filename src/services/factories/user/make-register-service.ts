import { PrismaRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../../user/register-services"

export const makeRegisterService = () => {
    const usersRepository = new PrismaRepository()
    const registerService = new RegisterService(usersRepository)

    return registerService
}
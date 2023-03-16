import { PrismaRepository } from "@/repositories/prisma/prisma-users-repository"
import { LoginService } from "../../login/login-service"

export const makeLoginService = () => {
    const usersRepository = new PrismaRepository()
    const loginService = new LoginService(usersRepository)

    return loginService
}
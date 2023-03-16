import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

interface AuthenticationServiceRequest {
    email: string
    password: string
}

interface AuthenticationServiceResponse {
    user: User
}

export class LoginService {
    constructor(private usersRepository: UsersRepository) {}

    async login(
        {
            email, 
            password
        }: 
        AuthenticationServiceRequest
        ): Promise<AuthenticationServiceResponse>{
            
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        } 
        return {
            user
        }
    }
}
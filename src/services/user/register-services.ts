import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"


interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private  usersRepository: UsersRepository) {}
    register = async ({name, email, password}:RegisterServiceRequest): Promise<RegisterServiceResponse> => {
        const password_hash = await hash(password, 6)
            
        const userAlreadyExists = await this.usersRepository.findByEmail(email)
        
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError()
        }
       
      const user = await this.usersRepository.create({
            name,
            email,
            password_hash
      })

      return {
        user,
      }
    }
}
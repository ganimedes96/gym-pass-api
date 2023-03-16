import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaRepository implements UsersRepository {
    findById = async (id: string): Promise<User | null> => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
    findByEmail = async (email: string): Promise<User | null> => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }
     create = async (data: Prisma.UserCreateInput) => {
        const user = await prisma.user.create({
            data
        }) 
        return user
    }
}
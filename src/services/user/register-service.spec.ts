import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import {expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterService } from './register-services'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryRepository
let sut: RegisterService

describe('Register Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new RegisterService(usersRepository)
    })

    it('Should be able to register', async () => {

        const { user } = await sut.register({
            name: 'any_name',
            email:'any_email@email.com',
            password:'any_password'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('Should hash password upon registration', async () => {
       
        const { user } = await sut.register({
            name: 'any_name',
            email:'any_email@email.com',
            password:'any_password'
        })
        const isPasswordCorrectlyHashed = await compare(
            'any_password',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should not be able to register with same email twice', async () => {
        
        const email = 'any_email@email.com'

        await sut.register({
            name: 'any_name',
            email,
            password:'any_password'
        })
       
        await expect(() => sut.register({
            name: 'any_name',
            email,
            password:'any_password'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
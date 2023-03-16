import {expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { LoginService } from './login-service';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

let usersRepository: InMemoryRepository
let sut:  LoginService

describe('Login Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new LoginService(usersRepository)       
    })
    it('Should be able to authentication', async () => {
        
        await usersRepository.create({
            name: "any_name",
            email:'any_email@email.com',
            password_hash: await hash('any_password', 6),

        })

        const { user } = await sut.login({
            email:'any_email@email.com',
            password:'any_password'
        })
        
        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not be able to authentication with wrong email', async () => {
        
        await expect(() => sut.login({
            email:'any_email@email.com',
            password:'any_password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('Should not be able to authentication with wrong password', async () => {

        await usersRepository.create({
            name: "any_name",
            email:'any_email@email.com',
            password_hash: await hash('any_pass', 6),

        })

        await expect(() => sut.login({
            email:'any_email@email.com',
            password:'any_password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})

import {expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile-service';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let usersRepository: InMemoryRepository
let sut:  GetUserProfileService

describe('Get by User Id Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new GetUserProfileService(usersRepository)       
    })
    it('Should be able to get user profile', async () => {
        
       const createdUser = await usersRepository.create({
            name: "any_name",
            email:'any_email@email.com',
            password_hash: await hash('any_password', 6),

        })

        const { user } = await sut.findById({
            userId: createdUser.id
        })
        
        expect(user.name).toEqual('any_name')
    })

    it('Should not be able to get user profile with wrong id', async () => {
        
        await expect(() => sut.findById({
          userId: 'not-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})
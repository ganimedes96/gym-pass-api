import {expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository ';
import { CreateGymService } from './create-gym-service';

let gymRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Gym Service', () => {

    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymRepository)
    })

    it('Should be able to create gym', async () => {

        const { gym } = await sut.execute({
           title: 'any_title',
           description: null,
           phone: null,
           latitude: -27.2092052,
           longitude: -49.6401091
        })

        expect(gym.id).toEqual(expect.any(String))
    })
   
})
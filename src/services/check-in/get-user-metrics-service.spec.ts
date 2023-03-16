
import {expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-Ins-repository'
import { GetUserMetricsService } from './get-user-metrics-service';

let checkInsRepository: InMemoryCheckInsRepository
let sut:  GetUserMetricsService

describe('Fetch user check-ins history Service', () => {

    beforeEach( async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository)
       
    })

    it('Should be able to gey check-in count from metrics', async () => {
       
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })
        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })   
        
    
        expect(checkInsCount).toEqual(2)
       
    })

})
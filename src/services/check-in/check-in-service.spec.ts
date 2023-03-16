import {expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-Ins-repository'
import { CheckInService } from './check-in-service';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository ';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxDistanceError } from '../errors/max-distance-error';
import { MaxNumberOfCheckInError } from '../errors/max-numbers-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut:  CheckInService


const makeFakeGym = () => ({
    gymId: 'gym-01',
    userId: 'user-01',
    userLatitude: -27.2092052,
    userLongitude: -49.6401091
})

describe('Check-in Service', () => {

    beforeEach( async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository, gymsRepository)       
        vi.useFakeTimers()

        await gymsRepository.create({
            id: 'gym-01',
            title: 'any_title',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
    })
   

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {
        const {checkIn} = await sut.execute(makeFakeGym())    
    
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute(makeFakeGym())    
    
        await expect(() => sut.execute(makeFakeGym()),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
    }) 

    it('Should not be able to check in twice but different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute(makeFakeGym())    
    
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
       const {checkIn} = await sut.execute(makeFakeGym())
         expect(checkIn.id).toEqual(expect.any(String))
    }) 
    it('Should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Javascript gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672)
        })

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        }) 
        ).rejects.toBeInstanceOf(MaxDistanceError)
    }) 
   
})

import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gyms-service';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository ';

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsService(gymsRepository)

    })

    it('Should be able to fetch check-in history', async () => {
        await gymsRepository.create({
            title: 'Java',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
        await gymsRepository.create({
            title: 'TypeScript',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091

        })

        const { gyms } = await sut.execute({
            query: 'Java',
            page: 1
        })
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Java' })
        ])
    })
    it('Should be able to fetch paginated check-in history', async () => {

        for (let i = 1; i <= 22; i++) {

            await gymsRepository.create({
                title: `TypeScript ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        }

        const { gyms } = await sut.execute({
            query: 'TypeScript',
            page: 2,
        })
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'TypeScript 21' }),
            expect.objectContaining({ title: 'TypeScript 22' })
        ])
    })

})
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-Ins-repository'
import { ValidateCheckInService } from './validate-check-in-service';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { lateCheckInValidateError } from '../errors/late-check-in-validate-error';

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService


describe('Validate Check-in Service', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInService(checkInsRepository)
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.useRealTimers()
    })
    it('Should be able to validate the check in', async () => {

        const createCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))

    })

    it('Should not be able to validate an inexistent check in', async () => {

        expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

    it('Should not be able to validate the check-in after 20 minutes of this creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id
            })
        ).rejects.toBeInstanceOf(lateCheckInValidateError)
    })
})



import { MaxNumberOfCheckInError } from './../errors/max-numbers-of-check-ins-error';
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"
import { CheckIn } from "@prisma/client"
import { MaxDistanceError } from "../errors/max-distance-error"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface CheckInServiceRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(
        private checkInRepository: CheckInsRepository,
        private gymRepository: GymsRepository    
    ) {}

    async execute(
        {
         userId,       
          gymId,
          userLatitude,
          userLongitude
        }: CheckInServiceRequest): Promise<CheckInServiceResponse>{
            
        const gym = await this.gymRepository.findById(gymId)
        
        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude},
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        )
        const MAX_DISTANCE_IN_KILOMETERS = 0.1
        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )   
            
        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInError()
        }
        
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
         })   
            
        return {
            checkIn
        }
    }
}
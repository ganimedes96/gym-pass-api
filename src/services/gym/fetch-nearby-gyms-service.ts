import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface FetchNearbyGymsServiceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsService {
    constructor(private gymRepository: GymsRepository) { }
    execute = async ({
        userLatitude,
        userLongitude
    }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> => {

        const gyms = await this.gymRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms,
        }
    }
}
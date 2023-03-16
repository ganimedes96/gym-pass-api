import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify"

import { verifyJWT } from '../../middlewares/verify-jwt-';
import { CreateGymsController } from "./create-controller";
import { NearbyGymController } from "./nearby-controller";
import { SearchGymController } from "./search-controller";




const createGymController = new CreateGymsController()
const searchGymController = new SearchGymController()
const nearbyGymController = new NearbyGymController()

export const gymRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms', { onRequest: verifyUserRole('ADMIN') }, createGymController.create)

    app.get('/gyms/nearby', nearbyGymController.nearby)
    app.get('/gyms/search', searchGymController.search)

}
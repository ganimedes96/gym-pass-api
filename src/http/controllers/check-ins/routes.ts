import { FastifyInstance } from "fastify"

import { verifyJWT } from '../../middlewares/verify-jwt-';
import { CreateCheckInsController } from "./create-controller";
import { HistoryCheckInController } from "./history-controller";
import { MetricsCheckInController } from "./metrics-controller";
import { ValidateCheckInController } from "./validate-controller";





const createCheckInController = new CreateCheckInsController()
const validateCheckInController = new ValidateCheckInController()
const historyCheckInController = new HistoryCheckInController()
const metricsCheckInController = new MetricsCheckInController()

export const checkInRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/check-ins', createCheckInController.create)
    app.patch('/check-ins/:checkInId/validate', validateCheckInController.validate)

    app.get('/check-ins/metrics', metricsCheckInController.metrics)
    app.get('/check-ins/history', historyCheckInController.history)


}
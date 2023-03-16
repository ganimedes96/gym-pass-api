import { FastifyInstance } from "fastify"
import { LoginController } from "./login-controller"
import { profile } from "./profile-controller"
import { RegisterController } from "./register-controller"
import { verifyJWT } from '../../middlewares/verify-jwt-';
import { RefreshTokenController } from "./refreshToken-controller";


const registerController = new RegisterController()
const loginController = new LoginController()
const refreshTokenController = new RefreshTokenController()


export const usersRoutes = async (app: FastifyInstance) => {

    app.post('/users', registerController.register)
    app.post('/sessions', loginController.login)

    app.patch('/token/refresh', refreshTokenController.refresh)

    /** Authenticated */
    app.get('/me', { onRequest: [verifyJWT] }, profile)

}
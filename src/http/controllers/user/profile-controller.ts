import { makeGetUserProfileService } from "@/services/factories/user/make-get-user-profile-service";
import { FastifyRequest, FastifyReply } from "fastify";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {

    const getUserProfile = makeGetUserProfileService()
    const { user } = await getUserProfile.findById({
        userId: request.user.sub
    })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}
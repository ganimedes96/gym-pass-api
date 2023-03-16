import { createAndAuthenticateUser } from './../../../utils/create-and-authenticate-user';
import request from 'supertest'
import { test, describe, afterAll, beforeAll, expect } from 'vitest'
import { app } from '@/app'


describe('Gym (e2e)', () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('should be able to create a gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript',
                description: 'any_description',
                phone: '15454545445',
                latitude: -27.2092052,
                longitude: -49.6401091
            })

        expect(response.statusCode).toEqual(201)

    })
})



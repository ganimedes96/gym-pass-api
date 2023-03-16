import { createAndAuthenticateUser } from './../../../utils/create-and-authenticate-user';
import request from 'supertest'
import { test, describe, afterAll, beforeAll, expect } from 'vitest'
import { app } from '@/app'


describe('Nearby Gym (e2e)', () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript',
                description: 'any_description',
                phone: '15454545445',
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'React',
                description: 'any_description',
                phone: '15454545445',
                latitude: -27.0610928,
                longitude: -49.5229501
            })
        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.2092052,
                longitude: -49.6401091
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Javascript'
            })
        ])

    })
})



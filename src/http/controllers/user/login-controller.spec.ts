import request from 'supertest'
import { test, describe, afterAll, beforeAll, expect } from 'vitest'
import { app } from '@/app'


describe('Login (e2e)', () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('should be able to login', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'any_name',
                email: 'any_email@email.com',
                password: '123456'
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'any_email@email.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ token: expect.any(String) })
    })
})



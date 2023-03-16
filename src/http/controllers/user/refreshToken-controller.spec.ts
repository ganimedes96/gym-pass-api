import request from 'supertest'
import { test, describe, afterAll, beforeAll, expect } from 'vitest'
import { app } from '@/app'


describe('Refresh Token (e2e)', () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('should be able to refresh a token', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'any_name',
                email: 'any_email@email.com',
                password: '123456'
            })

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'any_email@email.com',
                password: '123456'
            })


        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ token: expect.any(String) })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})



'use strict';

//initialization and setup the app and package
//server.js
const server = require('../src/server.js');
//supertest
const superTest = require('supertest');
require('@code-fellows/supergoose');
const serverRequest = superTest(server.app);
const base64 = require('base-64');

describe('testing server', () => {

    it('handle not found routes', async() => {
        let response = await serverRequest.get('/not-found');
        expect(response.status).toEqual(404);
    });

    it('handle server error', async() => {
        let response = await serverRequest.get('/wrong-path');
        expect(response.status).toEqual(500);
    });

    it('handle home route', async() => {
        let response = await serverRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Welcome!');
    });

    it('Sign Up test', async() => {
        let response = await serverRequest.post('/signup').send({
            username: 'naeem',
            password: 'admin123',
        });
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('naeem');
        expect(response.body.password).not.toEqual('admin123');
    });

    it('Sign In test', async() => {

        const user = base64.encode('naeem:admin123');
        const response1 = await serverRequest.post('/signin').set('Authorization', `Basic ${user}`);
        expect(response1.status).toEqual(200);
        expect(response1.body.username).toEqual('naeem');
        expect(response1.body.password).not.toEqual('admin123');
    });
});
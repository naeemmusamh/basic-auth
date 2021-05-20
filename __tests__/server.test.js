'use strict';

//initialization and setup the app and package
//server.js
const server = require('../src/server.js');
//supertest
const superTest = require('supertest');
const serverRequest = superTest(server.app);

describe('test the router for the home page', () => {
    it('test if the home page work correctly', async() => {
        let response = await serverRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Welcome!');
    });

    it('test if the error path no exist work correctly', async() => {
        let response = await serverRequest.get('/not-found');
        expect(response.status).toEqual(404);
    });

    it('test if the error on the path and 500 page work correctly', async() => {
        let response = await serverRequest.get('/wrong-path');
        expect(response.status).toEqual(500);
    });
});
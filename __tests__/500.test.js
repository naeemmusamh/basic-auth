'use strict';

//initialization and setup the app and package
//server.js
const server = require('../src/server.js');
//supertest
const superTest = require('supertest');
const serverRequest = superTest(server.app);


describe('test if the error work', () => {
    it('test the 404 page error not path exist', async() => {
        let response = await serverRequest.get('/not-exist');
        expect(response.status).toEqual(404);
    });

    it('test the 500 page error wrong in the path', async() => {
        let response = await serverRequest.get('/wrong-path');
        expect(response.status).toEqual(500);
    });
});
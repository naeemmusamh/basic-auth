'use strict';

//initialization and setup the app and package
//server.js
const server = require('../src/server.js');
//supertest
const superTest = require('supertest');
const serverRequest = superTest(server.app);

describe('test the router for the home page', () => {
    it('test the home page', async() => {
        let response = await serverRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('im the home page');
    });
});
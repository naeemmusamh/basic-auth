'use strict';

//this page response for if the path is not exist

module.exports = (request, response, next) => {
    response.status(404).json({
        message: 'the path is not exist',
        path: request.baseUrl
    });
};
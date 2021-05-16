'use strict';

//this page it response for the error in the path

module.exports = (error, request, response, next) => {
    response.status(500).json({
        error: error,
        message: 'there is something wrong in the path',
        path: request.path
    });
};
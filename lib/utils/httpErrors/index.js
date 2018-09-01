const getHttpError = require('../getHttpError');

function notFoundError(message = 'Not Found'){
    const e = getHttpError(message, 404);
    e.type = 'notFoundHTTPError';
    return e;
}

function internalServerError(message = 'Internal Server Error'){
    const e = getHttpError(message, 500);
    e.type = 'internalServerError';
    return e;
}

function badRequestError(message = 'Bad Request'){
    const e = getHttpError(message, 400);
    e.type = 'badRequestError';
    return e;
}

function conflictError(message = 'Conflict'){
    const e = getHttpError(message, 409);
    e.type = 'conflictError';
    return e;
}


module.exports = {
    notFoundError,
    internalServerError,
    badRequestError,
    conflictError
}
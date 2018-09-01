function getHttpError(message, httpStatus){
    const e = new Error(message);
    e.status = httpStatus;
    return e;
}

module.exports = getHttpError;
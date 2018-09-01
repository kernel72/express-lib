function getError(message, httpStatus){
    const e = new Error(message);
    e.status = httpStatus;
    return e;
}
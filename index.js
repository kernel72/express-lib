module.exports = {
    bodyNotEmpty: require('./lib/middlewares/bodyNotEmpty'),
    catchError: require('./lib/middlewares/catchError'),
    getOr404: require('./lib/middlewares/getOr404'),
    errorsMainHandler: require('./lib/middlewares/errorsMainHandler'),

    httpErrors: require('./lib/utils/httpErrors'),
    getHttpError: require('./lib/utils/getHttpError')
}
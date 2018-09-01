const catchError = require('./catchError');
const {notFoundError} = require('../utils/httpErrors')

function getOr404(fieldName, asyncGetFunction, errMessage){
    return catchError(async (req, res, next) => {
        const getResult = await asyncGetFunction(req);
        if(!getResult){
            const e = notFoundError(errMessage);
            return next(e);
        }

        res.locals[fieldName] = getResult;
        next();
    });
}

module.exports = getOr404;
const {badRequestError} = require('../../utils/httpErrors');

function bodyNotEmpty(){
    return function bodyNotEmptyMiddlware (req, res, next){
        if(!req.body || !Object.keys(req.body).length){
            return next(badRequestError("Body should not be empty"));
        }
        next();
    }
}

module.exports = bodyNotEmpty;
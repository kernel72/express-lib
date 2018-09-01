function catchError(func){
    return async function catchErrorMiddleware(req, res, next){
        try {
            await func(req, res, next);
        } catch (e){
            if(typeof e === 'undefined'){
                return next(new Error("Unhandled error"));
            }
            return next(e);
        }
    }
}

module.exports = catchError;
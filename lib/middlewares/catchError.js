function errorWrapper(func){
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (e){
            if(typeof e === 'undefined'){
                return next(new Error("Unhandled error"));
            }
            next(e);
        }
    }
}

module.exports = errorWrapper;
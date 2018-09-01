function errorsMainHandler(opts) {

    let { showStack, logger } = opts || {};

    showStack = typeof showStack === 'undefined' || showStack;

    return (err, req, res, next) => {
        const response = {
            code: err.status || 500,
            message: err.message
        };

        if(showStack){
            response.stack = err.stack;
        }
        
        logger && logger.error(err);

        res.status(response.code).json(response);
    }
}

module.exports = errorsMainHandler;
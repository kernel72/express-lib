function errorsMainHander({showStack = true}) {

    return (err, req, res, next) => {
        let response = {
            code: err.status || 500,
            message: err.message
        };

        if(response.code === 500){
            if(showStack) {
                response.stack = err.stack;
            }

            logger.error(err);
        }

        res.status(response.code).json(response);
    }
}

module.exports = errorsMainHander;
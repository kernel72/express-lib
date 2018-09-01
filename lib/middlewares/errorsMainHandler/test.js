const errorsMainHandler = require('./index');
const {notFoundError} = require('../../utils/httpErrors');

describe('errorMainHandler()', () => {
    it('should return middleware function', () => {
        expect(typeof errorsMainHandler()).toBe('function');
    });

    describe("Returned Middlware", () => {

        let res, returnedMiddleware; 
        let passedError;

        beforeEach(() => {
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        })
        
        describe("When received error has status code (404)", () => {
            
            beforeEach(() => {
                passedError = notFoundError();
                
                returnedMiddleware = errorsMainHandler();
                returnedMiddleware(passedError, {}, res, () => {});     
            });

            it('should call res.status with defined status code', () => {
                expect(res.status).toBeCalledWith(passedError.status);
                expect(res.status).toHaveBeenCalledTimes(1);
            });

            it('should call res.json with error response data', () => {
                const expectedData = {
                    code: passedError.status,
                    message: passedError.message,
                    stack: passedError.stack
                }

                expect(res.json).toBeCalledWith(expectedData);
                expect(res.json).toHaveBeenCalledTimes(1);
            });
        });

        describe('When received error has not status code', () => {
            beforeEach(() => {

                passedError = new Error("Unknown Error");

                returnedMiddleware = errorsMainHandler();
                returnedMiddleware(passedError, {}, res, () => {});     
            });

            it('should call res.status with 500', () => {
                expect(res.status).toBeCalledWith(500);
                expect(res.status).toHaveBeenCalledTimes(1);
            });

            it('should call res.json with error response data', () => {
                const expectedData = {
                    code: 500,
                    message: passedError.message,
                    stack: passedError.stack
                }

                expect(res.json).toBeCalledWith(expectedData);
                expect(res.json).toHaveBeenCalledTimes(1);
            });
        });

        describe("When showStack = false is passed", () => {
            it('should call res.json with error response data but without stacktrace', () => {

                passedError = notFoundError();
                returnedMiddleware = errorsMainHandler({showStack: false});
                returnedMiddleware(passedError, {}, res, () => {});     

                const expectedData = {
                    code: passedError.status,
                    message: passedError.message,
                }

                expect(res.json).toBeCalledWith(expectedData);
                expect(res.json).toHaveBeenCalledTimes(1);
            });
        });

        describe("When logger is passed", () => {
            it('should call logger.error with received error', () => {

                passedError = notFoundError();
                const logger = {
                    error: jest.fn()
                }

                returnedMiddleware = errorsMainHandler({logger});
                returnedMiddleware(passedError, {}, res, () => {});   
                
                expect(logger.error).toBeCalledWith(passedError);
                expect(logger.error).toHaveBeenCalledTimes(1);

            });
        })

    })
})
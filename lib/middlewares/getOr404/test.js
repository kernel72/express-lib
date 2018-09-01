const getOr404 = require('./index');
const {notFoundError} = require('../../utils/httpErrors');

describe('getOr404(fieldName, asyncGetFunction, errMessage)', () => {
    it('should return middleware function', () => {
        expect(typeof getOr404('test', () => 'value')).toBe('function');
    });

    describe('Returned Middleware', () => {

        it('should call asyncGetFunction with req objext', async () => {
            const req = { passedData: 'testData' };
            const res = { locals: {} };
            const next = jest.fn();
            const asyncGetFunction = jest.fn();

            const returnedMiddleware = getOr404('test', asyncGetFunction);
            await returnedMiddleware(req, res, next);

            expect(asyncGetFunction).toBeCalledWith(req);
            expect(asyncGetFunction).toHaveBeenCalledTimes(1);
        })

        describe("When asyncGetFunction(req) returns something ", () =>{
            let req, res, next, returnedMiddleware;
            
            beforeEach( async () => {
                req = { passedData: 'testData' };
                res = { locals: {} };
                next = jest.fn();

                returnedMiddleware = getOr404('receivedData', async (r) => await new Promise((resolve) => resolve(r.passedData)));
                await returnedMiddleware(req, res, next);                
            });

            it('should populate res.locals[fieldName] with returned value', () => {
                expect(res.locals.receivedData).toBe(req.passedData);
            });

            it('should call next()', () => {
                expect(next).toHaveBeenCalledTimes(1);
                expect(next.mock.calls[0][0]).toBe(undefined);
            });
        });

        describe("When asyncGetFunction(req) returns undefined ", () => {
            let req, res, next, returnedMiddleware;
            
            beforeEach( async () => {
                req = { passedData: 'testData' };
                res = { locals: {} };
                next = jest.fn();

                returnedMiddleware = getOr404('receivedData', r => undefined);
                await returnedMiddleware(req, res, next);                
            });

            it('should not populate res.locals[fieldName]', () => {
                expect(res.locals.receivedData).toBe(undefined);
            });

            it('should call next(notFoundError())', () => {
                const expectedError = notFoundError();
                const receivedError = next.mock.calls[0][0];

                expect(next).toBeCalledWith(expectedError);
                expect(next).toHaveBeenCalledTimes(1);

                expect(receivedError.status).toBe(expectedError.status);
                expect(receivedError.type).toBe(expectedError.type);
            });

            it('should call next(notFoundError(errMessage)) if errMessage was provided', async () => {
                next = jest.fn();
                returnedMiddleware = getOr404('receivedData', r => undefined, "Custom Error");
                await returnedMiddleware(req, res, next);                

                const expectedError = notFoundError("Custom Error");
                const receivedError = next.mock.calls[0][0];

                expect(next).toBeCalledWith(expectedError);
                expect(next).toHaveBeenCalledTimes(1);

                expect(receivedError.status).toBe(expectedError.status);
                expect(receivedError.type).toBe(expectedError.type);
            });
        })
    });
})

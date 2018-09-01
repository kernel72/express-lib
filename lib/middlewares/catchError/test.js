const catchError = require('./index');
const {notFoundError} = require('../../utils/httpErrors');

describe('catchError((req, res, next) => {}))', () => {
    
    it('should return middleware function', () => {
        expect(typeof catchError(() => {})).toBe('function')
    });

    describe("Returned middleware", () => {
        it('should call passed function(req, res, next)', async () => {
            const req = 'req';
            const res = 'res';
            const next = jest.fn();
            const passedMiddleware = jest.fn()
            
            const returnedMiddleware = catchError(passedMiddleware);
            await returnedMiddleware(req, res, next);

            expect(passedMiddleware).toBeCalledWith(req, res, next);
        });

        describe('When passedMiddleware throws error', () => {
            it('should call next(e)', async () => {
                const req = 'req';
                const res = 'res';
                const next = jest.fn();
    
                const thrownError = notFoundError();
    
                const passedMiddleware = () => { throw thrownError;}
    
                const returnedMiddleware = catchError(passedMiddleware);
                await returnedMiddleware(req, res, next);
    
                expect(next).toBeCalledWith(thrownError);
                expect(next).toHaveBeenCalledTimes(1);
            });
        });

        describe('passedMiddleware throws undefined', () => {
            it('should call next(new Error("Unhandled error"))', async () => {
                const req = 'req';
                const res = 'res';
                const next = jest.fn();
    
                const passedMiddleware = () => { throw undefined };
    
                const returnedMiddleware = catchError(passedMiddleware);
                await returnedMiddleware(req, res, next);
    
                expect(next).toBeCalledWith(new Error("Unhandled error"));
                expect(next).toHaveBeenCalledTimes(1);
    
            });
        });
    });
    
});
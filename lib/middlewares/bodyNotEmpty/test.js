const bodyNotEmpty = require('./index');
const {badRequestError} = require('../../utils/httpErrors');

describe('bodyNotEmpty()', () => {
    
    it('should return middleware function', () => {
        expect(typeof bodyNotEmpty()).toBe('function')
    });
    
    describe('Returned middleware', () => {
        
        describe('When body is absent', () => {
            
            it('should call next(badRequestError("Body should not be empty"))', () => {
                const req = {};
                const next = jest.fn();
    
                const expectedErr = badRequestError('Body should not be empty');
                bodyNotEmpty()(req, {}, next);
                const receivedError = next.mock.calls[0][0];
    
                expect(next).toBeCalledWith(expectedErr);
                expect(next).toHaveBeenCalledTimes(1);
    
                expect(receivedError.status).toBe(expectedErr.status);
                expect(receivedError.type).toBe(expectedErr.type);
            });
        });

        describe('When body is empty', () => {

            it('should call next(badRequestError("Body should not be empty"))', () => {
                const req = {body:{}};
                const next = jest.fn();
    
                const expectedErr = badRequestError('Body should not be empty');
                
                bodyNotEmpty()(req, {}, next);
                
                const receivedError = next.mock.calls[0][0];
                
                expect(next).toBeCalledWith(expectedErr);
                expect(next).toHaveBeenCalledTimes(1);
    
                expect(receivedError.status).toBe(expectedErr.status);
                expect(receivedError.type).toBe(expectedErr.type);
            });
        });

        describe('When body is present', () => {
            it('should call next() without arguments', () => {
                const req = {body:{someData: 'data'}};
                const next = jest.fn();
    
                bodyNotEmpty()(req, {}, next);
    
                expect(next.mock.calls[0][0]).toBe(undefined);
                expect(next).toHaveBeenCalledTimes(1);
    
            });
        });

    });
    
});
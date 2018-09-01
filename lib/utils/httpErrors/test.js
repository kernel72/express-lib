const {
    notFoundError,
    internalServerError,
    badRequestError,
    conflictError
} = require('./index');

[{
    method: notFoundError, 
    status: 404,
    type: 'notFoundHTTPError',
    defaultMessage: 'Not Found'
},{
    method: internalServerError, 
    status: 500,
    type: 'internalServerError',
    defaultMessage: 'Internal Server Error'
},{
    method: badRequestError, 
    status: 400,
    type: 'badRequestError',
    defaultMessage: 'Bad Request'
},{
    method: conflictError, 
    status: 409,
    type: 'conflictError',
    defaultMessage: 'Conflict'
}].forEach(function({
    method,
    status,
    type,
    defaultMessage
}){
    describe(`${method}()`, () => {

        let res;
    
        beforeAll(() => {
            res = method();
        });
    
        it(`should return Error('${defaultMessage}')`, () => {
            expect(res).toEqual(new Error(defaultMessage));
        });
    
        it(`should assing status ${status} to returned Error`, () => {
            expect(res.status).toBe(status);
        });
    
        it(`should assign type '${type}' to Error`, () => {
            expect(res.type).toBe(type);
        })
    
        describe("When passed message", () => {
            it("should return Error with passed message", () => {
                const res = method("My Message");
                expect(res).toEqual(new Error('My Message'));
            })
        })
    })
});
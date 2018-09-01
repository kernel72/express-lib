const getHttpError = require('./index');

describe('getHttpError(message, httpStatus)', () =>{
    it('should return Error with passed status ', () => {
        const e = getHttpError('Some http Error', 303);
        expect(e).toEqual(new Error('Some http Error'));
        expect(e.status).toBe(303);
    })
});


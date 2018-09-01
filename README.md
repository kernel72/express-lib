# Express library

The library with common, often used middlewares and utilites.

# Installation 

```
npm install --save express-lib

const {bodyNotEmpty, ...} = require('express-lib');
```

# Usage

Middlewares: 

- ```bodyNotEmpty```
- ```catchError```
- ```errorsMainHandler```
- ```getOr404```

Utils: 

- ```notFoundError```
- ```internalServerError```
- ```badRequestError```
- ```conflictError```
- ```getHttpError```


## bodyNotEmpty()

Middleware that checks is body in request is empty or not present.
If it does then calls ```next()``` with Bad Request error

Example:

```javascript
const { bodyNotEmpty } = require('express-lib');

app.post('/',
    bodyNotEmpty(),
    ...
)

```

## catchError(middlewareFunc)

Wraps middleware function to catch any thown error in it and pass to ```next()```.

Example:

```javascript
const { catchError } = require('express-lib');

app.get('/',
    catchError( async (req, res, next) => {
        ... //Do stuff here
    })
)

```

## errorsMainHandler({ showStack = true, logger })

Middleware that catches all errors passed to ```next()``` and calls response in json format like 

```javascript
{
    code: 404,
    message: 'Not Found',
    stack: stacktrace // Can be omitted 
}
```

Should be the last middleware in the app.
Receives optional params:
    - ```showStack``` (true by default) - Show/hide stacktrace
    - ```logger``` - if specified make call logger.error() with received error

Example:

```javascript

const {errorsMainHandler} = request('express-lib');
const logger = console;

app.get('/',
    (req, res, next) => {
        const e = new Error('Not Found');
        e.status = 404;
        next(e);
    }
)

app.use(errorsMainHandler({
    showStack: false,
    logger
}));

// Will call response with status (404), and json data: 
// {
//    code: 404,
//    message: 'Not Found'
// }

```

## getOr404(fieldName, getFunction, customErrorMessage)

Middleware that calls ```getFunction(req)``` to retrieve some data and populates ```res.locals``` object with field ```fieldName``` and retrieved data.
If ```getFunction``` returns undefined then ```next()``` with "Not Found" error calls.

```customErrorMessage``` - is optional and overrides default 'Not Found' message

Example

```javascript
const {getOr404} = request('express-lib');

app.get('/:id',
    getOr404('something', async (req) => {
        const fetched = await doFetch(req.params.id);
        return fetched
    }),
    (req, res, next) => {
        res.json(res.locals.something);
    }
)
```

## getHttpError(message, httCode)

Received message and httpCode and returns Error instance and assigned status code 

Example 
```javascript

const {getHttpError} = require('express-lib');
    
const e = getHttpError("Bad Request", 400);
console.log(e.message) // "Bad Request"
console.log(e.status) // 400;

```

## Different HTTP Errors utilites

This functions creates new Error instaces and assings http code  and type.

```
- notFoundError(message = 'Not Found')
- internalServerError(message = 'Internal Server Error')
- badRequestError(message = 'Bad Request')
- conflictError(message = 'Conflict')
```

Example:

```javascript
const {
    notFoundError,
    internalServerError,
    badRequestError,
    conflictError,
} = require('express-lib');

app.post('/', 
    (req, res, next) => {

        const e = badRequestError("Not all data passed");

        res.status(e.status).json({
            message: e.message,
            code: e.status,
            type: e.type
        });
        
    }
)

```








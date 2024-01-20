const { StatusCodes } = require('http-status-codes')
// catch error handler

exports.catchErrors = (fn) => {
    return function (req,res,next) {
        fn(req,res,next).catch(err => {
            // validation errors
            if(typeof err === "string") {
                res.status(StatusCodes.BAD_REQUEST).json({ message: err })
            } else {
                next(err)
            }
        })
    }
}

// mongodb validation error handler
exports.mongoseErrors = (err,res,req,next) => {
    if(!err.errors) return next(err)

    const errorKeys = Object.keys(err.errors)
    let message = ""
    errorKeys.forEach(key => message += err.errors[key].message + ",")

    message = message.substring(0, message.length - 2)
    res.status(StatusCodes.BAD_REQUEST).json({ message })
}

// developement error handler 
exports.developmentErrors = (err,req,res, next) => {
    err.stack = err.stack || ""
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack
    }
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorDetails)
}

// production errors
exports.productionErrors = (err,req,res,next) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
}

// 404 Error page not found
exports.notFound = (req,res,next) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Requested route not found"})
}
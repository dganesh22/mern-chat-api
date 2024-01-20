const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const auth = async (req,res,next) => {
    try {
        if(!req.headers('Authorization')) throw "Forbidden!"

        const token = req.headers('Authorization')
        const payload = await jwt.verify(token,process.env.ACCESS_SECRET)

        req.payload = payload
        next()
    } catch (err) {
        res.status(StatusCodes.FORBIDDEN).json({ message: "forbidden"})
    }
}

module.exports = auth
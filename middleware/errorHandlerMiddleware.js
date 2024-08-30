// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// ERROR HANDLER MIDDLEWARE
export const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err)
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
	const message = err.message || "Something went wrong"
	res.status(statusCode).json({ message })
}
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// CUSTOM ERROR CLASSES
// 404
export class NotFoundError extends Error {
	constructor(message) {
		super(message)
		this.name = 'NotFoundError'
		this.statusCode = StatusCodes.NOT_FOUND
	}
}

// 400
export class BadRequestError extends Error {
	constructor(message) {
		super(message)
		this.name = 'BadRequestError'
		this.statusCode = StatusCodes.BAD_REQUEST
	}
}

// 401
export class UnauthenticatedError extends Error {
	constructor(message) {
		super(message)
		this.name = 'UnauthenticatedError'
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
}

// 403
export class UnauthorizedError extends Error {
	constructor(message) {
		super(message)
		this.name = 'UnauthorizedError'
		this.statusCode = StatusCodes.FORBIDDEN
	}
}
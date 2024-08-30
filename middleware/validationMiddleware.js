// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT EXPRESS VALIDATION FUNCTIONS
import { param, validationResult } from 'express-validator'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError } from '../errors/customErrors.js'


// ERROR MIDDLEWARE FUNCTION FOR VALIDATION
export const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((i) => i.msg)
				throw new BadRequestError(errorMessages)
			}
			next()
		},
	]
}


// VALIDATE ID PARAMS MIDDLEWARE
export const validateIdParam = withValidationErrors(
	[
		param('id')
			.custom((i) => mongoose.Types.ObjectId.isValid(i))
			.withMessage("Invalid MongoDB id")
	]
)
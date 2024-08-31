// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body } from 'express-validator'
// IMPORT VALIDATION MIDDLEWARE
import { withValidationErrors } from './validationMiddleware.js'
// IMPORT MODELS
import { UserModel } from '../models/UserModel.js'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError } from '../errors/customErrors.js'


// VALIDATE LOGIN MIDDLEWARE
export const validateLoginInput = withValidationErrors(
	[
		body('emailUser')
			.notEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Please enter a valid email address"),
		body('passwordUser')
			.notEmpty()
			.withMessage("Password is required")
	]
)
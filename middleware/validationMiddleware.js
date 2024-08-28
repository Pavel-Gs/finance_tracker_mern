// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body, validationResult } from 'express-validator'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError } from '../errors/customErrors.js'


// ERROR MIDDLEWARE FUNCTION FOR VALIDATION
const withValidationErrors = (validateValues) => {
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


// VALIDATE EXPENSES MIDDLEWARE
export const validateExpensesInput = withValidationErrors(
	[
		body("amount").notEmpty().withMessage("the amount is required")
	]
)
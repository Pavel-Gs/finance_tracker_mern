// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body } from 'express-validator'
// IMPORT VALIDATION MIDDLEWARE
import { withValidationErrors } from './validationMiddleware.js'
// IMPORT CONSTANTS
import { INCOME_CATEGORIES, INCOME_TYPES } from '../utils/constantsIncome.js'


// VALIDATE INCOME MIDDLEWARE
export const validateIncomeInput = withValidationErrors(
	[
		body('amountIncome')
			.notEmpty()
			.withMessage("The amount is required")
			.isNumeric()
			.withMessage("The amount must be a number")
			.custom((i) => i > 0 && i < 1000000)
			.withMessage("The amount must be greater than 0 and less than 1,000,000"),
		body('typeIncome')
			.isIn(Object.values(INCOME_TYPES))
			.withMessage("Invalid type"),
		body('categoryIncome')
			.isIn(Object.values(INCOME_CATEGORIES))
			.withMessage("Invalid category"),
		body('commentsIncome')
			.notEmpty()
			.withMessage("The comment is required (or N/A)")
			.isLength({ min: 2, max: 100 })
			.withMessage("The comment's length must be between 2 and 100 characters"),
		body('locationIncome')
			.notEmpty()
			.withMessage("The location is required")
			.isLength({ min: 2, max: 50 })
			.withMessage("The location's length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("Location must contain only letters and spaces")
	]
)
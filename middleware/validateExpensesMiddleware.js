// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body } from 'express-validator'
// IMPORT VALIDATION MIDDLEWARE
import { withValidationErrors } from './validationMiddleware.js'
// IMPORT CONSTANTS
import { EXPENSES_CATEGORIES, EXPENSES_TYPES } from '../utils/constantsExpenses.js'


// VALIDATE EXPENSE MIDDLEWARE
export const validateExpenseInput = withValidationErrors(
	[
		body('amountExpense')
			.notEmpty()
			.withMessage("The amount is required")
			.isNumeric()
			.withMessage("The amount must be a number")
			.custom((i) => i > 0 && i < 1000000)
			.withMessage("The amount must be greater than 0 and less than 1,000,000"),
		body('typeExpense')
			.isIn(Object.values(EXPENSES_TYPES))
			.withMessage("Invalid type"),
		body('categoryExpense')
			.isIn(Object.values(EXPENSES_CATEGORIES))
			.withMessage("Invalid category"),
		body('commentsExpense')
			.notEmpty()
			.withMessage("The comment is required (or N/A)")
			.isLength({ min: 2, max: 100 })
			.withMessage("The comment's length must be between 2 and 100 characters"),
		body('locationExpense')
			.notEmpty()
			.withMessage("The location is required")
			.isLength({ min: 2, max: 50 })
			.withMessage("The location's length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("Location must contain only letters and spaces")
	]
)

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
			.isFloat({ min: 0.01, max: 999999.99 })  /* allow decimal numbers within the range */
			.withMessage("The amount must be a decimal greater than 0 and less than 1,000,000"),
		body('typeExpense')
			.isIn(Object.values(EXPENSES_TYPES))
			.withMessage("Invalid type"),
		body('categoryExpense')
			.isIn(Object.values(EXPENSES_CATEGORIES))
			.withMessage("Invalid category"),
		body('commentsExpense') /* there is no validation at all for commentsExpense in the search form (SearchExpensesContainerComponent) */
			.notEmpty()
			.withMessage("The comment is required (or N/A)")
			.isLength({ min: 2, max: 30 })
			.withMessage("The comment's length must be between 2 and 30 characters"),
		body('locationExpense')
			.notEmpty()
			.withMessage("The location is required")
			.isLength({ min: 2, max: 50 })
			.withMessage("The location's length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("Location must contain only letters and spaces")
	]
)

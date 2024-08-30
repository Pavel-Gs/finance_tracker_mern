// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body, validationResult } from 'express-validator'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError } from '../errors/customErrors.js'
// IMPORT CONSTANTS
import { EXPENSES_CATEGORIES, EXPENSES_TYPES } from '../utils/constantsExpenses.js'
import { INCOME_CATEGORIES, INCOME_TYPES } from '../utils/constantsIncome.js'


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


// VALIDATE EXPENSE MIDDLEWARE
export const validateExpenseInput = withValidationErrors(
	[
		body('amountExpense')
			.notEmpty().withMessage("the amount is required")
			.isNumeric().withMessage("This must be a number")
			.custom((i) => i > 0 && i < 1000000).withMessage("Must be greater than 0 and less than 1,000,000"),
		body('typeExpense')
			.isIn(EXPENSES_TYPES),
		body('categoryExpense')
			.isIn(EXPENSES_CATEGORIES),
		body('commentsExpense')
			.notEmpty().withMessage("the comment is required (or N/A)")
			.isLength({min: 2, max: 100}).withMessage("the length must be between 2 and 100 characters"),
		body('locationExpense')
			.notEmpty().withMessage("the location is required")
			.isLength({min: 2, max: 50}).withMessage("the length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/).withMessage("location must contain only letters and spaces"),
	]
)


// VALIDATE INCOME MIDDLEWARE
export const validateIncomeInput = withValidationErrors(
	[
		body('amountIncome')
			.notEmpty().withMessage("the amount is required")
			.isNumeric().withMessage("This must be a number")
			.custom((i) => i > 0 && i < 1000000).withMessage("Must be greater than 0 and less than 1,000,000"),
		body('typeIncome')
			.isIn(INCOME_TYPES),
		body('categoryIncome')
			.isIn(INCOME_CATEGORIES),
		body('commentsIncome')
			.notEmpty().withMessage("the comment is required (or N/A)")
			.isLength({min: 2, max: 100}).withMessage("the length must be between 2 and 100 characters"),
		body('locationIncome')
			.notEmpty().withMessage("the location is required")
			.isLength({min: 2, max: 50}).withMessage("the length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/).withMessage("location must contain only letters and spaces"),
	]
)
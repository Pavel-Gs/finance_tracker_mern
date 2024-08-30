// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT MODELS
import { ExpensesModel } from '../models/ExpensesModel.js'
import { IncomeModel } from '../models/IncomeModel.js'
// IMPORT EXPRESS VALIDATION FUNCTIONS
import { param, validationResult } from 'express-validator'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'


// ERROR MIDDLEWARE FUNCTION FOR VALIDATION
export const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((i) => i.msg)
				if (errorMessages[0].startsWith("No entry")) throw new NotFoundError(errorMessages)
				throw new BadRequestError(errorMessages)
			}
			next()
		}
	]
}


// VALIDATE ID PARAMS MIDDLEWARE
export const validateIdParam = withValidationErrors(
	[
		param('id')
			.custom(async (i) => {
				const isValidMongoId = mongoose.Types.ObjectId.isValid(i)
				if (!isValidMongoId) throw new BadRequestError("Invalid MongoDB id")
				const singleExpense = await ExpensesModel.findById(i)
				const singleIncome = await IncomeModel.findById(i)
				if (!singleExpense || !singleIncome) throw new NotFoundError(`No entry with id ${i}`)
			})
	]
)
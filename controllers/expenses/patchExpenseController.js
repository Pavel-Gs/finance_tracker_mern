// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT CUSTOM ERROR CLASSES
import { NotFoundError } from '../../errors/customErrors.js'


// PATCH EXPENSE CONTROLLER
export const patchExpenseController = async (req, res) => {
	const { id } = req.params
	const patchedExpense = await ExpensesModel.findByIdAndUpdate(id, req.body, {
		new: true
	})
	if (!patchedExpense) throw new NotFoundError(`no expense entry with id ${id}`)
	res.status(StatusCodes.OK).json({ message: "expense entry modified", expense: patchedExpense })
}
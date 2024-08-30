// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// PATCH EXPENSE CONTROLLER
export const patchExpenseController = async (req, res) => {
	const patchedExpense = await ExpensesModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})
	res.status(StatusCodes.OK).json({ message: "Expense entry modified", expense: patchedExpense })
}
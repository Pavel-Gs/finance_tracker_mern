// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// DELETE AN EXPENSE CONTROLLER
export const deleteExpenseController = async (req, res) => {
	const deletedExpense = await ExpensesModel.findByIdAndDelete(req.params.id)
	res.status(StatusCodes.OK).json({ message: "Expense entry deleted", expense: deletedExpense })
}

// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT CUSTOM ERROR CLASSES
import { NotFoundError } from '../../errors/customErrors.js'


// DELETE AN EXPENSE
export const deleteExpenseController = async (req, res) => {
	const { id } = req.params
	const deletedExpense = await ExpensesModel.findByIdAndDelete(id)
	if (!deletedExpense) throw new NotFoundError(`no expense with id ${id}`)
	res.status(StatusCodes.OK).json({ message: "Expense entry deleted", expense: deletedExpense })
}

// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT CUSTOM ERROR CLASSES
import { NotFoundError } from '../../errors/customErrors.js'


// GET SINGLE EXPENSE CONTROLLER
export const getSingleExpenseController = async (req, res) => {
	const { id } = req.params
	const singleExpense = await ExpensesModel.findById(id)
	if (!singleExpense) throw new NotFoundError(`no expense entry with id ${id}`)
	res.status(StatusCodes.OK).json({ singleExpense })
}
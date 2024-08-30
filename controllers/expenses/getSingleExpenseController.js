// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// GET SINGLE EXPENSE CONTROLLER
export const getSingleExpenseController = async (req, res) => {
	const singleExpense = await ExpensesModel.findById(req.params.id)
	res.status(StatusCodes.OK).json({ singleExpense })
}
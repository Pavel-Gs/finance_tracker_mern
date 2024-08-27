// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// POST NEW EXPENSE CONTROLLER
export const postNewExpenseController = async (req, res) => {
		const newExpense = await ExpensesModel.create(req.body)
		res.status(StatusCodes.CREATED).json({ newExpense })
}
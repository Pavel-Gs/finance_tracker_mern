import { expensesList } from './expensesList.js'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET ALL EXPENSES CONTROLLER
export const getAllExpensesController = async (req, res) => {
	res.status(200).json({ expensesList })
}
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET ALL EXPENSES CONTROLLER
export const getAllExpensesController = async (req, res) => {
	const allExpenses = await ExpensesModel.find({})
	res.status(200).json({ allExpenses })
}
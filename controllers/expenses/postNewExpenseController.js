// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// POST NEW EXPENSE CONTROLLER
export const postNewExpenseController = async (req, res) => {
	const newExpense = await ExpensesModel.create(req.body)
	res.status(201).json({ newExpense })
}
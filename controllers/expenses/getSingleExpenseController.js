// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET SINGLE EXPENSE CONTROLLER
export const getSingleExpenseController = async (req, res) => {
	const { id } = req.params
	const singleExpense = await ExpensesModel.findById(id)
	if (!singleExpense) {
		return res.status(404).json({ message: `no expense with id ${id}` })
	}
	res.status(200).json({ singleExpense })
}
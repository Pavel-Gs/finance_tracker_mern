// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// DELETE AN EXPENSE
export const deleteExpenseController = async (req, res) => {
	const { id } = req.params
	const deletedExpense = await ExpensesModel.findByIdAndDelete(id)
	if (!deletedExpense) {
		return res.status(404).json({ message: `No expense with id ${id}` })
	}
	res.status(200).json({ message: "Expense deleted", expense: deletedExpense })
}

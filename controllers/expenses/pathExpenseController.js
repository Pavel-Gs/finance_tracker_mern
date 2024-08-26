// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// PATCH EXPENSE CONTROLLER
export const patchExpenseController = async (req, res) => {
	const { id } = req.params
	const patchedExpense = await ExpensesModel.findByIdAndUpdate(id, req.body, {
		new: true
	})
	if (!patchedExpense) {
		return res.status(404).json({ message: `no expense with id ${id}` })
	}
	res.status(200).json({ message: "expense modified", expense: patchedExpense })
}
import { expensesList } from './expensesList.js'


// DELETE AN EXPENSE
export const deleteExpenseController = async (req, res) => {
	const { id } = req.params
	const index = expensesList.findIndex((i) => i.id === id)
	if (index === -1) {
		return res.status(404).json({ message: `No expense with id ${id}` })
	}
	expensesList.splice(index, 1)
	res.status(200).json({ message: "Expense deleted" })
}

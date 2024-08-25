import { expensesList } from './expensesList.js'


// PATCH EXPENSE CONTROLLER
export const patchExpenseController = async (req, res) => {
	const { amount, category } = req.body
	if (!amount || !category) {
		return res.status(400).json({ message: "provide an amount and/or category" })
	}
	const { id } = req.params
	const singleExpense = expensesList.find((i) => i.id === id)
	if (!singleExpense) {
		return res.status(404).json({ message: `no expense with id ${id}` })
	}
	singleExpense.amount = amount
	singleExpense.category = category
	res.status(200).json({ message: "expense modified", singleExpense })
}
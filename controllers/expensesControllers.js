// TESTING CRUD
let expensesList = [
	{
		id: crypto.randomUUID(),
		amount: 2150,
		category: "rent"
	},
	{
		id: crypto.randomUUID(),
		amount: 650,
		category: "loan"
	}
]


// GET ALL EXPENSES
export const getAllExpensesController = async (req, res) => {
	res.status(200).json({ expensesList })
}

// POST NEW EXPENSE
export const postNewExpenseController = async (req, res) => {
	const { amount, category } = req.body
	if (!amount || !category) {
		return res.status(400).json({ message: "provide an amount and/or category" })
	}
	const id = crypto.randomUUID()
	const newExpense = { id, amount, category }
	expensesList.push(newExpense)
	res.status(201).json({ newExpense })
}

// GET SINGLE EXPENSE
export const getSingleExpenseController = async (req, res) => {
	const { id } = req.params
	const singleExpense = expensesList.find((i) => i.id === id)
	if (!singleExpense) {
		return res.status(404).json({ message: `no expense with id ${id}` })
	}
	res.status(200).json({ singleExpense })
}

// PATCH AN EXPENSE
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

// DELETE AN EXPENSE
export const deleteExpenseController = async (req, res) => {
	const { id } = req.params
	const singleExpense = expensesList.find((i) => i.id === id)
	if (!singleExpense) {
		return res.status(404).json({ message: `no expense with id ${id}` })
	}
	const newExpensesList = expensesList.filter((i) => i.id !== id)
	expensesList = newExpensesList
	res.status(200).json({message: "expense deleted"})
}
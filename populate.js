// IMPORT MODULES
import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { ExpensesModel } from './models/ExpensesModel.js'
import { IncomeModel } from './models/IncomeModel.js'
import { UserModel } from './models/UserModel.js'


// POPULATE EXPENSES OR INCOME



// POPULATE EXPENSES
/* try {
	await mongoose.connect(process.env.MONGO_URL)
	const user = await UserModel.findOne({emailUser: 'john@gmail.com'})
	const jsonExpenses = JSON.parse(await readFile(new URL('./utils/MOCK_DATA_EXPENSES.json', import.meta.url)))
	const expenses = jsonExpenses.map((i) => {
		return {...i, createdBy: user._id}
	})
	await ExpensesModel.deleteMany({createdBy: user._id})
	await ExpensesModel.create(expenses)
	console.log('Expenses populated')
	process.exit(0)
} catch (error) {
	console.log(error)
	process.exit(1)
} */


// POPULATE INCOME
try {
	await mongoose.connect(process.env.MONGO_URL)
	const user = await UserModel.findOne({emailUser: 'john@gmail.com'})
	const jsonIncome = JSON.parse(await readFile(new URL('./utils/MOCK_DATA_INCOME.json', import.meta.url)))
	const income = jsonIncome.map((i) => {
		return {...i, createdBy: user._id}
	})
	await IncomeModel.deleteMany({createdBy: user._id})
	await IncomeModel.create(income)
	console.log('Income populated')
	process.exit(0)
} catch (error) {
	console.log(error)
	process.exit(1)
}
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
import { ExpensesModel } from '../../models/ExpensesModel.js'
import { IncomeModel } from '../../models/IncomeModel.js'


// GET APPLICATION STATUS (FOR ADMIN) CONTROLLER
export const getApplicationStatsController = async (req, res) => {
	const allUsers = await UserModel.find()
	const allUsersCount = await UserModel.countDocuments()
	const allExpensesCount = await ExpensesModel.countDocuments()
	const allIncomeCount = await IncomeModel.countDocuments()
	res.status(StatusCodes.OK).json({ allUsers, allUsersCount, allExpensesCount, allIncomeCount })
}

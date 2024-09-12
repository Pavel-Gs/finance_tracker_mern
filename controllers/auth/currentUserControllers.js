// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
import { ExpensesModel } from '../../models/ExpensesModel.js'
import { IncomeModel } from '../../models/IncomeModel.js'


// GET CURRENT USER CONTROLLER
export const getCurrentUserController = async (req, res) => {
	const currentUser = await UserModel.findOne({ _id: req.authenticatedUser.userId })
	const userWithoutPassword = currentUser.toJSON() /* use "toJSON" method from UserModel */
	res.status(StatusCodes.OK).json({ currentUser: userWithoutPassword })
}

// UPDATE USER CONTROLLER
export const updateUserController = async (req, res) => {

	/* remove current user's password from req.body, in order to disable password update functionality after registration */
	const obj = {...req.body}
	delete obj.passwordUser
	
	/* pass in "obj" (without the password), instead of "req.body" (also, see authUserMiddleware) */
	const updatedUser = await UserModel.findByIdAndUpdate(req.authenticatedUser.userId, obj)
	res.status(StatusCodes.OK).json({ message: "User info has been updated" })
}

// GET APPLICATION STATUS (FOR ADMIN) CONTROLLER
export const getApplicationStatsController = async (req, res) => {
	const allUsers = await UserModel.countDocuments()
	const allExpenses = await ExpensesModel.countDocuments()
	const allIncome = await IncomeModel.countDocuments()
	res.status(StatusCodes.OK).json({ allUsers, allExpenses, allIncome })
}

// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
import { ExpensesModel } from '../../models/ExpensesModel.js'
import { IncomeModel } from '../../models/IncomeModel.js'


// GET CURRENT USER CONTROLLER
export const getCurrentUserController = async (req, res) => {
	res.status(StatusCodes.OK).json({message: "Get current user"})
}

// UPDATE USER CONTROLLER
export const updateUserController = async (req, res) => {
	res.status(StatusCodes.OK).json({message: "Update user"})
}

// GET APPLICATION STATUS (FOR ADMIN) CONTROLLER
export const getApplicationStatsController = async (req, res) => {
	res.status(StatusCodes.OK).json({message: "Application stats"})
}

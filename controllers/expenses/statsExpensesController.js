// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'


// SHOW EXPENSES STATS CONTROLLER
export const showExpensesStatsController = async (req, res) => {
	const defaultStats = {
		totalExpenses: 56,
		totalAmount: 122444,
		averageAmount: 2300,
		monthlyExpenses: 4000,
		monthlyAmount: 4000,
		monthlyAverage: 2345
	}
	res.status(StatusCodes.OK).json({defaultStats})
}

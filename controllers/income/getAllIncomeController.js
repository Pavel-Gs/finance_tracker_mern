// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// GET ALL INCOME CONTROLLER
export const getAllIncomeController = async (req, res) => {
	const allIncome = await IncomeModel.find({})
	res.status(StatusCodes.OK).json({ allIncome })
}
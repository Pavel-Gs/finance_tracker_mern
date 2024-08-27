// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// GET ALL INCOME CONTROLLER
export const getAllIncomeController = async (req, res) => {
	const allIncome = await IncomeModel.find({})
	res.status(StatusCodes.OK).json({ allIncome })
}
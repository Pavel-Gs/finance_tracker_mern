// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// GET SINGLE INCOME CONTROLLER
export const getSingleIncomeController = async (req, res) => {
	const singleIncome = await IncomeModel.findById(req.params.id)
	res.status(StatusCodes.OK).json({ singleIncome })
}
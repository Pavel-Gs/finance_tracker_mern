// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// POST NEW INCOME CONTROLLER
export const postNewIncomeController = async (req, res) => {
		const newIncome = await IncomeModel.create(req.body)
		res.status(StatusCodes.CREATED).json({ newIncome })
}
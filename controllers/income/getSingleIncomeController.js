// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT CUSTOM ERROR CLASSES
import { NotFoundError } from '../../errors/customErrors.js'


// GET SINGLE INCOME CONTROLLER
export const getSingleIncomeController = async (req, res) => {
	const { id } = req.params
	const singleIncome = await IncomeModel.findById(id)
	if (!singleIncome) throw new NotFoundError(`no income entry with id ${id}`)
	res.status(StatusCodes.OK).json({ singleIncome })
}
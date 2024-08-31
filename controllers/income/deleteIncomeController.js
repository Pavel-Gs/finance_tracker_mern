// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// DELETE AN INCOME CONTROLLER
export const deleteIncomeController = async (req, res) => {
	const deletedIncome = await IncomeModel.findByIdAndDelete(req.params.id)
	res.status(StatusCodes.OK).json({ message: "Income entry deleted", income: deletedIncome })
}

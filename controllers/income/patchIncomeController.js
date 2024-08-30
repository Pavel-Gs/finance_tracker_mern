// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// PATCH INCOME CONTROLLER
export const patchIncomeController = async (req, res) => {
	const patchedIncome = await IncomeModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})
	res.status(StatusCodes.OK).json({ message: "Income entry modified", income: patchedIncome })
}
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT CUSTOM ERROR CLASSES
import { NotFoundError } from '../../errors/customErrors.js'


// DELETE AN INCOME
export const deleteIncomeController = async (req, res) => {
	const { id } = req.params
	const deletedIncome = await IncomeModel.findByIdAndDelete(id)
	if (!deletedIncome) throw new NotFoundError(`no income entry with id ${id}`)
	res.status(StatusCodes.OK).json({ message: "Income entry deleted", income: deletedIncome })
}

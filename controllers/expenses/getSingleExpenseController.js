// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET SINGLE EXPENSE CONTROLLER
export const getSingleExpenseController = async (req, res) => {
	const singleExpense = await ExpensesModel.findById(req.params.id)
		.populate('createdBy', 'firstName lastName') /* populate createdBy object with the creator's first and last names */
	res.status(StatusCodes.OK).json({ singleExpense })
}
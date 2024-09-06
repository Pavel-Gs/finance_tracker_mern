// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// POST NEW EXPENSE CONTROLLER
export const postNewExpenseController = async (req, res) => {

	/* set the createdBy field to the authenticated user's ID */
	req.body.createdBy = req.authenticatedUser.userId

	/* set the organizationName to the authenticated user's organization */
	req.body.organizationName = req.authenticatedUser.userOrg || "N/A" /* default to N/A; this is also set in the ExpensesModel.js and in the UserModel.js */

	const newExpense = await ExpensesModel.create(req.body)
	res.status(StatusCodes.CREATED).json({ newExpense })
}
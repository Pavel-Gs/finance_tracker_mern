// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// POST NEW INCOME CONTROLLER
export const postNewIncomeController = async (req, res) => {

	/* set the createdBy field to the authenticated user's ID */
	req.body.createdBy = req.authenticatedUser.userId

	/* set the organizationName to the authenticated user's organization */
	req.body.organizationName = req.authenticatedUser.userOrg || "N/A" /* default to N/A; this is also set in the ExpensesModel.js and in the UserModel.js */

	const newIncome = await IncomeModel.create(req.body)
	res.status(StatusCodes.CREATED).json({ newIncome })
}
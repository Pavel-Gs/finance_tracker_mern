// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET ALL EXPENSES CONTROLLER
export const getAllExpensesController = async (req, res) => {

	/* find out, whether the user is a member of an organization */
	const queryOrg = req.authenticatedUser.userOrg === "N/A"
		? { createdBy: req.authenticatedUser.userId } /* show all expenses based on user's ID, if the user is not a member of an organization */
		: { organizationName: req.authenticatedUser.userOrg } /* show all expenses based on user's organization name, if the user belongs to an organization */

	/* show results, based on the membership (or the lack of it) */
	const allExpenses = await ExpensesModel.find(queryOrg)

	res.status(StatusCodes.OK).json({ allExpenses })
}
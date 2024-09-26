// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// GET ALL INCOME CONTROLLER
export const getAllIncomeController = async (req, res) => {

	/* find out, whether the user is a member of an organization */
	const queryOrg = req.authenticatedUser.userOrg === "N/A"
		? { createdBy: req.authenticatedUser.userId } /* show all expenses based on user's ID, if the user is not a member of an organization */
		: { organizationName: req.authenticatedUser.userOrg } /* show all expenses based on user's organization name, if the user belongs to an organization */

	/* show results, based on the membership (or the lack of it) */
	const allIncome = await IncomeModel.find(queryOrg)
		.populate('createdBy', 'firstName lastName') /* populate createdBy object with the creator's first and last names */
		
	res.status(StatusCodes.OK).json({ allIncome })
}
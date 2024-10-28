// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'


// GET ALL INCOME CONTROLLER
export const getAllIncomeController = async (req, res) => {

	/* find out, whether the user is a member of an organization */
	let queryOrg = req.authenticatedUser.userOrg === "N/A"
		? { createdBy: req.authenticatedUser.userId } /* show all expenses based on user's ID, if the user is not a member of an organization */
		: { organizationName: req.authenticatedUser.userOrg } /* show all expenses based on user's organization name, if the user belongs to an organization */

	/* add other search parameters to the queryOrg if the search query parameter is provided */
	if (req.query.commentsIncome) {
		queryOrg.commentsIncome = { $regex: req.query.commentsIncome, $options: 'i' } /* case-insensitive regex search */
	}
	if (req.query.typeIncome && req.query.typeIncome !== "all") {
		queryOrg.typeIncome = req.query.typeIncome
	}
	if (req.query.categoryIncome && req.query.categoryIncome !== "all") {
		queryOrg.categoryIncome = req.query.categoryIncome
	}
	/* date range filter */
	if (req.query.startDate || req.query.endDate) {
		queryOrg.dateIncome = {}
		if (req.query.startDate) {
			queryOrg.dateIncome.$gte = new Date(req.query.startDate) /* greater than or equal to startDate */
		}
		if (req.query.endDate) {
			queryOrg.dateIncome.$lte = new Date(req.query.endDate) /* less than or equal to endDate */
		}
	}

	/* sorting options */
	const sortOptions = {
		newest: '-dateIncome',
		oldest: 'dateIncome',
		biggest: '-amountIncome',
		smallest: 'amountIncome'
	}
	const sortKey = sortOptions[req.query.sort] || sortOptions.newest

	/* pagination */
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 20 /* amount of entries to display on a single page */
	const skip = (page - 1) * limit
	const incomeEntries = await IncomeModel.countDocuments(queryOrg)
	const numOfPages = Math.ceil(incomeEntries / limit)

	/* show results, based on the membership (or the lack of it) */
	const allIncome = await IncomeModel.find(queryOrg).sort(sortKey).skip(skip).limit(limit)
		.populate('createdBy', 'firstName lastName') /* populate createdBy object with the creator's first and last names */

	res.status(StatusCodes.OK).json({ incomeEntries, numOfPages, currentPage: page, allIncome })
}
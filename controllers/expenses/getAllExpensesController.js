// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'


// GET ALL EXPENSES CONTROLLER
export const getAllExpensesController = async (req, res) => {

	/* find out, whether the user is a member of an organization */
	let queryOrg = req.authenticatedUser.userOrg === "N/A"
		? { createdBy: req.authenticatedUser.userId } /* show all expenses based on user's ID, if the user is not a member of an organization */
		: { organizationName: req.authenticatedUser.userOrg } /* show all expenses based on user's organization name, if the user belongs to an organization */

	/* add other search parameters to the queryOrg if the search query parameter is provided */
	if (req.query.commentsExpense) {
		queryOrg.commentsExpense = { $regex: req.query.commentsExpense, $options: 'i' } /* case-insensitive regex search */
	}
	if (req.query.typeExpense && req.query.typeExpense !== "all") {
		queryOrg.typeExpense = req.query.typeExpense
	}
	if (req.query.categoryExpense && req.query.categoryExpense !== "all") {
		queryOrg.categoryExpense = req.query.categoryExpense
	}
	/* date range filter */
	if (req.query.startDate || req.query.endDate) {
		queryOrg.dateExpense = {}
		if (req.query.startDate) {
			queryOrg.dateExpense.$gte = new Date(req.query.startDate) /* greater than or equal to startDate */
		}
		if (req.query.endDate) {
			queryOrg.dateExpense.$lte = new Date(req.query.endDate) /* less than or equal to endDate */
		}
	}

	/* sorting options */
	const sortOptions = {
		newest: '-dateExpense',
		oldest: 'dateExpense',
		biggest: '-amountExpense',
		smallest: 'amountExpense'
	}
	const sortKey = sortOptions[req.query.sort] || sortOptions.newest

	/* pagination */
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 20 /* amount of entries to display on a single page */
	const skip = (page - 1) * limit
	const expensesEntries = await ExpensesModel.countDocuments(queryOrg)
	const getExpensesSum = await ExpensesModel.aggregate([
		{ $match: queryOrg }, /* filter based on queryOrg criteria */
		{
			$group: {
				_id: null, /* group all matched documents together */
				totalAmount: { $sum: "$amountExpense" } /* sum of amountExpense field */
			}
		}
	])
	const currentExpensesSum = getExpensesSum[0]?.totalAmount || 0;
	const numOfPages = Math.ceil(expensesEntries / limit)

	/* show results, based on the membership (or the lack of it) */
	const allExpenses = await ExpensesModel.find(queryOrg).sort(sortKey).skip(skip).limit(limit)
		.populate('createdBy', 'firstName lastName') /* populate createdBy object with the creator's first and last names */

	res.status(StatusCodes.OK).json({ expensesEntries, currentExpensesSum, currentPage: page, allExpenses })
}
// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { ExpensesModel } from '../../models/ExpensesModel.js'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'


// SHOW EXPENSES STATS CONTROLLER
export const showExpensesStatsController = async (req, res) => {

	/* set match condition */
	let matchCondition = {}
	if (req.authenticatedUser.userOrg === "N/A") {
		matchCondition = { createdBy: new mongoose.Types.ObjectId(req.authenticatedUser.userId) } /* match by user id, if there's no organization (ignore crossed out "ObjectId") */
	} else {
		matchCondition = { organizationName: req.authenticatedUser.userOrg } /* match by organization name, if a user is a member of an organization */
	}
	
	/* mongoose pipeline */
	let statsExpenses = await ExpensesModel.aggregate([
		{
			$match: matchCondition
		},
		{
			$group: {
				_id: '$typeExpense',
				count: { $sum: 1 },
			}
		}
	])
	statsExpenses = statsExpenses.reduce((acc, curr) => {
		const {_id: title, count} = curr
		acc[title] = count
		return acc
	}, {})
	console.log(statsExpenses)
	

	const defaultStats = {
		Medicine: statsExpenses.Medicine || 0,
		Monthly: statsExpenses.Monthly || 0,
		Food: statsExpenses.Food || 0,
		'Other Expenses': statsExpenses['Other Expenses'] || 0,
		Recreational: statsExpenses.Recreational || 0,
		'Alcohol & nicotine': statsExpenses['Alcohol & nicotine'] || 0,
		Geodesy: statsExpenses.Geodesy || 0,
		Home: statsExpenses.Home || 0,
		Commute: statsExpenses.Commute || 0,

	}
	let monthlyExpenses = [{date: 'May 23', count: 12 }, {date: 'Jun 23',count: 9}, {date: 'Jul 23',count: 3}]
	res.status(StatusCodes.OK).json({ defaultStats, monthlyExpenses })
}

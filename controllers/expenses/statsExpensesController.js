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
	
	/* count by type */
	/* mongoose pipeline */
	let countExpensesTypes = await ExpensesModel.aggregate([
		/* stage 1: match by condition */
		{
			$match: matchCondition
		},
		/* stage 2: group by type */
		{
			$group: {
				_id: '$typeExpense',
				count: { $sum: 1 },
			}
		}
	])
	/* return the results as an object */
	countExpensesTypes = countExpensesTypes.reduce((acc, curr) => {
		const {_id: title, count} = curr
		acc[title] = count
		return acc
	}, {})
	/* use default stats if the count is zero */
	const defaultStats = {
		Medicine: countExpensesTypes.Medicine || 0,
		Monthly: countExpensesTypes.Monthly || 0,
		Food: countExpensesTypes.Food || 0,
		'Other expenses': countExpensesTypes['Other expenses'] || 0,
		Recreational: countExpensesTypes.Recreational || 0,
		'Alcohol & nicotine': countExpensesTypes['Alcohol & nicotine'] || 0,
		Geodesy: countExpensesTypes.Geodesy || 0,
		Home: countExpensesTypes.Home || 0,
		Commute: countExpensesTypes.Commute || 0,

	}

	/* get current year */
	const currentYear = day().year()

	/* group by date */
	/* mongoose pipeline */
	let monthlyExpenses = await ExpensesModel.aggregate([
		/* stage 1: match by condition and filter by current year */
		{
			$match: {
				...matchCondition,
				dateExpense: {
					$gte: new Date(currentYear, 0, 1),
					$lt: new Date(currentYear + 1, 0, 1)
				}
			}
		},
		/* stage 2: group by date */
		{
			$group: {
				_id: {
					year: { $year: '$dateExpense' },
					month: { $month: '$dateExpense' },
				},
				totalAmount: { $sum: "$amountExpense" }
			}
		},
		/* stage 3: sort by date */
		{
			$sort: {
				'_id.year':-1,
				'_id.month': -1
			}
		},
		/* stage 4: limit the returned range (may not be necessary, if filtering by current year) */
		{
			$limit: 12
		}
	])
	/* return the results as an object */
	monthlyExpenses = monthlyExpenses.map((i) => {
		const { _id: {year, month}, totalAmount } = i
		const date = day().month(month - 1).year(year).format('MMMM YYYY') /* "month - 1" is to compensate for january indexing as zero */
		return {
			date, totalAmount
		}
	}).reverse() /* reverse the map's return, so the latest dates displayed last */

	
	res.status(StatusCodes.OK).json({ defaultStats, monthlyExpenses })
}

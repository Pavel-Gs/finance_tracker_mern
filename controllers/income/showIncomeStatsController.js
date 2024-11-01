// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'


// SHOW INCOME STATS CONTROLLER
export const showIncomeStatsController = async (req, res) => {


	/* set match condition */
	let matchCondition = {}
	if (req.authenticatedUser.userOrg === "N/A") {
		matchCondition = { createdBy: new mongoose.Types.ObjectId(req.authenticatedUser.userId) } /* match by user id, if there's no organization (ignore crossed out "ObjectId") */
	} else {
		matchCondition = { organizationName: req.authenticatedUser.userOrg } /* match by organization name, if a user is a member of an organization */
	}


	/* get current year and month */
	const currentYear = day().year()
	const currentMonth = day().month() + 1 /* dayjs months are 0-indexed */


	/* count by type (count total amount of income entries) */
	/* mongoose pipeline */
	let countIncomeTypes = await IncomeModel.aggregate([
		/* stage 1: match by condition */
		{
			$match: matchCondition
		},
		/* stage 2: group by type */
		{
			$group: {
				_id: '$typeIncome',
				count: { $sum: 1 },
			}
		},
		/* stage 3: sort by count in descending order */
		{
			$sort: {
				count: -1
			}
		}
	])
	/* convert the results to an object */
	const countedIncomeTypes = countIncomeTypes.reduce((acc, { _id: title, count }) => {
		acc[title] = count || 0;
		return acc;
	}, {})


	/* group by date - year (count total sum of current annual income) */
	/* mongoose pipeline */
	let currentAnnualIncome = await IncomeModel.aggregate([
		/* stage 1: match by condition and filter by current year */
		{
			$match: {
				...matchCondition,
				$expr: {
					$eq: [{ $year: "$dateIncome" }, currentYear]
				}
			}
		},
		/* stage 2: group by date */
		{
			$group: {
				_id: {
					year: { $year: '$dateIncome' },
					month: { $month: '$dateIncome' },
				},
				totalAmount: { $sum: "$amountIncome" }
			}
		},
		/* stage 3: sort by date */
		{
			$sort: {
				'_id.year': -1,
				'_id.month': -1
			}
		},
		/* stage 4: limit the returned range (may not be necessary, if filtering by current year) */
		{
			$limit: 12
		}
	])
	/* return the results as an object */
	currentAnnualIncome = currentAnnualIncome.map((i) => {
		const { _id: { year, month }, totalAmount } = i
		const date = day().month(month - 1).year(year).format('MMMM YYYY') /* "month - 1" is to compensate for january indexing as zero */
		return {
			date, totalAmount
		}
	}).reverse() /* reverse the map's return, so the latest dates displayed last */


	/* group by date - month (count total sum of the current month's income) */
	/* mongoose pipeline */
	let currentMonthlyIncome = await IncomeModel.aggregate([
		/* stage 1: match by condition and filter by current year and month */
		{
			$match: {
				...matchCondition,
				$expr: {
					$and: [
						{ $eq: [{ $year: "$dateIncome" }, currentYear] },
						{ $eq: [{ $month: "$dateIncome" }, currentMonth] }
					]
				}
			}
		},
		/* stage 2: group by date */
		{
			$group: {
				_id: null,
				totalAmount: { $sum: "$amountIncome" }
			}
		}
	])
	/* return the results */
	currentMonthlyIncome = currentMonthlyIncome[0]?.totalAmount || 0


	res.status(StatusCodes.OK).json({ countedIncomeTypes, currentAnnualIncome, currentMonthlyIncome })
}

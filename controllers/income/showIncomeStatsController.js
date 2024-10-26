// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { IncomeModel } from '../../models/IncomeModel.js'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'


// SHOW EXPENSES STATS CONTROLLER
export const showIncomeStatsController = async (req, res) => {

	/* set match condition */
	let matchCondition = {}
	if (req.authenticatedUser.userOrg === "N/A") {
		matchCondition = { createdBy: new mongoose.Types.ObjectId(req.authenticatedUser.userId) } /* match by user id, if there's no organization (ignore crossed out "ObjectId") */
	} else {
		matchCondition = { organizationName: req.authenticatedUser.userOrg } /* match by organization name, if a user is a member of an organization */
	}

	/* count by type */
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
	const defaultStats = countIncomeTypes.reduce((acc, { _id: title, count }) => {
		acc[title] = count || 0;
		return acc;
	}, {});
	console.log(defaultStats)

	/* get current year */
	const currentYear = day().year()

	/* group by date */
	/* mongoose pipeline */
	let monthlyIncome = await IncomeModel.aggregate([
		/* stage 1: match by condition and filter by current year */
		{
			$match: {
				...matchCondition,
				dateIncome: {
					$gte: new Date(currentYear, 0, 1),
					$lt: new Date(currentYear + 1, 0, 1)
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
	monthlyIncome = monthlyIncome.map((i) => {
		const { _id: { year, month }, totalAmount } = i
		const date = day().month(month - 1).year(year).format('MMMM YYYY') /* "month - 1" is to compensate for january indexing as zero */
		return {
			date, totalAmount
		}
	}).reverse() /* reverse the map's return, so the latest dates displayed last */


	res.status(StatusCodes.OK).json({ defaultStats, monthlyIncome })
}

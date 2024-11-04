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

    /* get current year and month */
    const currentYear = day().year()
    const currentMonth = day().month() + 1 /* dayjs months are 0-indexed */


    /* (count total amount of expense entries and their corresponding value sum) --------------------------------------------------- (for stats) */
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
                totalAmount: { $sum: '$amountExpense' } /* calculate the sum of amountExpense for each type */
            }
        },
        /* stage 3: sort by count in descending order */
        {
            $sort: {
                totalAmount: -1
            }
        }
    ])
    /* convert the results to an object */
    const countedExpensesTypes = countExpensesTypes.reduce((acc, { _id: title, count, totalAmount }) => {
        acc[title] = {
            count: count || 0,
            totalAmount: totalAmount || 0
        }
        return acc
    }, {})


    /* (count the sum of the current year's expenses and group by month) ---------------------------------------------------------- (for charts) */
    /* mongoose pipeline */
    //let currentAnnualExpensesArray = await ExpensesModel.aggregate([
    //    /* stage 1: match by condition and filter by current year */
    //    {
    //        $match: {
    //            ...matchCondition,
    //            $expr: {
    //                $eq: [{ $year: "$dateExpense" }, currentYear]
    //            }
    //        }
    //    },
    //    /* stage 2: group by date and get the sum */
    //    {
    //        $group: {
    //            _id: {
    //                year: { $year: '$dateExpense' },
    //                month: { $month: '$dateExpense' }
    //            },
    //            totalAmount: { $sum: "$amountExpense" }
    //        }
    //    },
    //    /* stage 3: sort by date */
    //    {
    //        $sort: {
    //            '_id.year': -1,
    //            '_id.month': -1
    //        }
    //    },
    //    /* stage 4: limit the returned range (may not be necessary, if filtering by current year) */
    //    {
    //        $limit: 12
    //    }
    //])
    ///* return the results as an object */
    //currentAnnualExpensesArray = currentAnnualExpensesArray.map((i) => {
    //    const { _id: { year, month }, totalAmount } = i
    //    const date = day().month(month - 1).year(year).format('MMMM YYYY') /* "month - 1" is to compensate for january indexing as zero */
    //    return {
    //        date, totalAmount
    //    }
    //}).reverse() /* reverse the map's return, so the latest dates displayed last */


	/* (count the sum of the current year's expenses and group by month) ---------------------------------------------------------- (for charts) */
    /* mongoose pipeline */
    let overallAnnualExpensesArray = await ExpensesModel.aggregate([
        /* stage 1: match by condition and filter by current year */
        {
            $match: {
                ...matchCondition
            }
        },
        /* stage 2: group by date and get the sum */
        {
            $group: {
                _id: {
                    year: { $year: '$dateExpense' }
                },
                totalAmount: { $sum: "$amountExpense" }
            }
        },
        /* stage 3: sort by date */
        {
            $sort: {
                '_id.year': -1
            }
        }
    ])
    /* return the results as an object */
    overallAnnualExpensesArray = overallAnnualExpensesArray.map((i) => {
        const { _id: { year }, totalAmount } = i
        return {
            year, totalAmount
        }
    }).reverse() /* reverse the map's return, so the latest dates displayed last */


    /* (count the sum of the current month's expenses) ---------------------------------------------------------------------------- (for navbar) */
    /* mongoose pipeline */
    let currentMonthlyExpensesSum = await ExpensesModel.aggregate([
        /* stage 1: match by condition and filter by current year and month */
        {
            $match: {
                ...matchCondition,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$dateExpense" }, currentYear] },
                        { $eq: [{ $month: "$dateExpense" }, currentMonth] }
                    ]
                }
            }
        },
        /* stage 2: calculate the sum */
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amountExpense" }
            }
        }
    ])
    /* return the results */
    currentMonthlyExpensesSum = currentMonthlyExpensesSum[0]?.totalAmount || 0


    /* (count the sum of the current year's expenses) ------------------------------------------------------------------------------ (for navbar) */
    /* mongoose pipeline */
    let currentAnnualExpensesSum = await ExpensesModel.aggregate([
        /* stage 1: match by condition and filter by current year */
        {
            $match: {
                ...matchCondition,
                $expr: {
                    $eq: [{ $year: "$dateExpense" }, currentYear]
                }
            }
        },
        /* stage 2: calculate the sum */
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amountExpense" }
            }
        }
    ])
    /* return the results */
    currentAnnualExpensesSum = currentAnnualExpensesSum[0]?.totalAmount || 0

	
    res.status(StatusCodes.OK).json({ countedExpensesTypes, overallAnnualExpensesArray, currentAnnualExpensesSum, currentMonthlyExpensesSum })
};
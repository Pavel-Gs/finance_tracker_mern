// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT CONSTANTS
import { EXPENSES_TYPES } from '../utils/constantsExpenses.js'
import { EXPENSES_CATEGORIES } from '../utils/constantsExpenses.js'


// CREATE DATABASE SCHEMA FOR EXPENSES
const ExpensesSchema = new mongoose.Schema({
	amountExpense: Number,
	typeExpense: {
		type: String,
		enum: Object.values(EXPENSES_TYPES),
		default: EXPENSES_TYPES.MONTHLY
	},
	categoryExpense: {
		type: String,
		enum: Object.values(EXPENSES_CATEGORIES),
		default: EXPENSES_CATEGORIES.RENT
	},
	commentsExpense: {
		type: String,
		default: "N/A"
	},
	locationExpense: {
		type: String,
		default: "Kelowna"
	}
}, { timestamps: true })

export const ExpensesModel = mongoose.model('ExpensesModel', ExpensesSchema)
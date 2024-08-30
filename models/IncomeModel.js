// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT CONSTANTS
import { INCOME_TYPES } from '../utils/constantsIncome.js'
import { INCOME_CATEGORIES } from '../utils/constantsIncome.js'


// CREATE DATABASE SCHEMA FOR INCOME
const IncomeSchema = new mongoose.Schema({
	amountIncome: Number,
	typeIncome: {
		type: String,
		enum: Object.values(INCOME_TYPES),
		default: INCOME_TYPES.JOBS
	},
	categoryIncome: {
		type: String,
		enum: Object.values(INCOME_CATEGORIES),
		default: INCOME_CATEGORIES.JOBS_LENA
	},
	commentsIncome: {
		type: String,
		default: "N/A"
	},
	locationIncome: {
		type: String,
		default: "Kelowna"
	},
}, { timestamps: true })

export const IncomeModel = mongoose.model('IncomeModel', IncomeSchema)
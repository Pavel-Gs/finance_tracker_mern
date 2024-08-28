// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT CONSTANTS
import { EXPENSES_CATEGORIES } from '../utils/constants.js'


// CREATE DATABASE SCHEMA FOR EXPENSES
const ExpensesSchema = new mongoose.Schema({
	amount: Number,
	category: {
		type: String,
		enum: Object.values(EXPENSES_CATEGORIES),
		default: EXPENSES_CATEGORIES.OTHER
	},
	comments: {
		type: String,
		default: "N/A"
	},
	location: {
		type: String,
		default: "Kelowna"
	},
}, { timestamps: true })

export const ExpensesModel = mongoose.model('ExpensesModel', ExpensesSchema)
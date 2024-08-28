// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT CONSTANTS
import { INCOME_CATEGORIES } from '../utils/constants.js'


// CREATE DATABASE SCHEMA FOR INCOME
const IncomeSchema = new mongoose.Schema({
	amount: Number,
	category: {
		type: String,
		enum: Object.values(INCOME_CATEGORIES),
		default: INCOME_CATEGORIES.BESTBUY
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

export const IncomeModel = mongoose.model('IncomeModel', IncomeSchema)
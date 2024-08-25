// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'


// CREATE DATABASE SCHEMA FOR EXPENSES
const ExpensesSchema = new mongoose.Schema({
	amount: Number,
	category: {
		type: String,
		enum: [
			"Rent",
			"Loan",
			"Electricity",
			"Internet",
			"Cellphone",
			"Food",
			"Gas",
			"Software",
			"Other"
		]
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
// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'


// CREATE DATABASE SCHEMA FOR INCOME
const IncomeSchema = new mongoose.Schema({
	amount: Number,
	category: {
		type: String,
		enum: [
			"BestBuy",
			"Simplii",
			"RBC",
			"CRA",
			"Costco",
			"ICBC"
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

export const IncomeModel = mongoose.model('IncomeModel', IncomeSchema)
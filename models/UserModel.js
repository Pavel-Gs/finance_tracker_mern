// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'


// CREATE DATABASE SCHEMA FOR USERS
const UserSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		emailUser: String,
		passwordUser: String,
		locationUser: {
			type: String,
			default: "My city"
		},
		role: {
			type: String,
			enum: ["User", "Admin"],
			default: "User"
		},
		organization: {
			type: String,
			default: "N/A"
		}
	}
)

export const UserModel = mongoose.model('UserModel', UserSchema)
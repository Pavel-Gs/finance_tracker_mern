// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'


// CREATE DATABASE SCHEMA FOR USERS
const UserSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		location: {
			type: String,
			default: "My city"
		},
		role: {
			type: String,
			enum: ["User", "Admin"],
			default: "User"
		}
	}
)

export const UserModel = mongoose.model('UserModel', UserSchema)
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
		},
		avatar: String,
		avatarPublicId: String
	}
)

/* "toJSON" method will be used in "currentUserControllers", "getCurrentUserController" */
UserSchema.methods.toJSON = function () {
	/* using "this" will point out to an existing instance (a "user" instance) */
	let obj = this.toObject() /* transform current user to an object */
	delete obj.passwordUser /* prevent sending user's password when requesting current user */
	return obj
}

export const UserModel = mongoose.model('UserModel', UserSchema)
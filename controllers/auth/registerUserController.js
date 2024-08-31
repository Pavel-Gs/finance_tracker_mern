// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
// IMPORT UTILS FUNCTIONS
import { hashPassword } from '../../utils/passwordUtils.js'


// REGISTER NEW USER CONTROLLER
export const registerUserController = async (req, res) => {

	// check whether this is the first account
	const isFirstAccount = await UserModel.countDocuments() === 0
	req.body.role = isFirstAccount ? 'Admin' : 'User'

	// use hashed password
	const encryptUserPassword = await hashPassword(req.body.passwordUser)
	req.body.passwordUser = encryptUserPassword

	// create new user
	const newUser = await UserModel.create(req.body)
	
	res.status(StatusCodes.CREATED).json({ message: "New user created" })
}

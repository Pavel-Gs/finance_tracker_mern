// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UsersModel } from '../../models/UsersModel.js'


// GET ALL USERS CONTROLLER
export const getAllUsersController = async (req, res) => {

	/* show all users */
	const allUsers = await UsersModel.find()

	res.status(StatusCodes.OK).json({ allUsers })
}
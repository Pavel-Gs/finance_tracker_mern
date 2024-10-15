// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'
// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
// IMPORT CLOUDINARY PACKAGE (FOR IMAGE UPLOAD)
import cloudinary from 'cloudinary'
// IMPORT FILE SYSTEM MODULE (PROMISES OPTION)
import {promises as fs} from 'fs'


// GET CURRENT USER CONTROLLER
export const getCurrentUserController = async (req, res) => {
	const currentUser = await UserModel.findOne({ _id: req.authenticatedUser.userId })
	const userWithoutPassword = currentUser.toJSON() /* use "toJSON" method from UserModel */
	res.status(StatusCodes.OK).json({ currentUser: userWithoutPassword })
}


// UPDATE USER CONTROLLER
export const updateUserController = async (req, res) => {

	/* remove current user's password from req.body, in order to disable password update functionality after registration */
	const newUser = {...req.body}
	delete newUser.passwordUser

	/* manage image uploads */
	if (req.file) {
		const response = await cloudinary.v2.uploader.upload(req.file.path)
		await fs.unlink(req.file.path) /* delete the file from the folder */
		newUser.avatar = response.secure_url
		newUser.avatarPublicId = response.public_id
	}
	
	/* pass in "obj" (without the password), instead of "req.body" (also, see authUserMiddleware) */
	const updatedUser = await UserModel.findByIdAndUpdate(req.authenticatedUser.userId, newUser)

	/* delete an existing image from Cloudinary, if new image was uploaded */
	if (req.file && updatedUser.avatarPublicId) {
		await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
	}
	
	res.status(StatusCodes.OK).json({ message: "User info has been updated" })
}

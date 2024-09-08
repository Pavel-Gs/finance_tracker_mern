// IMPORT STATUS CODES
import { StatusCodes } from 'http-status-codes'


// LOGOUT USER CONTROLLER
export const logoutUserController = (req, res) => {
	res.cookie('cookieToken', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()) /* expires immediately */
	})
	res.status(StatusCodes.OK).json({message: "User logged out"})
}
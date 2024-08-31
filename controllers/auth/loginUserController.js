// IMPORT MODELS
import { UserModel } from '../../models/UserModel.js'
// IMPORT CUSTOM ERROR CLASSES
import { UnauthenticatedError } from '../../errors/customErrors.js'
// IMPORT UTILS FUNCTIONS
import { comparePassword } from '../../utils/passwordUtils.js'
import { createJWT } from '../../utils/tokenUtils.js'


// LOGIN EXISTING USER CONTROLLER
export const loginUserController = async (req, res) => {

	// check whether the email exists
	const existingUser = await UserModel.findOne({ emailUser: req.body.emailUser })
	if (!existingUser) throw new UnauthenticatedError("Invalid credentials")

	// compare password
	const isPasswordCorrect = await comparePassword(req.body.passwordUser, existingUser.passwordUser)
	if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials")

	// setup jwt token
	const token = createJWT({userId: existingUser._id, userRole: existingUser.role})

	res.json({ token})
}
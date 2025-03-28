// IMPORT EXPRESS VALIDATION FUNCTIONS
import { body } from 'express-validator'
// IMPORT VALIDATION MIDDLEWARE
import { withValidationErrors } from './validationMiddleware.js'
// IMPORT MODELS
import { UserModel } from '../models/UserModel.js'
// IMPORT CUSTOM ERROR CLASSES
import { BadRequestError } from '../errors/customErrors.js'


// VALIDATE UPDATE USER MIDDLEWARE
export const validateUpdateUserInput = withValidationErrors(
	[
		body('firstName')
			.notEmpty()
			.withMessage("First name is required")
			.isLength({ min: 2, max: 20 })
			.withMessage("The first name's length must be between 2 and 20 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("First name must contain only letters and spaces"),
		body('lastName')
			.notEmpty()
			.withMessage("Last name is required")
			.isLength({ min: 2, max: 20 })
			.withMessage("The last name's length must be between 2 and 20 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("Last name must contain only letters and spaces"),
		body('emailUser')
			.notEmpty()
			.withMessage("Email is required")
			.isLength({ min: 8, max: 50 })
			.withMessage("The email's length must be between 8 and 50 characters")
			.isEmail()
			.withMessage("Please enter a valid email address")
			.custom(async (emailUser, { req }) => {
				/* check for already taken email */
				const existingUser = await UserModel.findOne({ emailUser })
				if (existingUser && existingUser._id.toString() !== req.authenticatedUser.userId) {
					throw new BadRequestError("That email is already in use")
				}
			}),
		/* remove the ability to change the password after registration (may add it back in the future); also, refer to currentUserControllers.js "updateUserController" */
		/* body('passwordUser')
			.notEmpty()
			.withMessage("Password is required")
			.isLength({ min: 5, max: 50 })
			.withMessage("The password's length must be between 5 and 50 characters")
			.matches(/^\S*$/)
			.withMessage("Password must not contain any spaces"), */
		body('locationUser')
			.notEmpty()
			.withMessage("The location is required")
			.isLength({ min: 2, max: 50 })
			.withMessage("The location's length must be between 2 and 50 characters")
			.matches(/^[a-zA-Z\s]*$/)
			.withMessage("Location must contain only letters and spaces")
	]
)
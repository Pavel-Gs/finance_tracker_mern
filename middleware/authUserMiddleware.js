// IMPORT CUSTOM ERROR CLASSES
import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js'
// IMPORT VERIFY TOKEN FUNCTION
import { verifyJWT } from '../utils/tokenUtils.js'


// AUTHENTICATE USER MIDDLEWARE
export const authUserMiddleware = (req, res, next) => {
	const { cookieToken } = req.cookies
	if (!cookieToken) throw new UnauthenticatedError("Authentication invalid")
	try {
		const { userId, userRole, userOrg } = verifyJWT(cookieToken) /* verify the JWT token and destructure the user payload data (refer to loginUserController.js, "token" function) */
		req.authenticatedUser = { userId, userRole, userOrg } /* attach the user payload data to the request object */
		next()
	} catch (error) {
		throw new UnauthenticatedError("Authentication invalid")
	}
}


// VERIFY ADMIN MIDDLEWARE
export const authorizePermissionsMiddleware = (...i) => {
	return (req, res, next) => {
		/* current user's roles are passed through "i" via userRoutes.js "set auth routes" */
		if (!i.includes(req.authenticatedUser.userRole)) {
			throw new UnauthorizedError("Unauthorized to access this route")
		}
		next()
	}
}
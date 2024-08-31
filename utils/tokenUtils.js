// IMPORT JSON WEB TOKEN LIBRARY
import jwt from 'jsonwebtoken'


// CREATE JWT FUNCTION
export const createJWT = (payload) => {
	const createToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
	return createToken
}
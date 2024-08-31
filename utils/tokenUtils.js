// IMPORT JSON WEB TOKEN LIBRARY
import jwt from 'jsonwebtoken'


// CREATE JWT FUNCTION
export const createJWT = (payload) => {
	const createToken = jwt.sign(payload, 'secret', {
		expiresIn: '1d'
	})
	return createToken
}
// IMPORT HASHING LIBRARIES
import bcrypt from 'bcryptjs'


// HASH PASSWORD FUNCTION
export const hashPassword = async (passwordUser) => {
	const salt = await bcrypt.genSalt(10)
	const encryptedPassword = await bcrypt.hash(passwordUser, salt)
	return encryptedPassword
}


// COMPARE PASSWORDS FUNCTION
export const comparePassword = async (passwordUser, encryptedPassword) => {
	const isMatch = await bcrypt.compare(passwordUser, encryptedPassword)
	return isMatch
}
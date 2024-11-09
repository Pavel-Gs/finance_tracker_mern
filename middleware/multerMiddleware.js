// IMPORT NPM PACKAGES (HANDLE FILE UPLOADS)
import multer from 'multer'
import DataParser from 'datauri/parser.js'
import path from 'path'


// MULTER MIDDLEWARE FUNCTION
/* using disk storage */
const storageFunc = multer.memoryStorage()

/* invoke parser */
const parser = new DataParser()

/* helper function */
export const formatImage = (file) => {
	const fileExtension = path.extname(file.originalname).toString()
	return parser.format(fileExtension, file.buffer).content
}

/* handle uploads */
export const uploadMiddleware = multer({
	storage: storageFunc,
	limits: { fileSize: 512000 } /* specify the file size limit (also set on front-end ProfilePage.jsx) */
})

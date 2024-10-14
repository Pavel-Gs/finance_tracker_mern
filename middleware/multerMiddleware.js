// IMPORT NPM PACKAGE (HANDLE FILE UPLOADS)
import multer from 'multer'


// MULTER MIDDLEWARE FUNCTION
/* using disk storage */
const storageFunc = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads') /* specify the destination folder */
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname
		cb(null, fileName) /* specify the file name */
	}
})


/* handle uploads */
export const uploadMiddleware = multer({
	storage: storageFunc,
	limits: { fileSize: 512000 } /* specify the file size limit (also set on front-end ProfilePage.jsx) */
})

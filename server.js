// IMPORT EXPRESS ERRORS PACKAGE
import 'express-async-errors' // may have to place it at the very top of the code
// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT FRAMEWORKS FOR NODEJS
import express from 'express'
// IMPORT MODULES
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
// IMPORT ROUTES
import { routerExpressAuth } from './routes/authRoutes.js'
import { routerExpressUser } from './routes/userRoutes.js'
import { routerExpressAdmin } from './routes/adminRoutes.js'
import { routerExpressExpenses } from './routes/expensesRoutes.js'
import { routerExpressIncome } from './routes/incomeRoutes.js'
// IMPORT MIDDLEWARE
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'
import { authUserMiddleware } from './middleware/authUserMiddleware.js'
// IMPORT FILE AND DIRECTORY PATH MODULES (FOR PUBLIC FOLDER ACCESS)
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
// IMPORT SECURITY PACKAGES
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
// IMPORT CLOUDINARY PACKAGE (FOR IMAGE UPLOAD)
import cloudinary from 'cloudinary'


// INVOKE DOTENV
dotenv.config() /* may have to place it at the very top of the code */


// SETUP SERVER
const app = express()
const port = process.env.PORT || 5100
/* connect to the database */
try {
	await mongoose.connect(process.env.MONGO_URL)
	app.listen(port, () => {
		console.log(`server is running on port ${port}...`)
	})
} catch (error) {
	console.log(error)
	process.exit(1)
}


// SET FILE AND DIRECTORY FUNCTIONS (MUST BE PLACED ABOVE API ROUTES)
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/dist')))


// CONFIGURE CLOUDINARY
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})


// SETUP MIDDLEWARE
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev')) /* provides additional logs in the terminal */
}
/* setup api routes */
app.use('/api/v1/auth', routerExpressAuth)
app.use('/api/v1/users', authUserMiddleware, routerExpressUser)
app.use('/api/v1/admin', authUserMiddleware, routerExpressAdmin)
app.use('/api/v1/expenses', authUserMiddleware, routerExpressExpenses)
app.use('/api/v1/income', authUserMiddleware, routerExpressIncome)
/* public routes for built project */
// Serve index.html only if the route doesn't start with /api
app.get(/^\/(?!api).*/, (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})


// ERROR MIDDLEWARE
// 404 only for API routes
app.use('/api', (req, res) => {
	res.status(404).json({ message: "not found" })
})
/* error handler (may have to place it at the very bottom of the code) */
app.use(errorHandlerMiddleware)

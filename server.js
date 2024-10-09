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


// SETUP MIDDLEWARE
app.use(cookieParser())
app.use(express.json())
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev')) /* provides additional logs in the terminal */
}
/* setup api routes */
app.use('/api/v1/auth', routerExpressAuth)
app.use('/api/v1/users', authUserMiddleware, routerExpressUser)
app.use('/api/v1/admin', authUserMiddleware, routerExpressAdmin)
app.use('/api/v1/expenses', authUserMiddleware, routerExpressExpenses)
app.use('/api/v1/income', authUserMiddleware, routerExpressIncome)
/* test routes */
app.get('/', (req, res) => {
	res.send("test")
})
app.get('/api/v1/test', (req, res) => {
	res.json({message: "Test route"})
})


// ERROR MIDDLEWARE
/* not found */
app.use('*', (req, res) => {
	res.status(404).json({ message: "not found" })
})
/* error handler (may have to place it at the very bottom of the code) */
app.use(errorHandlerMiddleware)
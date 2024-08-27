// IMPORT EXPRESS ERRORS PACKAGE
import 'express-async-errors' // may have to place it at the very top of the code
// IMPORT OBJECT DATA MODELING TOOLS
import mongoose from 'mongoose'
// IMPORT FRAMEWORKS FOR NODEJS
import express from 'express'
// IMPORT MODULES
import morgan from 'morgan'
import * as dotenv from 'dotenv'
// IMPORT ROUTES
import { routerExpressExpenses } from './routes/expensesRoutes.js'
import { routerExpressIncome } from './routes/incomeRoutes.js'
// IMPORT MIDDLEWARE
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'


// INVOKE DOTENV
dotenv.config() // may have to place it at the very top of the code


// SETUP SERVER
const app = express()
const port = process.env.PORT || 5100
// connect to the database
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
app.use(express.json())
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev')) // provides additional logs in the terminal
}
// setup api routes
app.use('/api/v1/expenses', routerExpressExpenses)
app.use('/api/v1/income', routerExpressIncome)


// ERROR MIDDLEWARE
// not found
app.use('*', (req, res) => {
	res.status(404).json({ message: "not found" })
})
// error (may have to place it at the very bottom of the code)
app.use(errorHandlerMiddleware)
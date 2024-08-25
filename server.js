// IMPORT MODULES
import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
// IMPORT ROUTES
import {routerExpress} from './routes/expensesRoutes.js'


// INVOKE DOTENV
dotenv.config() // may have to place it at the very top of the code

// SETUP SERVER
const app = express()
const port = process.env.PORT || 5100
app.listen(port, () => {
	console.log(`server is running on port ${port}...`)
})


// SETUP MIDDLEWARE
app.use(express.json())
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev')) // provides additional logs in the terminal
}

app.use('/api/v1/jobs', routerExpress)

// GET REQUEST
app.get('/', (req, res) => {
	res.send("test")
})

// POST REQUEST
app.post('/', (req, res) => {
	console.log(req)
	res.json({ message: "data received", data: req.body })
})



// ERROR MIDDLEWARE
// not found
app.use('*', (req, res) => {
	res.status(404).json({message: "not found"})
})
// error (should be the last one)
app.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({message: "something went wrong"})
})
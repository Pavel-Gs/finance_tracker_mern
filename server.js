// IMPORT MODULES
import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'


// INVOKE DOTENV
dotenv.config() // may have to place it at the very top of the code

// SETUP SERVER
const app = express()
const port = process.env.PORT || 5100
app.listen(port, ()=> {
	console.log(`server is running on port ${port}...`)
})

// SETUP MIDDLEWARE
app.use(express.json())
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev')) // provides additional logs in the terminal
}

// GET REQUEST
app.get('/', (req, res) => {
	res.send("test")
})

// POST REQUEST
app.post('/', (req, res) => {
	console.log(req)
	res.json({message: "data received", data: req.body})
})
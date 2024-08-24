// IMPORT MODULES
import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'


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

// GET REQUEST
app.get('/', (req, res) => {
	res.send("test")
})

// POST REQUEST
app.post('/', (req, res) => {
	console.log(req)
	res.json({ message: "data received", data: req.body })
})

//------------------------------------------
// GET ALL EXPENSES
app.get('/api/v1/jobs', )
// POST NEW EXPENSE
app.post('/api/v1/jobs', )
// GET SINGLE EXPENSE
app.get('/api/v1/jobs/:id', )
// PATCH AN EXPENSE
app.patch('/api/v1/jobs/:id', )
// DELETE AN EXPENSE
app.delete('/api/v1/jobs/:id', )


// ERROR MIDDLEWARE--------------------
//not found
app.use('*', (req, res) => {
	res.status(404).json({message: "not found"})
})
//error (should be the last one)
app.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({message: "something went wrong"})
})
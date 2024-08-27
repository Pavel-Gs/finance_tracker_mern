// IMPORT ROUTER FUNCTION
import {Router} from 'express'
// IMPORT INCOME CONTROLLERS
import { getAllIncomeController } from '../controllers/income/getAllIncomeController.js'
import { postNewIncomeController } from '../controllers/income/postNewIncomeController.js'
import { getSingleIncomeController } from '../controllers/income/getSingleIncomeController.js'
import { patchIncomeController } from '../controllers/income/patchIncomeController.js'
import { deleteIncomeController } from '../controllers/income/deleteIncomeController.js'


// INVOKE THE ROUTER
const routerExpressIncome = Router()

// SET EXPENSES ROUTES
routerExpressIncome.get('/', getAllIncomeController)
routerExpressIncome.post('/', postNewIncomeController)
routerExpressIncome.get('/:id', getSingleIncomeController)
routerExpressIncome.patch('/:id', patchIncomeController)
routerExpressIncome.delete('/:id', deleteIncomeController)

export {routerExpressIncome}

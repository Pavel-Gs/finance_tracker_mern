// IMPORT ROUTER FUNCTION
import {Router} from 'express'
// IMPORT EXPENSES CONTROLLERS
import { getAllExpensesController } from '../controllers/expenses/getAllExpensesController.js'
import { postNewExpenseController } from '../controllers/expenses/postNewExpenseController.js'
import { getSingleExpenseController } from '../controllers/expenses/getSingleExpenseController.js'
import { patchExpenseController } from '../controllers/expenses/pathExpenseController.js'
import { deleteExpenseController } from '../controllers/expenses/deleteExpenseController.js'


// INVOKE THE ROUTER
const routerExpress = Router()

// SET EXPENSES ROUTES
routerExpress.get('/', getAllExpensesController)
routerExpress.post('/', postNewExpenseController)
routerExpress.get('/:id', getSingleExpenseController)
routerExpress.patch('/:id', patchExpenseController)
routerExpress.delete('/:id', deleteExpenseController)

export {routerExpress}

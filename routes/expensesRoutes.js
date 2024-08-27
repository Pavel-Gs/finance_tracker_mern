// IMPORT ROUTER FUNCTION
import {Router} from 'express'
// IMPORT EXPENSES CONTROLLERS
import { getAllExpensesController } from '../controllers/expenses/getAllExpensesController.js'
import { postNewExpenseController } from '../controllers/expenses/postNewExpenseController.js'
import { getSingleExpenseController } from '../controllers/expenses/getSingleExpenseController.js'
import { patchExpenseController } from '../controllers/expenses/patchExpenseController.js'
import { deleteExpenseController } from '../controllers/expenses/deleteExpenseController.js'


// INVOKE THE ROUTER
const routerExpressExpenses = Router()

// SET EXPENSES ROUTES
routerExpressExpenses.get('/', getAllExpensesController)
routerExpressExpenses.post('/', postNewExpenseController)
routerExpressExpenses.get('/:id', getSingleExpenseController)
routerExpressExpenses.patch('/:id', patchExpenseController)
routerExpressExpenses.delete('/:id', deleteExpenseController)

export {routerExpressExpenses}

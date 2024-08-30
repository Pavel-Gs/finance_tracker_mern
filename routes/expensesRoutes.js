// IMPORT ROUTER FUNCTION
import {Router} from 'express'
// IMPORT EXPENSES CONTROLLERS
import { getAllExpensesController } from '../controllers/expenses/getAllExpensesController.js'
import { postNewExpenseController } from '../controllers/expenses/postNewExpenseController.js'
import { getSingleExpenseController } from '../controllers/expenses/getSingleExpenseController.js'
import { patchExpenseController } from '../controllers/expenses/patchExpenseController.js'
import { deleteExpenseController } from '../controllers/expenses/deleteExpenseController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateExpenseInput } from '../middleware/validateExpensesMiddleware.js'
import { validateIdParam } from '../middleware/validationMiddleware.js'


// INVOKE THE ROUTER
const routerExpressExpenses = Router()

// SET EXPENSES ROUTES
routerExpressExpenses.get('/', getAllExpensesController)
routerExpressExpenses.post('/', validateExpenseInput, postNewExpenseController)
routerExpressExpenses.get('/:id', validateIdParam, getSingleExpenseController)
routerExpressExpenses.patch('/:id', validateIdParam, validateExpenseInput, patchExpenseController)
routerExpressExpenses.delete('/:id', validateIdParam, deleteExpenseController)

export {routerExpressExpenses}

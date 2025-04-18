// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT EXPENSES CONTROLLERS
import { getAllExpensesController } from '../controllers/expenses/getAllExpensesController.js'
import { postNewExpenseController } from '../controllers/expenses/postNewExpenseController.js'
import { getSingleExpenseController } from '../controllers/expenses/getSingleExpenseController.js'
import { patchExpenseController } from '../controllers/expenses/patchExpenseController.js'
import { deleteExpenseController } from '../controllers/expenses/deleteExpenseController.js'
import { showExpensesStatsController } from '../controllers/expenses/showExpensesStatsController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateExpenseInput } from '../middleware/validateExpensesMiddleware.js'
import { validIdExpenseParam } from '../middleware/validationMiddleware.js'


// INVOKE THE ROUTER
const routerExpressExpenses = Router()


// SET EXPENSES ROUTES
routerExpressExpenses.get('/', getAllExpensesController)
routerExpressExpenses.post('/', validateExpenseInput, postNewExpenseController)

routerExpressExpenses.get('/stats', showExpensesStatsController) /* stats controller must be placed before :id (express reads from top to bottom) */

routerExpressExpenses.get('/:id', validIdExpenseParam, getSingleExpenseController)
routerExpressExpenses.patch('/:id', validIdExpenseParam, validateExpenseInput, patchExpenseController)
routerExpressExpenses.delete('/:id', validIdExpenseParam, deleteExpenseController)

export { routerExpressExpenses }

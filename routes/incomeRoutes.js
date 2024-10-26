// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT INCOME CONTROLLERS
import { getAllIncomeController } from '../controllers/income/getAllIncomeController.js'
import { postNewIncomeController } from '../controllers/income/postNewIncomeController.js'
import { getSingleIncomeController } from '../controllers/income/getSingleIncomeController.js'
import { patchIncomeController } from '../controllers/income/patchIncomeController.js'
import { deleteIncomeController } from '../controllers/income/deleteIncomeController.js'
import { showIncomeStatsController } from '../controllers/income/showIncomeStatsController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateIncomeInput } from '../middleware/validateIncomeMiddleware.js'
import { validIdIncomeParam } from '../middleware/validationMiddleware.js'


// INVOKE THE ROUTER
const routerExpressIncome = Router()


// SET EXPENSES ROUTES
routerExpressIncome.get('/', getAllIncomeController)
routerExpressIncome.post('/', validateIncomeInput, postNewIncomeController)

routerExpressIncome.get('/stats', showIncomeStatsController) /* stats controller must be placed before :id (express reads from top to bottom) */

routerExpressIncome.get('/:id', validIdIncomeParam, getSingleIncomeController)
routerExpressIncome.patch('/:id', validIdIncomeParam, validateIncomeInput, patchIncomeController)
routerExpressIncome.delete('/:id', validIdIncomeParam, deleteIncomeController)

export { routerExpressIncome }

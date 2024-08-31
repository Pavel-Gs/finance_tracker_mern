// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT INCOME CONTROLLERS
import { getAllIncomeController } from '../controllers/income/getAllIncomeController.js'
import { postNewIncomeController } from '../controllers/income/postNewIncomeController.js'
import { getSingleIncomeController } from '../controllers/income/getSingleIncomeController.js'
import { patchIncomeController } from '../controllers/income/patchIncomeController.js'
import { deleteIncomeController } from '../controllers/income/deleteIncomeController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateIncomeInput } from '../middleware/validateIncomeMiddleware.js'
import { validateIdParam } from '../middleware/validationMiddleware.js'


// INVOKE THE ROUTER
const routerExpressIncome = Router()

// SET EXPENSES ROUTES
routerExpressIncome.get('/', getAllIncomeController)
routerExpressIncome.post('/', validateIncomeInput, postNewIncomeController)
routerExpressIncome.get('/:id', validateIdParam, getSingleIncomeController)
routerExpressIncome.patch('/:id', validateIdParam, validateIncomeInput, patchIncomeController)
routerExpressIncome.delete('/:id', validateIdParam, deleteIncomeController)

export { routerExpressIncome }

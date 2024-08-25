// IMPORT ROUTER FUNCTION
import {Router} from 'express'
// IMPORT CONTROLLERS
import { getAllExpensesController, postNewExpenseController, getSingleExpenseController, patchExpenseController, deleteExpenseController } from '../controllers/expensesControllers.js'


// INVOKE THE ROUTER
const routerExpress = Router()

// SET ROUTES
routerExpress.get('/', getAllExpensesController)
routerExpress.post('/', postNewExpenseController)
routerExpress.get('/:id', getSingleExpenseController)
routerExpress.patch('/:id', patchExpenseController)
routerExpress.delete('/:id', deleteExpenseController)

export {routerExpress}

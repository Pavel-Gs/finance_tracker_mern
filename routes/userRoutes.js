// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT USER CONTROLLERS
import { getApplicationStatsController, getCurrentUserController, updateUserController } from '../controllers/auth/currentUserControllers.js'
// IMPORT MIDDLEWARE
import { validateUpdateUserInput } from '../middleware/validateUpdateUserMiddleware.js'
import { authorizePermissionsMiddleware } from '../middleware/authUserMiddleware.js'


// INVOKE THE ROUTER
const routerExpressUser = Router()


// SET AUTH ROUTES
routerExpressUser.get('/current-user', getCurrentUserController)
routerExpressUser.get('/admin/app-stats', authorizePermissionsMiddleware('Admin'), getApplicationStatsController)
routerExpressUser.patch('/update-user',validateUpdateUserInput, updateUserController)

export { routerExpressUser }
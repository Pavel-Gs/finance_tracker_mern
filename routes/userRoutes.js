// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT USER CONTROLLERS
import { getCurrentUserController, updateUserController } from '../controllers/auth/currentUserControllers.js'
// IMPORT MIDDLEWARE
import { validateUpdateUserInput } from '../middleware/validateUpdateUserMiddleware.js'


// INVOKE THE ROUTER
const routerExpressUser = Router()


// SET AUTH ROUTES
routerExpressUser.get('/current-user', getCurrentUserController)
routerExpressUser.patch('/update-user',validateUpdateUserInput, updateUserController)

export { routerExpressUser }
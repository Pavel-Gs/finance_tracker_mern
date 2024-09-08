// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT USER CONTROLLERS
import { getApplicationStatsController, getCurrentUserController, updateUserController } from '../controllers/auth/currentUserControllers.js'


// INVOKE THE ROUTER
const routerExpressUser = Router()

// SET AUTH ROUTES
routerExpressUser.get('/current-user', getCurrentUserController)
routerExpressUser.get('/admin/app-stats', getApplicationStatsController)
routerExpressUser.patch('/update-user', updateUserController)

export { routerExpressUser }
// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT ADMIN CONTROLLERS
import { getApplicationStatsController } from '../controllers/admin/getApplicationStatsController.js'
// IMPORT MIDDLEWARE
import { authorizePermissionsMiddleware } from '../middleware/authUserMiddleware.js'


// INVOKE THE ROUTER
const routerExpressAdmin = Router()


// SET ADMIN ROUTES
routerExpressAdmin.get('/app-stats', authorizePermissionsMiddleware('Admin'), getApplicationStatsController)

export { routerExpressAdmin }

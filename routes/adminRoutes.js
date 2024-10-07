// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT ADMIN CONTROLLERS
import { getAllUsersController } from '../controllers/admin/getAllUsersController.js'


// INVOKE THE ROUTER
const routerExpressAdmin = Router()


// SET ADMIN ROUTES
routerExpressAdmin.get('/users', getAllUsersController)
// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT AUTH CONTROLLERS
import { loginUserController } from '../controllers/auth/loginUserController.js'
import { registerUserController } from '../controllers/auth/registerUserController.js'
import { logoutUserController } from '../controllers/auth/logoutUserController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateLoginInput } from '../middleware/validateLoginMiddleware.js'
import { validateRegisterInput } from '../middleware/validateRegisterMiddleware.js'


// INVOKE THE ROUTER
const routerExpressAuth = Router()


// SET AUTH ROUTES
routerExpressAuth.post('/login', validateLoginInput, loginUserController)
routerExpressAuth.post('/register', validateRegisterInput, registerUserController)
routerExpressAuth.get('/logout', logoutUserController)

export { routerExpressAuth }
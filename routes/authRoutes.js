// IMPORT ROUTER FUNCTION
import { Router } from 'express'
// IMPORT AUTH CONTROLLERS
import { loginUserController } from '../controllers/auth/loginUserController.js'
import { registerUserController } from '../controllers/auth/registerUserController.js'
import { logoutUserController } from '../controllers/auth/logoutUserController.js'
// IMPORT VALIDATION MIDDLEWARE
import { validateLoginInput } from '../middleware/validateLoginMiddleware.js'
import { validateRegisterInput } from '../middleware/validateRegisterMiddleware.js'
// IMPORT SECURITY PACKAGE
import rateLimiter from 'express-rate-limit'


// SET UP RATE LIMITER
const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, /* for how long to disable user's requests if the limit was exceeded (in milliseconds) */
	max: 10, /* amount of allowed requests before lockout */
	message: {message: "Too many requests. Try again later."}
})


// INVOKE THE ROUTER
const routerExpressAuth = Router()


// SET AUTH ROUTES
routerExpressAuth.post('/login', apiLimiter, validateLoginInput, loginUserController)
routerExpressAuth.post('/register', apiLimiter, validateRegisterInput, registerUserController)
routerExpressAuth.get('/logout', logoutUserController)

export { routerExpressAuth }
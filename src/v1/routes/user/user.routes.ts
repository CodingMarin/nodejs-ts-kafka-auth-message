import { Router } from 'express'
import { ErrorHandlerWrapper, AuthorizationWrapper } from '../../../utils'
import * as handlers from './user.handlers'

const userRouter = Router()

userRouter.post(
    '/signup',
    ErrorHandlerWrapper(handlers.signupHandler)
)

userRouter.post(
    '/login',
    ErrorHandlerWrapper(handlers.loginHandler)
)

userRouter.patch(
    '/change-password',
    ErrorHandlerWrapper(handlers.changePasswordHandler)
)

userRouter.get(
    '/users',
    ErrorHandlerWrapper(AuthorizationWrapper(handlers.getAllUsersHandler))
)

userRouter.get(
    '/users/:id',
    ErrorHandlerWrapper(AuthorizationWrapper(handlers.getUserHandler))
)

userRouter.patch(
    '/users/:id',
    ErrorHandlerWrapper(AuthorizationWrapper(handlers.updateUserHandler))
)

userRouter.delete(
    '/users/:id',
    ErrorHandlerWrapper(AuthorizationWrapper(handlers.deleteUserHandler))
)


export { userRouter }

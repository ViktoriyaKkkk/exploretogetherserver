import Router from "express";
import AuthController from "../controllers/authController.js";
import {check} from "express-validator";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'

const authRouter = new Router()

authRouter.post('/registration', [
  check("name", "Поле Имя не может быть пустым").notEmpty(),
    check("email", "Поле email не может быть пустым").notEmpty(),
        check('password', "Пароль должен содержать от 6 до 20 символов").isLength({min:6, max:20}),
        check("gender", "Вы не указали ваш пол").notEmpty()
    ],
    AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.put('/', authMiddleware, AuthController.update)
authRouter.get('/', authMiddleware, AuthController.getAll)
authRouter.get('/check', authMiddleware, AuthController.check)
authRouter.get('/:id', authMiddleware, AuthController.getOne)
authRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), AuthController.delete)

export default authRouter;
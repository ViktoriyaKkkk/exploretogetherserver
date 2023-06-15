import Router from 'express'
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import QuestionController from '../controllers/questionController.js'


const questionRouter = new Router()

questionRouter.post('/', authMiddleware, QuestionController.create)
questionRouter.get('/', roleMiddleware('641e18b855a5d5389d78aba8'), QuestionController.getAll)
questionRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), QuestionController.update)
questionRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), QuestionController.delete)

export default questionRouter;


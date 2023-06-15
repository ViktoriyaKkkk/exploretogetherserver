import Router from 'express'
import TopicController from "../controllers/topicController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const topicRouter = new Router()

topicRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), TopicController.create)
topicRouter.get('/', authMiddleware, TopicController.getAll)
topicRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), TopicController.update)
topicRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), TopicController.delete)

export default topicRouter;


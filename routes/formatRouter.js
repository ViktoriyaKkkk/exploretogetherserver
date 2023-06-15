import Router from 'express'
import FormatController from "../controllers/formatController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const formatRouter = new Router()

formatRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), FormatController.create)
formatRouter.get('/', authMiddleware, FormatController.getAll)
formatRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), FormatController.update)
formatRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), FormatController.delete)

export default formatRouter;


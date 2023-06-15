import Router from 'express'
import TimeController from "../controllers/timeController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const timeRouter = new Router()

timeRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), TimeController.create)
timeRouter.get('/', authMiddleware, TimeController.getAll)
timeRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), TimeController.update)
timeRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), TimeController.delete)

export default timeRouter;


import Router from 'express'
import DurationController from "../controllers/durationController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const durationRouter = new Router()

durationRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), DurationController.create)
durationRouter.get('/', authMiddleware, DurationController.getAll)
durationRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), DurationController.update)
durationRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), DurationController.delete)

export default durationRouter;


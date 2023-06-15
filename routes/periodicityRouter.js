import Router from 'express'
import PeriodicityController from "../controllers/periodicityController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const PeriodicityRouter = new Router()

PeriodicityRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), PeriodicityController.create)
PeriodicityRouter.get('/', authMiddleware, PeriodicityController.getAll)
PeriodicityRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), PeriodicityController.update)
PeriodicityRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), PeriodicityController.delete)

export default PeriodicityRouter;


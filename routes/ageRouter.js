import Router from 'express'
import AgeController from "../controllers/ageController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const ageRouter = new Router()

ageRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), AgeController.create)
ageRouter.get('/', authMiddleware, AgeController.getAll)
ageRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), AgeController.update)
ageRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), AgeController.delete)

export default ageRouter;


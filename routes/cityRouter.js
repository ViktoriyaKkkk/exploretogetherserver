import Router from 'express'
import CityController from "../controllers/cityController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const cityRouter = new Router()

cityRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), CityController.create)
cityRouter.get('/', authMiddleware, CityController.getAll)
cityRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), CityController.update)
cityRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), CityController.delete)

export default cityRouter;


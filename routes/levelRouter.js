import Router from 'express'
import LevelController from "../controllers/levelController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const levelRouter = new Router()

levelRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), LevelController.create)
levelRouter.get('/', authMiddleware, LevelController.getAll)
levelRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), LevelController.update)
levelRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), LevelController.delete)

export default levelRouter;


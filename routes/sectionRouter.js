import Router from 'express'
import SectionController from "../controllers/sectionController.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const sectionRouter = new Router()

sectionRouter.post('/', roleMiddleware('641e18b855a5d5389d78aba8'), SectionController.create)
sectionRouter.get('/', authMiddleware, SectionController.getAll)
sectionRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), SectionController.update)
sectionRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), SectionController.delete)

export default sectionRouter;


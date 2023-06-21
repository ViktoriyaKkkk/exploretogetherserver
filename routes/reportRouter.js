import Router from 'express'
import {roleMiddleware} from "../middlewares/roleMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import ReportController from '../controllers/reportController.js'

const reportRouter = new Router()

reportRouter.post('/', authMiddleware, ReportController.create)
reportRouter.get('/', roleMiddleware('641e18b855a5d5389d78aba8'), ReportController.getAll)
reportRouter.put('/', roleMiddleware('641e18b855a5d5389d78aba8'), ReportController.update)
reportRouter.delete('/:id', roleMiddleware('641e18b855a5d5389d78aba8'), ReportController.delete)

export default reportRouter;


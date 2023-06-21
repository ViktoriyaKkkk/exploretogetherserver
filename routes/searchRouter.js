import Router from 'express'
import {authMiddleware} from "../middlewares/authMiddleware.js";
import SearchController from "../controllers/searchController.js";

const searchRouter = new Router()

searchRouter.post('/', authMiddleware, SearchController.create)
searchRouter.get('/', SearchController.getAll)
searchRouter.put('/', authMiddleware, SearchController.update)
searchRouter.delete('/:id', authMiddleware, SearchController.delete)

export default searchRouter;


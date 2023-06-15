import Router from 'express'
import {authMiddleware} from "../middlewares/authMiddleware.js";
import MessageController from '../controllers/messageController.js'

const messageRouter = new Router()

messageRouter.post('/', authMiddleware, MessageController.create)
messageRouter.get('/:id', authMiddleware, MessageController.getOneChat)

export default messageRouter;


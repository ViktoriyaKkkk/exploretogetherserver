import Router from 'express'
import cityRouter from "./cityRouter.js";
import topicRouter from "./topicRouter.js";
import durationRouter from "./durationRouter.js";
import periodicityRouter from "./periodicityRouter.js";
import timeRouter from "./timeRouter.js";
import formatRouter from "./formatRouter.js";
import ageRouter from "./ageRouter.js";
import sectionRouter from "./sectionRouter.js";
import levelRouter from "./levelRouter.js";
import authRouter from "./authRouter.js";
import searchRouter from "./searchRouter.js";
import reportRouter from './reportRouter.js'
import messageRouter from './messageRouter.js'
import questionRouter from './questionRouter.js'
const router = Router()

router.use('/city', cityRouter)
router.use('/topic', topicRouter)
router.use('/duration', durationRouter)
router.use('/periodicity', periodicityRouter)
router.use('/time', timeRouter)
router.use('/format', formatRouter)
router.use('/age', ageRouter)
router.use('/section', sectionRouter)
router.use('/level', levelRouter)
router.use('/search', searchRouter)
router.use('/auth', authRouter)
router.use('/report', reportRouter)
router.use('/message', messageRouter)
router.use('/question', questionRouter)

export default router;
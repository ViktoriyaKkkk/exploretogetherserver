import { MessageList } from '../models/models.js'

class MessageController {
	async create(req, res) {
		try {
			const {searchId,author,message,time} = req.body
			const createdMessage = await MessageList.create({searchId,author,message,time})
			res.json(createdMessage);
		} catch (e) {
			res.status(500).json(e)
		}

	}

	async getOneChat(req, res) {
		const { id } = req.params
		if (!id) {
			res.status(400).json({ message: 'Id не указан' })
		}
		const chat = await MessageList.find({ searchId: id }).exec()
		return res.json(chat)
	}

}

export default new MessageController();
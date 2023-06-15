import { Question, User } from '../models/models.js'
import { mailer } from '../nodemailer.js'

class QuestionController {
	async create(req, res) {
		try {
			const {sender, questionText, answerText} = req.body
			const question = await Question.create({sender, questionText, answerText})
			res.json({ message:'Вопрос отправлен на рассмотрение.'});
		} catch (e) {
			res.status(500).json(e)
		}

	}

	async update(req, res) {
		try {
			const question = req.body
			if (!question.id) {
				res.status(400).json({message:'Id не указан'})
			}
			console.log(req.body)
			const senderData = await User.findById(question.sender)
			const message = {
				to: senderData.email,
				subject: 'Explore Together ответил на ваш вопрос!',
				text: `Приветствуем, ${senderData.name}! Ранее вы задавали вопрос Explore Together, у нас есть для вас ответ!
				Ваш вопрос был следующим:
				"${question.questionText}".
				Наш ответ: 
				"${question.answerText}".
				Надеемся, вы получили необходимую информацию, Explore Together всегда рад помочь!`,
			}
			mailer(message)
			const updateQuestion = await Question.findByIdAndUpdate(question.id, question, {new: true})

			res.json(updateQuestion);
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getAll(req, res) {
		try {
			const questions = await Question.find();
			return res.json(questions)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async delete(req, res) {
		try {
			const {id} = req.params
			if (!id) {
				res.status(400).json({message:'Id не указан'})
			}
			const question = await Question.findByIdAndDelete(id);
			return res.json(question)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new QuestionController();
import { Search, User } from '../models/models.js'
import mongoose from 'mongoose'
import { mailer } from '../nodemailer.js'

class SearchController {
	async create(req, res) {
		try {
			let {
				name, level, duration, periodicity, time,
				format, age, city, numberOfPeople, participantsGender,
			} = req.body
			level = new mongoose.Types.ObjectId(level)
			duration = new mongoose.Types.ObjectId(duration)
			periodicity = new mongoose.Types.ObjectId(periodicity)
			time = new mongoose.Types.ObjectId(time)
			format = new mongoose.Types.ObjectId(format)
			if (city !== '0') {
				city = new mongoose.Types.ObjectId(city)

			}
			age = new mongoose.Types.ObjectId(age)
			const { id } = req.user
			const user = await User.findById(id)
			const ownersGender = user.gender
			let params = { level, duration, periodicity, time, format, age }
			if (city !== '0') {
				params = { ...params, city }
			}

			if (numberOfPeople !== ' ') {
				params = { ...params, numberOfPeople }
			}
			const existingSearch = await Search.findOne({
				$or: [
					{ ...params, participantsGender: ownersGender, searchGender: participantsGender, marker: true },
					{ ...params, participantsGender: 'Любой', searchGender: participantsGender, marker: true },
				],
			})

			let searchGender = ''
			if (participantsGender === 'Любой') {
				searchGender = 'Любой'
			} else if (ownersGender === participantsGender) {
				searchGender = ownersGender
			} else {
				searchGender = 'Любой'
			}
			const createdSearch = await Search.findOne({
				owner: id, ...params,
				participantsGender,
				marker: true,
				searchGender,
			})
			if (createdSearch) {
				res.json(`У вас уже есть активный поисковый запрос с такими параметрами - "${createdSearch.name}"`)
			} else if (existingSearch) {
				if (existingSearch.participants.includes(id)) {
					res.json(`Вы уже являетесь участником поискового запроса с такими параметрами - "${existingSearch.name}"`)
				} else {
					if (numberOfPeople && existingSearch.participants.length + 1 >= numberOfPeople) {
						const updatedSearch = await Search.findByIdAndUpdate(existingSearch._id, {
							...params,
							participants: [...existingSearch.participants, id],
							marker: false,
						}, { new: true })
					} else {
						const existingOwner = await User.findById(existingSearch.owner)
						const message = {
							to: existingOwner.email,
							subject: 'У вас новый партнёр!',
							text: `Поздравляем! К вашему поисковому запросу "${existingSearch.name}" присоединился новый участник!
							Переходите по ссылке и познакомьтесь с ним: http://localhost:3000/dialogs/${existingSearch._id}`,
						}
						mailer(message)
						const updatedSearch = await Search.findByIdAndUpdate(existingSearch._id, {
							...params,
							participants: [...existingSearch.participants, id],
						}, { new: true })
					}
					res.json(`Вы добавлены как участник поискового запроса с такими параметрами - "${existingSearch.name}"`)
				}

			} else {
				const search = await Search.create({
					name, ...params,
					owner: id,
					participantsGender,
					participants: [],
					marker: true,
					searchGender,
				})
				res.json('Вы создали поисковый запрос с такими параметрами')
			}
		} catch (e) {
			res.status(500).json('Что-то пошло не так')
		}
	}

	async update(req, res) {
		try {
			const search = req.body
			if (!search.id) {
				res.status(400).json({ message: 'Id не указан' })
			}
			const updatedSearch = await Search.findByIdAndUpdate(search.id, search, { new: true })
			res.json(updatedSearch)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getAll(req, res) {
		try {
			const searches = await Search.find()
			return res.json(searches)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			if (!id) {
				res.status(400).json({ message: 'Id не указан' })
			}
			const search = await Search.findByIdAndDelete(id)
			return res.json(search)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new SearchController()